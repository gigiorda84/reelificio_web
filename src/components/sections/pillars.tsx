import {getTranslations} from 'next-intl/server';
import {Reveal} from '@/components/reveal';

const items = ['characters', 'voice', 'cadence', 'data'] as const;

export async function Pillars() {
  const t = await getTranslations('pillars');

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <Reveal>
          <h2 className="max-w-2xl font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-tight uppercase">
            {t('title')}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((key, i) => (
            <Reveal key={key} delay={i * 0.07} direction="scale">
              <div className="flex h-full flex-col border border-white/10 bg-white/[0.03] p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-lime/30">
                <span className="font-mono text-xs uppercase tracking-widest text-lime">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-xl leading-tight md:text-2xl uppercase">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-3 font-sans text-sm text-ink/70">
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
