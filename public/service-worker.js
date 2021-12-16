var CACHE_BUDGET = "budget-cache-v1";
var DATA_CACHE = "data-cache1";

var FILES_TO_CACHE = [
  "/index.html",
  "/index.js",
  "/manifest.json",
  "/service-worker.js",
  "/styles.css",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

// install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_BUDGET).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

// fetch
self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      caches
        .open(DATA_CACHE)
        .then((cache) => {
          return fetch(event.request)
            .then((response) => {
              if ((response.status = 200)) {
                cache.put(event.request.url, response.clone());
              }
              return response;
            })
            .catch((error) => {
              return cache.match(event.request);
            });
        })
        .catch((error) => {
          console.log(error);
        })
    );
    return;
  }
  event.respondWith(
    fetch(event.request).cache(() => {
      return caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        if (event.request.headers.get("accept").includes("text/html")) {
          return caches.match("/");
        }
      });
    })
  );
});
