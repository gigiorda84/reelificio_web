import {notFound} from 'next/navigation';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {Link} from '@/i18n/navigation';
import {ButtonLink} from '@/components/ui/button';
import {PhoneFrame} from '@/components/phone-frame';
import {Reveal} from '@/components/reveal';
import {CtaBand} from '@/components/sections/cta-band';

type Slug = 'fluffy' | 'hacker' | 'cipidilloo' | 'porcino-papaya';

const CASE_STUDIES: Record<Slug, {videoSrc: string; messageKey: string}> = {
  fluffy: {videoSrc: '/reels/fluffy.mp4', messageKey: 'fluffy'},
  hacker: {videoSrc: '/reels/hacker.mp4', messageKey: 'hacker'},
  cipidilloo: {videoSrc: '/reels/cipidilloo.mp4', messageKey: 'cipidilloo'},
  'porcino-papaya': {videoSrc: '/reels/porcino-papaya.mp4', messageKey: 'porcino'},
};

export function generateStaticParams() {
  return (Object.keys(CASE_STUDIES) as Slug[]).map((slug) => ({slug}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  if (!(slug in CASE_STUDIES)) return {};
  const {messageKey} = CASE_STUDIES[slug as Slug];
  const t = await getTranslations({locale, namespace: 'caseStudies'});
  return {
    title: t(`items.${messageKey}.name`),
    description: t(`items.${messageKey}.pitch`),
    alternates: {
      canonical: `/${locale}/lavori/${slug}`,
      languages: {it: `/it/lavori/${slug}`, en: `/en/lavori/${slug}`}
    }
  };
}

export default async function LavoriPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  if (!(slug in CASE_STUDIES)) notFound();

  setRequestLocale(locale);

  const {videoSrc, messageKey} = CASE_STUDIES[slug as Slug];
  const t = await getTranslations('caseStudies');
  const tLavori = await getTranslations('lavori');

  const name = t(`items.${messageKey}.name`);
  const handle = t(`items.${messageKey}.handle`);
  const pitch = t(`items.${messageKey}.pitch`);

  return (
    <>
      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <Reveal>
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-widest text-ink/60 hover:text-accent-2"
            >
              {tLavori('back')}
            </Link>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
            <Reveal className="flex justify-center md:justify-start">
              <PhoneFrame videoSrc={videoSrc} />
            </Reveal>

            <Reveal delay={0.1}>
              <p className="font-mono text-xs uppercase tracking-widest text-ink/60">
                {handle}
              </p>
              <h1 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] leading-[0.95]">
                <span className="gradient-text">{name}</span>
              </h1>
              <p className="mt-6 max-w-lg font-sans text-lg text-ink/80">{pitch}</p>
              <div className="mt-8">
                <ButtonLink href="/contatti" size="lg">
                  {tLavori('ctaCall')}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
