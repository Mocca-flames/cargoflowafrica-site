# Cargo Flow Africa — Next.js Migration Handoff Document

## 1. Project Overview & Location
- **Original Codebase:** `c:\Users\MauriX\Documents\DEVS\cargo_flow\cargoflow COPY` (legacy static export with minified 78k line bundle and 6k line style sheet).
- **Refactored Next.js Project:** `c:\Users\MauriX\Documents\DEVS\cargo_flow\cargoflow-nextjs`
- **Framework & Runtime:** Next.js 16 (App Router), React 19, TypeScript.
- **Styling Architecture:** Pure standard CSS & Component-scoped **CSS Modules** (`*.module.css`). **No Tailwind CSS.**

---

## 2. What Has Been Completed ✅

### Core Architecture & App Router Setup
- Initialized Next.js project with TypeScript and App Router enabled.
- Defined path aliases (`@/*` pointing to project root).
- Configured [next.config.ts](file:///c:/Users/MauriX/Documents/DEVS/cargo_flow/cargoflow-nextjs/next.config.ts) with response compression, AVIF/WebP image optimization, disabled `x-powered-by`, and strict security headers (CSP permissions, X-Frame-Options, nosniff, referrer-policy).

### CSS & Design System
- Created [app/globals.css](file:///c:/Users/MauriX/Documents/DEVS/cargo_flow/cargoflow-nextjs/app/globals.css) containing:
  - Design tokens (`--color-background`, `--color-accent`, `--color-muted`, `--color-border`, etc.).
  - Typography, layout tokens, container utilities, and button variations (`.btn`, `.btn-primary`, `.btn-secondary`, `.btn-cta`, `.btn-outline`).
  - Google Fonts preconnect and import for `DM Sans`, `Sora`, and `JetBrains Mono`.

### SEO From Day 1
- **Metadata API:** Configured comprehensive root metadata in [app/layout.tsx](file:///c:/Users/MauriX/Documents/DEVS/cargo_flow/cargoflow-nextjs/app/layout.tsx) (OpenGraph, Twitter cards, canonical tags, mobile theme-color, bot index directives).
- **Structured Data (JSON-LD):** Included JSON-LD schemas for `Organization`, `LocalBusiness` (Botswana headquarters, opening hours, contact details), and `Service` (Freight Brokerage).
- **Sitemap & Robots:**
  - [app/sitemap.ts](file:///c:/Users/MauriX/Documents/DEVS/cargo_flow/cargoflow-nextjs/app/sitemap.ts) auto-generates dynamic `/sitemap.xml`.
  - [app/robots.ts](file:///c:/Users/MauriX/Documents/DEVS/cargo_flow/cargoflow-nextjs/app/robots.ts) auto-generates dynamic `/robots.txt`.
- **PWA / Manifest:** Added [public/site.webmanifest](file:///c:/Users/MauriX/Documents/DEVS/cargo_flow/cargoflow-nextjs/public/site.webmanifest).

### Human-Maintainable Component Structure
Extracted single-file HTML into modular components and data stores:

```
cargoflow-nextjs/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/
│   │   ├── Header/          (Header.tsx, Header.module.css - includes mobile drawer state)
│   │   └── Footer/          (Footer.tsx, Footer.module.css)
│   └── home_page/
│       ├── Hero/            (Hero.tsx, Hero.module.css - hero image + transit card)
│       ├── About/           (About.tsx, About.module.css - 6 core pillars)
│       ├── Services/        (Services.tsx, Services.module.css - data-driven)
│       ├── Industries/      (Industries.tsx, Industries.module.css - data-driven)
│       ├── Process/         (Process.tsx, Process.module.css - 5-step sticky layout)
│       ├── Network/         (Network.tsx, Network.module.css - 12 SADC countries & vetting)
│       └── Contact/         (Contact.tsx, Contact.module.css - contact card & enquiry form CTA)
├── lib/
│   └── data/
│       ├── services.ts      (Centralized service card content & IDs)
│       ├── industries.ts    (Centralized industry details & icons)
│       └── process-steps.ts (Centralized process step content)
└── public/
    ├── images/              (hero_landing.avif, logo-desktop.avif, logo-mobile.avif)
    ├── profile.pdf
    ├── favicon-16x16.png
    ├── android-chrome-192x192.png
    ├── android-chrome-512x512.png
    └── site.webmanifest
```

### Static Build Validation
- Executed `npm run build` in `cargoflow-nextjs`.
- **Status:** Build succeeds with **0 errors**, fully static prerendered routes (`/`, `/_not-found`, `/robots.txt`, `/sitemap.xml`).

---

## 3. What Is Left & Recommended Next Steps 📋

1. **Development Server Verification:**
   - Run `npm run dev` in `c:\Users\MauriX\Documents\DEVS\cargo_flow\cargoflow-nextjs` and inspect in the browser at `http://localhost:3000`.
2. **Dedicated Sub-pages (Optional/Future Growth):**
   - The current architecture supports in-page smooth navigation (`#about`, `#services`, `#industries`, `#process`, `#contact`).
   - If dedicated landing pages are needed for SEO keyword targeting (e.g., `/services/mining-transport`, `/industries/agriculture`), create sub-routes inside `app/services/[slug]/` or standalone folders `app/about/page.tsx`, etc., reusing existing `components/home_page` sections.
3. **Contact / Quote Form Interactivity:**
   - Currently, the CTAs open `mailto:` links and WhatsApp direct links matching the original website design.
   - If an interactive form (e.g. quote request form submission via Server Actions or email service like Resend) is needed, a Form component can be created under `components/ui/QuoteForm/`.
4. **Cloudflare Pages / Vercel Deployment:**
   - Note the presence of `cloudflare-pages-push-SKILL.md` in the original directory. If deploying to Cloudflare Pages or Vercel, link git repository from `cargoflow-nextjs`.

---

# Deployment & SEO Handoff (updated 2 Nov 2026)

## Architecture
- Repo: https://github.com/Mocca-flames/cargoflowafrica-site (public). `dev` = editable source (default branch). `gh-pages` = static build only (never edit by hand).
- Static export (`output: "export"`). One codebase builds two country sites via env vars:
  - `SITE=za|bw` (see `lib/site.ts`): sets canonical, hreflang, og:locale, sitemap, robots.
  - `BASE_PATH` (only for GitHub Pages): `/cargoflowafrica-site`. Empty everywhere else.
- Asset paths go through `withBase()` in `lib/withBase.ts`. Always use it for `/images/...`, `/profile.pdf` etc.
- `mailto:` addresses in Contact/Footer are intentionally per-office (.co.bw and .co.za). Do not "fix" them.

## Hosts
| Purpose | URL | Source |
|---|---|---|
| Live SA (production) | https://www.cargoflowafrica.co.za | Pages project `cargo-flow-africa` (SITE=za) |
| Live Botswana (production) | https://www.cargoflowafrica.co.bw | Pages project `cargo-flow-africa-bw` (SITE=bw) |
| GitHub preview | https://mocca-flames.github.io/cargoflowafrica-site/ | `gh-pages` branch |

## Workflow
1. Edit and preview: `npm run dev`
2. Save: `git add -A && git commit -m "msg" && git push origin dev` (live sites untouched)
3. GitHub preview: `bash scripts/deploy.sh`
4. Production (both countries): `bash scripts/deploy-cf.sh`
Both scripts refuse to run with uncommitted tracked changes.

## SEO design (do not change without reading this)
- Two ccTLD sites, each with a self-referencing canonical on its own `www` host, trailing slash.
- hreflang: `en-ZA`, `en-BW`, `x-default` (-> .co.za). Written manually in `<head>` in `app/layout.tsx` because Next strips the trailing slash from cross-origin `alternates.languages`. Canonical and hreflang URLs must match exactly.
- sitemap.xml and robots.txt are generated per site and point at their own host. They are NOT byte-identical across domains on purpose (identical files would make .co.bw advertise .co.za URLs).
- Never canonicalise one country to the other (cross-domain canonical can make hreflang ignored).

## Status
Done:
- Both Pages projects deployed; .co.za domains on `cargo-flow-africa`, .co.bw domains moved to `cargo-flow-africa-bw`.
- Verified: each .bw host serves a .co.bw canonical, sitemap and robots.txt.
- Rollback point for the old site: Pages project `cargo-flow-africa`, deployment `33b2409f` (Deployments tab, "Rollback").

## TODO (remaining)
1. **Apex -> www 301 redirects (not working yet).** `cargoflowafrica.co.za` and `cargoflowafrica.co.bw` still return 200. In each Cloudflare zone: Rules > Redirect Rules > Create rule (deploy, not draft):
   - Filter: `(http.host eq "cargoflowafrica.co.za")` (use .bw in the other zone)
   - Action: Dynamic, `concat("https://www.cargoflowafrica.co.za", http.request.uri.path)`, 301, preserve query string.
   - Test: `curl -sI "https://cargoflowafrica.co.za/?a=1" | grep -iE "^HTTP|^location"` should show 301 to www.
2. **Google Search Console:** add a property for each `www` host (or domain properties), submit each site's own `/sitemap.xml`, then check International Targeting / Page indexing after a few weeks.
3. **GitHub Pages preview is indexable and duplicates the .co.za canonical.** Decide whether to add `noindex` for that build or make the repo's Pages site private/disabled once sign-off is complete.
4. Confirm the .bw `www` and apex domains show Active in `cargo-flow-africa-bw` > Custom domains.
5. Untracked `cloudflare-pages-push-SKILL.md` in the project root is reference only; add to `.gitignore` or delete.

## Gotchas
- Pasting multi-line heredocs into Git Bash can scramble; verify with `cat` / `bash -n` after.
- Wrangler is logged in via OAuth (`npx wrangler whoami`). No API tokens are stored in the repo.
- LF/CRLF warnings on commit are harmless.
