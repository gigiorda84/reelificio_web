import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Wordmark} from './wordmark';
import {LocaleSwitcher} from './locale-switcher';
import {ButtonLink} from './ui/button';

export async function SiteHeader() {
  const t = await getTranslations('nav');

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-paper-shade/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="text-2xl md:text-3xl" aria-label="reelificio">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/partnership"
            className="font-mono text-sm uppercase tracking-tight text-ink/60 transition-colors hover:text-lime"
          >
            {t('partnership')}
          </Link>
          <Link
            href="/produzione"
            className="font-mono text-sm uppercase tracking-tight text-ink/60 transition-colors hover:text-lime"
          >
            {t('produzione')}
          </Link>
          <Link
            href="/contatti"
            className="font-mono text-sm uppercase tracking-tight text-ink/60 transition-colors hover:text-lime"
          >
            {t('contatti')}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <ButtonLink
            href="/contatti"
            size="sm"
            variant="primary"
            className="hidden sm:inline-flex"
          >
            {t('cta')}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
