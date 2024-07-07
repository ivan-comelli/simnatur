if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Nueva versión disponible
              alert('Nueva versión disponible. Recarga la página para obtener la última versión.');
              window.location.reload();
            }
          }
        };
      };
    }).catch((error) => {
      console.error('Error registering service worker:', error);
    });
  }
  