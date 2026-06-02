'use client';

import {useEffect, useRef} from 'react';
import Script from 'next/script';
import {cn} from '@/lib/cn';

declare global {
  interface Window {
    Cal?: ((...args: unknown[]) => void) & {
      ns?: Record<string, (...args: unknown[]) => void>;
      loaded?: boolean;
      q?: unknown[][];
    };
  }
}

function initCal() {
  if (!window.Cal) return;
  window.Cal('init', '30min', {origin: 'https://app.cal.com'});
  window.Cal.ns?.['30min']?.('inline', {
    elementOrSelector: '#my-cal-inline-30min',
    config: {layout: 'month_view', useSlotsViewOnSmallScreen: 'true'},
    calLink: 'reelificio/30min',
  });
  window.Cal.ns?.['30min']?.('ui', {hideEventTypeDetails: false, layout: 'month_view'});
}

export function CalEmbed({className}: {className?: string}) {
  const initialized = useRef(false);

  // Re-init on client navigation: if embed.js already loaded, call init directly.
  useEffect(() => {
    if (initialized.current) return;
    if (window.Cal?.loaded) {
      initialized.current = true;
      initCal();
    }
  });

  return (
    <div className={cn('w-full', className)}>
      <div
        id="my-cal-inline-30min"
        style={{width: '100%', minHeight: '600px', overflow: 'scroll'}}
      />
      <Script
        src="https://app.cal.com/embed/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          initialized.current = true;
          initCal();
        }}
      />
    </div>
  );
}
