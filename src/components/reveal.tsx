'use client';

import {motion, useReducedMotion, type Variants} from 'motion/react';
import {type ReactNode} from 'react';

const variants: Variants = {
  hidden: {opacity: 0, y: 16},
  show: {opacity: 1, y: 0, transition: {duration: 0.5, ease: 'easeOut'}}
};

export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className
}: {
  children: ReactNode;
  delay?: number;
  as?: keyof typeof motion;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[Tag] as typeof motion.div;

  if (reduce) {
    return <Comp className={className}>{children}</Comp>;
  }

  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{once: true, amount: 0.2}}
      transition={{delay}}
    >
      {children}
    </Comp>
  );
}
