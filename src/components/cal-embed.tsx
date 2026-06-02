'use client';

import {useEffect} from 'react';
import {cn} from '@/lib/cn';

export function CalEmbed({className}: {className?: string}) {
  useEffect(() => {
    if (document.getElementById('cal-embed-js')) return;

    const script = document.createElement('script');
    script.id = 'cal-embed-js';
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;
    script.onload = () => {
      type CalFn = ((...args: unknown[]) => void) & {ns?: Record<string, (...args: unknown[]) => void>};
      const w = window as Window & {Cal?: CalFn};
      if (!w.Cal) return;
      w.Cal('init', '30min', {origin: 'https://app.cal.com'});
      w.Cal.ns?.['30min']?.('inline', {
        elementOrSelector: '#my-cal-inline-30min',
        config: {layout: 'month_view', useSlotsViewOnSmallScreen: 'true'},
        calLink: 'reelificio/30min',
      });
      w.Cal.ns?.['30min']?.('ui', {hideEventTypeDetails: false, layout: 'month_view'});
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div className={cn('w-full', className)}>
      <div
        id="my-cal-inline-30min"
        style={{width: '100%', minHeight: '600px', overflow: 'scroll'}}
      />
    </div>
  );
}
