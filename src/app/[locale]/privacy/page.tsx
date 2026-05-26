import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {LegalShell} from '@/components/legal-shell';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'legal.privacy'});
  return {
    title: t('title'),
    robots: {index: true, follow: true},
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: {it: '/it/privacy', en: '/en/privacy'}
    }
  };
}

export default async function PrivacyPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('legal.privacy');

  return (
    <LegalShell title={t('title')} updated={t('updated')}>
      {locale === 'it' ? <PrivacyIT /> : <PrivacyEN />}
    </LegalShell>
  );
}

function PrivacyIT() {
  return (
    <>
      <p>
        Questa informativa descrive come <strong>Sweet Life Faktory</strong> (di
        seguito, &laquo;Reelificio&raquo;) tratta i dati personali raccolti
        tramite il sito{' '}
        <a href="https://www.reelificio.com">www.reelificio.com</a> ai sensi
        degli artt. 13 e 14 del Regolamento (UE) 2016/679 (&laquo;GDPR&raquo;).
      </p>

      <h2>1. Titolare del trattamento</h2>
      <p>
        Sweet Life Faktory, con sede in Corso Dante Alighieri 118, 10126 Torino
        (Italia), P.IVA e CF 11515270012. Contatto:{' '}
        <a href="mailto:hello@reelificio.com">hello@reelificio.com</a>.
      </p>

      <h2>2. Dati raccolti e finalit&agrave;</h2>
      <ul>
        <li>
          <strong>Dati di navigazione</strong> (indirizzo IP, user agent, pagine
          visitate) raccolti in forma aggregata e anonimizzata tramite Vercel
          Analytics e Plausible Analytics, per finalit&agrave; statistiche.
          Nessun cookie di profilazione.
        </li>
        <li>
          <strong>Dati di contatto</strong> (nome, azienda, handle Instagram,
          messaggio) volontariamente conferiti tramite il modulo di richiesta
          brief, per rispondere alla tua richiesta.
        </li>
        <li>
          <strong>Dati di booking</strong> (nome, email, eventuali risposte al
          questionario) conferiti tramite il widget Cal.com per fissare una call
          conoscitiva.
        </li>
      </ul>

      <h2>3. Base giuridica</h2>
      <p>
        Esecuzione di misure precontrattuali (art. 6.1.b GDPR) per il modulo
        brief e il booking; legittimo interesse (art. 6.1.f) per le statistiche
        di navigazione aggregate.
      </p>

      <h2>4. Destinatari</h2>
      <p>
        I dati sono trattati internamente dal personale autorizzato. Sono
        condivisi con i seguenti responsabili esterni (data processors):
      </p>
      <ul>
        <li>Vercel Inc. — hosting (server in UE);</li>
        <li>Resend, Inc. — invio email transazionali;</li>
        <li>Cal.com, Inc. — gestione prenotazione call;</li>
        <li>Microsoft Ireland Operations Ltd. — posta elettronica (Microsoft 365).</li>
      </ul>

      <h2>5. Trasferimenti extra-UE</h2>
      <p>
        Eventuali trasferimenti verso paesi extra-UE avvengono sulla base delle
        Clausole Contrattuali Standard approvate dalla Commissione Europea o di
        decisioni di adeguatezza.
      </p>

      <h2>6. Conservazione</h2>
      <p>
        I dati di contatto sono conservati per il tempo necessario a gestire la
        tua richiesta e, salvo successivo rapporto contrattuale, per un massimo
        di 24 mesi. I dati di navigazione sono conservati in forma aggregata
        per 12 mesi.
      </p>

      <h2>7. Diritti dell&apos;interessato</h2>
      <p>
        Hai diritto di accesso, rettifica, cancellazione, limitazione e
        portabilit&agrave; (artt. 15-22 GDPR), nonch&eacute; di opposizione e
        di proporre reclamo all&apos;Autorit&agrave; Garante per la protezione
        dei dati personali (www.garanteprivacy.it). Per esercitare i tuoi
        diritti scrivi a{' '}
        <a href="mailto:hello@reelificio.com">hello@reelificio.com</a>.
      </p>
    </>
  );
}

function PrivacyEN() {
  return (
    <>
      <p>
        This notice describes how <strong>Sweet Life Faktory</strong>{' '}
        (hereinafter &laquo;Reelificio&raquo;) processes personal data collected
        through the website{' '}
        <a href="https://www.reelificio.com">www.reelificio.com</a> pursuant to
        Articles 13 and 14 of Regulation (EU) 2016/679 (&laquo;GDPR&raquo;).
      </p>

      <h2>1. Data controller</h2>
      <p>
        Sweet Life Faktory, registered office at Corso Dante Alighieri 118,
        10126 Torino, Italy, VAT 11515270012. Contact:{' '}
        <a href="mailto:hello@reelificio.com">hello@reelificio.com</a>.
      </p>

      <h2>2. Data collected and purposes</h2>
      <ul>
        <li>
          <strong>Navigation data</strong> (IP address, user agent, pages
          visited) collected in aggregated and anonymized form via Vercel
          Analytics and Plausible Analytics, for statistical purposes. No
          profiling cookies.
        </li>
        <li>
          <strong>Contact data</strong> (name, company, Instagram handle,
          message) voluntarily provided via the brief request form, to respond
          to your inquiry.
        </li>
        <li>
          <strong>Booking data</strong> (name, email, questionnaire answers)
          provided via the Cal.com widget to schedule an introductory call.
        </li>
      </ul>

      <h2>3. Legal basis</h2>
      <p>
        Pre-contractual measures (Art. 6.1.b GDPR) for the brief form and
        booking; legitimate interest (Art. 6.1.f) for aggregated navigation
        statistics.
      </p>

      <h2>4. Recipients</h2>
      <p>
        Data is processed internally by authorized staff. It is shared with the
        following external processors:
      </p>
      <ul>
        <li>Vercel Inc. — hosting (EU servers);</li>
        <li>Resend, Inc. — transactional email;</li>
        <li>Cal.com, Inc. — call scheduling;</li>
        <li>Microsoft Ireland Operations Ltd. — email (Microsoft 365).</li>
      </ul>

      <h2>5. Transfers outside the EU</h2>
      <p>
        Any transfers outside the EU rely on the Standard Contractual Clauses
        approved by the European Commission or on adequacy decisions.
      </p>

      <h2>6. Retention</h2>
      <p>
        Contact data is kept for the time needed to handle your request and,
        absent a subsequent contractual relationship, for a maximum of 24
        months. Navigation data is kept in aggregated form for 12 months.
      </p>

      <h2>7. Your rights</h2>
      <p>
        You have rights of access, rectification, erasure, restriction and
        portability (Arts. 15-22 GDPR), as well as the right to object and to
        lodge a complaint with the Italian Data Protection Authority
        (www.garanteprivacy.it). To exercise your rights, write to{' '}
        <a href="mailto:hello@reelificio.com">hello@reelificio.com</a>.
      </p>
    </>
  );
}
