import {forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes} from 'react';
import {cn} from '@/lib/cn';

const base =
  'inline-flex items-center justify-center gap-2 font-display uppercase tracking-tight ' +
  'transition-all duration-200 ease-out ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-paper';

const variants = {
  primary: 'bg-lime text-[#020103] border-2 border-lime hover:bg-lime/90 active:scale-[0.98]',
  secondary:
    'bg-transparent text-ink border border-ink/30 hover:border-ink/60 hover:bg-white/5 active:scale-[0.98]',
  ghost: 'bg-transparent text-ink border border-transparent hover:bg-white/5'
} as const;

const sizes = {
  sm: 'h-11 px-4 text-sm',
  md: 'h-12 px-6 text-base',
  lg: 'h-14 px-8 text-lg'
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

export const Button = forwardRef<
  HTMLButtonElement,
  BaseProps & ButtonHTMLAttributes<HTMLButtonElement>
>(function Button(
  {variant = 'primary', size = 'md', className, ...props},
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});

export const ButtonLink = forwardRef<
  HTMLAnchorElement,
  BaseProps & AnchorHTMLAttributes<HTMLAnchorElement>
>(function ButtonLink(
  {variant = 'primary', size = 'md', className, ...props},
  ref
) {
  return (
    <a
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});
