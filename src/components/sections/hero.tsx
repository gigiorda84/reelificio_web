import {getTranslations} from 'next-intl/server';
import {ButtonLink} from '@/components/ui/button';
import {Wordmark} from '@/components/wordmark';
import {PhoneFrame} from '@/components/phone-frame';

export async function Hero() {
  const t = await getTranslations('hero');
  const meta = await getTranslations('meta');

  return (
    <section className="relative overflow-hidden border-b-2 border-ink">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:gap-8 md:px-8 md:py-24">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <Wordmark />
            <span className="font-mono text-xs text-ink/70 md:text-sm">
              , {meta('tagline')}
            </span>
          </div>

          <p className="mt-10 max-w-[1.5em] font-mono text-xs uppercase tracking-widest text-ink/60">
            ↘
          </p>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-ink/70">
            {t('eyebrow')}
          </p>

          <h1 className="mt-4 font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95] tracking-tight">
            <span className="gradient-text">{t('title')}</span>
          </h1>

          <p className="mt-6 max-w-xl font-sans text-lg text-ink/80 md:text-xl">
            {t('subtitle')}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="/contatti" size="lg" variant="primary">
              {t('cta')}
            </ButtonLink>
            <ButtonLink href="#how-we-work" size="lg" variant="secondary">
              {t('ctaSecondary')} →
            </ButtonLink>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <ChipFloating
            text={t('chipTop')}
            className="-top-2 right-2 md:-top-4 md:right-6"
          />
          <ChipFloating
            text={t('chipLeft')}
            className="left-0 top-1/3 -translate-x-2 md:-translate-x-6"
          />
          <ChipFloating
            text={t('chipRight')}
            className="bottom-8 right-0 translate-x-2 md:translate-x-6"
          />
          <PhoneFrame videoSrc="/placeholder.mp4" />
        </div>
      </div>
    </section>
  );
}

function ChipFloating({text, className}: {text: string; className?: string}) {
  return (
    <div
      className={`absolute z-10 ${className ?? ''}`}
      style={{transform: undefined}}
    >
      <div className="brutal-box-sm rounded-full px-4 py-2">
        <span className="font-mono text-xs font-medium uppercase tracking-tight">
          {text}
        </span>
      </div>
    </div>
  );
}
