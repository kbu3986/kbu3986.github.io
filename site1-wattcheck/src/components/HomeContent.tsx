import Link from "next/link";
import {
  Plane,
  Zap,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { type Locale, getDictionary, SITE_URL } from "@/lib/i18n";
import { AIRLINES } from "@/data/airlines";
import { MAH_CAPACITIES } from "@/data/mahCapacities";
import { mahToWh, getCabinSafetyTier } from "@/lib/calculator";
import WattCalculator from "./WattCalculator";
import AdBanner from "./AdBanner";
import JsonLd from "./JsonLd";

interface HomeContentProps {
  locale: Locale;
}

export default function HomeContent({ locale }: HomeContentProps) {
  const dict = getDictionary(locale);
  const featuredAirlines = AIRLINES.filter((a) => a.featured).concat(
    AIRLINES.filter((a) => !a.featured).slice(0, 3)
  ).slice(0, 12);

  const faqs =
    locale === "ko"
      ? [
          {
            q: "20,000mAh 보조배터리는 비행기 기내 반입이 가능한가요?",
            a: "네, 100% 기내 반입 가능합니다. 일반 리튬이온 보조배터리 표준 전압(3.7V) 기준 20,000mAh × 3.7V ÷ 1,000 = 74Wh이므로 전 세계 항공사 무승인 기내 반입 한도(100Wh 이하)를 여유 있게 통과합니다. 단, 위탁수하물(부치는 짐)에는 절대 넣을 수 없으며 한국 국적기 탑승 시 투명 지퍼백 또는 절연테이프 조치가 필요합니다.",
          },
          {
            q: "보조배터리 기내 반입 최대 용량(100Wh)은 몇 mAh인가요?",
            a: "표준 3.7V 셀 기준으로 27,027mAh가 정확히 100Wh입니다(통상 시중의 26,800mAh = 99.16Wh, 27,000mAh = 99.9Wh 제품). 또한 앤커 프라임 27,650mAh처럼 3.6V 원통형 셀을 사용한 제품은 99.54Wh로 설계되어 별도 항공사 승인 없이 기내 반입이 가능합니다. 반면 30,000mAh(3.7V 기준 111Wh)는 100Wh를 초과하므로 체크인 카운터 사전 승인 스티커(최대 2개)가 필수입니다.",
          },
          {
            q: "2025–2026 한국 국적기 보조배터리 지퍼백·선반 금지 규정이란?",
            a: "국토교통부 안전 강화 지침에 따라 대한항공, 아시아나, 제주항공, 진에어, 티웨이, 에어프레미아, 에어부산 등 국적기 탑승 시 (1) 기내 머리 위 선반 보관 절대 금지(몸에 소지 또는 앞좌석 포켓 보관), (2) 단락 방지를 위한 개별 투명 지퍼백 보관 또는 단자 절연테이프 부착, (3) 기내 보조배터리 충전 및 사용 제한, (4) 100Wh 이하 최대 5개 / 100~160Wh 승인 시 최대 2개 규정이 의무 적용됩니다.",
          },
          {
            q: "중국 항공편 환승·국내선 탑승 시 3C(CCC) 마크가 없으면 압수되나요?",
            a: "네! 2025년 6월 28일 시행된 중국 민항국(CAAC) 규정에 따라 중국 국내선(국제선 도착 후 중국 국내선 환승 포함) 보안검색 시 중국 'CCC(3C)' 인증 로고가 없거나 본체에 Wh 정격 용량이 인쇄되지 않은 보조배터리는 용량이 100Wh 이하라도 반입이 전면 거절됩니다.",
          },
        ]
      : [
          {
            q: "Is a 20,000 mAh power bank allowed on airplanes?",
            a: "Yes! At standard 3.7V nominal Li-ion voltage, a 20,000 mAh power bank equals 74.0 Wh (20,000 × 3.7 ÷ 1,000 = 74 Wh), which sits safely under the universal 100 Wh carry-on limit on TSA/FAA, EASA, Korean Air, Delta, Emirates, and ANA. Always carry it in cabin baggage—never checked luggage.",
          },
          {
            q: "What is the maximum mAh power bank allowed on a plane without airline approval?",
            a: "Airlines regulate batteries by Watt-hours (Wh), capping unapproved carry-on batteries at 100 Wh. At 3.7V, 100 Wh equals 27,027 mAh—which is why travel laptop banks are sized at 26,800 mAh (99.16 Wh), 27,000 mAh (99.9 Wh), or 27,650 mAh at 3.6V (99.54 Wh). A 30,000 mAh bank at 3.7V is 111 Wh and requires check-in counter approval (max 2 units).",
          },
          {
            q: "What are South Korea's 2025–2026 power bank zip-lock & overhead bin rules?",
            a: "On all Korean airlines (Korean Air, Asiana, Jeju Air, Jin Air, T'way, Air Premia, Air Busan), passengers must NEVER store power banks in overhead bins, must insulate ports using clear zip-lock pouches or tape, cannot charge power banks in-flight, and may bring up to 5 units ≤100 Wh without approval (or max 2 units of 100.1–160 Wh with check-in inspection stickers).",
          },
          {
            q: "Why do 10,000 mAh power banks only charge a 5,000 mAh phone ~1.6 times instead of twice?",
            a: "The mAh rating on a power bank is measured at its internal 3.7V cell voltage (37 Wh). Boosting 3.7V up to 5V/9V/15V USB-C PD and regulating voltage inside your phone's battery charger consumes roughly 15–20% energy as heat—leaving ~82% net usable Wh (30.3 Wh), or ~1.56 full charges for a 19.4 Wh flagship phone.",
          },
        ];

  const jsonLdSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: dict.brandName,
      url: `${SITE_URL}/${locale}`,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      inLanguage: locale === "ko" ? "ko-KR" : "en-US",
      description: dict.hero.subtitle,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: locale === "ko" ? "KRW" : "USD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={jsonLdSchemas} />

      {/* Hero Section */}
      <section className="mb-8 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-800">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
          {dict.hero.badge}
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
          {dict.hero.title}
        </h1>
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {dict.hero.subtitle}
        </p>
      </section>

      {/* Core Interactive Bidirectional Calculator + Safety Verdict + Estimator + Affiliate */}
      <WattCalculator locale={locale} initialMah={20000} initialVoltage={3.7} />

      <AdBanner locale={locale} slot="1101" />

      {/* Airline Rules Matrix Preview */}
      <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-900 sm:text-2xl">
              <Plane className="h-5 w-5 text-blue-600" />
              {locale === "ko"
                ? "2026 주요 항공사별 보조배터리 기내 반입 규정 요약"
                : "2026 Global & Korean Airline Carry-On Wh Matrix"}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {locale === "ko"
                ? "항공사마다 개수 제한, 기내 선반 보관 금지, 기내 충전 가능 여부가 다릅니다."
                : "Compare piece quotas, overhead bin restrictions, in-flight charging bans, and China 3C rules."}
            </p>
          </div>
          <Link
            href={`/${locale}/airlines`}
            className="inline-flex items-center gap-1 text-sm font-bold text-blue-700 hover:text-blue-900"
          >
            {locale === "ko" ? "30개 전체 항공사 규정 비교 →" : "Compare All 30 Airlines →"}
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredAirlines.map((airline) => (
            <Link
              key={airline.slug}
              href={`/${locale}/airline/${airline.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition-all hover:border-blue-400 hover:bg-white hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md bg-slate-900 px-2 py-0.5 font-mono text-xs font-bold text-white">
                    {airline.iataCode}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {locale === "ko" ? airline.countryKo : airline.countryEn}
                  </span>
                </div>
                <h3 className="mt-2.5 text-base font-extrabold text-slate-900 group-hover:text-blue-700">
                  {locale === "ko" ? airline.nameKo : airline.nameEn}
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] font-bold">
                  <span className="rounded bg-emerald-100 px-2 py-0.5 text-emerald-800">
                    ≤100Wh: {airline.maxPiecesUnder100Wh}{locale === "ko" ? "개" : " pcs"}
                  </span>
                  {!airline.overheadBinAllowed && (
                    <span className="rounded bg-amber-100 px-2 py-0.5 text-amber-900">
                      {locale === "ko" ? "선반보관 금지" : "No Overhead Bin"}
                    </span>
                  )}
                  {!airline.inFlightUseAllowed && (
                    <span className="rounded bg-rose-100 px-2 py-0.5 text-rose-800">
                      {locale === "ko" ? "기내사용 금지" : "No In-Flight Use"}
                    </span>
                  )}
                  {airline.requiresCccMark && (
                    <span className="rounded bg-rose-600 px-2 py-0.5 text-white">
                      3C/CCC 필수
                    </span>
                  )}
                </div>
                <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-slate-600">
                  {locale === "ko" ? airline.summaryKo : airline.summaryEn}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-bold text-blue-600">
                {locale === "ko" ? "상세 규정 및 체크리스트" : "View Cabin Policy"}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* High-Volume mAh -> Wh Instant Directory */}
      <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-900 sm:text-2xl">
              <Zap className="h-5 w-5 text-blue-600" />
              {locale === "ko"
                ? "용량별 mAh → Wh 기내 반입 가능 여부 한눈에 보기"
                : "Popular mAh to Wh Conversion & Flight Legal Chart"}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {locale === "ko"
                ? "클릭하면 각 용량별 전압(3.6V·3.7V·3.85V) 계산표와 기기 충전 횟수를 확인합니다."
                : "Tap any mAh size for exact 3.6V / 3.7V / 3.85V Wh ratings and airline clearance."}
            </p>
          </div>
          <Link
            href={`/${locale}/mah`}
            className="text-sm font-bold text-blue-700 hover:text-blue-900"
          >
            {locale === "ko" ? "전체 변환표 보기 →" : "Full mAh Chart →"}
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
          {MAH_CAPACITIES.map((item) => {
            const v = item.amount === 27650 ? 3.6 : 3.7;
            const wh = mahToWh(item.amount, v);
            const tier = getCabinSafetyTier(wh);
            return (
              <Link
                key={item.slug}
                href={`/${locale}/mah/${item.slug}`}
                className="group rounded-2xl border border-slate-200 bg-slate-50/60 p-3.5 transition-all hover:border-blue-400 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-black text-slate-900 group-hover:text-blue-700">
                    {item.amount.toLocaleString("en-US")}
                  </span>
                  {tier === "green" && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  )}
                  {tier === "amber" && (
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                  )}
                  {tier === "red" && <XCircle className="h-4 w-4 text-rose-600" />}
                </div>
                <div className="text-[11px] font-semibold text-slate-500">mAh</div>
                <div className="mt-2 font-mono text-base font-extrabold text-blue-700">
                  {wh.toFixed(1)} Wh
                </div>
                <div
                  className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-bold ${
                    tier === "green"
                      ? "bg-emerald-100 text-emerald-800"
                      : tier === "amber"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {tier === "green"
                    ? locale === "ko"
                      ? "무승인 반입 가능"
                      : "Cabin OK"
                    : tier === "amber"
                    ? locale === "ko"
                      ? "항공사 승인 필수"
                      : "Approval Req."
                    : locale === "ko"
                    ? "항공 반입 금지"
                    : "Banned on Plane"}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Authoritative FAQ Section */}
      <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-900 sm:text-2xl">
          <HelpCircle className="h-5 w-5 text-blue-600" />
          {locale === "ko"
            ? "항공기 보조배터리 기내 반입 자주 묻는 질문 (FAQ)"
            : "Frequently Asked Airline Power Bank Questions"}
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-5"
            >
              <h3 className="text-sm font-extrabold text-slate-900 sm:text-base">
                Q. {faq.q}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
