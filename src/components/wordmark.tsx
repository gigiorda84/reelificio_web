import {cn} from '@/lib/cn';

export function Wordmark({className}: {className?: string}) {
  return (
    <span
      className={cn(
        'font-display lowercase tracking-tight leading-none',
        className
      )}
    >
      <span className="wordmark-underline">reelificio</span>
    </span>
  );
}
