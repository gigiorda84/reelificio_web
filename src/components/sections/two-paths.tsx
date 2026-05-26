import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Reveal} from '@/components/reveal';

export async function TwoPaths() {
  const t = await getTranslations('twoPaths');

  const paths = [
    {
      href: '/partnership',
      label: t('partnership.label'),
      title: t('partnership.title'),
      body: t('partnership.body'),
      cta: t('partnership.cta'),
      accent: 'var(--accent-1)'
    },
    {
      href: '/produzione',
      label: t('produzione.label'),
      title: t('produzione.title'),
      body: t('produzione.body'),
      cta: t('produzione.cta'),
      accent: 'var(--accent-3)'
    }
  ] as const;

  return (
    <section className="border-b-2 border-ink">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <Reveal>
          <h2 className="max-w-3xl font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-tight">
            {t('title')}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl font-sans text-base text-ink/80 md:text-lg">
            {t('subtitle')}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {paths.map((p, i) => (
            <Reveal key={p.href} delay={0.15 + i * 0.1}>
              <Link
                href={p.href}
                className="brutal-box group flex h-full flex-col p-8 transition-transform hover:-translate-x-1 hover:-translate-y-1 md:p-10"
                style={{
                  boxShadow: `8px 8px 0 0 ${p.accent}`
                }}
              >
                <span className="font-mono text-xs uppercase tracking-widest text-ink/60">
                  {p.label}
                </span>
                <h3 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-4 font-sans text-base text-ink/80">{p.body}</p>
                <span className="mt-8 inline-flex items-center gap-2 font-mono text-sm uppercase">
                  {p.cta} <span aria-hidden>→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
