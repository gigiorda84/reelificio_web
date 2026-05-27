import Image from 'next/image';
import {cn} from '@/lib/cn';

export function Wordmark({className, imageClassName}: {className?: string; imageClassName?: string}) {
  return (
    <span className={cn('inline-flex items-center', className)}>
      <Image
        src="/logo.png"
        alt="reelificio"
        width={270}
        height={180}
        className={cn('h-12 w-auto', imageClassName)}
        priority
      />
    </span>
  );
}
