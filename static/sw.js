self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
  self.skipWaiting(); // Opcional: Forzar la activación inmediata del nuevo Service Worker
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activado');
  event.waitUntil(clients.claim()); // Opcional: Tomar control inmediato de la página
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
        return fetch(event.request).then((networkResponse) => {
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