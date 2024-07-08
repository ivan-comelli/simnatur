const STATIC_CACHE = "v1"

self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
  self.skipWaiting();
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
  const requestUrl = new URL(event.request.url);

  // Ignorar solicitudes de esquemas no soportados
  if (requestUrl.protocol !== 'http:' && requestUrl.protocol !== 'https:') {
    console.log('Ignorando esquema no soportado:', requestUrl.protocol);
    return;
  }

  // Estrategia de caché para recursos estáticos
  if (requestUrl.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          console.log("Existe en cache...")
          return response;
        }
        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          if (event.request.url.includes('/api/')) {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          const varyHeader = networkResponse.headers.get('Vary');
          if (varyHeader && varyHeader.includes('*')) {
            // No almacenar en caché una respuesta con Vary: *
            return networkResponse;
          }
          caches.open(STATIC_CACHE).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        });
      })
    );
  }
  else {
    return;
  }
});