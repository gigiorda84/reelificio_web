'use client';

import {useEffect, useRef, useState, type ReactNode} from 'react';
import {cn} from '@/lib/cn';

type Direction = 'up' | 'left' | 'right' | 'scale';

const hidden: Record<Direction, string> = {
  up:    'opacity-0 translate-y-5',
  left:  'opacity-0 -translate-x-8',
  right: 'opacity-0 translate-x-8',
  scale: 'opacity-0 scale-95',
};

const visible: Record<Direction, string> = {
  up:    'opacity-100 translate-y-0',
  left:  'opacity-100 translate-x-0',
  right: 'opacity-100 translate-x-0',
  scale: 'opacity-100 scale-100',
};

export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className
}: {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      {threshold: 0.15}
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-out will-change-[opacity,transform]',
        shown ? visible[direction] : hidden[direction],
        className
      )}
      style={{transitionDelay: shown ? `${delay * 1000}ms` : '0ms'}}
    >
      {children}
    </div>
  );
}
