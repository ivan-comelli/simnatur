function generateCacheVersion() {
  const filesToHash = [
    '/js/main.js',
    '/css/style.css',
    // Agrega otros recursos clave aquí
  ];

  const hash = filesToHash.reduce((acc, file) => {
    return acc + file;
  }, '');

  return 'my-cache-' + hash;
}

const CACHE_NAME = generateCacheVersion();

navigator.serviceWorker.addEventListener('controllerchange', () => {
  console.log('Se ha activado una nueva versión del service worker');
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'clearLocalStorage' });
  }
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/css/style.css',
        '/js/main.js'
        // Agregar otros recursos estáticos aquí
      ]);
    })
  );
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
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
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