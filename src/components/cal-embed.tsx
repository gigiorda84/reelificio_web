'use client';

import {useEffect} from 'react';
import {cn} from '@/lib/cn';

export function CalEmbed({className}: {className?: string}) {
  useEffect(() => {
    if (document.getElementById('cal-init-30min')) return;

    // Inject the official Cal.com IIFE + init as a script element.
    // textContent is safe here — content is entirely static and hardcoded.
    const script = document.createElement('script');
    script.id = 'cal-init-30min';
    script.textContent = [
      '(function(C,A,L){',
      '  let p=function(a,ar){a.q.push(ar);};',
      '  let d=C.document;',
      '  C.Cal=C.Cal||function(){',
      '    let cal=C.Cal;let ar=arguments;',
      '    if(!cal.loaded){cal.ns={};cal.q=cal.q||[];',
      '      d.head.appendChild(d.createElement("script")).src=A;',
      '      cal.loaded=true;}',
      '    if(ar[0]===L){',
      '      const api=function(){p(api,arguments);};',
      '      const ns=ar[1];api.q=api.q||[];',
      '      if(typeof ns==="string"){cal.ns[ns]=cal.ns[ns]||api;p(cal.ns[ns],ar);p(cal,["initNamespace",ns]);}',
      '      else p(cal,ar);return;}',
      '    p(cal,ar);',
      '  };',
      '})(window,"https://app.cal.com/embed/embed.js","init");',
      'Cal("init","30min",{origin:"https://app.cal.com"});',
      'Cal.ns["30min"]("inline",{',
      '  elementOrSelector:"#my-cal-inline-30min",',
      '  config:{"layout":"month_view","useSlotsViewOnSmallScreen":"true"},',
      '  calLink:"reelificio/30min"',
      '});',
      'Cal.ns["30min"]("ui",{"hideEventTypeDetails":false,"layout":"month_view"});',
    ].join('\n');
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
