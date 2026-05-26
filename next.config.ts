import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Marketing site is mostly static — rely on Vercel edge for delivery.
};

export default withNextIntl(nextConfig);
