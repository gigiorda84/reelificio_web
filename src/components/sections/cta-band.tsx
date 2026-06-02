import {getTranslations} from 'next-intl/server';
import {BriefForm} from '@/components/brief-form';
import {ButtonLink} from '@/components/ui/button';
import {Reveal} from '@/components/reveal';

export async function CtaBand() {
  const t = await getTranslations('ctaBand');

  return (
    <section className="bg-lime">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
        <Reveal>
          <div>
            <h2 className="font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-none text-[#020103] uppercase">
              {t('title')}
            </h2>
            <p className="mt-6 max-w-md font-sans text-lg text-[#020103]/80">
              {t('subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink
                href="/contatti"
                size="lg"
                className="bg-[#020103] text-lime border-2 border-[#020103] hover:bg-[#020103]/90"
              >
                {t('calLabel')}
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-[#020103]/60">
              {t('formLabel')}
            </p>
            <BriefForm variant="light" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
