/* SAMI & SARA AI 2.0 — Long-term memory (localStorage only, user-controlled).
   Personal memory and project memory are kept SEPARATE. Everything is
   searchable, editable and deletable by the user. Nothing is sent anywhere.
   In Node (tests) it falls back to an in-memory store. */
(function (root) {
  "use strict";
  var store = null;
  try {
    store = root.localStorage || null;
  } catch (e) { store = null; }
  var mem = {};
  function key(scope) { return "sami2_memory_" + scope; }
  function load(scope) {
    if (store) {
      try { return JSON.parse(store.getItem(key(scope)) || "[]"); } catch (e) { return []; }
    }
    return mem[scope] || [];
  }
  function save(scope, list) {
    if (store) { try { store.setItem(key(scope), JSON.stringify(list)); } catch (e) {} }
    else mem[scope] = list;
  }
  function add(scope, text, kind) {
    if (!text || !text.trim()) return null;
    var list = load(scope);
    var item = { id: Date.now() + "-" + Math.floor(Math.random() * 1e6),
      text: text.trim(), kind: kind || "note", created: new Date().toISOString() };
    list.unshift(item);
    save(scope, list);
    return item;
  }
  function edit(scope, id, text) {
    var list = load(scope).map(function (it) {
      return it.id === id ? { id: it.id, text: text, kind: it.kind, created: it.created } : it;
    });
    save(scope, list);
    return list;
  }
  function remove(scope, id) {
    var list = load(scope).filter(function (it) { return it.id !== id; });
    save(scope, list);
    return list;
  }
  function search(scope, q) {
    var query = (q || "").toLowerCase();
    if (!query) return load(scope);
    return load(scope).filter(function (it) { return it.text.toLowerCase().indexOf(query) !== -1; });
  }
  function clearAll(scope) { save(scope, []); }
  function exportAll() {
    return JSON.stringify({ personal: load("personal"), project: load("project") }, null, 2);
  }
  function importAll(json) {
    var d = JSON.parse(json);
    if (d.personal) save("personal", d.personal);
    if (d.project) save("project", d.project);
    return true;
  }
  var api = { add: add, edit: edit, remove: remove, search: search, load: load,
    clearAll: clearAll, exportAll: exportAll, importAll: importAll };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.SamiSaraMemory = api;
})(typeof window !== "undefined" ? window : globalThis);
