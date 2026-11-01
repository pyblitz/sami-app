/* SAMI & SARA AI 2.0 — Autonomous task planner (local).
   Breaks a project into subtasks, assigns Sami or Sara, tracks progress,
   detects failures, retries recoverable steps, keeps dependencies simple
   (sequential order), and NEVER auto-runs sensitive actions: those stay
   NEEDS APPROVAL. A task is "done" only when its check passes. */
(function (root) {
  "use strict";
  var SENSITIVE = ["publish", "post", "upload", "send", "pay", "spend", "delete", "buy"];
  function isSensitive(text) {
    var low = String(text || "").toLowerCase();
    return SENSITIVE.some(function (k) { return low.indexOf(k) !== -1; });
  }
  function plan(goal) {
    var base = [
      { title: "Define the exact outcome and success check", owner: "Sami" },
      { title: "Break the work into small steps", owner: "Sami" },
      { title: "Review the plan for gaps, risks and missing info", owner: "Sara" },
      { title: "Do the first step and verify its real result", owner: "Sami" },
      { title: "Audit the result and fix what failed", owner: "Sara" },
      { title: "Write the completion report with verified evidence only", owner: "Sami" }
    ];
    return base.map(function (t, i) {
      return { id: "t" + (i + 1), title: t.title, owner: t.owner,
        status: i === 0 ? "doing" : "todo", attempts: 0,
        needsApproval: isSensitive(t.title),
        dependsOn: i === 0 ? null : "t" + i };
    });
  }
  function advance(tasks, id, ok) {
    return tasks.map(function (t) {
      if (t.id !== id) return t;
      if (ok) { t.status = "done"; }
      else {
        t.attempts += 1;
        t.status = t.attempts >= 2 ? "failed" : "todo";
      }
      return t;
    });
  }
  function report(tasks, goal) {
    var done = tasks.filter(function (t) { return t.status === "done"; }).length;
    var failed = tasks.filter(function (t) { return t.status === "failed"; });
    return "Project: " + goal + "\nProgress: " + done + "/" + tasks.length + " done.\n" +
      (failed.length ? "Failed (not claimed as done): " + failed.map(function (t) { return t.title; }).join("; ") + "\n" : "No failed tasks.\n") +
      "Sensitive actions in this plan were NOT auto-executed; each needs the user's exact approval.";
  }
  var api = { plan: plan, advance: advance, report: report, isSensitive: isSensitive };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.SamiSaraTasks = api;
})(typeof window !== "undefined" ? window : globalThis);
