'use client';

import {usePathname, useRouter} from '@/i18n/navigation';
import {useLocale} from 'next-intl';
import {useParams} from 'next/navigation';
import {useTransition} from 'react';
import {routing} from '@/i18n/routing';
import {cn} from '@/lib/cn';

export function LocaleSwitcher({className}: {className?: string}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- preserve dynamic segments
        {pathname, params},
        {locale: next}
      );
    });
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-0 border border-white/20 bg-white/5 font-mono text-xs uppercase',
        className
      )}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-current={l === locale ? 'true' : undefined}
          className={cn(
            'h-8 w-10 transition-colors',
            l === locale
              ? 'bg-lime text-[#020103]'
              : 'text-ink/60 hover:text-ink'
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
