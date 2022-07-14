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
                            '/aspect-ratio/index': { page: '/aspect-ratio' },
                            '/color-picker/index': { page: '/color-picker' },
                            '/email-signature/index': { page: '/email-signature' },
                            '/password-generator/index': { page: '/password-generator' },
                            '/text-formatter/index': { page: '/text-formatter' },
                            '/unit-converter/index': { page: '/unit-converter' },
                        }
                    },
                }),
        })
    }
}
