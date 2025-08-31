const CACHE_NAME = 'mmmarcode-gofor-search';
const urlsToCache = [
  '/',
  '/index.html',
  '/public/style.css',
  '/public/app.js',
  '/public/media/logo.png',
  '/public/media/hand.svg',
  '/public/media/privacy.svg',
  '/public/media/perplexity.svg',
  '/public/media/info.svg',
  '/public/media/money.svg',
  '/public/media/code.svg',
  '/public/media/back.svg',
  '/public/media/logo.png',
  '/public/404.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});