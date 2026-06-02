'use client';

import {useEffect} from 'react';
import {cn} from '@/lib/cn';

type CalApi = ((...args: unknown[]) => void) & {
  q?: unknown[][];
  loaded?: boolean;
  ns?: Record<string, CalApi>;
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

const CAL_LINK = 'reelificio/30min';
const SELECTOR = '#my-cal-inline-30min';

function setupInline() {
  const Cal = window.Cal;
  if (!Cal) return;
  Cal('init', '30min', {origin: 'https://app.cal.com'});
  Cal.ns?.['30min']?.('inline', {
    elementOrSelector: SELECTOR,
    config: {layout: 'month_view', useSlotsViewOnSmallScreen: 'true'},
    calLink: CAL_LINK,
  });
  Cal.ns?.['30min']?.('ui', {hideEventTypeDetails: false, layout: 'month_view'});
}

function ensureCal() {
  // If Cal is already available (embed.js loaded on a previous visit), re-init directly.
  if (window.Cal) {
    setupInline();
    return;
  }

  // First load: replicate the official IIFE in TypeScript to set up the queue,
  // then load embed.js which will process the queue.
  const makeSubQueue = (): CalApi => {
    const fn: CalApi = (...args: unknown[]) => { fn.q!.push(args); };
    fn.q = [];
    return fn;
  };

  const cal: CalApi = (...args: unknown[]) => {
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q ?? [];
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://app.cal.com/embed/embed.js';
      document.head.appendChild(s);
      cal.loaded = true;
    }
    if (args[0] === 'init') {
      const ns = args[1] as string;
      const api = makeSubQueue();
      cal.ns![ns] = cal.ns![ns] ?? api;
      cal.ns![ns](...args);
      cal.q!.push(['initNamespace', ns]);
      return;
    }
    cal.q!.push(args);
  };
  cal.q = [];
  cal.ns = {};
  window.Cal = cal;

  setupInline();
}

export function CalEmbed({className}: {className?: string}) {
  useEffect(() => {
    ensureCal();
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
