import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Zap,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronRight,
  HelpCircle,
  BatteryCharging,
} from "lucide-react";
import {
  LOCALES,
  isValidLocale,
  buildAlternates,
  SITE_URL,
} from "@/lib/i18n";
import {
  MAH_CAPACITIES,
  getMahCapacityByAmount,
} from "@/data/mahCapacities";
import { DEVICES } from "@/data/devices";
import {
  mahToWh,
  whToKwh,
  calculateNetUsableWh,
  calculateDeviceCharges,
  getCabinSafetyTier,
} from "@/lib/calculator";
import WattCalculator from "@/components/WattCalculator";
import AdBanner from "@/components/AdBanner";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  const params: Array<{ locale: string; amount: string }> = [];
  for (const locale of LOCALES) {
    for (const m of MAH_CAPACITIES) {
      params.push({ locale, amount: m.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; amount: string }>;
}): Promise<Metadata> {
  const { locale, amount } = await params;
  if (!isValidLocale(locale)) return {};
  const item = getMahCapacityByAmount(amount);
  if (!item) return {};

  const primaryV = item.amount === 27650 ? 3.6 : 3.7;
  const wh = mahToWh(item.amount, primaryV);
  const formattedMah = item.amount.toLocaleString("en-US");

  const title =
    locale === "ko"
      ? `${formattedMah}mAh 몇 Wh? (${wh.toFixed(1)}Wh) — 비행기 기내반입 가능 여부 & 충전 횟수`
      : `${formattedMah} mAh to Wh (${wh.toFixed(1)} Wh) — Allowed on Airplanes? & Charge Chart`;

  const description =
    locale === "ko"
      ? `${formattedMah}mAh 보조배터리는 ${primaryV}V 기준 ${wh.toFixed(2)}Wh입니다. ${item.airlineNoteKo}`
      : `Convert ${formattedMah} mAh to Watt-hours: ${wh.toFixed(2)} Wh at ${primaryV}V. ${item.airlineNoteEn}`;

  return {
    title,
    description,
    alternates: buildAlternates(locale, `/mah/${item.slug}`),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/mah/${item.slug}`,
      siteName: "WattCheck",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "article",
    },
  };
}

const VOLT_COLUMNS = [
  { v: 3.6, nameEn: "3.6V (21700 Cell)", nameKo: "3.6V (원통형 21700)" },
  { v: 3.7, nameEn: "3.7V (Standard Li-ion)", nameKo: "3.7V (표준 보조배터리)" },
  { v: 3.85, nameEn: "3.85V (High-Density)", nameKo: "3.85V (고밀도 폴리머)" },
  { v: 12.8, nameEn: "12.8V (4S LiFePO4 Pack)", nameKo: "12.8V (인산철 파워뱅크)" },
];

export default async function MahDetailPage({
  params,
}: {
  params: Promise<{ locale: string; amount: string }>;
}) {
  const { locale, amount } = await params;
  if (!isValidLocale(locale)) notFound();
  const item = getMahCapacityByAmount(amount);
  if (!item) notFound();

  const primaryV = item.amount === 27650 ? 3.6 : 3.7;
  const ratedWh = mahToWh(item.amount, primaryV);
  const netWh = calculateNetUsableWh(ratedWh, 82);
  const kwh = whToKwh(ratedWh);
  const tier = getCabinSafetyTier(ratedWh);
  const formattedMah = item.amount.toLocaleString("en-US");

  const sampleDevices = DEVICES.filter((d) => d.featured);

  const faqs =
    locale === "ko"
      ? [
          {
            q: `${formattedMah}mAh 보조배터리는 몇 Wh인가요?`,
            a: `표준 리튬이온 전압(${primaryV}V) 공식(Wh = mAh × V ÷ 1,000)을 적용하면 ${formattedMah} × ${primaryV} ÷ 1,000 = ${ratedWh.toFixed(2)}Wh (${kwh.toFixed(4)}kWh)입니다. 3.85V 고밀도 셀일 경우 ${mahToWh(item.amount, 3.85).toFixed(2)}Wh입니다.`,
          },
          {
            q: `${formattedMah}mAh 보조배터리 비행기 기내 반입이 되나요?`,
            a: item.airlineNoteKo,
          },
          {
            q: `${formattedMah}mAh 보조배터리로 스마트폰과 노트북을 몇 번 충전하나요?`,
            a: `실사용 변환 효율 82%(가용 ${netWh.toFixed(1)}Wh) 기준 아이폰 16 프로 맥스(18.17Wh)는 약 ${calculateDeviceCharges(ratedWh, 18.17).toFixed(2)}회, 갤럭시 S25 울트라(19.4Wh)는 약 ${calculateDeviceCharges(ratedWh, 19.4).toFixed(2)}회, 맥북 에어 13인치(52.6Wh)는 약 ${calculateDeviceCharges(ratedWh, 52.6).toFixed(2)}회 충전할 수 있습니다.`,
          },
        ]
      : [
          {
            q: `How many Watt-hours (Wh) is ${formattedMah} mAh?`,
            a: `Using the formula Wh = (mAh × V) ÷ 1,000, ${formattedMah} mAh at ${primaryV}V equals ${ratedWh.toFixed(2)} Wh (${kwh.toFixed(4)} kWh). At 3.85V high-density cell voltage, it equals ${mahToWh(item.amount, 3.85).toFixed(2)} Wh.`,
          },
          {
            q: `Can I take a ${formattedMah} mAh power bank on a plane?`,
            a: item.airlineNoteEn,
          },
          {
            q: `How many charges does a ${formattedMah} mAh power bank give?`,
            a: `At 82% real-world USB-C conversion efficiency (${netWh.toFixed(1)} Wh net usable), it delivers ~${calculateDeviceCharges(ratedWh, 18.17).toFixed(2)} full charges for iPhone 16 Pro Max, ~${calculateDeviceCharges(ratedWh, 19.4).toFixed(2)} charges for Galaxy S25 Ultra, and ~${calculateDeviceCharges(ratedWh, 52.6).toFixed(2)} charges for MacBook Air 13" M3.`,
          },
        ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: `${formattedMah} mAh to Wh Calculator — WattCheck`,
      url: `${SITE_URL}/${locale}/mah/${item.slug}`,
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
        <Link href={`/${locale}/mah`} className="hover:text-blue-700">
          {locale === "ko" ? "mAh → Wh 변환표" : "mAh to Wh Chart"}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-900">{formattedMah} mAh</span>
      </nav>

      {/* Main mAh Summary Card */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold text-white ${
              tier === "green"
                ? "bg-emerald-600"
                : tier === "amber"
                ? "bg-amber-600"
                : "bg-rose-600"
            }`}
          >
            {tier === "green" && <CheckCircle2 className="h-3.5 w-3.5" />}
            {tier === "amber" && <AlertTriangle className="h-3.5 w-3.5" />}
            {tier === "red" && <XCircle className="h-3.5 w-3.5" />}
            {tier === "green"
              ? locale === "ko"
                ? "기내 무승인 반입 가능 (≤100Wh)"
                : "Carry-On Approved (≤100 Wh)"
              : tier === "amber"
              ? locale === "ko"
                ? "항공사 카운터 사전 승인 필수 (100.1–160Wh)"
                : "Airline Approval Required (100.1–160 Wh)"
              : locale === "ko"
              ? "항공기 반입 절대 금지 (>160Wh)"
              : "Strictly Banned on Flights (>160 Wh)"}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs font-bold text-slate-700">
            {formattedMah} mAh = {ratedWh.toFixed(2)} Wh @ {primaryV}V
          </span>
        </div>

        <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
          {locale === "ko"
            ? `${formattedMah}mAh 보조배터리는 ${ratedWh.toFixed(1)}Wh — 비행기 기내 반입 & 충전 가이드`
            : `${formattedMah} mAh to Wh (${ratedWh.toFixed(1)} Wh) — Airline Carry-On Verdict & Sizing`}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-700 sm:text-base">
          {locale === "ko" ? item.airlineNoteKo : item.airlineNoteEn}
        </p>

        {/* Voltage Comparison Grid */}
        <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {VOLT_COLUMNS.map((vc) => {
            const cWh = mahToWh(item.amount, vc.v);
            const cTier = getCabinSafetyTier(cWh);
            return (
              <div
                key={vc.v}
                className={`rounded-2xl border p-4 ${
                  vc.v === primaryV
                    ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="text-xs font-bold text-slate-600">
                  {locale === "ko" ? vc.nameKo : vc.nameEn}
                </div>
                <div className="mt-1.5 font-mono text-2xl font-black text-slate-900">
                  {cWh.toFixed(2)} <span className="text-sm font-bold text-blue-700">Wh</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] font-bold">
                  <span className="font-mono text-slate-500">
                    {(cWh / 1000).toFixed(3)} kWh
                  </span>
                  <span
                    className={`rounded px-2 py-0.5 ${
                      cTier === "green"
                        ? "bg-emerald-100 text-emerald-800"
                        : cTier === "amber"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {cTier === "green"
                      ? "≤100Wh OK"
                      : cTier === "amber"
                      ? "100–160Wh Approval"
                      : ">160Wh Banned"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real-World Context & Popular Models */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {locale === "ko" ? "주 용도 및 실사용 포지션" : "Typical Travel Use Case"}
            </span>
            <p className="mt-1 text-sm font-bold text-slate-900">
              {locale === "ko" ? item.typicalUseKo : item.typicalUseEn}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {locale === "ko" ? "대표 시중 모델 예시" : "Representative Commercial Models"}
            </span>
            <p className="mt-1 text-sm font-bold text-slate-900">
              {locale === "ko" ? item.exampleModelsKo : item.exampleModelsEn}
            </p>
          </div>
        </div>

        {/* Device Charges Table for this exact mAh */}
        <div className="mt-7">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <BatteryCharging className="h-5 w-5 text-blue-600" />
            {locale === "ko"
              ? `${formattedMah}mAh (${ratedWh.toFixed(1)}Wh) 기기별 실사용 완충 횟수`
              : `What Can a ${formattedMah} mAh (${ratedWh.toFixed(1)} Wh) Power Bank Charge?`}
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {sampleDevices.slice(0, 8).map((dev) => {
              const charges = calculateDeviceCharges(ratedWh, dev.batteryWh, 82);
              return (
                <Link
                  key={dev.slug}
                  href={`/${locale}/device/${dev.slug}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5 hover:border-blue-400 hover:bg-white transition-all"
                >
                  <div className="text-xs font-bold text-slate-800">
                    {locale === "ko" ? dev.nameKo : dev.nameEn}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500">
                    {dev.batteryWh} Wh · PD {dev.recommendedPdWatts}W
                  </div>
                  <div className="mt-2 font-mono text-xl font-black text-blue-700">
                    {charges.toFixed(2)}×{" "}
                    <span className="font-sans text-xs font-semibold text-slate-600">
                      {locale === "ko" ? "회 완충" : "charges"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <AdBanner locale={locale} slot="4101" />

      {/* Pre-filled Interactive Bidirectional Calculator */}
      <section className="mt-8">
        <WattCalculator
          locale={locale}
          initialMah={item.amount}
          initialVoltage={primaryV}
          requiredWattsHint={item.recommendedWatts}
        />
      </section>

      {/* FAQ */}
      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900 sm:text-xl">
          <HelpCircle className="h-5 w-5 text-blue-600" />
          {locale === "ko"
            ? `${formattedMah}mAh 보조배터리 자주 묻는 질문`
            : `${formattedMah} mAh Power Bank FAQ`}
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

      {/* Other Capacities */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
          <Zap className="h-5 w-5 text-blue-600" />
          {locale === "ko" ? "다른 용량 mAh → Wh 바로가기" : "Other mAh to Wh Conversions"}
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {MAH_CAPACITIES.map((m) => (
            <Link
              key={m.slug}
              href={`/${locale}/mah/${m.slug}`}
              className={`rounded-xl border px-3 py-1.5 font-mono text-xs font-bold transition-colors ${
                m.slug === item.slug
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-400"
              }`}
            >
              {m.amount.toLocaleString("en-US")} mAh
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
