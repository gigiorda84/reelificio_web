import type {MetadataRoute} from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {userAgent: '*', disallow: ['/fungo.html', '/fluffy-box/']},
      {userAgent: '*', allow: '/'}
    ],
    sitemap: 'https://www.reelificio.com/sitemap.xml',
    host: 'https://www.reelificio.com'
  };
}
