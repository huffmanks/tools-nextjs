import { skipWaiting, clientsClaim } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import { NetworkOnly, NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { registerRoute, setDefaultHandler, setCatchHandler } from 'workbox-routing'
import { matchPrecache, precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'

skipWaiting()
clientsClaim()

const WB_MANIFEST = self.__WB_MANIFEST

WB_MANIFEST.push({
    url: '/fallback',
    revision: '1234567890',
})
precacheAndRoute(WB_MANIFEST)

cleanupOutdatedCaches()
registerRoute(
    '/',
    new StaleWhileRevalidate({
        cacheName: 'start-url',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 1,
                maxAgeSeconds: 31536e3,
                purgeOnQuotaError: !0,
            }),
        ],
    }),
    'GET'
)
registerRoute(
    /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
    new CacheFirst({
        cacheName: 'google-fonts',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 4,
                maxAgeSeconds: 31536e3,
                purgeOnQuotaError: !0,
            }),
        ],
    }),
    'GET'
)
registerRoute(
    /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
    new CacheFirst({
        cacheName: 'static-font-assets',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 4,
                maxAgeSeconds: 31536e3,
                purgeOnQuotaError: !0,
            }),
        ],
    }),
    'GET'
)
registerRoute(
    /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
    new StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 64,
                maxAgeSeconds: 31536e3,
                purgeOnQuotaError: !0,
            }),
        ],
    }),
    'GET'
)
registerRoute(
    /\.(?:js)$/i,
    new StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: 31536e3,
                purgeOnQuotaError: !0,
            }),
        ],
    }),
    'GET'
)
registerRoute(
    /\.(?:css|less)$/i,
    new StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: 31536e3,
                purgeOnQuotaError: !0,
            }),
        ],
    }),
    'GET'
)
registerRoute(
    /\.(?:json|xml|csv)$/i,
    new StaleWhileRevalidate({
        cacheName: 'static-data-assets',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: 31536e3,
                purgeOnQuotaError: !0,
            }),
        ],
    }),
    'GET'
)
registerRoute(
    /.*/i,
    new StaleWhileRevalidate({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
            new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: 31536e3,
                purgeOnQuotaError: !0,
            }),
        ],
    }),
    'GET'
)

setDefaultHandler(new StaleWhileRevalidate())

setCatchHandler(({ event }) => {
    switch (event.request.destination) {
        case 'document':
            return matchPrecache('/fallback')
            // return caches.match('/fallback')
            break
        case 'image':
            return matchPrecache('/logos/stratools-stacked.png')
            // return caches.match('/static/images/fallback.png')
            break
        // case 'font':
        // return matchPrecache(FALLBACK_FONT_URL);
        // return caches.match('/static/fonts/fallback.otf')
        // break
        default:
            return Response.error()
    }
})
