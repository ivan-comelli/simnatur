self.addEventListener('install', (event) => {
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    // Limpiar localStorage
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({ type: 'clearLocalStorage' });
      });
    }),
    // Eliminar cachés antiguas
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Escuchar mensajes del cliente para limpiar localStorage
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'clearLocalStorage') {
    console.log('Limpiando localStorage...');
    localStorage.clear();
  }
});