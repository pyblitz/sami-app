/* SAMI & SARA AI 2.0 — 12 intelligence modules.
   Every module does REAL local work. Nothing here calls an external API,
   nothing fabricates citations, results or integrations. Where a real
   integration would need a provider key, the module says so plainly and
   stays in local mode. */
(function (root) {
  "use strict";

  function headings(text) {
    return String(text || "").split("\n").filter(function (l) { return /^#{1,3}\s/.test(l); });
  }
  function wordCount(text) {
    return (String(text || "").match(/\S+/g) || []).length;
  }

  var modules = {
    research: { name: "AI Research Lab", run: function (input) {
      return "Research plan for: " + input + "\n1. Write the exact question in one sentence.\n2. List what would count as evidence (not opinion).\n3. Collect real sources yourself and paste them here — the lab will extract their headings and key lines.\n4. Compare sources: where do they agree, where do they conflict?\nCITATIONS: none claimed. No source attached = no citation shown. Never invent a source, author or link.";
    }},
    coding: { name: "AI Coding Laboratory", run: function (input) {
      var notes = [];
      if (/eval\s*\(/.test(input)) notes.push("Sara: eval() found — risky, avoid it.");
      if (/(api[_-]?key|password|secret|token)\s*=\s*["'][^"']+["']/i.test(input)) notes.push("Sara: possible hardcoded secret found — STOP, never put keys in code.");
      if (/innerHTML/.test(input)) notes.push("Sara: innerHTML found — check for untrusted input before using it.");
      if (!notes.length) notes.push("Sara: no common risk pattern found in this snippet (this is a local pattern scan, not a full security audit).");
      return "Sami: code received (" + input.length + " chars, " + input.split("\n").length + " lines).\n" + notes.join("\n") + "\nRun JS code in the browser console or the Coding Lab runner — only code you paste, sandboxed to this page.";
    }},
    design: { name: "AI Design Studio", run: function (input) {
      return "Design brief for: " + input + "\nRules applied: dark base + one accent, max 2-3 colours, one idea per design, text inside the safe area, no overlap, no cut-off.\nUse the Designer canvas below the brief to draw text on a canvas and download a PNG. Concept sample only — no real brand logos copied.";
    }},
    business: { name: "AI Business Strategist", run: function (input) {
      var rates = "Approved design rates: Logo Rs 1,500 | Banner Rs 1,200 | Thumbnail Rs 800 | Social Pack Rs 2,500 | Brand Kit Rs 4,500 | Excel/Word Rs 1,000 each. Terms: Sample First + 50% advance via Easypaisa/JazzCash.";
      return "Business plan sketch for: " + input + "\n1. Offer: state exactly what the client gets.\n2. Price: " + rates + "\n3. Delivery: time + one revision rule.\n4. Proof: only real work samples, never invented clients or profits.\n5. Next step: confirm the offer with the client before starting.";
    }},
    content: { name: "AI Content Studio", run: function (input) {
      return "Content plan for: " + input + "\nHook (first line) -> one useful idea -> payoff -> CTA.\nRequired footer: https://youtube.com/@pyblitz + 'Subscribe for more / See more videos on YouTube'.\nSEO checklist: one keyword in the title, clear first 3 lines, no fake claims, no copied material.";
    }},
    education: { name: "AI Education Center", run: function (input) {
      return "Lesson plan for: " + input + "\n1. Goal: what the learner will be able to DO at the end.\n2. Teach slowly, step by step, one concept at a time.\n3. One working example, then one practice task.\n4. Common mistakes to avoid.\n5. Short recap + next lesson.";
    }},
    data: { name: "AI Data Analyst", run: function (input) {
      try {
        var d = JSON.parse(input);
        var arr = Array.isArray(d) ? d : d.data || [];
        if (!arr.length) return "Data Analyst: JSON parsed, but no rows found.";
        var keys = Object.keys(arr[0]);
        var out = ["Data Analyst: " + arr.length + " rows, columns: " + keys.join(", ")];
        keys.forEach(function (k) {
          var nums = arr.map(function (r) { return Number(r[k]); }).filter(function (n) { return !isNaN(n); });
          if (nums.length === arr.length) {
            var sum = nums.reduce(function (a, b) { return a + b; }, 0);
            out.push(k + ": sum=" + sum + ", avg=" + (sum / nums.length).toFixed(2) + ", min=" + Math.min.apply(null, nums) + ", max=" + Math.max.apply(null, nums));
          }
        });
        return out.join("\n");
      } catch (e) {
        var lines = String(input || "").trim().split("\n").filter(Boolean);
        if (lines.length > 1 && lines[0].indexOf(",") !== -1) {
          var cols = lines[0].split(",");
          return "Data Analyst: CSV detected, " + (lines.length - 1) + " data rows, " + cols.length + " columns (" + cols.join(", ") + "). Paste JSON for sums and averages.";
        }
        return "Data Analyst: could not parse input as JSON or CSV. Paste a JSON array or a CSV table.";
      }
    }},
    automation: { name: "AI Automation Center", run: function (input) {
      return "Automation checklist for: " + input + "\n- The step runs only when you press it (no background auto-run in this local build).\n- The step never publishes, pays, sends or deletes without your exact approval.\n- Result is saved in this browser's local storage, and you can delete it any time.\nReal external automation needs a configured provider — currently: NOT CONFIGURED (shown honestly, not faked).";
    }},
    security: { name: "AI Security Auditor", run: function (input) {
      var findings = [];
      if (/(api[_-]?key|passwd|password|secret|token)\s*[:=]/i.test(input)) findings.push("Possible credential in text — remove it, never store or share it.");
      if (/eval\s*\(|Function\s*\(/.test(input)) findings.push("Dynamic code execution (eval/Function) — risky.");
      if (/http:\/\//.test(input)) findings.push("Plain http:// link found — prefer https://.");
      if (!findings.length) findings.push("No common risk pattern found in this local scan (not a full audit).");
      return "Security Auditor (local pattern scan):\n" + findings.map(function (f, i) { return (i + 1) + ". " + f; }).join("\n");
    }},
    project: { name: "AI Project Manager", run: function (input) {
      var tasks = root.SamiSaraTasks ? root.SamiSaraTasks.plan(input) : [];
      return "Project plan for: " + input + "\n" + tasks.map(function (t) { return t.id + " [" + t.owner + "] " + t.title + " — " + t.status + (t.needsApproval ? " (NEEDS APPROVAL)" : ""); }).join("\n");
    }},
    marketing: { name: "AI Marketing Strategist", run: function (input) {
      return "Marketing outline for: " + input + "\nProgramming work: YouTube, GitHub, Blogger, Facebook Page, Instagram.\nDesign work: Facebook profile, Pinterest, LinkedIn.\nRule: show the exact post first, publish only after approval. No fake results, no spam, no DM blasts.";
    }},
    document: { name: "AI Document Intelligence", run: function (input) {
      var hs = headings(input);
      return "Document Intelligence:\nWords: " + wordCount(input) + " | Lines: " + String(input || "").split("\n").length + "\nHeadings found: " + (hs.length ? hs.join(" | ") : "none") + "\nFirst lines: " + String(input || "").split("\n").slice(0, 3).join(" / ");
    }}
  };

  function runModule(id, input) {
    var m = modules[id];
    if (!m) return "Unknown module: " + id;
    return m.name + "\n" + m.run(input || "");
  }

  var api = { modules: modules, runModule: runModule };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.SamiSaraModules = api;
})(typeof window !== "undefined" ? window : globalThis);
