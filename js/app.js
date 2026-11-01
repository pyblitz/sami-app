/* SAMI & SARA AI 2.0 — Dashboard wiring (browser only).
   No network calls. No API keys. All state is localStorage on this device. */
(function () {
  "use strict";
  var E = window.SamiSaraEngine, M = window.SamiSaraMemory,
      T = window.SamiSaraTasks, Mod = window.SamiSaraModules;

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  }
  function show(view) {
    ["home", "discuss", "workspace", "memory", "settings"].forEach(function (v) {
      var el = $("view-" + v);
      if (el) el.style.display = (v === view) ? "block" : "none";
    });
    document.querySelectorAll("[data-view]").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-view") === view);
    });
  }
  function recent() {
    try { return JSON.parse(localStorage.getItem("sami2_recent") || "[]"); } catch (e) { return []; }
  }
  function saveRecent(item) {
    var list = recent();
    list.unshift(item);
    try { localStorage.setItem("sami2_recent", JSON.stringify(list.slice(0, 10))); } catch (e) {}
  }

  function renderHome() {
    var list = recent();
    $("home-recent").innerHTML = list.length
      ? list.map(function (r) { return "<li><b>" + esc(r.mode) + ":</b> " + esc(r.idea.slice(0, 90)) + " — <i>" + esc(r.verdict.slice(0, 80)) + "</i></li>"; }).join("")
      : "<li>No discussion yet. Start one from Dual Discussion.</li>";
    var proj = M.load("project");
    $("home-projects").innerHTML = proj.length
      ? proj.slice(0, 5).map(function (p) { return "<li>" + esc(p.text.slice(0, 90)) + "</li>"; }).join("")
      : "<li>No project memory saved yet.</li>";
  }

  function runDiscussion() {
    var idea = $("idea").value;
    var mode = $("mode").value;
    if (!idea.trim()) { $("discuss-out").innerHTML = "<p class='warn'>Please write an idea first. An empty idea is rejected by Sara on purpose.</p>"; return; }
    var res = E.run(idea, mode);
    var html = "<h3>Result — " + esc(res.mode) + " | Type: " + esc(res.type) + "</h3>";
    html += "<p><b>Final verdict (Sara):</b> " + esc(res.verdict) + "</p>";
    res.phases.forEach(function (p) {
      html += "<div class='phase'><h4>Phase " + p.n + " — " + esc(p.name) + "</h4>" +
        "<p><b class='sami'>Sami:</b><br>" + esc(p.sami).replace(/\n/g, "<br>") + "</p>" +
        "<p><b class='sara'>Sara:</b><br>" + esc(p.sara).replace(/\n/g, "<br>") + "</p>" +
        (p.extra ? "<p><i>" + esc(p.extra) + "</i></p>" : "") + "</div>";
    });
    $("discuss-out").innerHTML = html;
    saveRecent({ idea: idea, mode: res.mode, verdict: res.verdict, at: new Date().toISOString() });
    renderHome();
    if (mode === "autonomous") {
      var tasks = T.plan(idea);
      $("discuss-out").innerHTML += "<div class='phase'><h4>Task Plan (Autonomous Mode)</h4><pre>" + esc(T.report(tasks, idea)) + "</pre></div>";
      try { localStorage.setItem("sami2_tasks", JSON.stringify(tasks)); } catch (e) {}
    }
  }

  function runModule() {
    var id = $("module").value;
    var input = $("module-input").value;
    $("module-out").textContent = Mod.runModule(id, input);
  }
  function runJS() {
    var code = $("js-code").value, logs = [];
    var fakeConsole = { log: function () { logs.push([].slice.call(arguments).join(" ")); } };
    try {
      var fn = new Function("console", code);
      var ret = fn(fakeConsole);
      $("js-out").textContent = "Output:\n" + logs.join("\n") + (ret !== undefined ? "\nReturned: " + String(ret) : "") + "\n\nNote: this runs only the code you pasted, on this page, in a function scope. No file or network access.";
    } catch (err) {
      $("js-out").textContent = "Error: " + err.message + "\n(Your code did not run. Fix the error and try again.)";
    }
  }
  function drawDesign() {
    var c = $("design-canvas"), ctx = c.getContext("2d");
    var text = $("design-text").value || "Sami App";
    ctx.fillStyle = "#0f172a"; ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#f59e0b"; ctx.beginPath(); ctx.arc(540, 540, 260, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 96px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(text, 540, 560, 900);
    ctx.font = "48px sans-serif"; ctx.fillStyle = "#0f172a";
    ctx.fillText("Concept Sample", 540, 980);
  }
  function downloadDesign() {
    var a = document.createElement("a");
    a.download = "sami-design.png";
    a.href = $("design-canvas").toDataURL("image/png");
    a.click();
  }

  function renderMemory() {
    var scope = $("mem-scope").value, q = $("mem-search").value;
    var list = M.search(scope, q);
    $("mem-list").innerHTML = list.length
      ? list.map(function (it) {
          return "<li><b>[" + esc(it.kind) + "]</b> " + esc(it.text) +
            " <button data-del='" + it.id + "'>Delete</button></li>";
        }).join("")
      : "<li>No memory in this scope yet.</li>";
    $("mem-list").querySelectorAll("[data-del]").forEach(function (b) {
      b.onclick = function () { M.remove(scope, b.getAttribute("data-del")); renderMemory(); };
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-view]").forEach(function (b) {
      b.onclick = function () { show(b.getAttribute("data-view")); if (b.getAttribute("data-view") === "home") renderHome(); };
    });
    var runBtn = $("discuss-go");
    if (runBtn) runBtn.onclick = runDiscussion;
    var modBtn = $("module-go");
    if (modBtn) modBtn.onclick = runModule;
    var jsBtn = $("js-go");
    if (jsBtn) jsBtn.onclick = runJS;
    var dBtn = $("design-go");
    if (dBtn) dBtn.onclick = drawDesign;
    var dlBtn = $("design-download");
    if (dlBtn) dlBtn.onclick = downloadDesign;
    var memAdd = $("mem-add");
    if (memAdd) memAdd.onclick = function () {
      M.add($("mem-scope").value, $("mem-text").value, $("mem-kind").value);
      $("mem-text").value = "";
      renderMemory(); renderHome();
    };
    var memSearch = $("mem-search");
    if (memSearch) memSearch.oninput = renderMemory;
    var memScope = $("mem-scope");
    if (memScope) memScope.onchange = renderMemory;
    var memClear = $("mem-clear");
    if (memClear) memClear.onclick = function () {
      if (confirm("Delete ALL memory in this scope? This cannot be undone.")) { M.clearAll($("mem-scope").value); renderMemory(); }
    };
    var memExport = $("mem-export");
    if (memExport) memExport.onclick = function () {
      var a = document.createElement("a");
      a.download = "sami-sara-memory.json";
      a.href = "data:application/json," + encodeURIComponent(M.exportAll());
      a.click();
    };
    var wipe = $("wipe-all");
    if (wipe) wipe.onclick = function () {
      if (confirm("Delete ALL local Sami & Sara data on this device (memory, recent, tasks)?")) {
        ["sami2_memory_personal", "sami2_memory_project", "sami2_recent", "sami2_tasks"].forEach(function (k) { try { localStorage.removeItem(k); } catch (e) {} });
        renderMemory(); renderHome();
        alert("All local data deleted.");
      }
    };
    show("home");
    renderHome();
    renderMemory();
  });
})();
