import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// The fungo landing lives at public/fungo.html and is also published on its own
// domain. Requests to fun-go.it are rewritten to that file so the standalone
// domain serves the landing at its root, while reelificio.com keeps its
// locale-prefixed routing untouched.
const FUNGO_HOSTS = new Set(['fun-go.it', 'www.fun-go.it']);

export function proxy(request: NextRequest) {
  const host = (request.headers.get('host') ?? '').toLowerCase().split(':')[0];

  if (FUNGO_HOSTS.has(host)) {
    const url = request.nextUrl.clone();
    url.pathname =
      request.nextUrl.pathname === '/privacy'
        ? '/fungo-privacy.html'
        : '/fungo.html';
    return NextResponse.rewrite(url);
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for:
  // - API routes, Next internals, static files (anything with a dot)
  // - Explicitly unindexed standalone pages served from public/
  matcher: ['/((?!api|_next|_vercel|fungo\\.html|.*\\..*).*)']
};
