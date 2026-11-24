import { ExternalLink, BatteryCharging, ShieldCheck, Sparkles } from "lucide-react";
import { type Locale, getDictionary } from "@/lib/i18n";
import { sanitizeIframeUrl } from "@/lib/env";

interface AffiliateCardsProps {
  locale: Locale;
  wh: number;
  requiredWatts?: number;
}

interface ProductSuggestion {
  badgeEn: string;
  badgeKo: string;
  titleEn: string;
  titleKo: string;
  specEn: string;
  specKo: string;
  amazonQuery: string;
  coupangQuery: string;
  highlight?: boolean;
}

function getMatchedProducts(wh: number, requiredWatts: number = 30): ProductSuggestion[] {
  // Compact / Smartphone tier (<= 45 Wh and <= 35W)
  if (wh <= 45 && requiredWatts <= 35) {
    return [
      {
        badgeEn: "100% CABIN SAFE · 37 Wh",
        badgeKo: "기내반입 프리패스 · 37Wh",
        titleEn: "10,000mAh 30W USB-C PD Ultra-Compact Travel Power Bank",
        titleKo: "10000mAh 30W USB-C PD 기내반입 초경량 고속 보조배터리",
        specEn: "Built-in USB-C cable · 37 Wh (≤100 Wh approved) · ~1.8 phone charges",
        specKo: "C타입 일체형 · 정격 37Wh 표기 선명 · 스마트폰 약 1.8~2회 완충",
        amazonQuery: "Anker 10000mAh 30W USB C power bank travel airline approved",
        coupangQuery: "기내반입 보조배터리 10000mAh 30W PD",
        highlight: true,
      },
      {
        badgeEn: "QI2 MAGSAFE · 18.5–37 Wh",
        badgeKo: "맥세이프 무선 · 18.5~37Wh",
        titleEn: "Qi2 15W MagSafe Slim Magnetic Snap-On Battery Pack",
        titleKo: "Qi2 15W 맥세이프 마그네틱 슬림 보조배터리 (5000/10000mAh)",
        specEn: "Zero dangling cables · Pocket-friendly · TSA & Korea cabin ready",
        specKo: "케이블 없이 착 붙는 슬림형 · 지퍼백 수납 최적화",
        amazonQuery: "Qi2 MagSafe power bank 10000mAh slim airline approved",
        coupangQuery: "맥세이프 Qi2 보조배터리 10000mAh",
      },
      {
        badgeEn: "2026 CABIN MANDATE",
        badgeKo: "2026 국토부 필수 준비물",
        titleEn: "Clear Zip-Lock Battery Insulation Pouch & USB-C Port Caps",
        titleKo: "기내반입 보조배터리 투명 지퍼백 파우치 & C타입 단자 보호캡 세트",
        specEn: "Prevents terminal short circuits · Speeds up Korean & Asian gate checks",
        specKo: "단락 방지 절연 조치 한 번에 해결 · 공항 보안검색 쾌속 통과",
        amazonQuery: "clear travel battery pouch usb c silicone dust port cover",
        coupangQuery: "보조배터리 기내반입 투명 지퍼백 파우치 단자 보호캡",
      },
    ];
  }

  // Laptop / High-Output / Travel Max tier (45 < wh <= 100 OR requiredWatts >= 45)
  if (wh <= 100) {
    return [
      {
        badgeEn: "SWEET SPOT · 74 Wh",
        badgeKo: "해외여행 베스트 · 74Wh",
        titleEn: "20,000mAh 65W–100W USB-C PD Laptop & Phone Power Bank",
        titleKo: "20000mAh 65W~100W 노트북·갤럭시 초고속 PD 보조배터리",
        specEn: "74 Wh (under 100 Wh on all airlines) · Charges MacBook Air, Steam Deck & phones",
        specKo: "정격 74Wh 무승인 기내반입 · 맥북·그램·스팀덱·초고속충전 2.0 호환",
        amazonQuery: "20000mAh 100W USB C laptop power bank airline approved",
        coupangQuery: "노트북 보조배터리 20000mAh 100W PD 기내반입",
        highlight: true,
      },
      {
        badgeEn: "MAX LEGAL LIMIT · 99.5 Wh",
        badgeKo: "기내반입 최대용량 · 99.5Wh",
        titleEn: "27,000–27,650mAh 140W+ PD 3.1 TSA-Max Carry-On Powerhouse",
        titleKo: "앤커 프라임급 27000~27650mAh 140W+ 기내반입 최대용량 보조배터리",
        specEn: "Engineered at 99.5–99.9 Wh · Smart watt display · Zero airline paperwork",
        specKo: "99.54Wh 설계로 카운터 승인 없이 기내 휴대 가능한 끝판왕 스펙",
        amazonQuery: "Anker Prime 27650mAh 250W power bank 99.54Wh airline approved",
        coupangQuery: "27000mAh 140W 기내반입 보조배터리",
      },
      {
        badgeEn: "CABIN SAFETY KIT",
        badgeKo: "절연·고속충전 필수템",
        titleEn: "240W E-Marker USB-C Cable + Fire-Resistant Clear Battery Sleeve",
        titleKo: "240W 5A C to C 고속케이블 + 기내반입 방염/투명 지퍼백 파우치",
        specEn: "Required for 45W PPS & 100W–140W PD speeds + short-circuit protection",
        specKo: "45W~140W 초고속 출력 지원 및 국토부 단자 절연 규정 동시 충족",
        amazonQuery: "240W USB C cable 5A E-marker travel battery pouch",
        coupangQuery: "240W C타입 케이블 보조배터리 파우치",
      },
    ];
  }

  // Over 100 Wh (100.1 - 160 Wh or > 160 Wh)
  return [
    {
      badgeEn: "SKIP COUNTER STICKERS · 99.9 Wh",
      badgeKo: "승인 절차 없는 대안 · 99.9Wh",
      titleEn: "Downsize to 27,000mAh (99.9 Wh) 140W Flight-Legal Power Bank",
      titleKo: "항공 반입 걱정 없는 27000mAh (99.9Wh) 140W 기내반입 최대용량",
      specEn:
        wh > 160
          ? "Your calculated battery (>160 Wh) is BANNED on planes—fly legally with 99.9 Wh!"
          : "Avoid check-in counter queues & Emirates >100 Wh bans with a 99.9 Wh pack",
      specKo:
        wh > 160
          ? "160Wh 초과 배터리는 비행기 반입이 불가합니다! 출국용은 99.9Wh 제품으로 준비하세요"
          : "카운터 승인 대기와 외항사 반입 거절을 피하려면 99.9Wh 이하 제품이 가장 안전합니다",
      amazonQuery: "27000mAh 140W USB C power bank 99.9Wh TSA airline approved",
      coupangQuery: "기내반입 최대용량 보조배터리 27000mAh 140W",
      highlight: true,
    },
    {
      badgeEn: wh > 160 ? "GROUND & CAMPING · LiFePO4" : "100–160 Wh · CPAP & PRO GEAR",
      badgeKo: wh > 160 ? "차박·캠핑 전용 인산철" : "100~160Wh 촬영·양압기용",
      titleEn:
        wh > 160
          ? "LiFePO4 Portable Power Station (300Wh–1024Wh Road & Blackout Backup)"
          : "140Wh–148Wh High-Capacity CPAP & Cinema V-Mount USB-C Battery",
      titleKo:
        wh > 160
          ? "인산철(LiFePO4) 캠핑·차박 파워뱅크 300Wh~1000Wh (육상 전용)"
          : "140Wh~148Wh 휴대용 양압기·시네마 카메라 대용량 배터리 (카운터 승인용)",
      specEn:
        wh > 160
          ? "3,000+ cycle LiFePO4 cells · AC pure sine wave + 100W USB-C PD (Ground travel only)"
          : "Fits 100–160 Wh airline approval tier (max 2 pcs with counter inspection)",
      specKo:
        wh > 160
          ? "안전한 인산철 셀 · 차박 전기매트·노트북 장박 전원 (여객기 반입 불가)"
          : "항공사 발권 카운터 사전 승인 시 1인 최대 2개 기내 휴대 가능 규격",
      amazonQuery:
        wh > 160
          ? "LiFePO4 portable power station 300Wh 1000Wh USB C PD"
          : "148Wh USB C PD CPAP V mount battery airline 160Wh",
      coupangQuery:
        wh > 160 ? "인산철 파워뱅크 캠핑용 대용량" : "대용량 보조배터리 40000mAh 100W 양압기",
    },
    {
      badgeEn: "TERMINAL SAFETY",
      badgeKo: "단락 방지 & 방염 보관",
      titleEn: "Fireproof LiPo Battery Safe Bag & Clear Airport Zip-Lock Kit",
      titleKo: "리튬 보조배터리 방염 안전 파우치 & 공항 반입 투명 지퍼백 세트",
      specEn: "Fiberglass thermal protection + insulated storage for high-Wh lithium packs",
      specKo: "대용량 리튬 배터리 안전 보관 및 기내 단자 절연 수칙 완벽 대응",
      amazonQuery: "fireproof lipo battery safe travel bag TSA",
      coupangQuery: "보조배터리 방염 파우치 기내반입 지퍼백",
    },
  ];
}

