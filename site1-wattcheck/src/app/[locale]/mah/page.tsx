import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Zap,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import {
  isValidLocale,
  buildAlternates,
  getDictionary,
  SITE_URL,
} from "@/lib/i18n";
import { MAH_CAPACITIES } from "@/data/mahCapacities";
import { mahToWh, getCabinSafetyTier } from "@/lib/calculator";
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
      ? "보조배터리 mAh → Wh 변환표 (3,000mAh ~ 300,000mAh 기내반입 기준표)"
      : "mAh to Wh Conversion Chart (3,000 to 300,000 mAh Airline Carry-On Table)";
  const description =
    locale === "ko"
      ? "5000, 10000, 20000, 24000, 27000, 27650, 30000, 50000mAh 등 모든 보조배터리 용량별 3.6V·3.7V·3.85V Wh 변환값과 비행기 기내 반입 가능 여부를 한눈에 확인하세요."
      : "Instant mAh to Watt-hours (Wh) conversion reference table across 3.6V, 3.7V, 3.85V, and 12.8V with FAA/IATA/MOLIT airline carry-on eligibility.";

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/mah"),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/mah`,
      siteName: "WattCheck",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
    },
  };
}

export default async function MahHubPage({
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
        ? "와트체크 mAh → Wh 변환 기준표"
        : "WattCheck mAh to Wh Conversion Chart",
    url: `${SITE_URL}/${locale}/mah`,
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
        <span className="text-slate-900">{dict.nav.mahChart}</span>
      </nav>

      <header className="mb-8">
        <h1 className="flex items-center gap-2.5 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
          <Zap className="h-8 w-8 text-blue-600" />
          {locale === "ko"
            ? "보조배터리 mAh → Wh 용량별 변환표 & 기내반입 판정"
            : "Complete mAh to Wh Conversion & Airline Eligibility Table"}
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
          {locale === "ko"
            ? "공식: Wh = (mAh × 전압 V) ÷ 1,000. 100Wh 이하 무승인 기내반입, 100.1~160Wh 항공사 승인 시 최대 2개, 160Wh 초과 여객기 반입 금지."
            : "Formula: Wh = (mAh × V) ÷ 1,000. ≤100 Wh flies carry-on worldwide; 100.1–160 Wh requires airline approval (max 2); >160 Wh is banned on passenger planes."}
        </p>
      </header>

      <AdBanner locale={locale} slot="4001" />

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-600">
              <tr>
                <th className="px-4 py-3">
                  {locale === "ko" ? "용량 (mAh)" : "Capacity (mAh)"}
                </th>
                <th className="px-4 py-3">3.6V (21700)</th>
                <th className="px-4 py-3">3.7V (Standard)</th>
                <th className="px-4 py-3">3.85V (High-V)</th>
                <th className="px-4 py-3">
                  {locale === "ko" ? "기내 반입 판정 (표준)" : "Cabin Verdict"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {MAH_CAPACITIES.map((m) => {
                const wh36 = mahToWh(m.amount, 3.6);
                const wh37 = mahToWh(m.amount, 3.7);
                const wh385 = mahToWh(m.amount, 3.85);
                const primaryWh = m.amount === 27650 ? wh36 : wh37;
                const tier = getCabinSafetyTier(primaryWh);

                return (
                  <tr key={m.slug} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3 font-mono font-black">
                      <Link
                        href={`/${locale}/mah/${m.slug}`}
                        className="text-blue-700 hover:underline"
                      >
                        {m.amount.toLocaleString("en-US")} mAh
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600">
                      {wh36.toFixed(2)} Wh
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">
                      {wh37.toFixed(2)} Wh
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600">
                      {wh385.toFixed(2)} Wh
                    </td>
                    <td className="px-4 py-3">
                      {tier === "green" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {locale === "ko" ? "무승인 기내반입" : "Carry-On OK (≤100Wh)"}
                        </span>
                      )}
                      {tier === "amber" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-900">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          {locale === "ko" ? "카운터 승인 (최대 2개)" : "Approval Req. (Max 2)"}
                        </span>
                      )}
                      {tier === "red" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800">
                          <XCircle className="h-3.5 w-3.5" />
                          {locale === "ko" ? "여객기 반입 금지" : "Banned (>160Wh)"}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <AffiliateCards locale={locale} wh={99.5} requiredWatts={100} />
    </div>
  );
}
