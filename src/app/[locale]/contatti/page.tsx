import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {Reveal} from '@/components/reveal';
import {BriefForm} from '@/components/brief-form';
import {CalEmbed} from '@/components/cal-embed';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'contatti'});
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/contatti`,
      languages: {it: '/it/contatti', en: '/en/contatti'}
    }
  };
}

export default async function ContattiPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contatti');

  return (
    <section className="border-b-2 border-ink">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <Reveal>
          <h1 className="font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.95]">
            <span className="gradient-text">{t('title')}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl font-sans text-lg text-ink/80 md:text-xl">
            {t('subtitle')}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-ink/60">
                {t('calTitle')}
              </p>
              <CalEmbed className="mt-3" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-ink/60">
                {t('formTitle')}
              </p>
              <BriefForm className="mt-3" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
