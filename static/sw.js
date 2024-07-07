self.addEventListener('install', (event) => {
    console.log('Service Worker installed');

    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');

    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log(cacheName)
            return caches.delete(cacheName);
          })
        );
      })
    );
    return self.clients.claim();
  });
  