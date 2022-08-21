/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

module.exports = (phase, { defaultConfig }) => {
    if (phase === 'phase-development-server') {
        return {
            reactStrictMode: true,
            swcMinify: true,
        }
    } else {
        return withPWA({
            pwa: {
                dest: 'public',
                swSrc: 'service-worker.js',
            },
            reactStrictMode: true,
            swcMinify: true,
            basePath: phase === 'phase-export' && process.env.STAGING === 'true' ? '/huffmanks/out' : '',
            // experimental: {
            //     images: {
            //         unoptimized: true,
            //     },
            // },
            ...(phase === 'phase-export' &&
                process.env.STAGING === 'true' && {
                    exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
                        return {
                            '/': { page: '/' },
                            '/calculate/aspect-ratio/index': { page: '/calculate/aspect-ratio' },
                            '/calculate/units/index': { page: '/calculate/units' },
                            '/format/text/index': { page: '/format/text' },
                            '/generate/email-signature/index': { page: '/generate/email-signature' },
                            '/generate/password/index': { page: '/generate/password' },
                            '/generate/qr-code/index': { page: '/generate/qr-code' },
                            '/generate/todo/index': { page: '/generate/todo' },
                            '/picker/color/index': { page: '/picker/color' },
                            '/picker/item/index': { page: '/picker/item' },
                            '/picker/number/index': { page: '/picker/number' },
                        }
                    },
                }),
        })
    }
}
