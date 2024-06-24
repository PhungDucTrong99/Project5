// self.addEventListener("install", (event) => {
//   console.log("Service Worker installing.");
// });

// self.addEventListener("activate", (event) => {
//   console.log("Service Worker activating.");
// });

// self.addEventListener("fetch", (event) => {
//   console.log("Fetching:", event.request.url);
//   event.respondWith(fetch(event.request));
// });

const CACHE_NAME = "my-cache-v1";
const urlsToCache = ["/", "../styles/styles.scss", "../index.js"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
