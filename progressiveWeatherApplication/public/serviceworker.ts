const CACHE_NAME = 'weather-app-cache-v1';
const urlsToCache = [
  'index.html',
  'offline.html',
];

// Install a service worker
self.addEventListener('install', (event: ExtendableEvent) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
})

// Listen for requests
self.addEventListener('fetch', (event: FetchEvent) => {
    event.respondWith(
        caches.match(event.request)
        .then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request)
                .catch(() => {
                    return caches.match('offline.html')
                        .then(offlineResponse => {
                            if (offlineResponse) {
                                return offlineResponse;
                            }
                            throw new Error('Offline page not found in cache');
                        });
                });
        })
    );
});

// Activate the service worker
self.addEventListener('activate', (event: ExtendableEvent) => {
    const cacheWhiteList: string[] = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if (!cacheWhiteList.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    );
});
