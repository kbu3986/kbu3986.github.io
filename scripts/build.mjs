import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "out");

// Load .env.production.local / .env.local / .env if present
function loadEnvFile(filename) {
  const filePath = path.join(ROOT, filename);
  if (!fs.existsSync(filePath)) return;
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = val;
    }
  }
}

loadEnvFile(".env.production.local");
loadEnvFile(".env.local");
loadEnvFile(".env");

function extractMetaContent(raw) {
  if (!raw) return "";
  const trimmed = String(raw).trim();
  const match = trimmed.match(/content\s*=\s*["']([^"']+)["']/i);
  if (match) return match[1].trim();
  return trimmed.replace(/[<>"']/g, "").trim();
}

function normalizeAdsenseId(raw) {
  if (!raw) return { clientId: "", pubId: "" };
  const trimmed = String(raw).trim();
  const match = trimmed.match(/(?:ca-)?pub-(\d{10,20})/i);
  if (match) {
    return {
      clientId: `ca-pub-${match[1]}`,
      pubId: `pub-${match[1]}`,
    };
  }
  return { clientId: "", pubId: "" };
}

const SITE_URL = "https://kbu3986.github.io";
const { clientId: adsenseClientId, pubId: adsensePubId } = normalizeAdsenseId(
  process.env.NEXT_PUBLIC_ADSENSE_ID || ""
);
const gscToken = extractMetaContent(process.env.NEXT_PUBLIC_GSC_VERIFICATION || "");
const naverToken = extractMetaContent(process.env.NEXT_PUBLIC_NAVER_VERIFICATION || "");

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHeadTags({ title, description, canonicalPath, locale = "en" }) {
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const tags = [
    `<meta charset="utf-8" />`,
    `<meta name="viewport" content="width=device-width, initial-scale=1" />`,
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${canonicalUrl}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${canonicalUrl}" />`,
    `<meta property="og:locale" content="${locale === "ko" ? "ko_KR" : "en_US"}" />`,
  ];

  if (canonicalPath === "/" || canonicalPath === "/ko/") {
    tags.push(`<link rel="alternate" hreflang="en" href="${SITE_URL}/" />`);
    tags.push(`<link rel="alternate" hreflang="ko" href="${SITE_URL}/ko/" />`);
    tags.push(`<link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`);
  }

  if (gscToken) {
    tags.push(`<meta name="google-site-verification" content="${escapeHtml(gscToken)}" />`);
  }
  if (naverToken) {
    tags.push(`<meta name="naver-site-verification" content="${escapeHtml(naverToken)}" />`);
  }
  if (adsenseClientId) {
    tags.push(`<meta name="google-adsense-account" content="${escapeHtml(adsenseClientId)}" />`);
    tags.push(
      `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${escapeHtml(
        adsenseClientId
      )}" crossorigin="anonymous"></script>`
    );
  }

  return tags.join("\n  ");
}

const SHARED_CSS = `
  :root {
    --bg: #f8fafc;
    --card: #ffffff;
    --text: #0f172a;
    --muted: #475569;
    --border: #e2e8f0;
    --accent: #2563eb;
    --accent-dark: #1d4ed8;
    --emerald: #059669;
    --amber: #d97706;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Pretendard", "Malgun Gothic", sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.65;
  }
  a { color: var(--accent); text-decoration: none; }
  a:hover { text-decoration: underline; }
  .container { max-width: 1120px; margin: 0 auto; padding: 0 20px; }
  header {
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 20;
  }
  .nav-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    gap: 16px;
  }
  .brand {
    font-weight: 800;
    font-size: 1.15rem;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .brand-badge {
    background: linear-gradient(135deg, #2563eb, #4f46e5);
    color: #fff;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 0.95rem;
  }
  .nav-links { display: flex; align-items: center; gap: 18px; font-size: 0.92rem; font-weight: 600; }
  .nav-links a { color: var(--muted); }
  .nav-links a:hover { color: var(--text); text-decoration: none; }
  .lang-pill {
    display: inline-flex;
    border: 1px solid var(--border);
    background: #f1f5f9;
    border-radius: 999px;
    padding: 3px;
    font-size: 0.8rem;
    font-weight: 700;
  }
  .lang-pill a {
    padding: 4px 10px;
    border-radius: 999px;
    color: var(--muted);
    text-decoration: none;
  }
  .lang-pill a.active {
    background: #ffffff;
    color: var(--accent);
    box-shadow: 0 1px 2px rgba(0,0,0,0.06);
  }
  .hero {
    padding: 64px 0 42px;
    text-align: center;
  }
  .eyebrow {
    display: inline-block;
    background: #dbeafe;
    color: #1e40af;
    font-size: 0.78rem;
    font-weight: 700;
    padding: 5px 12px;
    border-radius: 999px;
    margin-bottom: 16px;
    letter-spacing: 0.02em;
  }
  .hero h1 {
    font-size: clamp(1.9rem, 4vw, 2.85rem);
    font-weight: 850;
    letter-spacing: -0.025em;
    line-height: 1.2;
    max-width: 820px;
    margin: 0 auto 16px;
  }
  .hero p {
    color: var(--muted);
    font-size: 1.08rem;
    max-width: 720px;
    margin: 0 auto;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
    gap: 24px;
    margin: 24px 0 56px;
  }
  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.03);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }
  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 26px rgba(15, 23, 42, 0.07);
  }
  .tag {
    display: inline-block;
    font-size: 0.73rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 4px 10px;
    border-radius: 8px;
    margin-bottom: 14px;
  }
  .tag-blue { background: #eff6ff; color: #1d4ed8; }
  .tag-emerald { background: #ecfdf5; color: #047857; }
  .tag-amber { background: #fffbeb; color: #b45309; }
  .card h2 { font-size: 1.35rem; font-weight: 800; margin-bottom: 8px; }
  .card p { color: var(--muted); font-size: 0.95rem; margin-bottom: 18px; }
  .feature-list { list-style: none; margin-bottom: 22px; font-size: 0.88rem; color: #334155; }
  .feature-list li { margin-bottom: 7px; padding-left: 18px; position: relative; }
  .feature-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--emerald);
    font-weight: 800;
  }
  .btn-row { display: flex; gap: 10px; flex-wrap: wrap; }
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.88rem;
    text-decoration: none !important;
    transition: background 0.15s ease;
  }
  .btn-primary { background: var(--text); color: #ffffff; flex: 1; }
  .btn-primary:hover { background: #1e293b; }
  .btn-secondary { background: #f1f5f9; color: #334155; border: 1px solid var(--border); }
  .btn-secondary:hover { background: #e2e8f0; }
  .info-section {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 36px;
    margin-bottom: 56px;
  }
  .info-section h2 { font-size: 1.5rem; margin-bottom: 14px; }
  .info-section h3 { font-size: 1.12rem; margin: 22px 0 8px; }
  .info-section p, .info-section li { color: var(--muted); font-size: 0.96rem; margin-bottom: 10px; }
  .info-section ul { padding-left: 20px; margin-bottom: 12px; }
  footer {
    border-top: 1px solid var(--border);
    background: #ffffff;
    padding: 36px 0;
    margin-top: 48px;
    font-size: 0.88rem;
    color: var(--muted);
  }
  .footer-inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
  }
  .footer-links { display: flex; gap: 18px; flex-wrap: wrap; font-weight: 600; }
`;

function renderHeader(locale = "en") {
  const isKo = locale === "ko";
  return `
  <header>
    <div class="container nav-bar">
      <a href="${isKo ? "/ko/" : "/"}" class="brand">
        <span class="brand-badge">SE</span>
        <span>${isKo ? "실생활 계산기 & 데이터 인덱스" : "Precision Utility & Data Index"}</span>
      </a>
      <nav class="nav-links">
        <a href="/specmatrix-global/${isKo ? "ko" : "en"}">SpecMatrix</a>
        <a href="/wattcheck-global/${isKo ? "ko" : "en"}">WattCheck</a>
        <a href="/worthmove-global/${isKo ? "ko" : "en"}">WorthMove</a>
        <a href="/puregram-global/${isKo ? "ko" : "en"}">PureGram</a>
        <a href="/about.html">${isKo ? "소개 및 검증원칙" : "About"}</a>
        <a href="/privacy.html">${isKo ? "개인정보처리방침" : "Privacy"}</a>
        <div class="lang-pill" aria-label="Language Switcher">
          <a href="/" class="${!isKo ? "active" : ""}">EN</a>
          <a href="/ko/" class="${isKo ? "active" : ""}">한국어</a>
        </div>
      </nav>
    </div>
  </header>`;
}

function renderFooter(locale = "en") {
  const isKo = locale === "ko";
  return `
  <footer>
    <div class="container footer-inner">
      <div>
        <strong>${isKo ? "Precision Web Calculators & Consumer Data Index" : "Precision Web Calculators & Consumer Data Index"}</strong>
        <p style="margin-top:4px;font-size:0.82rem;">
          ${
            isKo
              ? "모든 계산 공식은 국제 항공 규정(IATA/국토교통부), 2026 세법·4대보험 요율 및 제품 영양성분표를 기반으로 검증됩니다."
              : "Engineering-verified calculators built on 2026 IATA/FAA aviation standards, statutory tax tables, and nutrition label audits."
          }
        </p>
      </div>
      <div class="footer-links">
        <a href="/">English Hub</a>
        <a href="/ko/">한국어 허브</a>
        <a href="/about.html">${isKo ? "사이트 소개 (About)" : "About & Methodology"}</a>
        <a href="/privacy.html">${isKo ? "개인정보처리방침 (Privacy)" : "Privacy Policy"}</a>
        <a href="/sitemap.xml">Sitemap</a>
      </div>
    </div>
  </footer>`;
}

function buildHomeEn() {
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Precision Utility & Consumer Data Index",
    url: `${SITE_URL}/`,
    inLanguage: ["en", "ko"],
    hasPart: [
      {
        "@type": "WebApplication",
        name: "Pin2Pin Global — Datasheet-Verified Semiconductor Pinout & Cross-Reference DB",
        url: `${SITE_URL}/pin2pin-global/en/`,
      },
      {
        "@type": "WebApplication",
        name: "SpecMatrix Global — Evidence-Anchored Product Spec Matrices (WattCheck · PureGram · CycleGear)",
        url: `${SITE_URL}/specmatrix-global/en`,
      },
      {
        "@type": "WebApplication",
        name: "WattCheck — Airline Power Bank Wh Rules & Device Charge Sizer",
        url: `${SITE_URL}/wattcheck-global/en`,
      },
      {
        "@type": "WebApplication",
        name: "WorthMove — True Hourly Wage & RTO vs Remote Calculator",
        url: `${SITE_URL}/worthmove-global/en`,
      },
      {
        "@type": "WebApplication",
        name: "PureGram — Supplement Purity & Cost Per Active Gram Index",
        url: `${SITE_URL}/puregram-global/en`,
      },
    ],
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${buildHeadTags({
    title: "Precision Consumer Calculators & Data Index — WattCheck, WorthMove & PureGram",
    description:
      "Free bilingual (English & Korean) engineering calculators and consumer value indexes covering 2026 airline lithium battery Wh limits, after-tax true hourly wage & RTO break-even math, and supplement cost per pure active gram.",
    canonicalPath: "/",
    locale: "en",
  })}
  <style>${SHARED_CSS}</style>
  <script type="application/ld+json">${jsonLd}</script>
</head>
<body>
  ${renderHeader("en")}
  <main class="container">
    <section class="hero">
      <span class="eyebrow">1,290+ Bilingual Engineering Guides, Spec Matrices &amp; IC Cross-Ref Tools</span>
      <h1>Transparent Math for Travel Safety, Career Decisions, Gear & Daily Nutrition</h1>
      <p>
        Zero paywalls, zero sign-ups, and zero guesswork. Explore four specialized calculation &amp; evidence-anchored comparison engines audited against 2026 regulatory rules, tax brackets, manufacturer spec sheets, and verified nutrition labels.
      </p>
    </section>

    <section class="grid" aria-label="Web Applications">
      <article class="card" style="border-color:#93c5fd;">
        <div>
          <span class="tag tag-blue">NEW · Evidence-Anchored Lab · 200+ Pages</span>
          <h2>SpecMatrix Global (스펙매트릭스)</h2>
          <p>Model-by-model verified specification matrices, 1:1 weighted VS simulators, and live calculators spanning 60 audited SKUs across power banks/GaN, endurance gels &amp; road cycling gear.</p>
          <ul class="feature-list">
            <li><a href="/specmatrix-global/en/wattcheck/matrix/airlines-30">30-Airline Battery Rules &amp; USB-PD Multi-Port Matrix (25 SKUs)</a></li>
            <li><a href="/specmatrix-global/en/puregram/matrix/energy-gels">Endurance Energy Gels &amp; Creatine True Cost per Active Gram (20 SKUs)</a></li>
            <li><a href="/specmatrix-global/en/cyclegear/matrix/power-meters">Road Cycling Power Meters, GPS &amp; Hookless Tire Safety Matrix (15 SKUs)</a></li>
          </ul>
        </div>
        <div class="btn-row">
          <a class="btn btn-primary" href="/specmatrix-global/en">Open SpecMatrix (EN) →</a>
          <a class="btn btn-secondary" href="/specmatrix-global/ko">한국어</a>
        </div>
      </article>

      <article class="card">
        <div>
          <span class="tag tag-emerald">B2B Electronics · 200+ Pages</span>
          <h2>Pin2Pin Global (Semiconductor Cross-Ref)</h2>
          <p>Official PDF datasheet &amp; 300 DPI pinout-verified replacement cross-reference covering 50 iconic LDOs, DC-DC buck/boost ICs, and op-amps with live thermal &amp; ripple calculators.</p>
          <ul class="feature-list">
            <li>85 head-to-head IC comparisons &amp; 50 drop-in alternative matrices</li>
            <li>21 crisp SVG package pinouts (SOT-23, SOIC-8, TO-252, SOT-223)</li>
            <li>Interactive LDO Thermal, DC-DC Ripple &amp; Op-Amp GBWP calculators</li>
          </ul>
        </div>
        <div class="btn-row">
          <a class="btn btn-primary" href="/pin2pin-global/en/">Open Pin2Pin (EN) →</a>
        </div>
      </article>

      <article class="card">
        <div>
          <span class="tag tag-blue">Aviation & Electronics · 190+ Guides</span>
          <h2>WattCheck (와트체크)</h2>
          <p>Instant bidirectional mAh ↔ Wh ↔ kWh converter, 2026 airline carry-on lithium battery compliance checker, and real-world 82% DC-DC USB-C PD device charge estimator.</p>
          <ul class="feature-list">
            <li>30 global & Korean airline carry-on rules (TSA/FAA, Korean Air, Emirates, ANA)</li>
            <li>40 smartphones, laptops, handheld consoles, drones & CPAP battery specs</li>
            <li>2025–2026 Korea MOLIT zip-lock pouch & overhead bin safety checklist</li>
          </ul>
        </div>
        <div class="btn-row">
          <a class="btn btn-primary" href="/wattcheck-global/en">Open WattCheck (EN) →</a>
          <a class="btn btn-secondary" href="/wattcheck-global/ko">한국어</a>
        </div>
      </article>

      <article class="card">
        <div>
          <span class="tag tag-emerald">Personal Finance & Career · 326+ Guides</span>
          <h2>WorthMove (이직손익판독기)</h2>
          <p>Side-by-side True Hourly Wage & Return-to-Office (RTO) break-even calculator with progressive US/Global & 2026 Korean 4-major-insurance after-tax take-home engines.</p>
          <ul class="feature-list">
            <li>Computes net hourly pay after commute hours, transit/fuel drain & unpaid OT</li>
            <li>Binary-search Break-Even Offer Solver + downloadable PNG thermal receipt</li>
            <li>172 salary tables, 48 RTO showdowns & 36 major commuter corridor analyses</li>
          </ul>
        </div>
        <div class="btn-row">
          <a class="btn btn-primary" href="/worthmove-global/en">Open WorthMove (EN) →</a>
          <a class="btn btn-secondary" href="/worthmove-global/ko">한국어</a>
        </div>
      </article>

      <article class="card">
        <div>
          <span class="tag tag-amber">Health & Supplement Value · 342+ Guides</span>
          <h2>PureGram (순수그램 가성비 사전)</h2>
          <p>Filler-tax auditor & live sortable leaderboard ranking protein powders, creatine, omega-3 (pure EPA+DHA), and electrolytes strictly by verified cost per active gram.</p>
          <ul class="feature-list">
            <li>48 bestselling global & Korean supplements audited for active-ingredient purity %</li>
            <li>228 head-to-head 1v1 comparison pages across 6 supplement categories</li>
            <li>Omega-3 ranked by combined pure EPA+DHA mg—never raw fish oil weight</li>
          </ul>
        </div>
        <div class="btn-row">
          <a class="btn btn-primary" href="/puregram-global/en">Open PureGram (EN) →</a>
          <a class="btn btn-secondary" href="/puregram-global/ko">한국어</a>
        </div>
      </article>
    </section>

    <section class="info-section">
      <h2>Why Independent Engineering Calculators Matter</h2>
      <p>
        Marketing labels routinely obscure the real numbers consumers need: power banks advertise mAh at 3.7V while airlines enforce Watt-hours (Wh) and voltage step-up consumes ~18% energy; job offers headline gross salary while ignoring 500+ annual hours lost to commuting; supplement tubs highlight total weight while hiding 20–45% non-active fillers.
      </p>
      <p>
        Every tool hosted on this hub runs 100% client-side in your browser with open, inspectable formulas and full bilingual support in English and Korean. Read our <a href="/about.html">Methodology & Editorial Standards</a> or review our <a href="/privacy.html">Privacy & Cookie Policy</a>.
      </p>
    </section>
  </main>
  ${renderFooter("en")}
</body>
</html>`;
}

function buildHomeKo() {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  ${buildHeadTags({
    title: "실생활 정밀 계산기 & 가성비 데이터 허브 — 와트체크 · 이직손익판독기 · 순수그램",
    description:
      "항공기 보조배터리 기내반입 Wh 계산기(와트체크), 2026 연봉 실수령액·통근 진짜 시급 판독기(이직손익판독기), 단백질·오메가3 순수 유효성분 1g당 가격 비교(순수그램)를 무료로 제공합니다.",
    canonicalPath: "/ko/",
    locale: "ko",
  })}
  <style>${SHARED_CSS}</style>
</head>
<body>
  ${renderHeader("ko")}
  <main class="container">
    <section class="hero">
      <span class="eyebrow">1,290+ 한·영 정밀 계산기 · 실제품 스펙 매트릭스 · 반도체 대체 DB 수록</span>
      <h1>출국 준비, 연봉·이직, 영양제, 로드사이클 기어까지 숫자로 정확하게 검증하세요</h1>
      <p>
        회원가입 없이 브라우저에서 즉시 작동하는 4대 생활·장비 엔지니어링 계산기 및 실데이터 비교 매트릭스 컬렉션입니다. 2026년 최신 항공 안전 규정, 세법·4대보험 요율, 공식 스펙시트와 영양성분표를 반영했습니다.
      </p>
    </section>

    <section class="grid" aria-label="서비스 목록">
      <article class="card" style="border-color:#93c5fd;">
        <div>
          <span class="tag tag-blue">NEW · 실제품 스펙 검증 매트릭스 · 200+ 페이지</span>
          <h2>스펙매트릭스 (SpecMatrix Global)</h2>
          <p>공식 스펙시트·영양성분표·항공사 규정 원문에 고정된 60개 실제품 정밀 프로파일, 1:1 가중치 VS 시뮬레이터 및 버티컬 전용 인터랙티브 계산기를 제공합니다.</p>
          <ul class="feature-list">
            <li><a href="/specmatrix-global/ko/wattcheck/matrix/airlines-30">최신 GaN·보조배터리 25종 × 30개 항공사 국토부 2026 기내반입 매트릭스</a></li>
            <li><a href="/specmatrix-global/ko/puregram/matrix/energy-gels">지구력 에너지젤·전해질·크레아틴 20종 순수 유효성분 실단가 계산기</a></li>
            <li><a href="/specmatrix-global/ko/cyclegear/matrix/power-meters">로드사이클 파워미터·GPS·후크리스 타이어 15종 호환성·안전 매트릭스</a></li>
          </ul>
        </div>
        <div class="btn-row">
          <a class="btn btn-primary" href="/specmatrix-global/ko">스펙매트릭스 열기 (한국어) →</a>
          <a class="btn btn-secondary" href="/specmatrix-global/en">EN</a>
        </div>
      </article>

      <article class="card">
        <div>
          <span class="tag tag-emerald">HW 엔지니어링 · 200+ 페이지 (EN)</span>
          <h2>Pin2Pin Global (반도체 대체·핀아웃 DB)</h2>
          <p>공식 제조사 PDF 데이터시트와 300 DPI 핀아웃 검증 기반 LDO·DC-DC·Op-Amp 50종 대체품 매트릭스 및 열·리플·GBWP 계산기를 제공합니다.</p>
          <ul class="feature-list">
            <li>85쌍 IC 1:1 비교 &amp; 50종 드롭인 대체품 매트릭스</li>
            <li>SOT-23·SOIC-8·TO-252 등 21종 고해상도 패키지 핀아웃 SVG</li>
            <li>LDO 열 설계 · DC-DC 리플 · Op-Amp GBWP 실시간 계산기</li>
          </ul>
        </div>
        <div class="btn-row">
          <a class="btn btn-primary" href="/pin2pin-global/en/">Pin2Pin 열기 (EN) →</a>
        </div>
      </article>

      <article class="card">
        <div>
          <span class="tag tag-blue">항공·배터리 안전 · 190+ 가이드</span>
          <h2>와트체크 (WattCheck)</h2>
          <p>mAh ↔ Wh ↔ kWh 양방향 변환기 및 2026 국토교통부·전 세계 항공사 기내반입 가능 여부 즉시 판정 도구입니다.</p>
          <ul class="feature-list">
            <li>대한항공·아시아나·제주항공·진에어·티웨이 등 30개 항공사 규정 수록</li>
            <li>아이폰·갤럭시·맥북·스팀덱·드론 등 40종 실사용 완충 횟수 계산</li>
            <li>기내 선반 보관 금지 & 투명 지퍼백·절연테이프 필수 체크리스트</li>
          </ul>
        </div>
        <div class="btn-row">
          <a class="btn btn-primary" href="/wattcheck-global/ko">와트체크 열기 (한국어) →</a>
          <a class="btn btn-secondary" href="/wattcheck-global/en">EN</a>
        </div>
      </article>

      <article class="card">
        <div>
          <span class="tag tag-emerald">연봉·커리어 금융 · 326+ 가이드</span>
          <h2>이직손익판독기 (WorthMove)</h2>
          <p>2026년 4대보험·소득세 실수령액과 왕복 통근 시간·교통비·야근을 반영해 '내 진짜 시급'과 '이직 본전 연봉'을 계산합니다.</p>
          <ul class="feature-list">
            <li>수원↔강남, 안양↔판교, 김포↔여의도 등 36개 주요 통근 노선 분석</li>
            <li>3,000만~1.5억원 연봉별 실수령액표 및 통근시간별 실질 시급 비교</li>
            <li>커뮤니티·단톡방 공유용 감열지 영수증 PNG 이미지 즉시 저장</li>
          </ul>
        </div>
        <div class="btn-row">
          <a class="btn btn-primary" href="/worthmove-global/ko">이직손익판독기 열기 →</a>
          <a class="btn btn-secondary" href="/worthmove-global/en">EN</a>
        </div>
      </article>

      <article class="card">
        <div>
          <span class="tag tag-amber">영양제·프로틴 가성비 · 342+ 가이드</span>
          <h2>순수그램 가성비 사전 (PureGram)</h2>
          <p>통 가격에 숨은 부형제 거품을 걷어내고 순수 단백질 10g, 순수 EPA+DHA 1000mg, 크레아틴 5g당 진짜 단가로 순위를 매깁니다.</p>
          <ul class="feature-list">
            <li>국내외 인기 보충제·영양제·닭가슴살·프로틴음료 48종 정밀 분석</li>
            <li>동일 카테고리 인기 제품 간 1:1 순도·가성비 맞대결 228페이지</li>
            <li>오메가3 어유 총량이 아닌 순수 EPA+DHA 합산 함량 기준 랭킹</li>
          </ul>
        </div>
        <div class="btn-row">
          <a class="btn btn-primary" href="/puregram-global/ko">순수그램 열기 (한국어) →</a>
          <a class="btn btn-secondary" href="/puregram-global/en">EN</a>
        </div>
      </article>
    </section>

    <section class="info-section">
      <h2>데이터 검증 원칙 및 투명성 안내</h2>
      <p>
        본 허브의 모든 웹 도구는 개인정보나 입력값을 외부 서버에 저장하지 않으며, 모든 연산은 사용자의 기기 내에서 즉시 처리됩니다. 자세한 계산 기준은 <a href="/about.html">사이트 소개 및 산출 방법론</a>에서, 광고·쿠키 및 제휴 고지 사항은 <a href="/privacy.html">개인정보처리방침</a>에서 확인하실 수 있습니다.
      </p>
    </section>
  </main>
  ${renderFooter("ko")}
</body>
</html>`;
}

function buildAboutPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${buildHeadTags({
    title: "About, Engineering Methodology & Contact | Precision Utility Hub",
    description:
      "Learn how WattCheck, WorthMove, and PureGram verify aviation battery limits, 2026 tax & social insurance deductions, and active-ingredient supplement purity.",
    canonicalPath: "/about.html",
    locale: "en",
  })}
  <style>${SHARED_CSS}</style>
</head>
<body>
  ${renderHeader("en")}
  <main class="container" style="padding-top:42px;">
    <article class="info-section">
      <h2>About & Engineering Methodology (사이트 소개 및 산출 원칙)</h2>
      <p>
        Welcome to the Precision Consumer Utility Index (<strong>kbu3986.github.io</strong>). We build fast, bilingual (English & Korean) calculation tools that turn opaque regulatory tables, tax formulas, and nutrition labels into clear, actionable numbers.
      </p>

      <h3>1. WattCheck — Aviation Battery Wh & DC-DC Efficiency Model</h3>
      <ul>
        <li><strong>Core Formula</strong>: <code>Wh = (mAh × Nominal Voltage V) ÷ 1,000</code>, aligned with IATA Dangerous Goods Regulations (2.3.5.9), US FAA PackSafe, and South Korea MOLIT 2025–2026 cabin safety rules.</li>
        <li><strong>Real-World Usable Capacity</strong>: Accounts for DC-DC voltage conversion heat losses (default 82% net efficiency when stepping 3.7V cells up to 5V/9V/15V/20V USB-C PD).</li>
      </ul>

      <h3>2. WorthMove — 2026 Net Take-Home & True Hourly Wage Engine</h3>
      <ul>
        <li><strong>Global & US Tax Model</strong>: Incorporates 2026 standard deductions, progressive federal brackets, FICA (Social Security wage-base cap + Medicare), and state/country presets.</li>
        <li><strong>Korean Statutory Payroll Model (2026)</strong>: Computes National Pension (국민연금), Health Insurance (건강보험), Long-Term Care (장기요양보험), Employment Insurance (고용보험), and progressive Earned Income + Local Income Tax after non-taxable meal allowances.</li>
        <li><strong>True Hourly Formula</strong>: Divides annual net pay minus annual commute out-of-pocket expenses by total annual hours committed (work hours + round-trip commute hours + unpaid overtime).</li>
      </ul>

      <h3>3. PureGram — Active Ingredient Purity & Cost-Per-Gram Audit</h3>
      <ul>
        <li><strong>Purity Ratio</strong>: <code>(Pure Active Grams per Serving ÷ Total Serving Weight) × 100</code>, exposing non-active excipients, gums, maltodextrin, or non-EPA/DHA carrier oils.</li>
        <li><strong>Omega-3 Standard</strong>: Evaluates strictly by combined pure <code>EPA + DHA (mg)</code> per softgel—never raw fish oil weight.</li>
      </ul>

      <h3>4. 한국어 안내 (Editorial Independence & Contact)</h3>
      <p>
        본 사이트에 수록된 와트체크(WattCheck), 이직손익판독기(WorthMove), 순수그램(PureGram)은 공식 공공기관 고시 자료 및 제조사 공개 스펙을 바탕으로 독립적으로 제작되었습니다. 데이터 오류 제보나 문의 사항은 GitHub 저장소 이슈 트래커(<a href="https://github.com/kbu3986" rel="noopener noreferrer" target="_blank">github.com/kbu3986</a>)를 통해 접수하실 수 있습니다.
      </p>
    </article>
  </main>
  ${renderFooter("en")}
</body>
</html>`;
}

function buildPrivacyPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${buildHeadTags({
    title: "Privacy Policy, Cookies & Affiliate Disclosure (개인정보처리방침) | Precision Utility Hub",
    description:
      "Privacy Policy covering client-side calculation processing, Google AdSense DoubleClick DART cookies, Amazon Associates, and Coupang Partners FTC disclosures.",
    canonicalPath: "/privacy.html",
    locale: "en",
  })}
  <style>${SHARED_CSS}</style>
</head>
<body>
  ${renderHeader("en")}
  <main class="container" style="padding-top:42px;">
    <article class="info-section">
      <h2>Privacy Policy & Disclosures (개인정보처리방침 및 제휴·광고 고지)</h2>
      <p><strong>Effective Date / 시행일:</strong> November 20, 2026</p>

      <h3>1. Zero Server-Side Personal Data Collection</h3>
      <p>
        All calculator inputs across WattCheck, WorthMove, and PureGram (such as battery capacities, salary figures, commute times, or supplement prices) are processed 100% locally inside your web browser. We do not require account registration and do not store personal financial or health inputs on any database.
      </p>

      <h3>2. Google AdSense & DoubleClick DART Cookies</h3>
      <ul>
        <li>Third-party vendors, including Google, use cookies (such as the DoubleClick DART cookie) to serve ads based on a user's prior visits to this website or other websites on the internet.</li>
        <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.</li>
        <li>Users may opt out of personalized advertising at any time by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings (adssettings.google.com)</a> or <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info</a>.</li>
      </ul>

      <h3>3. Affiliate Program Disclosures (FTC & 한국 공정거래위원회 표시광고법 준수)</h3>
      <ul>
        <li><strong>Amazon Associates Disclosure (EN):</strong> As an Amazon Associate and iHerb rewards partner, our sites earn from qualifying purchases made through outbound product links marked with <code>rel="sponsored nofollow"</code>, at no additional cost to you.</li>
        <li><strong>쿠팡 파트너스 활동 고지 (KO):</strong> 한국어 페이지 내 쿠팡 상품 검색 및 추천 링크는 쿠팡 파트너스 활동의 일환으로 제공되며, 이에 따른 일정액의 수수료를 제공받습니다. 구매자의 결제 금액에는 어떠한 추가 비용도 발생하지 않습니다.</li>
      </ul>

      <h3>4. 한국어 개인정보처리방침 요약</h3>
      <ul>
        <li><strong>개인정보의 수집 및 보유:</strong> 당사는 회원가입 절차를 운영하지 않으며, 사용자가 계산기에 입력하는 연봉·통근시간·배터리 용량 등 모든 데이터는 사용자의 브라우저 메모리에서만 처리되고 서버로 전송·저장되지 않습니다.</li>
        <li><strong>쿠키(Cookie) 및 맞춤형 광고 거부권:</strong> 본 사이트는 Google AdSense 등 제3자 광고 서비스를 게재할 수 있으며, 사용자는 브라우저 쿠키 차단 설정 또는 <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">구글 광고 설정</a>을 통해 맞춤형 광고 쿠키 사용을 언제든지 거부할 수 있습니다.</li>
        <li><strong>문의처:</strong> 개인정보 및 정책 관련 문의는 공식 GitHub 채널(<a href="https://github.com/kbu3986" target="_blank" rel="noopener noreferrer">github.com/kbu3986</a>)을 통해 접수하실 수 있습니다.</li>
      </ul>
    </article>
  </main>
  ${renderFooter("en")}
</body>
</html>`;
}

function buildSitemapXml() {
  const now = new Date().toISOString();
  const urls = [
    { loc: `${SITE_URL}/`, priority: "1.0" },
    { loc: `${SITE_URL}/ko/`, priority: "0.9" },
    { loc: `${SITE_URL}/about.html`, priority: "0.8" },
    { loc: `${SITE_URL}/privacy.html`, priority: "0.8" },
  ];
  const items = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>
`;
}

function buildSitemapIndexXml() {
  const now = new Date().toISOString();
  const sitemaps = [
    `${SITE_URL}/sitemap.xml`,
    `${SITE_URL}/wattcheck-global/sitemap.xml`,
    `${SITE_URL}/worthmove-global/sitemap.xml`,
    `${SITE_URL}/puregram-global/sitemap.xml`,
    `${SITE_URL}/pin2pin-global/sitemap.xml`,
    `${SITE_URL}/specmatrix-global/sitemap-core.xml`,
    `${SITE_URL}/specmatrix-global/sitemap-wattcheck-en.xml`,
    `${SITE_URL}/specmatrix-global/sitemap-wattcheck-ko.xml`,
    `${SITE_URL}/specmatrix-global/sitemap-puregram-en.xml`,
    `${SITE_URL}/specmatrix-global/sitemap-puregram-ko.xml`,
    `${SITE_URL}/specmatrix-global/sitemap-cyclegear-en.xml`,
    `${SITE_URL}/specmatrix-global/sitemap-cyclegear-ko.xml`,
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (loc) => `  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>
`;
}

function buildRobotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap-index.xml
Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/wattcheck-global/sitemap.xml
Sitemap: ${SITE_URL}/worthmove-global/sitemap.xml
Sitemap: ${SITE_URL}/puregram-global/sitemap.xml
Sitemap: ${SITE_URL}/pin2pin-global/sitemap.xml
Sitemap: ${SITE_URL}/specmatrix-global/sitemap-index.xml
`;
}

// Clean & write out/
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, "en"), { recursive: true });
fs.mkdirSync(path.join(OUT, "ko"), { recursive: true });
fs.mkdirSync(path.join(OUT, "about"), { recursive: true });
fs.mkdirSync(path.join(OUT, "privacy"), { recursive: true });

