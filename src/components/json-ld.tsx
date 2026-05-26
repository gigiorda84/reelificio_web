import {getLocale, getTranslations} from 'next-intl/server';

export async function JsonLd() {
  const locale = await getLocale();
  const t = await getTranslations('meta');
  const faqT = await getTranslations('faq.items');

  const siteUrl = 'https://www.reelificio.com';
  const faqKeys = ['guarantee', 'cost', 'who', 'why', 'talent', 'ads'] as const;

  // JSON-LD is built entirely from server-side message catalogs and constants.
  // No user input is interpolated, so JSON.stringify output is safe to inject.
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Reelificio',
    legalName: 'Sweet Life Faktory',
    url: siteUrl,
    logo: `${siteUrl}/og.png`,
    description: t('homeDescription'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Corso Dante Alighieri 118',
      postalCode: '10126',
      addressLocality: 'Torino',
      addressCountry: 'IT'
    },
    vatID: 'IT11515270012',
    sameAs: [
      'https://www.instagram.com/fluffy.revolution/',
      'https://www.instagram.com/hackerpassivoaggressivo/',
      'https://www.instagram.com/cipidilloo/'
    ]
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: siteUrl,
    name: 'Reelificio',
    inLanguage: locale === 'it' ? 'it-IT' : 'en-US'
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqKeys.map((k) => ({
      '@type': 'Question',
      name: faqT(`${k}.q`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqT(`${k}.a`)
      }
    }))
  };

  const blocks = [organization, website, faqPage];

  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(block)}}
        />
      ))}
    </>
  );
}
