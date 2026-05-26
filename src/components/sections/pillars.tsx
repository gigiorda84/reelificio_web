import {getTranslations} from 'next-intl/server';
import {Reveal} from '@/components/reveal';

const items = ['characters', 'voice', 'cadence', 'data'] as const;

export async function Pillars() {
  const t = await getTranslations('pillars');

  return (
    <section className="border-b-2 border-ink">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <Reveal>
          <h2 className="max-w-2xl font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-tight">
            {t('title')}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((key, i) => (
            <Reveal key={key} delay={i * 0.06}>
              <div className="brutal-box-sm flex h-full flex-col p-6">
                <span className="font-mono text-xs uppercase tracking-widest text-ink/50">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-xl leading-tight md:text-2xl">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-3 font-sans text-sm text-ink/80">
                  {t(`items.${key}.body`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
