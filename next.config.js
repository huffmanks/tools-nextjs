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
            async redirects() {
                return [
                    { source: '/aspect-ratio', destination: ' /calculate/aspect-ratio', permanent: true },
                    { source: '/unit-calculator', destination: ' /calculate/units', permanent: true },
                    { source: '/text-formatter', destination: ' /format/text', permanent: true },
                    { source: '/email-signature', destination: ' /generate/email-signature', permanent: true },
                    { source: '/password-generator', destination: ' /generate/password', permanent: true },
                    { source: '/todo-list', destination: ' /generate/todo', permanent: true },
                    { source: '/color-picker', destination: ' /picker/color', permanent: true },
                    { source: '/random-picker', destination: ' /picker/random', permanent: true },
                ]
            },
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
                            '/generate/todo/index': { page: '/generate/todo' },
                            '/picker/color/index': { page: '/picker/color' },
                            '/picker/random/index': { page: '/picker/random' },
                        }
                    },
                }),
        })
    }
}
