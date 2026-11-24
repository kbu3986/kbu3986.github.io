# PureGram Index (순수그램 가성비 사전)

**True Cost Per Active Gram & 1v1 Supplement Versus Engine**  
*(단백질·영양제 유효성분 1g당 진짜 가격 & 일대일 비교 사전)*

## Overview
PureGram exposes the **Supplement Filler Tax** across 6 high-frequency repeat-purchase fitness & longevity categories (`whey-protein`, `plant-protein`, `creatine`, `omega-3`, `electrolytes`, `rtd-protein`) in English (`/en`) and Korean (`/ko`).

- **48 Real-World Global & Korean Products** (96 static product audit pages)
- **114 Curated 1v1 Head-to-Head Matchups** (228 static comparison pages)
- **6 Category Leaderboards** (12 static category pages)
- **Interactive Filler Tax & Pure Gram Calculator** + **Live Sortable Leaderboard**
- **340+ Total Prerendered Static Pages (SSG)** with full `hreflang` alternates, JSON-LD (`WebApplication`, `ItemList`, `Product`, `FAQPage`), `sitemap.xml`, and `robots.txt`.

## Environment Variables (Optional)
- `NEXT_PUBLIC_SITE_URL` — Canonical base URL (defaults to `https://puregram.vercel.app`)
- `NEXT_PUBLIC_ADSENSE_ID` — Google AdSense publisher ID (e.g. `ca-pub-xxxxxxxxxxxxxxxx`)
- `NEXT_PUBLIC_AMAZON_TAG` — Amazon Associates tracking tag
- `NEXT_PUBLIC_IHERB_CODE` — iHerb rewards/partner code
- `NEXT_PUBLIC_COUPANG_SUBID` — Coupang Partners subId

## Commands
```bash
# Refresh daily FX & retail snapshot feed (zero paid API keys required)
npm run update-prices

# Build all 340+ static pages
npm run build

# Local preview on assigned port 3103
npm run start -- -p 3103
```
