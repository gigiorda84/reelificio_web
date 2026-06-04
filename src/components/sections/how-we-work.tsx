import {getTranslations} from 'next-intl/server';
import {Reveal} from '@/components/reveal';

const stepKeys = [
  'trend',
  'script',
  'voice',
  'production',
  'distribution',
  'iterate'
] as const;

const icons: Record<(typeof stepKeys)[number], string> = {
  trend: '⚡',
  script: '✎',
  voice: '◉',
  production: '▶',
  distribution: '↗',
  iterate: '↻'
};

export async function HowWeWork() {
  const t = await getTranslations('howWeWork');

  return (
    <section
      id="how-we-work"
      className="bg-paper-shade scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <Reveal>
          <h2 className="max-w-3xl text-center font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-tight mx-auto uppercase">
            {t('title')}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl text-center font-sans text-base text-ink/70 md:text-lg">
            {t('subtitle')}
          </p>
        </Reveal>

        <ol className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stepKeys.map((key, i) => (
            <Reveal key={key} delay={0.05 * i} direction="scale">
              <li className="group flex h-full flex-col border border-white/10 bg-white/[0.04] p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-pink/30">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-lime">
                    fase {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="flex h-10 w-10 items-center justify-center border border-white/20 bg-white/5 font-display text-xl text-pink transition-transform duration-300 group-hover:rotate-12"
                    aria-hidden
                  >
                    {icons[key]}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl leading-snug md:text-2xl uppercase">
                  {t(`steps.${key}.title`)}
                </h3>
                <p className="mt-3 font-sans text-sm text-ink/70">
                  {t(`steps.${key}.body`)}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
