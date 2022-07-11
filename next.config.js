/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

module.exports = (phase, { defaultConfig }) => {
    const devServerPhase = phase === 'phase-development-server' ?? false
    const exportPhase = phase === 'phase-export' ?? false
    const STAGING = process.env.STAGING
    if (devServerPhase) {
        return {
            reactStrictMode: true,
            swcMinify: true,
        }
    } else {
        console.log('phase__', exportPhase)
        console.log('env__', STAGING)
        async function customPaths(defaultPathMap, {}) {
            return {
                '/': { page: '/' },
                '/aspect-ratio/index': { page: '/aspect-ratio' },
                '/color-picker/index': { page: '/color-picker' },
                '/email-signature/index': { page: '/email-signature' },
                '/password-generator/index': { page: '/password-generator' },
                '/text-formatter/index': { page: '/text-formatter' },
                '/unit-converter/index': { page: '/unit-converter' },
            }
        }
        return withPWA({
            pwa: {
                dest: 'public',
                swSrc: 'service-worker.js',
            },
            reactStrictMode: true,
            swcMinify: true,
            assetPrefix: exportPhase && STAGING ? '.' : '',
            experimental: {
                images: {
                    unoptimized: true,
                },
            },
            exportPathMap: exportPhase && STAGING ? customPaths() : null,
        })
    }
}
