self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
    // Просто пропускает запросы через себя
    event.respondWith(fetch(event.request));
});