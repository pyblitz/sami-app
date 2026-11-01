/* SAMI & SARA AI 2.0 — Dual-Agent Engine (LOCAL, no LLM, no API key).
   Runs entirely in the browser. Sami = strategist/creator. Sara = independent
   challenger/auditor who NEVER auto-agrees. 7 phases, capped review cycles
   (hard cap 3) so debate can never loop forever. Works in browser and Node
   (for tests) via a small UMD-style export. */
(function (root) {
  "use strict";

  var MODES = {
    quick:      { label: "Quick Mode",      cycles: 0, debate: false, deep: false },
    dual:       { label: "Dual Mode",       cycles: 1, debate: true,  deep: false },
    expert:     { label: "Expert Mode",     cycles: 2, debate: true,  deep: true },
    autonomous: { label: "Autonomous Mode", cycles: 1, debate: true,  deep: false, planner: true },
    research:   { label: "Research Mode",   cycles: 1, debate: true,  deep: false, evidence: true },
    developer:  { label: "Developer Mode",  cycles: 1, debate: true,  deep: true,  codeFocus: true }
  };

  var LENSES = ["science/logic", "nature/environment", "resources",
    "human/user", "risk/failure", "alternative", "history"];

  var APPROVED_RATES = { "logo": 1500, "banner": 1200, "thumbnail": 800,
    "social pack": 2500, "brand kit": 4500, "excel": 1000, "word": 1000 };

  function words(text) {
    return String(text || "").toLowerCase().match(/[a-z0-9]+/g) || [];
  }
  function hasAny(text, list) {
    var w = words(text);
    return list.some(function (k) { return w.indexOf(k) !== -1; });
  }
  function typeOf(idea) {
    if (hasAny(idea, ["code", "app", "website", "program", "python", "javascript", "api", "game", "software", "debug", "bug"])) return "code";
    if (hasAny(idea, ["logo", "banner", "design", "brand", "thumbnail", "poster", "social"])) return "design";
    if (hasAny(idea, ["business", "client", "sell", "price", "shop", "store", "earn", "marketing", "fiverr"])) return "business";
    if (hasAny(idea, ["video", "reel", "short", "content", "post", "seo", "youtube", "caption"])) return "content";
    if (hasAny(idea, ["research", "study", "learn", "course", "explain", "tutorial", "teach"])) return "education";
    return "general";
  }

  /* PHASE 1 — UNDERSTAND (both agents, independently) */
  function understand(idea) {
    var w = words(idea);
    var missing = [];
    if (w.length < 4) missing.push("Goal is too short — what exactly should the result look like?");
    if (!hasAny(idea, ["for", "audience", "user", "client", "customer"])) missing.push("Audience/user is not named.");
    if (!hasAny(idea, ["by", "when", "today", "week", "date"])) missing.push("No deadline or time limit given.");
    if (typeOf(idea) === "business" && !hasAny(idea, ["rs", "price", "budget", "rate"])) missing.push("No budget or price mentioned.");
    return {
      type: typeOf(idea), wordCount: w.length, keywords: w.slice(0, 12),
      samiView: "Sami reads the request as a " + typeOf(idea) + " task with " + w.length + " words. Core intent: " + (idea.slice(0, 120) || "(empty)") + ".",
      saraView: "Sara reads the same request independently and checks it for gaps before any solution is accepted.",
      missing: missing,
      lenses: LENSES.slice()
    };
  }

  /* PHASE 2 — STRATEGIZE (Sami) */
  function strategize(idea, u) {
    var stepsByType = {
      code: ["Define the exact input and output", "Write the smallest working version first", "Test it with 2-3 real examples", "Review for errors and security issues", "Document how to run it"],
      design: ["Confirm size, platform and safe area", "Pick one idea, dark base + one accent, max 2-3 colours", "Build the premium layered version", "QC: spelling, overlap, cut-off edges, exact size", "Show first, apply only after approval"],
      business: ["Define the offer and the exact price", "Confirm Sample First + 50% advance (Easypaisa/JazzCash)", "List what the client gets, and what is NOT included", "Set a delivery time and one revision rule", "Never invent clients, results or profits"],
      content: ["Pick one idea and one payoff", "Write hook first, then the useful middle, then the CTA", "Keep the channel link + Subscribe CTA", "Check spelling, timing and safe area", "Publish only after the exact item is approved"],
      education: ["State what the learner will be able to do at the end", "Teach step by step, slowly, one concept at a time", "Give one working example and one practice task", "List common mistakes", "End with a short recap"],
      general: ["State the exact outcome wanted", "Break the work into small checkable steps", "Do the first step and verify it", "Review the result before continuing", "Report only what is verified"]
    };
    var steps = stepsByType[u.type] || stepsByType.general;
    var rateNote = "";
    Object.keys(APPROVED_RATES).forEach(function (k) {
      if (idea.toLowerCase().indexOf(k) !== -1) rateNote += "Approved rate found: " + k + " = Rs " + APPROVED_RATES[k] + ". ";
    });
    return { steps: steps, rateNote: rateNote || "No approved-rate item detected in this idea.",
      tools: ["Local dual-agent engine", "Local task planner", "Local memory", "Browser tools only (no external API by default)"] };
  }

  /* PHASE 3 — CHALLENGE (Sara, independent, never auto-agrees) */
  function challenge(idea, u, plan) {
    var issues = [];
    var low = idea.toLowerCase();
    if (!idea.trim()) issues.push({ level: "BLOCKER", text: "Empty idea — there is nothing to build. Ask the user for the actual goal first." });
    if (u.missing.length) u.missing.forEach(function (m) { issues.push({ level: "GAP", text: m }); });
    if (hasAny(idea, ["password", "otp", "api", "key", "secret", "login"])) issues.push({ level: "STOP", text: "Password / OTP / API key requested or implied — STOP. Never ask for, type, or store credentials. The user signs in himself, on his own device." });
    if (hasAny(idea, ["guarantee", "guaranteed", "profit", "earn", "lakh", "million"])) issues.push({ level: "RISK", text: "Earning/profit wording detected — no guaranteed earning may be promised. Only real, verified results may be stated." });
    if (hasAny(idea, ["publish", "post", "upload", "send", "pay", "spend", "delete"])) issues.push({ level: "APPROVAL", text: "Publishing / spending / deleting action detected — this needs the user's exact approval on the exact item first. The engine must NOT do it on its own." });
    if (hasAny(idea, ["copyright", "download", "clip", "song", "movie", "anime"])) issues.push({ level: "RISK", text: "Copyrighted material may be involved — use only original work or properly licensed material, never copied clips, characters, artwork or audio." });
    if (u.wordCount < 4 && idea.trim()) issues.push({ level: "GAP", text: "Idea is very short — the plan may guess wrong. Confirm the outcome before building." });
    if (!issues.length) issues.push({ level: "WATCH", text: "No blocking issue found, but watch this: the plan still needs a verified check of its first result before it is called done." });
    var rejected = issues.some(function (i) { return i.level === "BLOCKER" || i.level === "STOP"; });
    return { issues: issues, rejected: rejected,
      verdict: rejected ? "REJECTED — fix the blocker first, do not build on it." : "CHALLENGED — " + issues.length + " point(s) must be answered before delivery." };
  }

  /* PHASE 4 — DEBATE (bounded exchange) */
  function debate(issues) {
    return issues.map(function (iss, i) {
      var samiReply = iss.level === "STOP" || iss.level === "BLOCKER"
        ? "Sami accepts: this is a hard stop. The plan is paused until the user fixes it himself."
        : iss.level === "APPROVAL"
        ? "Sami accepts: the action is marked NEEDS APPROVAL and will not run without the user's exact OK."
        : "Sami accepts the point and adds it to the revised plan as a check, not as an assumption.";
      return { n: i + 1, level: iss.level, sara: iss.text, sami: samiReply, agreed: true };
    });
  }

  /* PHASE 5 — IMPROVE (Sami revises) */
  function improve(plan, debateRows) {
    var steps = plan.steps.slice();
    debateRows.forEach(function (d) {
      if (d.level !== "WATCH") steps.push("Check: " + d.sara);
    });
    steps.push("Verify the first real result before calling anything done.");
    return { steps: steps };
  }

  /* PHASE 6 — FINAL AUDIT (Sara) */
  function audit(idea, improved, rejected) {
    var checks = [
      { name: "Goal is clear", pass: idea.trim().length >= 4 },
      { name: "No credential request", pass: !hasAny(idea, ["password", "otp"]) },
      { name: "No fake claim", pass: !/guaranteed|fake client|fake result/i.test(idea) },
      { name: "No auto publish/spend", pass: true },
      { name: "Steps are checkable", pass: improved.steps.length >= 3 }
    ];
    var failed = checks.filter(function (c) { return !c.pass; });
    var verdict = rejected ? "NEEDS REVISION — do not deliver yet."
      : failed.length ? "APPROVED WITH CONDITIONS — fix: " + failed.map(function (c) { return c.name; }).join(", ")
      : "APPROVED — ready to deliver with the approval gates below.";
    return { checks: checks, verdict: verdict };
  }

  function run(idea, modeName) {
    var mode = MODES[modeName] || MODES.dual;
    var cycles = Math.min(mode.cycles, 3); // hard cap: never infinite
    var u = understand(idea);
    var plan = strategize(idea, u);
    var ch = challenge(idea, u, plan);
    var deb = mode.debate ? debate(ch.issues) : [];
    var imp = improve(plan, deb);
    var extraCycles = [];
    for (var c = 1; c < cycles; c++) {
      var rech = challenge(idea, u, imp);
      extraCycles.push({ cycle: c + 1, issuesFound: rech.issues.length, verdict: rech.verdict });
      imp = improve(imp, mode.debate ? debate(rech.issues) : []);
    }
    var aud = audit(idea, imp, ch.rejected);
    var phases = [
      { n: 1, name: "UNDERSTAND", sami: u.samiView, sara: u.saraView, extra: "Type: " + u.type + " | Missing: " + (u.missing.length ? u.missing.join(" ") : "none") },
      { n: 2, name: "STRATEGIZE (Sami)", sami: plan.steps.map(function (s, i) { return (i + 1) + ". " + s; }).join("\n"), sara: "Sara has not reviewed this plan yet — review comes in Phase 3.", extra: plan.rateNote },
      { n: 3, name: "CHALLENGE (Sara)", sami: "Sami waits for the challenge before revising.", sara: ch.issues.map(function (i) { return "[" + i.level + "] " + i.text; }).join("\n"), extra: ch.verdict },
      { n: 4, name: "DEBATE", sami: deb.map(function (d) { return d.n + ". Sami: " + d.sami; }).join("\n") || "Quick Mode: debate skipped by design.",
        sara: deb.map(function (d) { return d.n + ". Sara: " + d.sara; }).join("\n") || "Quick Mode: debate skipped by design.", extra: "Cycles used: " + (cycles + 1) + " (cap 3). Extra review cycles: " + extraCycles.length },
      { n: 5, name: "IMPROVE (Sami)", sami: imp.steps.map(function (s, i) { return (i + 1) + ". " + s; }).join("\n"), sara: "Sara will audit the revised plan in Phase 6.", extra: "" },
      { n: 6, name: "FINAL AUDIT (Sara)", sami: "Sami presents the revised plan for audit.", sara: aud.checks.map(function (c) { return (c.pass ? "PASS" : "FAIL") + " — " + c.name; }).join("\n"), extra: aud.verdict },
      { n: 7, name: "DELIVERY", sami: "Final plan:\n" + imp.steps.map(function (s, i) { return (i + 1) + ". " + s; }).join("\n"),
        sara: aud.verdict + (mode.evidence ? "\nResearch Mode note: no sources were attached, so no citations are claimed. Attach real sources to cite them." : "") + (mode.planner ? "\nAutonomous Mode note: tasks below are planned, not auto-executed. Sensitive actions stay NEEDS APPROVAL." : ""),
        extra: "Engine: LOCAL (not an LLM). No API key used. No data left this device." }
    ];
    return { mode: mode.label, idea: idea, type: u.type, phases: phases,
      verdict: aud.verdict, approved: !ch.rejected, steps: imp.steps };
  }

  var api = { run: run, MODES: MODES, APPROVED_RATES: APPROVED_RATES, typeOf: typeOf };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.SamiSaraEngine = api;
})(typeof window !== "undefined" ? window : globalThis);
