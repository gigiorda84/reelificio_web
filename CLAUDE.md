# CLAUDE.md

Guidance for Claude Code (claude.ai/code) working in this repository.

> **First, read [AGENTS.md](./AGENTS.md).** Next.js 16 has breaking changes
> vs. your training data — when in doubt, check `node_modules/next/dist/docs/`.

> **Then, read [docs/PLAN.md](./docs/PLAN.md).** It is the authoritative
> status doc: what's done, what's outstanding, how to ship a change.

## What this repo is

The **public marketing site** for `reelificio.com`. Single conversion goal:
visitor → discovery call on Cal.com (secondary: visitor → brief via `/api/brief`).

It is **not** the internal production-management webapp. That is a separate
private repo (`Reelificio_PM`). If a task talks about reels in production,
batches, voice briefs, RACI, the publish buffer, Drive parsers, Supabase, or
auth — you are in the wrong repo.

## Brand spelling

- Public brand: **Reelificio** (single L). Use this everywhere here.
- The internal ops product uses *Reellificio* (double L). Do not bring that
  spelling into this repo.

## Locked-in technical decisions

These were settled with the user; do not re-litigate without explicit approval.

- **Stack**: Next.js 16 (App Router) + TypeScript + Tailwind v4 + next-intl,
  path-prefixed `/it` (default) and `/en`.
- **Email**: Resend → `hello@reelificio.com`. Honeypot field on the brief
  form is named `website`.
- **Booking**: Cal.com hosted embed. Env: `NEXT_PUBLIC_CAL_LINK`.
- **Analytics**: Vercel Analytics + Speed Insights + Plausible. **All
  cookieless** → no consent banner required. Do not add Meta Pixel / GA4 /
  Hotjar / YouTube embeds without flagging the consent-banner consequence.
- **Video**: Self-hosted MP4/WebM only. No Instagram / YouTube / TikTok
  embeds (same reason as above + LCP/CLS).
- **Design**: **Immersive dark** (typeui.sh/immersive) — palette:
  `#020103` near-black bg, `#2F0656` deep-purple accent bg, `#F2F2EF`
  cream text, `#DBF404` lime (primary CTA + accent), `#F530A0` hot-pink
  (secondary accent). **Oswald** as single typeface (display + body),
  JetBrains Mono for labels/mono. Sections alternate black/purple using
  `bg-paper`/`bg-paper-shade`. CTA band uses `bg-lime` with black text.
  Footer uses `bg-paper-shade` (purple). Borders: `1px solid rgba(242,242,239,0.12)`.
  No shadows. Previous luxury-dark monochrome replaced in May 2026 at explicit
  user request.
- **Voice**: Confident, craft-led. "AI for trend-spotting + humans for
  craft" positioning. No money-back guarantee.
- **Featured case studies**: `@fluffy.revolution`,
  `@hackerpassivoaggressivo`, `@cipidilloo`.
- **Hosting**: Vercel, region `fra1` (Frankfurt) for EU/GDPR posture.

See [docs/PLAN.md §2](./docs/PLAN.md) for the full rationale.

## Build / lint / test

Package manager: **pnpm** (10.x via corepack). Node 20.

```bash
pnpm install
pnpm dev          # http://localhost:3000  →  redirects to /it
pnpm build        # production build
pnpm typecheck    # tsc --noEmit  →  must be clean before merging
```

No test suite yet. `pnpm typecheck` is the floor.

## Architecture notes

### Next.js 16 conventions

- The framework deprecated `middleware.ts` → use `proxy.ts` exporting `proxy()`.
  See `src/proxy.ts` — it wraps `next-intl/middleware` for locale routing.
- `cookies()` from `next/headers` is **async** → always `await cookies()`.
- When in doubt about Next 16 behavior, consult `node_modules/next/dist/docs/`.
  Your training data likely predates these changes.

### i18n

- `next-intl` with **path-prefixed routing**: `/it` (default), `/en`. All
  pages live under `src/app/[locale]/`.
- Routing config: `src/i18n/routing.ts`.
- Request config: `src/i18n/request.ts`.
- Strings: `src/messages/{it,en}.json`. Always update both files when adding
  copy keys.
- Legal pages (`privacy`, `cookie-policy`, `note-legali`) embed prose
  directly in `page.tsx` and branch on locale internally because the text
  is too long and structured for flat JSON.

### Components

- `src/components/sections/*` — full-width home-page sections.
- `src/components/{site-header,site-footer,wordmark,phone-frame,reveal,brief-form,cal-embed,locale-switcher,legal-shell,plausible,json-ld}.tsx` — shared building blocks.
- `src/components/ui/button.tsx` — the only "ui-kit" primitive so far. Don't
  pull in shadcn/ui or another component library for this repo.
- `reveal.tsx` uses **native CSS transitions + IntersectionObserver**, not
  `motion/react`. The `motion` dep was removed in commit `671f212` — do not
  reintroduce it.

### API

- `POST /api/brief` (`src/app/api/brief/route.ts`) → Resend.
  - Honeypot field: `website` (filled = bot, return 200 silently).
  - Returns 200 even if `RESEND_API_KEY` is unset, so local dev works.
  - Do not log raw form input to console without redacting email.

### SEO

- `app/[locale]/opengraph-image.tsx` generates OG image at request time.
- `app/sitemap.ts` — when adding a new route, add it here for **both** locales.
- `app/robots.ts` — currently allows everything; tighten if/when staging URL appears.
- `components/json-ld.tsx` — Organization + WebSite structured data on every page.

## Working conventions

- **Edit existing files, don't sprawl new ones.** This is a small site.
- **No comments unless WHY is non-obvious.** Identifier names should carry intent.
- **Do not add documentation files (*.md) unless the user asks for them.**
  This file and `docs/PLAN.md` are exceptions because the user explicitly
  asked for an onboarding/handoff doc.
- **Don't introduce a CMS, a database, or auth** without an explicit
  discussion. The site is meant to be stateless beyond the brief form.
- **Don't add a consent banner** unless we also add a cookie-dropping
  script. Right now we drop zero cookies — see PLAN.md §2.
- **Match the luxury dark style** when adding sections: Oswald heavy type,
  generous whitespace, `rgba(255,255,255,0.15)` borders, no shadows, no color.
  Typography and space are the only hierarchy tools.

## Outstanding inputs needed before launch

See [docs/PLAN.md §4](./docs/PLAN.md) — currently 6 items blocked on the
user (PEC, reel MP4s, copy approval, palette, Cal handle, Resend DNS).
