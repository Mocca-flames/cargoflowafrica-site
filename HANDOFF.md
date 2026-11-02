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
