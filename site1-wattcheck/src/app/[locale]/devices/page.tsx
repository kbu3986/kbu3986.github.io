import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BatteryCharging, ChevronRight } from "lucide-react";
import {
  isValidLocale,
  buildAlternates,
  getDictionary,
  SITE_URL,
} from "@/lib/i18n";
import { DEVICES, type DeviceCategory } from "@/data/devices";
import { calculateDeviceCharges } from "@/lib/calculator";
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
      ? "스마트폰·노트북·게임기 40종 배터리 용량(Wh) & 보조배터리 충전 횟수 비교표"
      : "40+ Device Battery Wh Database & Power Bank Charge Estimator Chart";
  const description =
    locale === "ko"
      ? "아이폰 16 프로 맥스, 갤럭시 S25 울트라, 맥북 프로, 아이패드 프로 M4, 스팀덱, 닌텐도 스위치 2, DJI 드론, 양압기 등 40종 기기의 배터리 Wh와 10K/20K/27K 보조배터리 완충 횟수를 비교하세요."
      : "Compare exact battery Wh, USB-C PD wattage, and 10,000 / 20,000 / 27,000 mAh power bank charge counts across 40+ smartphones, laptops, tablets, handhelds, drones, and CPAPs.";

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/devices"),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/devices`,
      siteName: "WattCheck",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
    },
  };
}

const CATEGORY_ORDER: DeviceCategory[] = [
  "smartphone",
  "laptop",
  "tablet",
  "handheld",
  "drone-camera",
  "cpap-medical",
];

export default async function DevicesHubPage({
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
        ? "와트체크 기기별 보조배터리 충전 횟수 데이터베이스"
        : "WattCheck Device Battery Wh & Charge Sizer Directory",
    url: `${SITE_URL}/${locale}/devices`,
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
        <span className="text-slate-900">{dict.nav.devices}</span>
      </nav>

      <header className="mb-8">
        <h1 className="flex items-center gap-2.5 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
          <BatteryCharging className="h-8 w-8 text-blue-600" />
          {locale === "ko"
            ? "인기 기기 40종 배터리 Wh & 보조배터리 실사용 충전 횟수 총정리"
            : "40+ Device Battery Wh & Power Bank Charge Sizing Directory"}
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">
          {locale === "ko"
            ? "단순 mAh 나눗셈이 아닌 실제 배터리 전압(Wh)과 DC-DC 승압 변환 효율(82%)을 반영한 정확한 0→100% 충전 횟수입니다."
            : "All calculations reflect true internal Watt-hours (Wh) and 82% USB-C DC-DC conversion efficiency rather than misleading raw mAh ratios."}
        </p>
      </header>

      <AdBanner locale={locale} slot="2001" />

      <div className="space-y-10">
        {CATEGORY_ORDER.map((cat) => {
          const items = DEVICES.filter((d) => d.category === cat);
          return (
            <section
              key={cat}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
            >
              <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                {dict.estimator.categories[cat]} ({items.length})
              </h2>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-600">
                    <tr>
                      <th className="px-4 py-3">
                        {locale === "ko" ? "기기명" : "Device"}
                      </th>
                      <th className="px-4 py-3">
                        {locale === "ko" ? "배터리 Wh" : "Battery Wh"}
                      </th>
                      <th className="px-4 py-3">
                        {locale === "ko" ? "권장 PD 출력" : "Rec. PD W"}
                      </th>
                      <th className="px-4 py-3">10,000 mAh</th>
                      <th className="px-4 py-3">20,000 mAh</th>
                      <th className="px-4 py-3">27,000 mAh</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {items.map((d) => (
                      <tr key={d.slug} className="hover:bg-slate-50/80">
                        <td className="px-4 py-3 font-bold">
                          <Link
                            href={`/${locale}/device/${d.slug}`}
                            className="text-blue-700 hover:underline"
                          >
                            {locale === "ko" ? d.nameKo : d.nameEn}
                          </Link>
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-slate-900">
                          {d.batteryWh} Wh
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-700">
                          {d.recommendedPdWatts}W
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-700">
                          {calculateDeviceCharges(37, d.batteryWh).toFixed(2)}×
                        </td>
                        <td className="px-4 py-3 font-mono font-bold text-blue-700">
                          {calculateDeviceCharges(74, d.batteryWh).toFixed(2)}×
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-700">
                          {calculateDeviceCharges(99.9, d.batteryWh).toFixed(2)}×
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </div>

      <AffiliateCards locale={locale} wh={74} requiredWatts={65} />
    </div>
  );
}
