import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { AdBanner } from "@/components/AdBanner";
import { AffiliateCards } from "@/components/AffiliateCards";
import { AffiliateDisclosureBanner } from "@/components/BuyButtons";
import { PureGramCalculator } from "@/components/PureGramCalculator";
import { CATEGORIES } from "@/data/catalog";
import { isValidLocale } from "@/lib/i18n";
import {
  buildFaqJsonLd,
  buildPageMetadata,
  buildWebAppJsonLd,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const isKo = locale === "ko";

  return buildPageMetadata({
    locale,
    subpath: "/calculator",
    title: isKo
      ? "부형제 거품(Filler Tax) & 순수그램 단가 계산기 — 프로틴·오메가3·크레아틴"
      : "Supplement Filler Tax & Pure Gram Cost Calculator — Protein, Omega-3, Creatine",
    description: isKo
      ? "제품 가격, 총 제공량, 1회 스쿱·캡슐 중량, 순수 유효성분(단백질 g, EPA+DHA mg, 크레아틴 g)을 입력해 순도(%), 부형제 거품 금액, 30일 유지비를 즉시 계산하세요."
      : "Enter supplement price, total servings, serving weight, and pure active ingredient to compute exact Purity %, Filler Ratio %, True Cost per 10g Protein / 1000mg EPA+DHA / 5g Creatine, and 30-Day Habit Cost.",
  });
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const isKo = locale === "ko";

  const faqs = isKo
    ? [
        {
          question: "프로틴 파우더 순도(%) 몇 퍼센트 이상이면 좋은 제품인가요?",
          answer:
            "맛이 첨가된 WPC 농축유청은 75~80%, WPI 분리유청은 82~88% 이상이면 최상급 순도(A~A+ 등급)입니다. 반면 55% 미만이라면 스쿱 절반 가까이가 크리머·탄수화물·증점제입니다.",
        },
        {
          question: "오메가3 계산 시 캡슐 총중량과 EPA+DHA는 어디서 확인하나요?",
          answer:
            "제품 뒷면 영양성분표에서 1회 섭취량 기준 '총 어유 중량(예: 1,250mg)'을 1회 중량 칸에, 'EPA와 DHA의 합(예: 690+260=950mg)'을 순수 유효성분 칸에 입력하시면 됩니다.",
        },
      ]
    : [
        {
          question: "What is a good purity percentage for whey or vegan protein powder?",
          answer:
            "Flavored Whey Concentrates (WPC) typically score 75–80% purity, while high-grade Whey Isolates (WPI) and unflavored Pea/Soy Isolates hit 83–90% purity (Grade A to A+). Anything under 55% carries heavy carb or creamer filler.",
        },
        {
          question: "How do I enter Omega-3 fish oil labels into the calculator?",
          answer:
            "Enter the total fish oil concentrate per serving (e.g., 1,250mg) as Serving Weight, and add pure EPA + pure DHA together (e.g., 690mg + 260mg = 950mg) as Pure Active Ingredient.",
        },
      ];

  const jsonLd = [buildWebAppJsonLd(locale), buildFaqJsonLd(faqs)];

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
          {isKo ? "영양성분표 정밀 판독기" : "Interactive Label Audit Tool"}
        </span>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          {isKo
            ? "영양제 부형제 거품 & 순수 유효성분 1g당 가격 계산기"
            : "Supplement Filler Tax & Pure Active Gram Calculator"}
        </h1>
        <p className="mt-2 text-base text-slate-600">
          {isKo
            ? "쿠팡·아이허브·아마존에서 할인 쿠폰이 적용된 실구매가를 입력해 보세요. 스쿱·캡슐 속 부형제 거품 금액과 진짜 유효성분 단가를 0.1초 만에 계산합니다."
            : "Test any live sale or coupon price from Amazon, iHerb, or Costco to reveal exact Purity %, Filler Tax waste, and True Cost per Benchmark Unit."}
        </p>
      </div>

      <PureGramCalculator locale={locale} />

      <AffiliateCards locale={locale} />

      <AffiliateDisclosureBanner locale={locale} />

      <AdBanner locale={locale} slot="calculator-mid" />

      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900">
          {isKo
            ? "카테고리별 계산 완료된 리더보드 바로가기"
            : "Compare Pre-Audited Category Leaderboards"}
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/${locale}/category/${cat.id}`}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 font-bold text-slate-900 hover:border-emerald-500 hover:text-emerald-700 transition-colors"
            >
              <span>{cat.name[locale]}</span>
              <ArrowRight className="h-4 w-4 text-emerald-600" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
