const CACHE_NAME = 'sms-pro-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/src/main.js',
    '/src/styles/index.css',
    '/src/styles/components.css',
    '/src/styles/landing.css'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});
