import {forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes} from 'react';
import {cn} from '@/lib/cn';

const base =
  'inline-flex items-center justify-center gap-2 border-2 border-ink font-display lowercase tracking-tight ' +
  'transition-transform duration-150 ease-out ' +
  'hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-0 active:translate-y-0 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper';

const variants = {
  primary:
    'bg-ink text-paper shadow-[6px_6px_0_0_var(--accent-2)] hover:shadow-[8px_8px_0_0_var(--accent-2)]',
  secondary:
    'bg-paper text-ink shadow-[6px_6px_0_0_var(--ink)] hover:shadow-[8px_8px_0_0_var(--ink)]',
  ghost:
    'bg-transparent text-ink shadow-none border-transparent hover:bg-paper-shade'
} as const;

const sizes = {
  sm: 'h-10 px-4 text-sm',
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
