import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {ButtonLink} from '@/components/ui/button';
import {Reveal} from '@/components/reveal';
import {CtaBand} from '@/components/sections/cta-band';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'produzione'});
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/produzione`,
      languages: {it: '/it/produzione', en: '/en/produzione'}
    }
  };
}

export default async function ProduzionePage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('produzione');

  const how = t.raw('sections.how.items') as string[];
  const deliverables = t.raw('sections.deliverables.items') as string[];

  return (
    <>
      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-5xl px-4 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-ink/60">
              produzione
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,5rem)] leading-[0.95]">
              <span className="gradient-text">{t('title')}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl font-sans text-lg text-ink/80 md:text-xl">
              {t('subtitle')}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10">
              <ButtonLink href="/contatti" size="lg">
                {t('cta')}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-paper-shade">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 py-20 md:grid-cols-2 md:gap-16 md:px-8">
          <Reveal>
            <div className="brutal-box p-8">
              <h2 className="font-display text-2xl">
                {t('sections.how.title')}
              </h2>
              <ol className="mt-6 space-y-4">
                {how.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-mono text-xs text-ink/60">
                      0{i + 1}
                    </span>
                    <span className="font-sans text-base">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="brutal-box p-8">
              <h2 className="font-display text-2xl">
                {t('sections.deliverables.title')}
              </h2>
              <ul className="mt-6 space-y-4">
                {deliverables.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-mono text-accent-3">▸</span>
                    <span className="font-sans text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
