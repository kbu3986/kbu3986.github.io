import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, ChevronRight, Plane, HelpCircle } from "lucide-react";
import {
  isValidLocale,
  buildAlternates,
  getDictionary,
  SITE_URL,
} from "@/lib/i18n";
import { AIRLINES } from "@/data/airlines";
import KoreaSafetyChecklist from "@/components/KoreaSafetyChecklist";
import WattCalculator from "@/components/WattCalculator";
import AdBanner from "@/components/AdBanner";
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
      ? "2025–2026 국토교통부 보조배터리 기내반입 강화 규정 완벽 가이드 (지퍼백·선반금지·스티커)"
      : "South Korea 2025–2026 Airline Power Bank Rules Guide (Zip-Lock, Overhead Bin Ban & 5-Pc Limit)";
  const description =
    locale === "ko"
      ? "대한항공, 아시아나, 제주항공, 진에어, 티웨이, 에어부산 등 한국 출발·국적기 탑승 전 필수 확인! 기내 선반 보관 금지, 투명 지퍼백/절연테이프, 기내 충전 금지, 100Wh/160Wh 개수 제한 총정리."
      : "Complete guide to South Korea's MOLIT aviation power bank rules enforced on Korean Air, Asiana, Jeju Air, Jin Air, T'way, and Air Premia: zip-lock pouches, terminal tape, overhead bin ban, and Wh stickers.";

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/korea-2026-rules"),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/korea-2026-rules`,
      siteName: "WattCheck",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "article",
    },
  };
}

export default async function KoreaRulesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const koreanCarriers = AIRLINES.filter((a) => a.isKoreanRuleApplicable);

  const faqs =
    locale === "ko"
      ? [
          {
            q: "투명 지퍼백과 절연테이프 둘 다 해야 하나요?",
            a: "아니요, 둘 중 하나만 조치해도 인정됩니다! 보조배터리 1개당 개별 투명 지퍼백(또는 보호 파우치)에 넣거나, USB 입출력 단자에 절연테이프(또는 실리콘 단자 보호캡)를 부착하면 단락 방지 규정을 충족합니다.",
          },
          {
            q: "외국 항공사(델타, 일본항공 등)를 타고 인천공항에서 출국할 때도 지퍼백이 필요한가요?",
            a: "국토교통부 의무 규정은 대한민국 국적 항공사(대한항공·아시아나·제주항공 등 9개사)에 우선 적용되나, 인천·김포·김해공항 보안검색대 권고 및 해외 항공사들의 선반 보관 금지 확산 추세에 맞춰 투명 지퍼백에 넣어 휴대하는 것이 가장 빠르고 안전합니다.",
          },
          {
            q: "전자담배 기내 반입 규정도 동일한가요?",
            a: "네! 액상형·궐련형 전자담배 역시 내장 리튬배터리(통상 100Wh 이하) 화재 위험으로 인해 위탁수하물 반입 금지, 기내 선반(오버헤드 빈) 보관 금지, 기내 충전 금지가 동일하게 적용되며 반드시 몸에 소지하거나 좌석 주머니에 보관해야 합니다.",
          },
        ]
      : [
          {
            q: "Do I need BOTH insulating tape AND a clear zip-lock plastic bag?",
            a: "No—either method satisfies the Korean MOLIT short-circuit requirement! Placing each power bank individually inside a clear zip-lock plastic bag OR covering exposed USB ports with electrical tape / silicone dust plugs is accepted.",
          },
          {
            q: "Does this apply to foreign tourists flying Korean Air or Asiana?",
            a: "Yes, 100%. All passengers boarding Korean-registered airlines (Korean Air, Asiana, Jeju Air, Jin Air, T'way, Air Premia, Air Busan, Eastar Jet, Air Seoul) anywhere in the world—including flights from LAX, JFK, LHR, NRT, or BKK to Seoul Incheon—must follow these cabin storage and insulation rules.",
          },
          {
            q: "What happens if my power bank has no Wh or mAh label printed on it?",
            a: "Under Korean and international aviation security rules, any lithium power bank with missing, illegible, or scratched-off capacity markings cannot be verified as ≤100 Wh and will be refused at check-in or security screening.",
          },
        ];

  const jsonLd = [
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

      <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
        <Link href={`/${locale}`} className="hover:text-blue-700">
          {locale === "ko" ? "홈" : "Home"}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-900">{dict.nav.koreaRules}</span>
      </nav>

      <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-900">
          <ShieldCheck className="h-4 w-4 text-amber-700" />
          {locale === "ko"
            ? "국토교통부 표준안 · 전 국적 항공사 시행"
            : "MOLIT Aviation Safety Standard · All Korean Carriers"}
        </span>
        <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
          {locale === "ko"
            ? "2025–2026 한국 항공사 보조배터리 · 전자담배 기내반입 강화 규정 총정리"
            : "2025–2026 South Korea Airline Power Bank & E-Cigarette Cabin Rules"}
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {locale === "ko"
            ? "기내 선반 화재 사고 재발 방지를 위해 대한민국 국토교통부와 전 국적 항공사가 시행 중인 보조배터리 용량·개수·단자 절연·보관 위치 의무 수칙입니다."
            : "Following cabin lithium battery incidents, South Korea's Ministry of Land, Infrastructure and Transport (MOLIT) enforced strict personal custody, terminal insulation, and in-flight charging bans across all Korean airlines."}
        </p>

        <KoreaSafetyChecklist locale={locale} showFullLink={false} />
      </header>

      <AdBanner locale={locale} slot="5001" />

      {/* Korean Carrier Quick Links */}
      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900 sm:text-xl">
          <Plane className="h-5 w-5 text-blue-600" />
          {locale === "ko"
            ? "대한민국 9개 국적 항공사별 세부 안내 바로가기"
            : "9 Korean Airlines Enforcing MOLIT Cabin Rules"}
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {koreanCarriers.map((c) => (
            <Link
              key={c.slug}
              href={`/${locale}/airline/${c.slug}`}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 hover:border-blue-400 hover:bg-white transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="rounded bg-slate-900 px-2 py-0.5 font-mono text-xs font-bold text-white">
                  {c.iataCode}
                </span>
                <span className="text-xs font-bold text-amber-800">
                  ≤100Wh: 5 / 160Wh: 2
                </span>
              </div>
              <div className="mt-2 text-base font-extrabold text-slate-900">
                {locale === "ko" ? c.nameKo : c.nameEn}
              </div>
              <p className="mt-1 line-clamp-2 text-xs text-slate-600">
                {locale === "ko" ? c.checkInTipKo : c.checkInTipEn}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Calculator Embedded */}
      <section className="mt-8">
        <WattCalculator
          locale={locale}
          initialMah={20000}
          initialVoltage={3.7}
          isKoreanAirline={true}
        />
      </section>

      {/* FAQ */}
      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900 sm:text-xl">
          <HelpCircle className="h-5 w-5 text-blue-600" />
          {locale === "ko" ? "출국 전 가장 많이 묻는 질문" : "Korea Flight Battery FAQ"}
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
    </div>
  );
}
