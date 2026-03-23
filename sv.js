const CACHE_NAME = 'lcdr-v1';
const ASSETS = [
  '/',
  '/index.html',
  'https://raw.githubusercontent.com/iDLC1990/status-dashboard/main/pexels-iriser-1366957.jpg',
  // Добавьте сюда другие статичные файлы, если они есть
];

// Установка: кэшируем статику
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

// Активация: чистим старые кэши
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        ))
    );
});

// Перехват запросов: сначала кэш, потом сеть
self.addEventListener('fetch', (event) => {
    // Не кэшируем запросы к Google Sheets API, чтобы данные всегда были свежими
    if (event.request.url.includes('googleapis.com')) {
        return; 
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
