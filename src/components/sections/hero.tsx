import {getTranslations} from 'next-intl/server';
import {ButtonLink} from '@/components/ui/button';
import {Wordmark} from '@/components/wordmark';
import {PhoneFrame} from '@/components/phone-frame';

export async function Hero() {
  const t = await getTranslations('hero');

  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-4 pb-16 md:grid-cols-2 md:gap-8 md:px-8 md:pt-6 md:pb-28">
        <div className="flex flex-col">
          <Wordmark imageClassName="h-40 md:h-64" />

          <h1 className="mt-5 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.9] tracking-tight uppercase">
            {t('title')}
          </h1>

          <p className="mt-6 max-w-xl font-sans text-lg text-ink/70 md:text-xl">
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
            accent="lime"
          />
          <ChipFloating
            text={t('chipLeft')}
            className="left-0 top-1/3 -translate-x-2 md:-translate-x-6"
            accent="pink"
          />
          <ChipFloating
            text={t('chipRight')}
            className="bottom-8 right-0 translate-x-2 md:translate-x-6"
            accent="pink"
          />
          <PhoneFrame videoSrc="/reels/fluffy_hero.mp4" />
        </div>
      </div>
    </section>
  );
}

function ChipFloating({
  text,
  className,
  accent = 'lime'
}: {
  text: string;
  className?: string;
  accent?: 'lime' | 'pink';
}) {
  const color = accent === 'lime' ? 'bg-lime text-[#020103]' : 'bg-pink text-white';
  return (
    <div className={`absolute z-10 ${className ?? ''}`}>
      <div className={`rounded-full px-5 py-3 ${color}`}>
        <span className="font-mono text-base font-bold uppercase tracking-tight">
          {text}
        </span>
      </div>
    </div>
  );
}
