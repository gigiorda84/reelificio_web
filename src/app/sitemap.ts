import type {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';

const SITE = 'https://www.reelificio.com';

const paths = [
  '',
  '/partnership',
  '/produzione',
  '/contatti',
  '/privacy',
  '/cookie-policy',
  '/note-legali'
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${SITE}/${locale}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE}/${l}${path}`])
        )
      }
    }))
  );
}
