'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {cn} from '@/lib/cn';

const keys = ['guarantee', 'cost', 'who', 'why', 'talent', 'ads'] as const;

export function FAQ() {
  const t = useTranslations('faq');
  const [open, setOpen] = useState<string | null>('guarantee');

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-4xl px-4 py-20 md:px-8 md:py-28">
        <h2 className="text-right font-display text-[clamp(3rem,10vw,8rem)] leading-none text-ink">
          {t('title')}
        </h2>

        <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {keys.map((k) => {
            const isOpen = open === k;
            const id = `faq-${k}`;
            return (
              <li key={k}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={id}
                  onClick={() => setOpen(isOpen ? null : k)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:bg-white/[0.03] focus-visible:bg-white/[0.03] focus:outline-none"
                >
                  <span className="font-display text-lg leading-tight md:text-2xl">
                    {t(`items.${k}.q`)}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 font-display text-2xl transition-all duration-200',
                      isOpen ? 'rotate-45 bg-lime text-[#020103] border-lime' : 'text-ink'
                    )}
                  >
                    +
                  </span>
                </button>
                <div
                  id={id}
                  hidden={!isOpen}
                  className="pb-6 pr-14 font-sans text-base text-ink/70 md:text-lg"
                >
                  {t(`items.${k}.a`)}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
