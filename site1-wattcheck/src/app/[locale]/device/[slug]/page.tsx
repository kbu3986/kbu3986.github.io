import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BatteryCharging,
  Zap,
  CheckCircle2,
  ChevronRight,
  Cpu,
  HelpCircle,
} from "lucide-react";
import {
  LOCALES,
  isValidLocale,
  buildAlternates,
  SITE_URL,
} from "@/lib/i18n";
import { DEVICES, getDeviceBySlug } from "@/data/devices";
import {
  mahToWh,
  calculateNetUsableWh,
  calculateDeviceCharges,
  DEFAULT_EFFICIENCY_PERCENT,
} from "@/lib/calculator";
import WattCalculator from "@/components/WattCalculator";
import AdBanner from "@/components/AdBanner";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of LOCALES) {
    for (const device of DEVICES) {
      params.push({ locale, slug: device.slug });
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
  const device = getDeviceBySlug(slug);
  if (!device) return {};

  const c20k = calculateDeviceCharges(74, device.batteryWh).toFixed(2);
  const title =
    locale === "ko"
      ? `${device.nameKo} 보조배터리 추천 용량 & 충전 횟수 (${device.batteryWh}Wh · ${device.recommendedPdWatts}W PD)`
      : `${device.nameEn} Power Bank Sizer — Battery Wh (${device.batteryWh} Wh) & Charge Count`;

  const description =
    locale === "ko"
      ? `${device.nameKo} 배터리 용량은 ${device.batteryWh}Wh(${device.batteryMah.toLocaleString("en-US")}mAh)이며 ${device.recommendedPdWatts}W USB-C PD 고속충전을 권장합니다. 10,000 / 20,000mAh(약 ${c20k}회) / 27,000mAh 기내반입 보조배터리 실사용 충전 횟수를 확인하세요.`
      : `${device.nameEn} packs a ${device.batteryWh} Wh (${device.batteryMah.toLocaleString("en-US")} mAh) battery with ${device.fastChargeWatts}W fast charging. A 20,000 mAh travel power bank delivers ~${c20k} full charges. Compare 10K, 20K & 27K airline-approved packs.`;

  return {
    title,
    description,
    alternates: buildAlternates(locale, `/device/${device.slug}`),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/device/${device.slug}`,
      siteName: "WattCheck",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "article",
    },
  };
}

const REFERENCE_BANKS = [
  { mah: 10000, v: 3.7, labelEn: "10,000 mAh Slim Travel", labelKo: "10,000mAh 휴대용 표준" },
  { mah: 20000, v: 3.7, labelEn: "20,000 mAh Flight Sweet-Spot", labelKo: "20,000mAh 해외여행 베스트" },
  { mah: 27000, v: 3.7, labelEn: "27,000 mAh TSA 99.9Wh Max", labelKo: "27,000mAh 기내반입 최대급" },
  { mah: 27650, v: 3.6, labelEn: "27,650 mAh Flagship (99.54Wh)", labelKo: "27,650mAh 플래그십 (99.54Wh)" },
];

export default async function DeviceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const device = getDeviceBySlug(slug);
  if (!device) notFound();

  const deviceName = locale === "ko" ? device.nameKo : device.nameEn;
  const charges10k = calculateDeviceCharges(37, device.batteryWh).toFixed(2);
  const charges20k = calculateDeviceCharges(74, device.batteryWh).toFixed(2);
  const charges27k = calculateDeviceCharges(99.9, device.batteryWh).toFixed(2);

  const relatedDevices = DEVICES.filter(
    (d) => d.category === device.category && d.slug !== device.slug
  ).slice(0, 6);

  const faqs =
    locale === "ko"
      ? [
          {
            q: `${device.nameKo} 배터리 용량은 몇 Wh이며 기내 반입 기준에 해당하나요?`,
            a: `${device.nameKo}의 내장(또는 전용) 배터리는 정격 ${device.batteryWh}Wh (${device.batteryMah.toLocaleString("en-US")}mAh @ ${device.nominalVoltage}V)입니다. 항공 안전 기준인 100Wh 미만이므로 승인 절차 없이 기내에 자유롭게 휴대 탑승할 수 있습니다.`,
          },
          {
            q: `20,000mAh 보조배터리로 ${device.nameKo}를 몇 번 충전할 수 있나요?`,
            a: `20,000mAh(3.7V 기준 74Wh) 보조배터리의 평균 실사용 변환 효율(82%, 가용 60.68Wh)을 적용하면 ${device.nameKo}(${device.batteryWh}Wh)를 0%에서 100%까지 약 ${charges20k}회 완충할 수 있습니다. 10,000mAh는 약 ${charges10k}회, 27,000mAh는 약 ${charges27k}회 충전됩니다.`,
          },
          {
            q: `${device.nameKo} 고속충전을 위해 몇 W(와트) 출력 보조배터리를 사야 하나요?`,
            a: `${device.nameKo}는 최대 ${device.fastChargeWatts}W 입력을 지원하므로 최소 ${device.recommendedPdWatts}W 이상 출력의 USB-C PD 보조배터리를 선택해야 제 속도로 충전됩니다.`,
          },
        ]
      : [
          {
            q: `How many Watt-hours (Wh) is the ${device.nameEn} battery?`,
            a: `The ${device.nameEn} battery holds ${device.batteryWh} Wh (${device.batteryMah.toLocaleString("en-US")} mAh at ${device.nominalVoltage}V nominal voltage), sitting well below the 100 Wh airline carry-on limit.`,
          },
          {
            q: `How many times will a 20,000 mAh power bank charge ${device.nameEn}?`,
            a: `A 20,000 mAh power bank (74 Wh rated, ~60.68 Wh net usable at 82% DC-DC efficiency) charges ${device.nameEn} (${device.batteryWh} Wh) approximately ${charges20k} times from 0% to 100%. A 10,000 mAh pack delivers ~${charges10k} charges, and a 27,000 mAh TSA-max pack delivers ~${charges27k} charges.`,
          },
          {
            q: `What wattage USB-C power bank does ${device.nameEn} need?`,
            a: `${device.nameEn} supports up to ${device.fastChargeWatts}W fast charging (${device.chargingProtocolEn}). Choose a power bank rated for at least ${device.recommendedPdWatts}W USB-C PD output.`,
          },
        ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: `${deviceName} — WattCheck Power Bank Sizer`,
      url: `${SITE_URL}/${locale}/device/${device.slug}`,
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
        <Link href={`/${locale}/devices`} className="hover:text-blue-700">
          {locale === "ko" ? "기기별 충전횟수" : "Device Sizer"}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-900">{deviceName}</span>
      </nav>

      {/* Hero Device Spec Card */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-blue-800">
            {device.brand}
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            {locale === "ko"
              ? `내장 ${device.batteryWh}Wh · 기내 휴대 100% 가능`
              : `${device.batteryWh} Wh · Carry-On Approved`}
          </span>
        </div>

        <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
          {locale === "ko"
            ? `${device.nameKo} 보조배터리 충전 횟수 & 추천 스펙`
            : `${device.nameEn} Power Bank Sizer & Charging Guide`}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {locale === "ko" ? device.travelTipKo : device.travelTipEn}
        </p>

        {/* Key Hardware Metrics */}
        <div className="mt-6 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <span className="text-xs font-bold text-slate-500">
              {locale === "ko" ? "배터리 전력량 (Wh)" : "Battery Energy (Wh)"}
            </span>
            <div className="mt-1 font-mono text-2xl font-black text-blue-700">
              {device.batteryWh} Wh
            </div>
            <span className="text-[11px] text-slate-500">
              {locale === "ko" ? "항공 100Wh 기준 비교값" : "Primary Airline Metric"}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <span className="text-xs font-bold text-slate-500">
              {locale === "ko" ? "정격 용량 / 전압" : "Rated mAh & Voltage"}
            </span>
            <div className="mt-1 font-mono text-2xl font-black text-slate-900">
              {device.batteryMah.toLocaleString("en-US")}{" "}
              <span className="text-sm font-bold text-slate-500">mAh</span>
            </div>
            <span className="font-mono text-[11px] text-slate-500">
              @ {device.nominalVoltage}V nominal
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <span className="text-xs font-bold text-slate-500">
              {locale === "ko" ? "최대 고속충전 입력" : "Peak Charge Input"}
            </span>
            <div className="mt-1 font-mono text-2xl font-black text-slate-900">
              {device.fastChargeWatts}W
            </div>
            <span className="text-[11px] text-slate-500">
              {locale === "ko" ? "기기 최대 수전 전력" : "Max Supported Draw"}
            </span>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4">
            <span className="text-xs font-bold text-blue-800">
              {locale === "ko" ? "권장 보조배터리 출력" : "Recommended PD Bank"}
            </span>
            <div className="mt-1 font-mono text-2xl font-black text-blue-700">
              {device.recommendedPdWatts}W+
            </div>
            <span className="text-[11px] text-blue-700">USB-C Power Delivery</span>
          </div>
        </div>

        {/* Protocol Note */}
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs text-slate-700 sm:text-sm">
          <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
          <div>
            <strong>
              {locale === "ko" ? "충전 프로토콜 스펙: " : "Charging Protocol: "}
            </strong>
            {locale === "ko" ? device.chargingProtocolKo : device.chargingProtocolEn}
          </div>
        </div>

        {/* 10,000 / 20,000 / 27,000 / 27,650 mAh Comparison Table */}
        <div className="mt-7">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <BatteryCharging className="h-5 w-5 text-blue-600" />
            {locale === "ko"
              ? `보조배터리 용량별 ${device.nameKo} 실사용 완충 횟수 (효율 ${DEFAULT_EFFICIENCY_PERCENT}% 기준)`
              : `How Many Times Do 10K / 20K / 27K Power Banks Charge ${device.nameEn}?`}
          </h2>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-600">
                <tr>
                  <th className="px-4 py-3">
                    {locale === "ko" ? "보조배터리 규격" : "Power Bank Size"}
                  </th>
                  <th className="px-4 py-3">
                    {locale === "ko" ? "정격 Wh" : "Rated Wh"}
                  </th>
                  <th className="px-4 py-3">
                    {locale === "ko" ? "실사용 가용 Wh" : "Net Usable Wh (82%)"}
                  </th>
                  <th className="px-4 py-3">
                    {locale === "ko" ? "0→100% 완충 횟수" : "0–100% Full Charges"}
                  </th>
                  <th className="px-4 py-3">
                    {locale === "ko" ? "기내 반입" : "Airline Rule"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {REFERENCE_BANKS.map((bank) => {
                  const ratedWh = mahToWh(bank.mah, bank.v);
                  const netWh = calculateNetUsableWh(ratedWh, DEFAULT_EFFICIENCY_PERCENT);
                  const count = calculateDeviceCharges(
                    ratedWh,
                    device.batteryWh,
                    DEFAULT_EFFICIENCY_PERCENT
                  );
                  return (
                    <tr key={bank.mah} className="hover:bg-slate-50/80">
                      <td className="px-4 py-3 font-bold text-slate-900">
                        <Link
                          href={`/${locale}/mah/${bank.mah}`}
                          className="text-blue-700 hover:underline"
                        >
                          {locale === "ko" ? bank.labelKo : bank.labelEn}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-mono font-semibold text-slate-700">
                        {ratedWh.toFixed(2)} Wh
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-600">
                        {netWh.toFixed(2)} Wh
                      </td>
                      <td className="px-4 py-3 font-mono text-base font-black text-blue-700">
                        {count.toFixed(2)}×{" "}
                        <span className="font-sans text-xs font-semibold text-slate-500">
                          {locale === "ko" ? "회" : "charges"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {locale === "ko" ? "무승인 반입 가능" : "Approved ≤100Wh"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <AdBanner locale={locale} slot="2101" />

      {/* Embedded Interactive Calculator Pre-Configured for this Device */}
      <section className="mt-8">
        <WattCalculator
          locale={locale}
          initialMah={device.batteryWh >= 45 ? 27000 : 20000}
          initialVoltage={3.7}
          highlightDeviceSlug={device.slug}
          requiredWattsHint={device.recommendedPdWatts}
        />
      </section>

      {/* Device FAQ */}
      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900 sm:text-xl">
          <HelpCircle className="h-5 w-5 text-blue-600" />
          {locale === "ko"
            ? `${device.nameKo} 충전 & 기내 반입 자주 묻는 질문`
            : `${device.nameEn} Battery & Travel FAQ`}
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

      {/* Related Devices */}
      {relatedDevices.length > 0 && (
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <Zap className="h-5 w-5 text-blue-600" />
            {locale === "ko" ? "비슷한 기기 배터리 비교" : "Compare Similar Devices"}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedDevices.map((rel) => (
              <Link
                key={rel.slug}
                href={`/${locale}/device/${rel.slug}`}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 hover:border-blue-400 hover:shadow-sm"
              >
                <div>
                  <div className="text-xs font-bold text-slate-400">{rel.brand}</div>
                  <div className="text-sm font-bold text-slate-900">
                    {locale === "ko" ? rel.nameKo : rel.nameEn}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm font-black text-blue-700">
                    {rel.batteryWh} Wh
                  </div>
                  <div className="text-[11px] text-slate-500">PD {rel.recommendedPdWatts}W</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
