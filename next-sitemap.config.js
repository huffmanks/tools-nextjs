/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || 'https://tools.huffmanks.com',
    generateRobotsTxt: true,
    exclude: ['/api/*'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                disallow: '/api/',
            },
        ],
    },
}

module.exports = config
