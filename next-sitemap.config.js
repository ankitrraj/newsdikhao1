/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.newsdikhao.co.in',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: [
    '/admin/*',
    '/404',
    '/500'
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.newsdikhao.co.in/server-sitemap.xml', // Optional: for server-side generated dynamic routes
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}; 