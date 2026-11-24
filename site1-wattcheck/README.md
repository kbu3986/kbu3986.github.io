# WattCheck (와트체크)

Global + Korean Programmatic SEO Web Application for **2026 Airline Power Bank Wh Rules, Bidirectional mAh ↔ Wh ↔ kWh Conversion & Real-World Device Charge Sizing**.

## Tech Stack
- **Framework**: Next.js 15 (App Router, Full SSG via `generateStaticParams` + Static Export ready)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS + `lucide-react`
- **External Paid APIs**: Zero (100% deterministic engineering formulas & static regulatory database)

## Programmatic SEO Route Summary (201 Static Routes / 194 Sitemap URLs)
- `/` — Root English canonical entry
- `/[locale]` (`en`, `ko`) — Bidirectional mAh ↔ Wh ↔ kWh Calculator, Voltage Presets, Efficiency Slider, Cabin Safety Verdict, Korea 2026 MOLIT Checklist & Device Estimator
- `/[locale]/devices` & `/[locale]/device/[slug]` — **40 popular devices × 2 locales = 80 SSG routes**
- `/[locale]/airlines` & `/[locale]/airline/[slug]` — **30 global & Korean airlines × 2 locales = 60 SSG routes**
- `/[locale]/mah` & `/[locale]/mah/[amount]` — **20 mAh capacities × 2 locales = 40 SSG routes**
- `/[locale]/korea-2026-rules` — Dedicated 2025–2026 South Korea MOLIT cabin battery rules guide (`2 SSG routes`)
- `/[locale]/about` & `/[locale]/privacy` — AdSense-compliant Methodology, Contact, Cookie/DART & Affiliate Privacy Policy (`4 SSG routes`)
- `/sitemap.xml` & `/robots.txt` — Full hreflang-annotated XML sitemap (194 URLs) & crawler config

## Turnkey Environment Variables (All Optional)
- `NEXT_PUBLIC_SITE_URL` — Canonical production domain (defaults to `https://kbu3986.github.io/wattcheck-global`)
- `NEXT_PUBLIC_ADSENSE_ID` — Google AdSense ID (`ca-pub-XXXXXXXXXXXXXXXX`); automatically injects `<meta name="google-adsense-account">`, AdSense loader `<script>`, and generates `public/ads.txt` on `prebuild`
- `NEXT_PUBLIC_GSC_VERIFICATION` — Google Search Console verification token (accepts raw token or full `<meta>` tag)
- `NEXT_PUBLIC_NAVER_VERIFICATION` — Naver Search Advisor verification token (accepts raw token or full `<meta>` tag)
- `NEXT_PUBLIC_AMAZON_TAG` — Amazon Associates tag for `/en` pages (defaults to `wattcheck-20`)
- `NEXT_PUBLIC_COUPANG_PARTNERS_ID` — Coupang Partners tracking ID (e.g. `AF1234567`) for `/ko` pages
- `NEXT_PUBLIC_COUPANG_SUBID` — Coupang Partners `subId` tracking label for `/ko` pages
- `NEXT_PUBLIC_COUPANG_REDIRECT_URL` — Optional custom `https://link.coupang.com/a/...` shortlink for primary `/ko` CTA
- `NEXT_PUBLIC_COUPANG_IFRAME_URL` — Optional Coupang Dynamic Banner iframe URL (or full `<iframe>` snippet) rendered inside `<AffiliateCards />` on `/ko` pages

## Local Build & Verification
```powershell
npm install
npm run build
npm run start -- -p 3101
```
