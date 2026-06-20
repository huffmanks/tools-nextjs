import { clientsClaim, skipWaiting } from "workbox-core";
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { registerRoute, setDefaultHandler } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

registerRoute(
  ({ request }) => request.mode === "navigate" || request.destination === "document",
  new StaleWhileRevalidate({
    cacheName: "stratools-pages-cache",
  }),
);

setDefaultHandler(new StaleWhileRevalidate());
