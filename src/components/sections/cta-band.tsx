import {getTranslations} from 'next-intl/server';
import {BriefForm} from '@/components/brief-form';
import {ButtonLink} from '@/components/ui/button';
import {Reveal} from '@/components/reveal';

export async function CtaBand() {
  const t = await getTranslations('ctaBand');

  return (
    <section className="border-b-2 border-ink bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
        <Reveal>
          <div>
            <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-none">
              <span className="gradient-text">{t('title')}</span>
            </h2>
            <p className="mt-6 max-w-md font-sans text-lg text-paper/80">
              {t('subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink
                href="/contatti"
                size="lg"
                className="bg-paper text-ink shadow-[6px_6px_0_0_var(--accent-2)]"
              >
                {t('calLabel')}
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-paper/60">
              {t('formLabel')}
            </p>
            <BriefForm className="bg-paper text-ink" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
