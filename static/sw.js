self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
  self.skipWaiting(); // Opcional: Forzar la activación inmediata del nuevo Service Worker
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activado');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== STATIC_CACHE) {
          console.log('Eliminando caché antigua:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  console.log('Fetch event para:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('Recurso encontrado en la caché:', event.request.url);
        return response;
      } else {
        console.log('Recurso no encontrado en la caché, haciendo fetch:', event.request.url);
        return fetch(event.request, { cache: 'no-store' }).then((networkResponse) => {
          return caches.open('static-v1').then((cache) => {
            cache.put(event.request, networkResponse.clone());
            console.log("Recurso clonado");
            return networkResponse;
          });
        });
      }
    })
  );
});