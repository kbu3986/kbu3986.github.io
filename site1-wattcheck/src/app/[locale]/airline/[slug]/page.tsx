import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Plane,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronRight,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";
import {
  LOCALES,
  isValidLocale,
  buildAlternates,
  SITE_URL,
} from "@/lib/i18n";
import { AIRLINES, getAirlineBySlug } from "@/data/airlines";
import WattCalculator from "@/components/WattCalculator";
import AdBanner from "@/components/AdBanner";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of LOCALES) {
    for (const airline of AIRLINES) {
      params.push({ locale, slug: airline.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const airline = getAirlineBySlug(slug);
  if (!airline) return {};

  const title =
    locale === "ko"
      ? `${airline.nameKo} 보조배터리 기내반입 규정 총정리 (2026 Wh 용량·개수·지퍼백)`
      : `${airline.nameEn} Power Bank Rules (2026) — Carry-On Wh Limit & Cabin Policy`;

  const description =
    locale === "ko" ? airline.summaryKo : airline.summaryEn;

  return {
    title,
    description,
    alternates: buildAlternates(locale, `/airline/${airline.slug}`),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/airline/${airline.slug}`,
      siteName: "WattCheck",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "article",
    },
  };
}

export default async function AirlineDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const airline = getAirlineBySlug(slug);
  if (!airline) notFound();

  const airlineName = locale === "ko" ? airline.nameKo : airline.nameEn;
  const otherAirlines = AIRLINES.filter((a) => a.slug !== airline.slug).slice(0, 9);

  const faqs =
    locale === "ko"
      ? [
          {
            q: `${airline.nameKo} 탑승 시 20,000mAh 보조배터리를 기내에 가져갈 수 있나요?`,
            a: `네, 20,000mAh(3.7V 기준 74Wh)는 100Wh 미만이므로 ${airline.nameKo} 기내에 휴대 반입이 가능합니다(1인 최대 ${airline.maxPiecesUnder100Wh}개 무승인). 단, 위탁수하물 반입은 절대 불가합니다.${airline.requiresCccMark ? " 중국 국내선 이용 시에는 반드시 중국 CCC(3C) 인증 마크가 인쇄되어 있어야 합니다." : ""}`,
          },
          {
            q: `${airline.nameKo} 기내 선반(오버헤드 빈)에 보조배터리를 넣어도 되나요?`,
            a: airline.overheadBinAllowed
              ? `${airline.nameKo}는 단락 방지 조치가 된 휴대수하물 보관을 허용하나, 안전을 위해 좌석 아래나 앞주머니 보관을 강력히 권장합니다.`
              : `아니요! ${airline.nameKo}는 보조배터리의 기내 머리 위 선반(오버헤드 빈) 보관을 엄격히 금지합니다. 반드시 몸에 지니거나 앞좌석 포켓/좌석 아래에 보관해야 합니다.`,
          },
          {
            q: `${airline.nameKo} 비행 중 보조배터리로 스마트폰을 충전해도 되나요?`,
            a: airline.inFlightUseAllowed
              ? `기내 시야가 확보되는 상태에서 발열 여부를 확인하며 사용할 수 있습니다(가방 속 밀폐 충전 금지).`
              : `아니요, ${airline.nameKo}는 운항 중 기내 화재 예방을 위해 보조배터리 충전 및 사용을 금지하고 있습니다. 좌석 내장 USB 포트를 직접 이용하세요.`,
          },
        ]
      : [
          {
            q: `Can I bring a 20,000 mAh power bank on ${airline.nameEn}?`,
            a: `Yes. A 20,000 mAh power bank rated at 3.7V equals 74 Wh, which is under ${airline.nameEn}'s ${airline.maxWhNoApproval} Wh carry-on threshold (up to ${airline.maxPiecesUnder100Wh} piece(s) without approval). Never place it in checked luggage.${airline.requiresCccMark ? " On China domestic flights, an authentic Chinese CCC (3C) mark is also mandatory." : ""}`,
          },
          {
            q: `Does ${airline.nameEn} allow power banks in overhead bins or in-flight charging?`,
            a: `Overhead bin storage: ${airline.overheadBinAllowed ? "Permitted if terminals are protected (under-seat pocket recommended)" : "STRICTLY BANNED — keep in your seat pocket or under-seat personal bag"}. In-flight charging/discharging: ${airline.inFlightUseAllowed ? "Allowed under active passenger supervision" : "STRICTLY PROHIBITED throughout the flight"}.`,
          },
          {
            q: `Are 100.1–160 Wh power banks allowed on ${airline.nameEn}?`,
            a: airline.allows100To160Wh
              ? `Yes, up to ${airline.maxPieces100To160Wh} units between 100.1 Wh and 160 Wh are permitted in cabin baggage ONLY with explicit ${airline.nameEn} check-in counter approval. Batteries exceeding 160 Wh are banned.`
              : `No. ${airline.nameEn} restricts passengers strictly to batteries under 100 Wh and does not accept >100 Wh power banks.`,
          },
        ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: `${airlineName} — WattCheck Power Bank Compliance Checker`,
      url: `${SITE_URL}/${locale}/airline/${airline.slug}`,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      inLanguage: locale === "ko" ? "ko-KR" : "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={jsonLd} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
        <Link href={`/${locale}`} className="hover:text-blue-700">
          {locale === "ko" ? "홈" : "Home"}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href={`/${locale}/airlines`} className="hover:text-blue-700">
          {locale === "ko" ? "항공사별 규정" : "Airline Rules"}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-900">{airlineName}</span>
      </nav>

      {/* Airline Rule Card */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-slate-900 px-3 py-1 font-mono text-xs font-extrabold text-white">
            IATA: {airline.iataCode}
          </span>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800">
            {locale === "ko" ? airline.countryKo : airline.countryEn}
          </span>
          {airline.isKoreanRuleApplicable && (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-900">
              {locale === "ko"
                ? "2026 국토교통부 강화 규정 의무 적용"
                : "2026 Korea MOLIT Mandate Enforced"}
            </span>
          )}
        </div>

        <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
          {locale === "ko"
            ? `${airline.nameKo} 보조배터리 기내 반입 규정 (2026)`
            : `${airline.nameEn} Power Bank Carry-On Rules & Wh Limits`}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
          {locale === "ko" ? airline.summaryKo : airline.summaryEn}
        </p>

        {/* Special China 3C / CCC Alert */}
        {airline.requiresCccMark && (
          <div className="mt-5 rounded-2xl border-2 border-rose-500 bg-rose-50 p-4 text-rose-950">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-rose-600" />
              <div>
                <h2 className="text-sm font-black sm:text-base">
                  {locale === "ko"
                    ? "필독! 중국 국내선 · 환승 보안검색 'CCC(3C)' 인증 마크 의무화"
                    : "CRITICAL: Mandatory Chinese 'CCC' (3C) Mark on China Domestic Flights"}
                </h2>
                <p className="mt-1 text-xs leading-relaxed sm:text-sm">
                  {locale === "ko"
                    ? "2025년 6월 28일부터 중국 민항국(CAAC) 지침에 따라 중국 국내선(국제선 도착 후 중국 내 환승 포함) 탑승 시 본체에 선명한 'CCC' 마크와 'Wh' 숫자가 모두 인쇄되지 않은 보조배터리는 100Wh 이하라도 100% 반입 거절됩니다."
                    : "Since June 28, 2025, CAAC bans any power bank lacking a genuine Chinese 'CCC' certification mark or direct Wh label on all China domestic flights (including international-to-domestic connections)."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3-Tier Wh Matrix + Cabin Conduct Badges */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border-2 border-emerald-500/80 bg-emerald-50/50 p-4">
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              ≤ 100 Wh (~27,000 mAh)
            </div>
            <div className="mt-2 text-xl font-black text-slate-900">
              {locale === "ko"
                ? `최대 ${airline.maxPiecesUnder100Wh}개 무승인 기내반입`
                : `Up to ${airline.maxPiecesUnder100Wh} pcs Carry-On`}
            </div>
            <p className="mt-1 text-xs text-slate-600">
              {locale === "ko"
                ? "항공사 사전 승인 불필요 · 반드시 기내 휴대 (위탁 금지)"
                : "No airline approval needed · Carry-on cabin baggage ONLY"}
            </p>
          </div>

          <div
            className={`rounded-2xl border-2 p-4 ${
              airline.allows100To160Wh
                ? "border-amber-500/80 bg-amber-50/50"
                : "border-rose-500/80 bg-rose-50/50"
            }`}
          >
            <div
              className={`flex items-center gap-2 font-extrabold text-sm ${
                airline.allows100To160Wh ? "text-amber-900" : "text-rose-900"
              }`}
            >
              {airline.allows100To160Wh ? (
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              ) : (
                <XCircle className="h-5 w-5 text-rose-600" />
              )}
              100.1 – 160 Wh
            </div>
            <div className="mt-2 text-xl font-black text-slate-900">
              {airline.allows100To160Wh
                ? locale === "ko"
                  ? `카운터 승인 시 최대 ${airline.maxPieces100To160Wh}개`
                  : `Approval Req. (Max ${airline.maxPieces100To160Wh} pcs)`
                : locale === "ko"
                ? "반입 전면 불가 (100Wh 미만만 허용)"
                : "Not Permitted (>100 Wh Banned)"}
            </div>
            <p className="mt-1 text-xs text-slate-600">
              {airline.allows100To160Wh
                ? locale === "ko"
                  ? "유인 발권 카운터 실물 확인 및 승인 스티커 필수"
                  : "Requires staffed check-in desk inspection & approval"
                : locale === "ko"
                ? "에미레이트 강화 규정에 따라 100Wh 이상 반입 금지"
                : "Strict carrier cap prohibits >100 Wh packs"}
            </p>
          </div>

          <div className="rounded-2xl border-2 border-rose-600/80 bg-rose-50/60 p-4">
            <div className="flex items-center gap-2 text-rose-900 font-extrabold text-sm">
              <XCircle className="h-5 w-5 text-rose-600" />
              &gt; 160 Wh (&amp; Checked Bags)
            </div>
            <div className="mt-2 text-xl font-black text-rose-900">
              {locale === "ko" ? "여객기 반입 절대 금지" : "Strictly Prohibited"}
            </div>
            <p className="mt-1 text-xs text-rose-800">
              {locale === "ko"
                ? "기내·위탁 모두 불가 (보안검색대 즉시 적발 대상)"
                : "Banned in both cabin and checked hold on all flights"}
            </p>
          </div>
        </div>

        {/* Cabin Rules Breakdown */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <span className="text-xs font-bold text-slate-500">
              {locale === "ko" ? "기내 머리 위 선반 보관" : "Overhead Bin Storage"}
            </span>
            <div
              className={`mt-1 text-sm font-extrabold ${
                airline.overheadBinAllowed ? "text-slate-900" : "text-rose-700"
              }`}
            >
              {airline.overheadBinAllowed
                ? locale === "ko"
                  ? "허용 (좌석 주변 보관 권장)"
                  : "Allowed (Seat Pocket Preferred)"
                : locale === "ko"
                ? "❌ 절대 금지 (몸·앞주머니 소지)"
                : "❌ BANNED (Keep at Seat)"}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <span className="text-xs font-bold text-slate-500">
              {locale === "ko" ? "비행 중 충전·사용" : "In-Flight Charging / Use"}
            </span>
            <div
              className={`mt-1 text-sm font-extrabold ${
                airline.inFlightUseAllowed ? "text-emerald-700" : "text-rose-700"
              }`}
            >
              {airline.inFlightUseAllowed
                ? locale === "ko"
                  ? "✓ 육안 감시 하에 사용 가능"
                  : "✓ Allowed Under Supervision"
                : locale === "ko"
                ? "❌ 운항 중 충·방전 전면 금지"
                : "❌ BANNED During Flight"}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <span className="text-xs font-bold text-slate-500">
              {locale === "ko" ? "투명 지퍼백 · 단자 절연" : "Zip-Lock / Port Insulation"}
            </span>
            <div
              className={`mt-1 text-sm font-extrabold ${
                airline.requiresInsulationOrPouch ? "text-amber-800" : "text-slate-900"
              }`}
            >
              {airline.requiresInsulationOrPouch
                ? locale === "ko"
                  ? "⚠ 의무 (투명 지퍼백 또는 테이프)"
                  : "⚠ MANDATORY (Pouch or Tape)"
                : locale === "ko"
                ? "단락 방지 보호 권고"
                : "Short-Circuit Protection Advised"}
            </div>
          </div>
        </div>

        {/* Policy Details & Airport Check-in Pro Tip */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
              {locale === "ko" ? "기내 세부 운영 지침" : "Detailed Cabin Policy"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {locale === "ko" ? airline.cabinPolicyKo : airline.cabinPolicyEn}
            </p>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-900">
              {locale === "ko" ? "공항 수속 & 검색대 통과 팁" : "Check-In & Security Pro Tip"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-800">
              {locale === "ko" ? airline.checkInTipKo : airline.checkInTipEn}
            </p>
          </div>
        </div>
      </section>

      <AdBanner locale={locale} slot="3101" />

      {/* Embedded Calculator (Automatically shows 2025-2026 Korean Checklist if Korean carrier!) */}
      <section className="mt-8">
        <WattCalculator
          locale={locale}
          initialMah={20000}
          initialVoltage={3.7}
          isKoreanAirline={airline.isKoreanRuleApplicable}
        />
      </section>

      {/* Airline FAQ */}
      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900 sm:text-xl">
          <HelpCircle className="h-5 w-5 text-blue-600" />
          {locale === "ko"
            ? `${airline.nameKo} 보조배터리 자주 묻는 질문`
            : `${airline.nameEn} Battery FAQ`}
        </h2>
        <div className="mt-4 space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4">
              <h3 className="text-sm font-extrabold text-slate-900">Q. {f.q}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Other Airlines */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
          <Plane className="h-5 w-5 text-blue-600" />
          {locale === "ko" ? "다른 항공사 기내 반입 규정 확인" : "Check Other Airline Rules"}
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {otherAirlines.map((other) => (
            <Link
              key={other.slug}
              href={`/${locale}/airline/${other.slug}`}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 hover:border-blue-400 hover:shadow-sm"
            >
              <div>
                <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-700">
                  {other.iataCode}
                </span>
                <div className="mt-1 text-sm font-bold text-slate-900">
                  {locale === "ko" ? other.nameKo : other.nameEn}
                </div>
              </div>
              <span className="text-xs font-bold text-blue-700">
                ≤100Wh ({other.maxPiecesUnder100Wh}) →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
