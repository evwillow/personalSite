const siteMetadata = require("./src/utils/siteMetaData");

module.exports = {
  siteUrl: siteMetadata.siteUrl || "https://evwillow.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/*", "/_next/*", "/static/*", "/admin/*", "/private/*"] },
    ],
    additionalSitemaps: [
      `${siteMetadata.siteUrl}/sitemap.xml`,
      `${siteMetadata.siteUrl}/server-sitemap.xml`,
    ],
    host: siteMetadata.siteUrl,
  },
  exclude: [
    "/server-sitemap.xml",
    "/api/*",
    "/_next/*",
    "/static/*",
    "/admin/*",
    "/private/*",
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
    // Homepage - Highest priority
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
        images: [{
          loc: `${siteMetadata.siteUrl}/headshot.jpg`,
          title: "Evan Maus - Economics, Data Science & AI",
          caption: "Evan Maus, UC Berkeley student specializing in Economics, Data Science, and AI"
        }]
      }
    }
    
    // Blog posts - High priority for content
    if (path.startsWith("/blog/") || (!path.includes("/") && path !== "")) {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.9,
        lastmod: new Date().toISOString(),
        images: [{
          loc: `${siteMetadata.siteUrl}/headshot.jpg`,
          title: "Blog Post by Evan Maus",
          caption: "Data Science and Technology Blog"
        }]
      }
    }
    
    // Main navigation pages - Very high priority
    if (["/about", "/experience", "/projects"].includes(path)) {
      return {
        loc: path,
        changefreq: "monthly",
        priority: 0.95,
        lastmod: new Date().toISOString(),
        images: [{
          loc: `${siteMetadata.siteUrl}/headshot.jpg`,
          title: `${path.charAt(1).toUpperCase() + path.slice(2)} - Evan Maus`,
          caption: `Evan Maus ${path.charAt(1).toUpperCase() + path.slice(2)} Page`
        }]
      }
    }
    
    // Contact page - High priority for local SEO
    if (path === "/contact") {
      return {
        loc: path,
        changefreq: "monthly",
        priority: 0.85,
        lastmod: new Date().toISOString(),
        images: [{
          loc: `${siteMetadata.siteUrl}/headshot.jpg`,
          title: "Contact Evan Maus",
          caption: "Get in touch with Evan Maus"
        }]
      }
    }
    
    // Blog listing page - High priority
    if (path === "/blog") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 0.9,
        lastmod: new Date().toISOString(),
        images: [{
          loc: `${siteMetadata.siteUrl}/headshot.jpg`,
          title: "Evan Maus Blog",
          caption: "Data Science, Economics, and Technology Blog"
        }]
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