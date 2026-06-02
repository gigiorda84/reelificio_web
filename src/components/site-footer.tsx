import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {Wordmark} from './wordmark';

export async function SiteFooter() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-0 bg-paper-shade text-ink">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Wordmark imageClassName="h-20 md:h-28" />
            <p className="mt-4 max-w-md font-sans text-lg text-ink/70">
              {t('tagline')}
            </p>
          </div>

          <div>
            <p className="font-mono text-sm uppercase text-lime/70">Sito</p>
            <ul className="mt-3 space-y-2 font-sans text-base">
              <li>
                <Link href="/partnership" className="text-ink/70 transition-colors hover:text-lime">
                  Partnership
                </Link>
              </li>
              <li>
                <Link href="/produzione" className="text-ink/70 transition-colors hover:text-lime">
                  Produzione
                </Link>
              </li>
              <li>
                <Link href="/contatti" className="text-ink/70 transition-colors hover:text-lime">
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-sm uppercase text-lime/70">Legal</p>
            <ul className="mt-3 space-y-2 font-sans text-base">
              <li>
                <Link href="/privacy" className="text-ink/70 transition-colors hover:text-lime">
                  {t('legal.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-ink/70 transition-colors hover:text-lime">
                  {t('legal.cookies')}
                </Link>
              </li>
              <li>
                <Link href="/note-legali" className="text-ink/70 transition-colors hover:text-lime">
                  {t('legal.notes')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-2 font-mono text-sm uppercase text-ink/40 md:flex-row md:items-center md:justify-between">
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
