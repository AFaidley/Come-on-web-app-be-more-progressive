const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
// Added StaleWhileRevalidate strategy to check the cache for a response and return if found.
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      // Max age 30 days
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching --DONE
// Define callback func to filter reqs to cache (javascript and css here)
registerRoute(  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
new StaleWhileRevalidate({
  // Naming cache storage
    cacheName: 'asset-cache',
    plugins: [
      // Max age 30 days
        new CacheableResponsePlugin({
        statuses: [0, 200],
        }),
    ],
})
);;
