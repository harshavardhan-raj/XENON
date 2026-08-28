export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('PALASH Companion Service Worker registered:', reg.scope);
        })
        .catch((err) => {
          console.warn('Service Worker registration error:', err);
        });
    });
  }
}
