// Draft service worker — app shell cache only, no data sync claimed.
self.addEventListener("install", function(e){
  e.waitUntil(caches.open("sami-app-v1").then(function(cache){
    return cache.addAll(["index.html", "css/style.css", "js/app.js"]);
  }));
});
self.addEventListener("fetch", function(e){
  e.respondWith(caches.match(e.request).then(function(r){ return r || fetch(e.request); }));
});
