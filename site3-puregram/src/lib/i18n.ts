import { Currency, Locale } from "./types";

export const SUPPORTED_LOCALES: Locale[] = ["en", "ko"];

export function isValidLocale(val: string): val is Locale {
  return val === "en" || val === "ko";
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://kbu3986.github.io/puregram-global";

/**
 * Strips accidental full `<meta ... content="TOKEN" />` wrapper if pasted verbatim.
 */
export function sanitizeVerificationToken(raw?: string): string {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (!trimmed) return "";
  const contentMatch = trimmed.match(/content\s*=\s*["']([^"']+)["']/i);
  if (contentMatch && contentMatch[1]) {
    return contentMatch[1].trim();
  }
  return trimmed.replace(/[<>"']/g, "").trim();
}

/**
 * Normalizes AdSense publisher ID to `ca-pub-XXXXXXXXXXXXXXXX` format when set.
 */
export function normalizeAdsenseClientId(raw?: string): string {
  if (!raw) return "";
  const token = sanitizeVerificationToken(raw);
  const pubMatch = token.match(/pub-\d{10,20}/i);
  if (pubMatch) return `ca-${pubMatch[0].toLowerCase()}`;
  const digitsMatch = token.match(/^\d{10,20}$/);
  if (digitsMatch) return `ca-pub-${digitsMatch[0]}`;
  return "";
}

export const ADSENSE_CLIENT_ID = normalizeAdsenseClientId(
  process.env.NEXT_PUBLIC_ADSENSE_ID
);

export const GSC_VERIFICATION = sanitizeVerificationToken(
  process.env.NEXT_PUBLIC_GSC_VERIFICATION
);

export const NAVER_VERIFICATION = sanitizeVerificationToken(
  process.env.NEXT_PUBLIC_NAVER_VERIFICATION
);

export const AMAZON_TAG =
  process.env.NEXT_PUBLIC_AMAZON_TAG?.trim() || "puregram-20";

export const IHERB_CODE =
  process.env.NEXT_PUBLIC_IHERB_CODE?.trim() || "PUREGRAM";

export const COUPANG_PARTNERS_ID =
  process.env.NEXT_PUBLIC_COUPANG_PARTNERS_ID?.trim() || "";

export const COUPANG_SUBID =
  process.env.NEXT_PUBLIC_COUPANG_SUBID?.trim() || "puregram";

export const COUPANG_REDIRECT_URL =
  process.env.NEXT_PUBLIC_COUPANG_REDIRECT_URL?.trim() || "";

export function sanitizeIframeSrc(raw?: string): string {
  if (!raw) return "";
  const trimmed = raw.trim();
  if (!trimmed) return "";
  const srcMatch = trimmed.match(/src\s*=\s*["']([^"']+)["']/i);
  if (srcMatch && srcMatch[1]) {
    return srcMatch[1].trim();
  }
  return trimmed.replace(/[<>"']/g, "").trim();
}

export const COUPANG_IFRAME_URL = sanitizeIframeSrc(
  process.env.NEXT_PUBLIC_COUPANG_IFRAME_URL
);

export const FTC_DISCLOSURE_EN =
  "Affiliate Disclosure: As an Amazon Associate and iHerb partner, PureGram earns from qualifying purchases at no extra cost to you. Reference prices are updated periodically and may vary by flavor or pack size.";

export const FTC_DISCLOSURE_KO =
  "이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.";

export function defaultCurrencyForLocale(locale: Locale): Currency {
  return locale === "ko" ? "KRW" : "USD";
}

export function formatCurrency(
  amount: number,
  currency: Currency,
  precision: "unit" | "total" = "unit"
): string {
  if (!Number.isFinite(amount)) return currency === "KRW" ? "₩0" : "$0.00";
  if (currency === "KRW") {
    const rounded =
      precision === "unit" && amount < 100
        ? Math.round(amount * 10) / 10
        : Math.round(amount);
    return `₩${rounded.toLocaleString("ko-KR")}`;
  }
  const decimals = precision === "unit" && amount < 1 ? 3 : 2;
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
  })}`;
}

export function buildAmazonUrl(query: string): string {
  return `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${encodeURIComponent(AMAZON_TAG)}`;
}

export function buildIherbUrl(query: string): string {
  return `https://www.iherb.com/search?kw=${encodeURIComponent(query)}&rcode=${encodeURIComponent(IHERB_CODE)}`;
}

export function buildCoupangUrl(query: string): string {
  const params = new URLSearchParams({
    q: query,
    channel: "user",
    subId: COUPANG_SUBID,
  });
  if (COUPANG_PARTNERS_ID) {
    params.set("lptag", COUPANG_PARTNERS_ID);
  }
  return `https://www.coupang.com/np/search?${params.toString()}`;
}

export const DICTIONARY = {
  en: {
    siteTitle: "PureGram Index",
    siteTagline: "True Cost Per Active Gram & 1v1 Supplement Audit",
    heroBadge: "Zero Marketing Fluff · Lab-Math Supplement Index",
    heroTitle: "Stop Paying for Scoop Filler. Rank Supplements by Pure Active Gram.",
    heroSubtitle:
      "A $55 tub with 48% filler costs more than a $85 isolate at 84% purity, and a '1000mg Fish Oil' often hides 700mg of useless filler fat. PureGram exposes the true cost per pure protein gram, pure EPA+DHA mg, and pure creatine gram.",
    navLeaderboard: "Leaderboards",
    navCalculator: "Filler Tax Calculator",
    navVersus: "1v1 Versus (96+)",
    calcTitle: "Filler Tax & Pure Gram Calculator",
    calcSubtitle:
      "Enter any supplement label to calculate its exact Purity %, Filler Tax waste, True Cost per Active Unit, and 30-Day Habit Cost.",
    leaderboardTitle: "Live PureGram Value Leaderboard",
    leaderboardSubtitle:
      "Filter across 6 high-frequency supplement categories and sort by True Cost per Pure Active Unit, Purity %, Calorie Efficiency, or Monthly Habit Cost.",
    allCategories: "All Categories",
    sortByCost: "Lowest Cost / Pure Unit",
    sortByPurity: "Highest Purity %",
    sortByCalories: "Best Calorie Efficiency",
    sortByMonthly: "Lowest 30-Day Cost",
    searchPlaceholder: "Search brand or supplement (e.g. ISO100, Omega-3, Fairlife, LMNT)...",
    colRank: "#",
    colProduct: "Product & Spec",
    colPurity: "Purity vs Filler",
    colTrueCost: "True Cost / Active Unit",
    colCalorieEff: "Calorie Ratio",
    colMonthly: "30-Day Cost",
    colActions: "Audit / Buy",
    viewAudit: "Purity Audit",
    compare1v1: "1v1 Versus",
    buyAmazon: "Amazon Price",
    buyIherb: "iHerb Check",
    buyCoupang: "Lowest Price (Coupang)",
    purityLabel: "Purity",
    fillerLabel: "Filler / Non-Active",
    gradeLabel: "Grade",
    popularMatchups: "Popular 1v1 Supplement Matchups",
    categoriesHeading: "Browse Category Leaderboards",
    methodologyTitle: "How PureGram Calculates True Active Value",
    footerDisclaimer:
      "PureGram is an independent nutrition math & cost-efficiency index for informational purposes only and does not provide medical advice.",
  },
  ko: {
    siteTitle: "순수그램 가성비 사전 (PureGram)",
    siteTagline: "단백질·영양제 유효성분 1g당 진짜 가격 & 1:1 비교",
    heroBadge: "광고 거품 제거 · 유효성분 순도 & 가성비 랭킹",
    heroTitle: "통 크기와 총중량에 속지 마세요. 순수 유효성분 1g당 진짜 가격을 계산합니다.",
    heroSubtitle:
      "1000mg 어유 캡슐 중 실제 오메가3(EPA+DHA)가 250mg뿐이라면 나머지 75%는 기름 부형제입니다. 프로틴·크레아틴·오메가3·전해질·RTD 단백질 음료·닭가슴살의 순도(%)와 유효성분 기준 진짜 가성비를 한눈에 비교하세요.",
    navLeaderboard: "카테고리 랭킹",
    navCalculator: "부형제 거품 계산기",
    navVersus: "1:1 맞대결 (96+)",
    calcTitle: "부형제 거품(Filler Tax) & 순수그램 계산기",
    calcSubtitle:
      "영양성분표의 가격·총 제공량·1회 중량·순수 유효성분(단백질 g, EPA+DHA mg, 크레아틴 g)만 입력하면 순도(%), 부형제 비율, 기준 용량당 진짜 가격, 30일 유지비를 즉시 계산합니다.",
    leaderboardTitle: "실시간 순수그램 가성비 리더보드",
    leaderboardSubtitle:
      "6대 반복구매 헬스·영양제 카테고리를 유효성분 진짜 최저가순, 순도 높은순, 칼로리 효율순, 한 달 유지비순으로 정렬하세요.",
    allCategories: "전체 카테고리",
    sortByCost: "유효성분당 최저가순",
    sortByPurity: "순도(%) 높은순",
    sortByCalories: "칼로리 효율 좋은순",
    sortByMonthly: "30일 유지비 낮은순",
    searchPlaceholder: "브랜드·제품명 검색 (예: 골드스탠다드, 신타6, 셀렉스, 더단백, 프로메가, 하림)...",
    colRank: "순위",
    colProduct: "제품 및 스펙",
    colPurity: "유효성분 순도 vs 부형제",
    colTrueCost: "기준 유효성분당 진짜 가격",
    colCalorieEff: "칼로리 효율",
    colMonthly: "30일 유지비",
    colActions: "상세분석 / 최저가",
    viewAudit: "순도 성적표",
    compare1v1: "1:1 비교",
    buyAmazon: "아마존 직구",
    buyIherb: "아이허브 확인",
    buyCoupang: "쿠팡 최저가 확인",
    purityLabel: "유효 순도",
    fillerLabel: "부형제·기타중량",
    gradeLabel: "등급",
    popularMatchups: "인기 영양제·프로틴 1:1 맞대결",
    categoriesHeading: "카테고리별 순수그램 랭킹",
    methodologyTitle: "순수그램(PureGram) 진짜 가성비 산출 공식",
    footerDisclaimer:
      "순수그램 가성비 사전은 제품 영양성분표 기반의 중량 대비 유효성분 경제성 분석 도구이며, 의학적 진단이나 처방을 대신하지 않습니다.",
  },
} as const;
