self.addEventListener('install', (event) => {
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    // Limpiar localStorage
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({ type: 'clearLocalStorage' });
        console.log('Limpiando localStorage...');
        localStorage.clear();
      });
    }),

    // Forzar recarga de páginas abiertas
    self.clients.claim().then(() => {
      self.clients.matchAll({ type: 'window' }).then((clients) => {
        clients.forEach((client) => {
          client.navigate(client.url);
        });
      });
    }),

    // Eliminar cachés antiguas
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    }),

    // Limpiar IndexedDB
    indexedDB.databases().then((databases) => {
      return Promise.all(
        databases.map((database) => {
          const request = indexedDB.deleteDatabase(database.name);
          request.onerror = (event) => {
            console.error('Error al eliminar IndexedDB:', event);
          };
          return request;
        })
      );
    })
  );
});


    