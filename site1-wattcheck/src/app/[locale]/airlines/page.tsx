import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Plane, ChevronRight, CheckCircle2, XCircle } from "lucide-react";
import {
  isValidLocale,
  buildAlternates,
  getDictionary,
  SITE_URL,
} from "@/lib/i18n";
import { AIRLINES } from "@/data/airlines";
import KoreaSafetyChecklist from "@/components/KoreaSafetyChecklist";
import AdBanner from "@/components/AdBanner";
import AffiliateCards from "@/components/AffiliateCards";
import JsonLd from "@/components/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const title =
    locale === "ko"
      ? "2026 전 세계 & 한국 30개 항공사 보조배터리 기내반입 규정 비교표"
      : "2026 Global & Korean Airline Power Bank Rules Comparison (30 Airlines)";
  const description =
    locale === "ko"
      ? "대한항공, 아시아나, 제주항공, 진에어, 티웨이, 에어프레미아, TSA, 델타, 에미레이트, 싱가포르항공, ANA, 중국동방항공(3C 인증) 등 30개 항공사 기내 반입 Wh 한도 및 선반·기내사용 금지 규정을 한눈에 비교하세요."
      : "Side-by-side 2026 airline power bank carry-on comparison across 30 airlines: ≤100 Wh piece limits, 100–160 Wh approvals, overhead bin bans, in-flight charging bans, and China 3C rules.";

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/airlines"),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/airlines`,
      siteName: "WattCheck",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
    },
  };
}

export default async function AirlinesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name:
      locale === "ko"
        ? "와트체크 전 세계 30개 항공사 보조배터리 기내반입 비교표"
        : "WattCheck Global Airline Power Bank Rules Matrix",
    url: `${SITE_URL}/${locale}/airlines`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    inLanguage: locale === "ko" ? "ko-KR" : "en-US",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={jsonLd} />

      <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
        <Link href={`/${locale}`} className="hover:text-blue-700">
          {locale === "ko" ? "홈" : "Home"}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-900">{dict.nav.airlines}</span>
      </nav>

      <header className="mb-6">
        <h1 className="flex items-center gap-2.5 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
          <Plane className="h-8 w-8 text-blue-600" />
          {locale === "ko"
            ? "2026 국내 · 해외 30개 항공사 보조배터리 기내반입 규정 비교"
            : "2026 Global & Korean Airline Power Bank Carry-On Matrix"}
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
          {locale === "ko"
            ? "한국 국적기(선반 보관 금지·지퍼백 의무), 일본(선반 금지), 동남아·중동(기내 사용 금지), 중국 국내선(CCC 마크 필수) 등 최신 규정을 완벽 비교합니다."
            : "Compare carry-on piece quotas, 100–160 Wh check-in sticker policies, overhead bin bans, in-flight charging bans, and China 3C rules."}
        </p>
      </header>

      <KoreaSafetyChecklist locale={locale} />

      <AdBanner locale={locale} slot="3001" />

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-600">
              <tr>
                <th className="px-4 py-3">
                  {locale === "ko" ? "항공사" : "Airline"}
                </th>
                <th className="px-4 py-3">≤100 Wh</th>
                <th className="px-4 py-3">100.1–160 Wh</th>
                <th className="px-4 py-3">
                  {locale === "ko" ? "기내 선반 보관" : "Overhead Bin"}
                </th>
                <th className="px-4 py-3">
                  {locale === "ko" ? "기내 충전·사용" : "In-Flight Use"}
                </th>
                <th className="px-4 py-3">
                  {locale === "ko" ? "특이사항" : "Special Rule"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {AIRLINES.map((a) => (
                <tr key={a.slug} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 font-bold">
                    <Link
                      href={`/${locale}/airline/${a.slug}`}
                      className="text-blue-700 hover:underline"
                    >
                      <span className="mr-1.5 rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-slate-700">
                        {a.iataCode}
                      </span>
                      {locale === "ko" ? a.nameKo : a.nameEn}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-700">
                    {locale === "ko"
                      ? `최대 ${a.maxPiecesUnder100Wh}개`
                      : `Max ${a.maxPiecesUnder100Wh} pcs`}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs font-bold">
                    {a.allows100To160Wh ? (
                      <span className="text-amber-700">
                        {locale === "ko"
                          ? `승인 시 ${a.maxPieces100To160Wh}개`
                          : `Approval (${a.maxPieces100To160Wh})`}
                      </span>
                    ) : (
                      <span className="text-rose-700">
                        {locale === "ko" ? "반입 불가" : "Banned"}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {a.overheadBinAllowed ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        {locale === "ko" ? "허용" : "Allowed"}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700">
                        <XCircle className="h-3.5 w-3.5 text-rose-600" />
                        {locale === "ko" ? "선반 금지" : "Banned"}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {a.inFlightUseAllowed ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {locale === "ko" ? "감시하 허용" : "Allowed"}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700">
                        <XCircle className="h-3.5 w-3.5" />
                        {locale === "ko" ? "사용 금지" : "Banned"}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-slate-600">
                    {a.requiresCccMark
                      ? locale === "ko"
                        ? "중국 CCC 마크 필수"
                        : "CCC Mark Required"
                      : a.requiresInsulationOrPouch
                      ? locale === "ko"
                        ? "지퍼백/절연테이프 필수"
                        : "Zip-Lock / Tape Req."
                      : locale === "ko"
                      ? "Wh 라벨 표기 확인"
                      : "Legible Wh Label"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <AffiliateCards locale={locale} wh={74} requiredWatts={45} />
    </div>
  );
}
