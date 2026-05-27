import {ImageResponse} from 'next/og';
import {getTranslations} from 'next-intl/server';

export const size = {width: 1200, height: 630};
export const contentType = 'image/png';
export const alt = 'reelificio — la prima agenzia italiana di contenuti animati virali';

export default async function OG({params}: {params: {locale: string}}) {
  const t = await getTranslations({locale: params.locale, namespace: 'meta'});

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#000000',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span
            style={{
              fontSize: 36,
              fontWeight: 900,
              textTransform: 'lowercase',
              background: '#ffffff',
              color: '#000000',
              padding: '8px 18px',
              border: '2px solid #ffffff'
            }}
          >
            reelificio
          </span>
          <span
            style={{
              fontSize: 22,
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              color: '#ffffff',
              padding: '6px 14px',
              border: '1px solid rgba(255,255,255,0.3)'
            }}
          >
            www.reelificio.com
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '40px 48px',
            fontSize: 72,
            fontWeight: 900,
            lineHeight: 1.02,
            maxWidth: '90%'
          }}
        >
          {t('homeTitle')}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            fontFamily: 'ui-monospace, SFMono-Regular, monospace',
            textTransform: 'uppercase'
          }}
        >
          <span>100+ reel / mese</span>
          <span>3 community · 100k+</span>
          <span>{params.locale === 'it' ? 'parliamone →' : "let's talk →"}</span>
        </div>
      </div>
    ),
    {...size}
  );
}
