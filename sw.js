/* Sami & Sara 2.0 service worker — cache shell only, no network claims. */
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open("sami-sara-v2").then(function (c) {
    return c.addAll(["./", "./index.html", "./css/style.css", "./js/engine.js", "./js/memory.js", "./js/tasks.js", "./js/modules.js", "./js/app.js"]);
  }));
});
self.addEventListener("fetch", function (e) {
  e.respondWith(caches.match(e.request).then(function (r) { return r || fetch(e.request); }));
});
