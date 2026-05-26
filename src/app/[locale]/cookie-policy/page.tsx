import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {LegalShell} from '@/components/legal-shell';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'legal.cookies'});
  return {
    title: t('title'),
    alternates: {
      canonical: `/${locale}/cookie-policy`,
      languages: {it: '/it/cookie-policy', en: '/en/cookie-policy'}
    }
  };
}

export default async function CookiePolicyPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('legal.cookies');

  return (
    <LegalShell title={t('title')} updated={t('updated')}>
      {locale === 'it' ? <CookiesIT /> : <CookiesEN />}
    </LegalShell>
  );
}

function CookiesIT() {
  return (
    <>
      <p>
        Il sito <a href="https://www.reelificio.com">www.reelificio.com</a>{' '}
        utilizza un numero minimo di cookie e tecnologie analoghe, secondo le
        Linee Guida del Garante per la protezione dei dati personali del 10
        giugno 2021.
      </p>

      <h2>1. Cookie tecnici (sempre attivi)</h2>
      <p>
        Cookie strettamente necessari al funzionamento del sito, esenti dal
        consenso ai sensi dell&apos;art. 122 del Codice Privacy. Includono
        cookie per la gestione della lingua preferita e per il routing
        Next.js.
      </p>

      <h2>2. Statistiche aggregate (esenti da consenso)</h2>
      <p>
        Utilizziamo <strong>Vercel Analytics</strong> e{' '}
        <strong>Plausible Analytics</strong>, entrambi configurati in modalit&agrave;
        cookieless e con anonimizzazione dell&apos;indirizzo IP. Non viene
        rilasciato alcun cookie di profilazione e non sono tracciati identificatori
        persistenti.
      </p>

      <h2>3. Servizi di terze parti</h2>
      <p>
        Quando interagisci con il widget di prenotazione{' '}
        <strong>Cal.com</strong> nella pagina Contatti, Cal.com pu&ograve;
        rilasciare cookie tecnici e funzionali necessari al completamento della
        prenotazione. Trovi l&apos;informativa completa su{' '}
        <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer">
          cal.com/privacy
        </a>
        .
      </p>

      <h2>4. Gestione delle preferenze</h2>
      <p>
        Puoi gestire o disabilitare i cookie tramite le impostazioni del tuo
        browser. La disattivazione dei cookie tecnici pu&ograve; compromettere
        il corretto funzionamento del sito.
      </p>
    </>
  );
}

function CookiesEN() {
  return (
    <>
      <p>
        The website <a href="https://www.reelificio.com">www.reelificio.com</a>{' '}
        uses a minimal number of cookies and similar technologies, in accordance
        with the Italian Data Protection Authority Guidelines of 10 June 2021.
      </p>

      <h2>1. Strictly necessary cookies (always on)</h2>
      <p>
        Cookies strictly required for the site to function, exempt from consent
        under Art. 122 of the Italian Privacy Code. They include cookies for
        preferred language and Next.js routing.
      </p>

      <h2>2. Aggregated analytics (consent-exempt)</h2>
      <p>
        We use <strong>Vercel Analytics</strong> and{' '}
        <strong>Plausible Analytics</strong>, both configured in cookieless mode
        with IP anonymization. No profiling cookies are set and no persistent
        identifiers are tracked.
      </p>

      <h2>3. Third-party services</h2>
      <p>
        When you interact with the <strong>Cal.com</strong> booking widget on
        the Contact page, Cal.com may set technical and functional cookies
        required to complete the booking. Their full notice is at{' '}
        <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer">
          cal.com/privacy
        </a>
        .
      </p>

      <h2>4. Managing preferences</h2>
      <p>
        You can manage or disable cookies via your browser settings. Disabling
        strictly necessary cookies may break the site.
      </p>
    </>
  );
}
