import {getTranslations} from 'next-intl/server';
import {Reveal} from '@/components/reveal';

const items = ['fluffy', 'hacker', 'cipidilloo'] as const;

export async function CaseStudies() {
  const t = await getTranslations('caseStudies');

  return (
    <section className="border-b-2 border-ink bg-paper-shade">
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

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((key, i) => (
            <Reveal key={key} delay={0.1 + i * 0.08}>
              <article className="brutal-box flex h-full flex-col overflow-hidden">
                <div className="aspect-[9/14] w-full overflow-hidden border-b-2 border-ink bg-ink">
                  <video
                    src="/placeholder.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl leading-tight">
                    {t(`items.${key}.name`)}
                  </h3>
                  <span className="mt-1 font-mono text-xs uppercase text-ink/60">
                    {t(`items.${key}.handle`)}
                  </span>
                  <p className="mt-4 font-sans text-sm text-ink/80">
                    {t(`items.${key}.pitch`)}
                  </p>
                  <a
                    href={t(`items.${key}.url`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-tight hover:text-accent-2"
                  >
                    {t('cta')} <span aria-hidden>↗</span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
