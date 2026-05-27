import Image from 'next/image';
import {cn} from '@/lib/cn';

export function Wordmark({className}: {className?: string}) {
  return (
    <span className={cn('inline-flex items-center', className)}>
      <Image
        src="/logo.png"
        alt="reelificio"
        width={270}
        height={180}
        className="h-12 w-auto"
        priority
      />
    </span>
  );
}
