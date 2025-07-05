/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://macrobius.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: [
    '/api/*',
    '/admin/*',
    '/_next/*',
    '/static/*',
    '/404',
    '/500',
    '/server-sitemap.xml'
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://macrobius.vercel.app/server-sitemap.xml'
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/static/']
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 1
      }
    ]
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for specific pages
    const priorities = {
      '/': 1.0,
      '/dashboard': 0.9,
      '/ki-rag-assistent': 0.9,
      '/intro': 0.8,
      '/weltkarte': 0.7,
      '/kosmos': 0.7,
      '/gastmahl': 0.7,
      '/textsuche': 0.8,
      '/lernen': 0.8,
      '/visualisierungen': 0.6,
      '/ki-kulturanalyse': 0.7,
      '/lernpfade': 0.7,
      '/ki-tutor': 0.7,
      '/kulturmodule': 0.6
    };

    const changefreqs = {
      '/': 'daily',
      '/dashboard': 'daily',
      '/ki-rag-assistent': 'daily',
      '/intro': 'weekly',
      '/weltkarte': 'weekly',
      '/kosmos': 'weekly',
      '/gastmahl': 'weekly',
      '/textsuche': 'daily',
      '/lernen': 'daily',
      '/visualisierungen': 'weekly',
      '/ki-kulturanalyse': 'weekly',
      '/lernpfade': 'weekly',
      '/ki-tutor': 'weekly',
      '/kulturmodule': 'weekly'
    };

    return {
      loc: path,
      changefreq: changefreqs[path] || 'weekly',
      priority: priorities[path] || 0.5,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        {
          href: `https://macrobius.vercel.app${path}`,
          hreflang: 'de'
        },
        {
          href: `https://macrobius.vercel.app${path}?lang=en`,
          hreflang: 'en'
        },
        {
          href: `https://macrobius.vercel.app${path}?lang=la`,
          hreflang: 'la'
        }
      ]
    };
  },
  additionalPaths: async (config) => {
    const result = [];
    
    // Add dynamic routes if any
    // For example, if you have dynamic learning paths
    const learningPaths = ['beginner', 'intermediate', 'advanced'];
    
    learningPaths.forEach(path => {
      result.push({
        loc: `/lernpfade/${path}`,
        changefreq: 'weekly',
        priority: 0.6,
        lastmod: new Date().toISOString()
      });
    });
    
    return result;
  }
};