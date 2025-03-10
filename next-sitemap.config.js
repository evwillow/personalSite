const siteMetadata = require("./src/utils/siteMetaData");

module.exports = {
  siteUrl: siteMetadata.siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/*", "/_next/*", "/static/*"] },
    ],
    additionalSitemaps: [
      `${siteMetadata.siteUrl}/sitemap.xml`,
      `${siteMetadata.siteUrl}/server-sitemap.xml`,
    ],
  },
  exclude: [
    "/server-sitemap.xml",
    "/api/*",
    "/_next/*",
    "/static/*",
    "/404",
    "/500",
  ],
  outDir: "./public",
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 7000,
  generateIndexSitemap: true,
  autoLastmod: true,
  transform: async (config, path) => {
    // Custom transformation for blog posts
    if (path.startsWith("/blog/")) {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      }
    }
    // Homepage
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}