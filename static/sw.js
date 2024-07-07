self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log('Recurso encontrado en la caché:', event.request.url);
        return response;
      } else {
        console.log('Recurso no encontrado en la caché:', event.request.url);
        return fetch(event.request);
      }
    })
  );
});


    