import Script from 'next/script';

const DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const SRC =
  process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? 'https://plausible.io/js/script.js';

export function PlausibleScript() {
  if (!DOMAIN) return null;
  return (
    <Script
      defer
      data-domain={DOMAIN}
      src={SRC}
      strategy="afterInteractive"
    />
  );
}
