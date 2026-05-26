import {getTranslations} from 'next-intl/server';
import {Reveal} from '@/components/reveal';

export async function SocialProof() {
  const t = await getTranslations('socialProof');

  const metrics = [
    {value: '1.000+', label: t('metrics.videos')},
    {value: '3', label: t('metrics.communities')},
    {value: '+500k', label: t('metrics.growth')}
  ];

  return (
    <section className="border-b-2 border-ink bg-paper-shade">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-ink/70">
            {t('title')}
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {metrics.map((m, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="brutal-box flex items-end justify-between gap-4 p-6">
                <div className="font-display text-5xl leading-none md:text-6xl">
                  {m.value}
                </div>
                <div className="max-w-[60%] text-right font-mono text-xs uppercase leading-tight text-ink/70">
                  {m.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
