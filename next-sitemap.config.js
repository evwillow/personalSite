// siteMetaData.js is an ES module (default export); under require() the value sits on .default.
const siteMetadataModule = require("./src/utils/siteMetaData");
const siteMetadata = siteMetadataModule.default || siteMetadataModule;
const siteUrl = siteMetadata.siteUrl || "https://evwillow.com";

// Live static routes only. Blog posts are served by src/app/server-sitemap.xml/route.js.
const PRIORITY = {
  "/": { priority: 1.0, changefreq: "monthly" },
  "/about": { priority: 0.8, changefreq: "monthly" },
  "/experience": { priority: 0.8, changefreq: "monthly" },
  "/projects": { priority: 0.8, changefreq: "monthly" },
  "/contact": { priority: 0.5, changefreq: "yearly" },
  "/blog": { priority: 0.6, changefreq: "weekly" },
  "/case-studies": { priority: 0.7, changefreq: "monthly" },
  "/posts": { priority: 0.7, changefreq: "monthly" },
  "/verify": { priority: 0.5, changefreq: "monthly" },
};

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  // One plain urlset at /sitemap.xml; the dynamic blog sitemap is listed in robots.txt only.
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/"] },
    ],
    additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
  },
  exclude: [
    "/server-sitemap.xml",
    "/feed.xml",
    "/api/*",
    "/_next/*",
    "/404",
    "/500",
    "/opengraph-image*",
    "/twitter-image*",
    "/*/opengraph-image*",
    "/*/*/opengraph-image*",
  ],
  outDir: "./public",
  autoLastmod: true,
  transform: async (config, path) => {
    const entry = PRIORITY[path];
    if (!entry) return null; // not a known live route: leave it out
    return {
      loc: path,
      changefreq: entry.changefreq,
      priority: entry.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
