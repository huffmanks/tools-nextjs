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
            images: {
                unoptimized: true,
            },
        })
    }
}
