# reelificio-web

Marketing site for [reelificio.com](https://www.reelificio.com). Built for Sweet Life Faktory.

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind v4
- **next-intl** for IT / EN with path-prefixed routing
- **motion** for scroll reveal + phone-frame tilt
- **Resend** for the `/api/brief` lead form
- **Cal.com** embed on `/contatti`
- **Vercel Analytics + Speed Insights + Plausible** (all cookieless — no consent banner needed)

## Local development

```bash
pnpm install
cp .env.example .env.local   # fill in keys (see below)
pnpm dev                     # http://localhost:3000
```

Visiting `/` redirects to `/it`.

### Environment variables

| Var                              | Where        | Purpose                                                  |
| -------------------------------- | ------------ | -------------------------------------------------------- |
| `NEXT_PUBLIC_CAL_LINK`           | client/build | Cal.com handle, e.g. `reelificio/discovery`              |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`   | client/build | Set to enable Plausible. Leave empty to disable.         |
| `NEXT_PUBLIC_PLAUSIBLE_SRC`      | client/build | Override Plausible script URL (for self-host)            |
| `RESEND_API_KEY`                 | server only  | Required for the brief form to actually send mail        |
| `RESEND_FROM`                    | server only  | Verified sender (e.g. `Reelificio <noreply@reelificio.com>`) |
| `RESEND_TO`                      | server only  | Inbox receiving briefs (default `hello@reelificio.com`)  |

## Scripts

```bash
pnpm dev        # dev server
pnpm build      # production build
pnpm start      # serve production build
pnpm typecheck  # tsc --noEmit
```

## Deploy (Vercel)

1. Create a new Vercel project from this repo.
2. Add the environment variables above in Vercel.
3. Set production region to `fra1` (Frankfurt) for EU latency / GDPR posture.
4. Connect domain `www.reelificio.com` (and apex `reelificio.com` → 308 to www).

### DNS records to add on GoDaddy

Once the Vercel domain is wired, you'll need:

- Vercel: `A` and/or `CNAME` records that Vercel surfaces in the Domains tab.
- Resend: SPF, DKIM, DMARC records (provided by Resend when you verify the
  domain). Without these the brief form mail goes to spam.
- Microsoft 365: already configured (`hello@reelificio.com` is live).

## Content

Copy lives in `src/messages/it.json` and `src/messages/en.json`. Edit those
files and the site picks up the new strings. Legal pages have handwritten IT/EN
prose in `src/app/[locale]/{privacy,cookie-policy,note-legali}/page.tsx`.

## Media placeholders

`PhoneFrame` and case-study cards currently render a gradient placeholder. When
you have the reel MP4s, drop them in `public/reels/` and pass the path as the
`videoSrc` prop (see `src/components/sections/hero.tsx` and
`src/components/sections/case-studies.tsx`).
