/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";
const isStagingExport = process.env.STAGING === "true";
const calculatedBasePath = isStagingExport ? "/huffmanks/out" : "";

const withPWA = require("next-pwa")({
  dest: "public",
  swSrc: "service-worker.js",
  disable: false,
  mode: isDev ? "development" : "production",
});

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  basePath: calculatedBasePath,
  images: {
    unoptimized: true,
  },
  ...(isStagingExport && {
    exportPathMap: async function () {
      return {
        "/": { page: "/" },
        "/fallback": { page: "/fallback" },
        "/calculate/aspect-ratio/index": { page: "/calculate/aspect-ratio" },
        "/calculate/units/index": { page: "/calculate/units" },
        "/format/text/index": { page: "/format/text" },
        "/generate/css-scrollbar/index": { page: "/generate/css-scrollbar" },
        "/generate/email-signature/index": { page: "/generate/email-signature" },
        "/generate/password/index": { page: "/generate/password" },
        "/generate/qr-code/index": { page: "/generate/qr-code" },
        "/generate/todo/index": { page: "/generate/todo" },
        "/picker/color/index": { page: "/picker/color" },
        "/picker/item/index": { page: "/picker/item" },
        "/picker/number/index": { page: "/picker/number" },
      };
    },
  }),
});
