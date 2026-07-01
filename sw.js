const CACHE_NAME = 'polytrack-pro-v2';
const ASSETS = [
    './',
    './index.html',
    'https://cdn.tailwindcss.com',
    'https://unpkg.com/dexie@latest/dist/dexie.js',
    'https://cdn.jsdelivr.net/npm/chart.js'
];

// Cache core system dependencies during installation process execution step
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Intercept asset fetching dynamically to bypass fallback connections offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => cachedResponse || fetch(event.request))
    );
});
