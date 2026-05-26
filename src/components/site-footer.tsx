import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Wordmark} from './wordmark';

export async function SiteFooter() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="text-3xl md:text-4xl">
              <Wordmark className="text-paper" />
            </div>
            <p className="mt-4 max-w-md font-sans text-base text-paper/80">
              {t('tagline')}
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase text-paper/60">Sito</p>
            <ul className="mt-3 space-y-2 font-sans text-sm">
              <li>
                <Link href="/partnership" className="hover:text-accent-2">
                  Partnership
                </Link>
              </li>
              <li>
                <Link href="/produzione" className="hover:text-accent-2">
                  Produzione
                </Link>
              </li>
              <li>
                <Link href="/contatti" className="hover:text-accent-2">
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase text-paper/60">Legal</p>
            <ul className="mt-3 space-y-2 font-sans text-sm">
              <li>
                <Link href="/privacy" className="hover:text-accent-2">
                  {t('legal.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-accent-2">
                  {t('legal.cookies')}
                </Link>
              </li>
              <li>
                <Link href="/note-legali" className="hover:text-accent-2">
                  {t('legal.notes')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-paper/20 pt-6">
          <div className="flex flex-col gap-2 font-mono text-xs uppercase text-paper/70 md:flex-row md:items-center md:justify-between">
            <p>
              {t('company')} · {t('vat')} · {t('sdi')}
            </p>
            <p>
              © {year} Sweet Life Faktory — {t('rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
