'use client';

import {motion, useReducedMotion} from 'motion/react';
import {cn} from '@/lib/cn';

export function PhoneFrame({
  videoSrc,
  poster,
  className
}: {
  videoSrc?: string;
  poster?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : {opacity: 0, y: 20, rotate: -2}}
      animate={{opacity: 1, y: 0, rotate: 3}}
      transition={{type: 'spring', stiffness: 60, damping: 18}}
      className={cn(
        'relative aspect-[9/19.5] w-full max-w-[280px] md:max-w-[320px]',
        className
      )}
    >
      <div className="absolute inset-0 rounded-[2.5rem] border-[3px] border-ink bg-ink shadow-[12px_12px_0_0_var(--accent-2)]">
        <div className="absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-ink" />
        <div className="absolute inset-[6px] overflow-hidden rounded-[2.2rem] bg-paper-shade">
          {videoSrc ? (
            <video
              src={videoSrc}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          ) : (
            <PlaceholderReel />
          )}
        </div>
      </div>
    </motion.div>
  );
}

function PlaceholderReel() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-accent-1 via-accent-2 to-accent-3">
      <div className="font-display text-3xl lowercase text-paper">
        reelificio
      </div>
      <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-paper/80">
        reel placeholder
      </div>
    </div>
  );
}
