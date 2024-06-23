const CACHE_NAME = "travel-app-cache-v1";
const urlsToCache = [
  "/",
  "/views/index.html",
  "/styles/styles.scss",
  "/js/app.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlsToCache);
      })
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
