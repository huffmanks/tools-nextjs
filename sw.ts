/// <reference lib="esnext" />
/// <reference lib="webworker" />
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { CacheFirst, Serwist, StaleWhileRevalidate } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  precacheOptions: {
    navigateFallback: "/",
  },
  runtimeCaching: [
    {
      matcher: ({ request, url }) =>
        url.pathname.includes("/previews/") || url.pathname.includes("/readme/")
          ? false
          : request.destination === "style" ||
            request.destination === "script" ||
            request.destination === "worker",
      handler: new StaleWhileRevalidate({
        cacheName: "stratools-static-assets",
      }),
    },
    {
      matcher: ({ request, url }) =>
        url.pathname.includes("/previews/") || url.pathname.includes("/readme/")
          ? false
          : request.destination === "image",
      handler: new CacheFirst({
        cacheName: "stratools-image-cache",
      }),
    },
  ],
});

serwist.addEventListeners();
