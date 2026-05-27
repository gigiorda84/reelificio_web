import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Reveal} from '@/components/reveal';

const items = [
  {key: 'fluffy', slug: 'fluffy', videoSrc: '/reels/fluffy.mp4'},
  {key: 'hacker', slug: 'hacker', videoSrc: '/reels/hacker.mp4'},
  {key: 'cipidilloo', slug: 'cipidilloo', videoSrc: '/reels/cipidilloo.mp4'},
  {key: 'porcino', slug: 'porcino-papaya', videoSrc: '/reels/porcino-papaya.mp4'},
] as const;

export async function CaseStudies() {
  const t = await getTranslations('caseStudies');

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <Reveal>
          <h2 className="max-w-3xl font-display text-[clamp(1.8rem,4vw,3.2rem)] leading-tight">
            {t('title')}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl font-sans text-base text-ink/70 md:text-lg">
            {t('subtitle')}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {items.map(({key, slug, videoSrc}, i) => (
            <Reveal key={key} delay={0.1 + i * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden border border-white/10 bg-white/[0.03] transition-colors hover:border-lime/30">
                <div className="aspect-[9/14] w-full overflow-hidden bg-paper-shade">
                  <video
                    src={videoSrc}
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
                  <span className="mt-1 font-mono text-xs uppercase text-lime/70">
                    {t(`items.${key}.handle`)}
                  </span>
                  <p className="mt-4 font-sans text-sm text-ink/70">
                    {t(`items.${key}.pitch`)}
                  </p>
                  <div className="mt-6">
                    <Link
                      href={`/lavori/${slug}`}
                      className="inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-tight text-ink/60 transition-colors hover:text-lime"
                    >
                      {t('ctaWork')} <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
