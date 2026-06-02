import {getTranslations} from 'next-intl/server';
import {Reveal} from '@/components/reveal';

export async function SocialProof() {
  const t = await getTranslations('socialProof');

  const metrics = [
    {value: '100+', label: t('metrics.videos')},
    {value: '3', label: t('metrics.communities')},
    {value: '+500k', label: t('metrics.growth')},
    {value: '+20k', label: t('metrics.followersMonthly')}
  ];

  return (
    <section className="bg-paper-shade">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-lime/80">
            {t('title')}
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="flex items-end justify-between gap-4 border border-white/10 p-6">
                <div className="font-display text-5xl leading-none text-lime md:text-6xl">
                  {m.value}
                </div>
                <div className="max-w-[60%] text-right font-mono text-xs uppercase leading-tight text-ink/60">
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
