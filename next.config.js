/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
}

module.exports = nextConfig

const withPWA = require('next-pwa')

module.exports = withPWA({
    pwa: {
        dest: 'public',
        swSrc: 'service-worker.js',
    },
})
