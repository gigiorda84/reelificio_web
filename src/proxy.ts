import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export const proxy = createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - API routes, Next internals, static files (anything with a dot)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
