import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {LegalShell} from '@/components/legal-shell';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'legal.notes'});
  return {
    title: t('title'),
    alternates: {
      canonical: `/${locale}/note-legali`,
      languages: {it: '/it/note-legali', en: '/en/note-legali'}
    }
  };
}

export default async function NoteLegaliPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('legal.notes');

  return (
    <LegalShell title={t('title')} updated={t('updated')}>
      {locale === 'it' ? <NotesIT /> : <NotesEN />}
    </LegalShell>
  );
}

function NotesIT() {
  return (
    <>
      <p>
        Informazioni rese ai sensi del D.Lgs. 9 aprile 2003 n. 70 (Commercio
        elettronico) e dell&apos;art. 2250 c.c.
      </p>

      <h2>Titolare del sito</h2>
      <p>
        <strong>Sweet Life Faktory</strong>
        <br />
        Corso Dante Alighieri 118, 10126 Torino (TO), Italia
        <br />
        P.IVA / Codice Fiscale: 11515270012
        <br />
        Codice Univoco SDI: W7YVJK9
        <br />
        Email: <a href="mailto:hello@reelificio.com">hello@reelificio.com</a>
      </p>

      <h2>Marchio e contenuti</h2>
      <p>
        Il marchio &laquo;Reelificio&raquo;, i nomi delle community
        (&laquo;Fluffy Revolution&raquo;, &laquo;Hacker Passivo
        Aggressivo&raquo;, &laquo;Cipidilloo&raquo;) e tutti i contenuti
        editoriali, grafici, audiovisivi e di codice presenti su questo sito
        sono di propriet&agrave; di Sweet Life Faktory o concessi in licenza, e
        sono protetti dalle vigenti normative su marchi, copyright e
        propriet&agrave; intellettuale. Ogni riproduzione, modifica o utilizzo
        non autorizzato &egrave; vietato.
      </p>

      <h2>Responsabilit&agrave;</h2>
      <p>
        Le informazioni pubblicate sul sito sono fornite in buona fede e a
        scopo informativo. Sweet Life Faktory non rilascia alcuna garanzia
        sull&apos;accuratezza o completezza dei contenuti e si riserva il
        diritto di modificarli in qualsiasi momento senza preavviso.
      </p>

      <h2>Foro competente</h2>
      <p>Per ogni controversia &egrave; competente in via esclusiva il Foro di Torino.</p>
    </>
  );
}

function NotesEN() {
  return (
    <>
      <p>
        Information provided pursuant to Italian Legislative Decree no. 70 of
        9 April 2003 (E-commerce) and Art. 2250 of the Italian Civil Code.
      </p>

      <h2>Site owner</h2>
      <p>
        <strong>Sweet Life Faktory</strong>
        <br />
        Corso Dante Alighieri 118, 10126 Torino (TO), Italy
        <br />
        VAT / Tax Code: 11515270012
        <br />
        SDI code: W7YVJK9
        <br />
        Email: <a href="mailto:hello@reelificio.com">hello@reelificio.com</a>
      </p>

      <h2>Trademark and content</h2>
      <p>
        The &laquo;Reelificio&raquo; trademark, the community names (&laquo;Fluffy
        Revolution&raquo;, &laquo;Hacker Passivo Aggressivo&raquo;,
        &laquo;Cipidilloo&raquo;) and all editorial, graphic, audiovisual and
        source-code content on this site are owned by or licensed to Sweet Life
        Faktory and protected by trademark, copyright and intellectual property
        laws. Any unauthorized reproduction, modification or use is prohibited.
      </p>

      <h2>Liability</h2>
      <p>
        Information on the site is provided in good faith and for informational
        purposes only. Sweet Life Faktory makes no guarantees as to the
        accuracy or completeness of content and reserves the right to modify it
        at any time without notice.
      </p>

      <h2>Jurisdiction</h2>
      <p>The Court of Turin has exclusive jurisdiction over any dispute.</p>
    </>
  );
}
