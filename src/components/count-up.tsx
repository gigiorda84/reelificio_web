'use client';

import {useEffect, useRef, useState} from 'react';

function parse(value: string): {prefix: string; num: number; suffix: string} | null {
  const m = value.match(/^(\+?)(\d+)([k+]*)$/);
  if (!m) return null;
  return {prefix: m[1], num: parseInt(m[2]), suffix: m[3]};
}

export function CountUp({value}: {value: string}) {
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(() =>
    parsed ? `${parsed.prefix}0${parsed.suffix}` : value
  );

  useEffect(() => {
    if (!parsed || started.current) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setDisplay(value);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            io.disconnect();
            const duration = 1400;
            const startTime = performance.now();
            function tick(now: number) {
              const t = Math.min((now - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              const cur = Math.round(parsed!.num * eased);
              setDisplay(`${parsed!.prefix}${cur}${parsed!.suffix}`);
              if (t < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
          }
        }
      },
      {threshold: 0.5}
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <span ref={ref}>{display}</span>;
}
