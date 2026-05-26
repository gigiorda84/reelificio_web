'use client';

import {useTranslations} from 'next-intl';
import {cn} from '@/lib/cn';

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? 'reelificio/discovery';

export function CalEmbed({className}: {className?: string}) {
  const t = useTranslations('ctaBand');

  return (
    <div className={cn('brutal-box overflow-hidden', className)}>
      <div className="flex items-center justify-between border-b-2 border-ink bg-paper-shade px-4 py-2">
        <span className="font-mono text-xs uppercase tracking-tight text-ink/70">
          cal.com / {CAL_LINK.split('/')[0]}
        </span>
        <a
          href={`https://cal.com/${CAL_LINK}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs uppercase tracking-tight hover:text-accent-2"
        >
          ↗ {t('calLabel')}
        </a>
      </div>
      <iframe
        title="Prenota una call su Cal.com"
        src={`https://cal.com/${CAL_LINK}?embed=true&theme=light`}
        className="block h-[640px] w-full"
        loading="lazy"
      />
    </div>
  );
}
