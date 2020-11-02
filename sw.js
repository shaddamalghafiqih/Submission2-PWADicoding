/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'LigaBola_v1';
const urlsToCache = [
  'index.html',
  '/pages/home.html',
  '/pages/nav.html',
  '/pages/about.html',
  '/pages/standings.html',
  '/pages/teams.html',
  '/img/goal.svg',
  '/img/Paspoto-square.png',
  '/css/materialize.min.css',
  '/css/style.css',
  '/js/materialize.min.js',
  '/js/nav.js',
  '/js/api.js',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then((response) => {
        if (response) {
          console.log('ServiceWorker: Gunakan aset dari cache: ', response.url);
          return response;
        }
        console.log(
          'ServiceWorker: Memuat aset dari server: ',
          event.request.url,
        );
        return fetch(event.request);
      }),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`Service Worker: cache ${cacheName} dihapus`);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});