const homeEn = buildHomeEn();
const homeKo = buildHomeKo();
const aboutHtml = buildAboutPage();
const privacyHtml = buildPrivacyPage();

fs.writeFileSync(path.join(OUT, "index.html"), homeEn, "utf8");
fs.writeFileSync(path.join(OUT, "en.html"), homeEn, "utf8");
fs.writeFileSync(path.join(OUT, "en", "index.html"), homeEn, "utf8");
fs.writeFileSync(path.join(OUT, "ko.html"), homeKo, "utf8");
fs.writeFileSync(path.join(OUT, "ko", "index.html"), homeKo, "utf8");
fs.writeFileSync(path.join(OUT, "about.html"), aboutHtml, "utf8");
fs.writeFileSync(path.join(OUT, "about", "index.html"), aboutHtml, "utf8");
fs.writeFileSync(path.join(OUT, "privacy.html"), privacyHtml, "utf8");
fs.writeFileSync(path.join(OUT, "privacy", "index.html"), privacyHtml, "utf8");
fs.writeFileSync(path.join(OUT, "sitemap.xml"), buildSitemapXml(), "utf8");
fs.writeFileSync(path.join(OUT, "sitemap-index.xml"), buildSitemapIndexXml(), "utf8");
fs.writeFileSync(path.join(OUT, "robots.txt"), buildRobotsTxt(), "utf8");
fs.writeFileSync(path.join(OUT, ".nojekyll"), "", "utf8");
// IndexNow ownership key for instant Bing / Naver / Yandex / DuckDuckGo indexing
const INDEXNOW_KEY = "8f4a7c2e9b1d4063a5e8f2c7b9d1046e";
fs.writeFileSync(path.join(OUT, `${INDEXNOW_KEY}.txt`), INDEXNOW_KEY, "utf8");

if (adsensePubId) {
  const adsTxt = `google.com, ${adsensePubId}, DIRECT, f08c47fec0942fa0\n`;
  fs.writeFileSync(path.join(OUT, "ads.txt"), adsTxt, "utf8");
  console.log(`[site0-hub] Generated out/ads.txt for ${adsensePubId}`);
} else {
  console.log(`[site0-hub] NEXT_PUBLIC_ADSENSE_ID not set — skipped ads.txt (will generate automatically once configured).`);
}

console.log(`[site0-hub] Static build complete -> ${OUT}`);
