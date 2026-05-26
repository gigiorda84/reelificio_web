import {ImageResponse} from 'next/og';
import {getTranslations} from 'next-intl/server';

export const size = {width: 1200, height: 630};
export const contentType = 'image/png';
export const alt = 'reelificio — community che crescono, brand che scalano';

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
          background:
            'linear-gradient(135deg, #2f5bff 0%, #ff3da6 55%, #ff7a3d 100%)',
          color: '#0a0a0a',
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
              background: '#0a0a0a',
              color: '#faf8f3',
              padding: '8px 18px',
              border: '4px solid #0a0a0a'
            }}
          >
            reelificio
          </span>
          <span
            style={{
              fontSize: 22,
              fontFamily: 'ui-monospace, SFMono-Regular, monospace',
              background: '#faf8f3',
              padding: '6px 14px',
              border: '3px solid #0a0a0a'
            }}
          >
            www.reelificio.com
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            background: '#faf8f3',
            border: '6px solid #0a0a0a',
            padding: '40px 48px',
            boxShadow: '14px 14px 0 0 #0a0a0a',
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
          <span>1.000+ reel / mese</span>
          <span>3 community · 100k+</span>
          <span>{params.locale === 'it' ? 'parliamone →' : "let's talk →"}</span>
        </div>
      </div>
    ),
    {...size}
  );
}
