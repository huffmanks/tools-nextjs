import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants.js";

import { spawnSync } from "node:child_process";

/** @type {(phase: string, defaultConfig: import("next").NextConfig) => Promise<import("next").NextConfig>} */
const nextConfigExport = async (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER || process.env.NODE_ENV === "development";
  const isStagingExport = process.env.STAGING === "true" || process.env.NODE_ENV === "staging";
  const calculatedBasePath = isStagingExport ? "/huffmanks/out" : "";

  /** @type {import("next").NextConfig} */
  const nextConfig = {
    output: "export",
    reactStrictMode: true,
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
          "/format/code/index": { page: "/format/code" },
          "/format/file-converter/index": { page: "/format/file-converter" },
          "/format/text/index": { page: "/format/text" },
          "/generate/css-scrollbar/index": { page: "/generate/css-scrollbar" },
          "/generate/email-signature/index": { page: "/generate/email-signature" },
          "/generate/mock-content/index": { page: "/generate/mock-content" },
          "/generate/password/index": { page: "/generate/password" },
          "/generate/qr-code/index": { page: "/generate/qr-code" },
          "/generate/todo/index": { page: "/generate/todo" },
          "/picker/color/index": { page: "/picker/color" },
          "/picker/item/index": { page: "/picker/item" },
          "/picker/number/index": { page: "/picker/number" },
        };
      },
    }),
  };

  if (
    phase === PHASE_DEVELOPMENT_SERVER ||
    phase === PHASE_PRODUCTION_BUILD ||
    process.env.NODE_ENV === "production"
  ) {
    const revision =
      spawnSync("git", ["rev-parse", "HEAD"], { encoding: "utf-8" }).stdout?.trim() ??
      crypto.randomUUID();

    const withSerwist = (await import("@serwist/next")).default({
      additionalPrecacheEntries: [
        { url: "/", revision },
        { url: "/fallback", revision },
      ],
      swSrc: "sw.ts",
      swDest: "public/sw.js",
      disable: isDev,
    });

    return withSerwist(nextConfig);
  }

  return nextConfig;
};

export default nextConfigExport;