function buildCoupangUrl(params: {
  query: string;
  partnersId: string;
  subId: string;
  redirectUrl: string;
  useCustomRedirect?: boolean;
}): string {
  const { query, partnersId, subId, redirectUrl, useCustomRedirect } = params;

  if (useCustomRedirect && redirectUrl) {
    return redirectUrl;
  }

  const searchParams = new URLSearchParams();
  searchParams.set("q", query);
  if (partnersId) {
    searchParams.set("lptag", partnersId);
  }
  if (subId) {
    searchParams.set("subId", subId);
  }
  return `https://www.coupang.com/np/search?${searchParams.toString()}`;
}

export default function AffiliateCards({
  locale,
  wh,
  requiredWatts = 30,
}: AffiliateCardsProps) {
  const dict = getDictionary(locale);
  const amazonTag = (process.env.NEXT_PUBLIC_AMAZON_TAG || "wattcheck-20").trim();
  const coupangPartnersId = (process.env.NEXT_PUBLIC_COUPANG_PARTNERS_ID || "").trim();
  const coupangSubId = (process.env.NEXT_PUBLIC_COUPANG_SUBID || "").trim();
  const coupangRedirectUrl = (process.env.NEXT_PUBLIC_COUPANG_REDIRECT_URL || "").trim();
  const coupangIframeUrl = sanitizeIframeUrl(process.env.NEXT_PUBLIC_COUPANG_IFRAME_URL);
  const products = getMatchedProducts(wh, requiredWatts);

  return (
    <section
      aria-label={locale === "ko" ? "맞춤 보조배터리 추천" : "Recommended Power Banks"}
      className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <Sparkles className="h-5 w-5 text-blue-600" />
            {locale === "ko"
              ? "계산 결과 맞춤 기내반입 보조배터리 & 필수 준비물"
              : dict.affiliate.headingEn}
          </h3>
          <p className="mt-0.5 text-sm text-slate-600">{dict.affiliate.subEn}</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <ShieldCheck className="h-3.5 w-3.5" />
          {wh <= 100
            ? locale === "ko"
              ? `${wh.toFixed(1)}Wh · 무승인 기내반입 구간`
              : `${wh.toFixed(1)} Wh · ≤100 Wh Cabin Tier`
            : wh <= 160
            ? locale === "ko"
              ? `${wh.toFixed(1)}Wh · 항공사 승인 구간`
              : `${wh.toFixed(1)} Wh · 100–160 Wh Tier`
            : locale === "ko"
            ? `${wh.toFixed(1)}Wh · 항공 반입 불가 → 99.9Wh 대안`
            : `${wh.toFixed(1)} Wh · Flight Swap Needed`}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        {products.map((item, idx) => {
          const href =
            locale === "ko"
              ? buildCoupangUrl({
                  query: item.coupangQuery,
                  partnersId: coupangPartnersId,
                  subId: coupangSubId,
                  redirectUrl: coupangRedirectUrl,
                  useCustomRedirect: Boolean(item.highlight && coupangRedirectUrl),
                })
              : `https://www.amazon.com/s?k=${encodeURIComponent(
                  item.amazonQuery
                )}&tag=${encodeURIComponent(amazonTag)}`;

          return (
            <div
              key={idx}
              className={`flex flex-col justify-between rounded-xl border p-4 transition-all ${
                item.highlight
                  ? "border-blue-300 bg-blue-50/40 ring-1 ring-blue-100"
                  : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
              }`}
            >
              <div>
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold ${
                    item.highlight
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200/80 text-slate-700"
                  }`}
                >
                  <BatteryCharging className="h-3 w-3" />
                  {locale === "ko" ? item.badgeKo : item.badgeEn}
                </span>
                <h4 className="mt-2.5 text-sm font-bold leading-snug text-slate-900">
                  {locale === "ko" ? item.titleKo : item.titleEn}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  {locale === "ko" ? item.specKo : item.specEn}
                </p>
              </div>

              <a
                href={href}
                target="_blank"
                rel="sponsored nofollow noopener"
                className={`mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors ${
                  locale === "ko"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-amber-500 text-slate-950 hover:bg-amber-400"
                }`}
              >
                {locale === "ko" ? dict.affiliate.ctaCoupang : dict.affiliate.ctaAmazon}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          );
        })}
      </div>

      {/* Optional Coupang Partners Dynamic Banner Widget when NEXT_PUBLIC_COUPANG_IFRAME_URL is set */}
      {locale === "ko" && coupangIframeUrl && (
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/60 p-2">
          <iframe
            src={coupangIframeUrl}
            width="100%"
            height="140"
            frameBorder="0"
            scrolling="no"
            referrerPolicy="unsafe-url"
            title="쿠팡 파트너스 다이나믹 배너"
            className="mx-auto block w-full max-w-3xl rounded-lg bg-white"
          />
        </div>
      )}

      {/* Mandatory FTC / Korean Fair Trade Commission Affiliate Disclosure */}
      <div className="mt-4 rounded-lg border border-slate-200/80 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-600">
        {locale === "ko" ? dict.affiliate.ftcDisclosureKo : dict.affiliate.ftcDisclosureEn}
      </div>
    </section>
  );
}
