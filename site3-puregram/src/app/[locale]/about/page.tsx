import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calculator,
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  Mail,
} from "lucide-react";
import { isValidLocale, SITE_URL, SUPPORTED_LOCALES } from "@/lib/i18n";
import { buildFaqJsonLd, buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

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
    subpath: "/about",
    title: isKo
      ? "순수그램 소개 및 산출 공식 방법론·문의 — PureGram Index"
      : "About PureGram, Lab-Math Methodology & Contact — PureGram Index",
    description: isKo
      ? "순수그램 가성비 사전이 프로틴·크레아틴·오메가3(순수 EPA+DHA)·전해질·닭가슴살의 부형제 거품(Filler Tax)을 계산하는 정확한 공식과 데이터 검증 원칙을 소개합니다."
      : "Learn how PureGram Index audits supplements by pure active gram concentration, scoop/softgel filler waste, calorie lean ratios, and transparent unit economics.",
  });
}

export default async function AboutPage({
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
          question: "제품 제조사로부터 협찬을 받아 순위를 조정하나요?",
          answer:
            "아니요. 순수그램의 모든 순도(%)와 유효성분 단가 순위는 제품 영양성분표 수치와 스냅샷 가격에 의한 100% 결정론적 수학 공식으로만 산출되며 유료 순위 조정을 일절 받지 않습니다.",
        },
        {
          question: "리뉴얼된 영양성분표나 가격 변동 제보는 어떻게 하나요?",
          answer:
            "editorial@puregram-index.org 로 제품명과 영양성분표 사진을 보내주시면 검증 후 스냅샷 데이터베이스에 반영합니다.",
        },
      ]
    : [
        {
          question: "Can supplement brands pay to rank higher on PureGram?",
          answer:
            "Never. Every ranking on PureGram is generated deterministically from published Supplement Facts label mass ratios and reference retail prices.",
        },
        {
          question: "How can I report a reformulated supplement label?",
          answer:
            "Send the product name and updated Supplement Facts panel to editorial@puregram-index.org and our data team will update the catalog.",
        },
      ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: isKo
        ? "순수그램 가성비 사전 소개 및 방법론"
        : "About PureGram Index & Methodology",
      url: `${SITE_URL}/${locale}/about`,
      inLanguage: locale,
    },
    buildFaqJsonLd(faqs),
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Link href={`/${locale}`} className="hover:text-emerald-700">
          {isKo ? "순수그램 홈" : "PureGram Home"}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-bold text-slate-900">
          {isKo ? "소개 및 산출 공식" : "About & Methodology"}
        </span>
      </nav>

      <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs space-y-7 text-sm leading-relaxed text-slate-700">
        <header className="border-b border-slate-200 pb-5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            <FlaskConical className="h-3.5 w-3.5" />
            <span>
              {isKo ? "투명한 영양성분 경제학" : "Transparent Supplement Economics"}
            </span>
          </div>
          <h1 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900">
            {isKo
              ? "순수그램 가성비 사전(PureGram) 소개 및 산출 공식"
              : "About PureGram Index & Our Active-Gram Methodology"}
          </h1>
        </header>

        {isKo ? (
          <>
            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                1. 왜 &lsquo;순수 유효성분 1g당 가격&rsquo;인가요?
              </h2>
              <p>
                반복 구매하는 프로틴 파우더, 오메가3, 크레아틴, 전해질 보충제는 앞면 라벨의 총중량(예: 2.27kg 통, 1000mg 어유 캡슐)만 보면 실제 가치를 알 수 없습니다. 어떤 프로틴은 스쿱의 88%가 순수 단백질인 반면 어떤 제품은 53%가 크리머·말토덱스트린이며, 저가 오메가3는 1000mg 캡슐 중 실제 EPA+DHA가 250mg(25%)에 불과합니다. 순수그램은 이 <strong>부형제 거품(Filler Tax)</strong>을 투명하게 걷어내기 위해 탄생했습니다.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-extrabold text-slate-900">
                2. 핵심 수학 산출 공식 (4대 지표)
              </h2>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs space-y-1.5 text-slate-800">
                <div>
                  • 유효 순도 (%) = (1회 순수 유효성분 중량 ÷ 1회 총섭취 중량) × 100
                </div>
                <div>• 부형제 비율 (%) = 100% - 유효 순도 (%)</div>
                <div>
                  • 기준 유효성분당 진짜 단가 = 제품 가격 ÷ (총 제공 횟수 × 1회 순수 유효성분) × 카테고리 기준단위
                </div>
                <div>• 30일 일일 유지비 = (제품 가격 ÷ 총 제공 횟수) × 1일 섭취횟수 × 30일</div>
              </div>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>
                    <strong>프로틴·RTD·닭가슴살:</strong> 순수 단백질 10g당 가격 및 단백질 1g당 칼로리(kcal/g)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>
                    <strong>오메가3 (EPA+DHA):</strong> 총 어유 무게를 배제하고 오직 &lsquo;순수 EPA+DHA 합산 1000mg당 가격&rsquo;으로 평가
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>
                    <strong>크레아틴 & 전해질:</strong> 순수 크레아틴 5g당 가격 / 순수 전해질 이온(Na+K+Mg) 1000mg당 가격
                  </span>
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                3. 의학적 면책 고지 및 문의처
              </h2>
              <p>
                본 서비스의 모든 데이터는 공개된 영양성분표(Supplement Facts)를 바탕으로 한 경제성·영양 밀도 참고 지표이며, 전문의나 약사의 의학적 진단·처방을 대체하지 않습니다. 특정 질환이나 알레르기가 있는 경우 섭취 전 전문가와 상담하시기 바랍니다.
              </p>
              <p className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-800">
                <Mail className="h-4 w-4 text-emerald-600" />
                <span>데이터 제보 및 운영 문의: editorial@puregram-index.org</span>
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                1. Our Mission: Ending the Supplement Filler Tax
              </h2>
              <p>
                Front-of-tub supplement marketing relies on gross container weight (&ldquo;5 lb Tub!&rdquo;, &ldquo;1000mg Fish Oil!&rdquo;) to disguise low active concentration. A 47g dessert-protein scoop may hold only 22g protein alongside 25g creamer and maltodextrin, while a budget 1,000mg fish oil softgel often delivers just 250mg of combined EPA+DHA. PureGram Index audits repeat-purchase supplements strictly by <strong>pure active gram</strong>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-extrabold text-slate-900">
                2. Core PureGram Audit Formulas
              </h2>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs space-y-1.5 text-slate-800">
                <div>
                  • Active Purity (%) = (Pure Active Grams ÷ Total Serving Grams) × 100
                </div>
                <div>• Filler Ratio (%) = 100% - Active Purity (%)</div>
                <div>
                  • True Benchmark Cost = Price ÷ (Total Servings × Active per Serving) × Benchmark Unit
                </div>
                <div>
                  • 30-Day Habit Cost = (Price ÷ Total Servings) × Daily Servings × 30
                </div>
              </div>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>
                    <strong>Whey, Plant & RTD Protein:</strong> Audited per <strong>10g Pure Protein</strong> and lean kcal/g ratio.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>
                    <strong>Omega-3 Fish Oil:</strong> Ranked strictly per <strong>1,000mg Combined Pure EPA+DHA</strong>—never total fish oil weight.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>
                    <strong>Creatine & Electrolytes:</strong> Audited per <strong>5g Pure Creatine</strong> and <strong>1,000mg Pure Na+K+Mg Ions</strong>.
                  </span>
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                3. Editorial Independence, Disclaimer & Contact
              </h2>
              <p>
                PureGram Index is an independent analytical publication. Rankings are computed deterministically from Supplement Facts panels and periodically refreshed retail snapshots. Content is for informational and unit-cost comparison purposes only and does not constitute medical advice.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-800">
                  <Mail className="h-4 w-4 text-emerald-600" />
                  <span>Contact & Label Corrections: editorial@puregram-index.org</span>
                </span>
                <Link
                  href={`/${locale}/calculator`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  <Calculator className="h-3.5 w-3.5" />
                  <span>Open PureGram Calculator</span>
                </Link>
              </div>
            </section>
          </>
        )}
      </article>
    </div>
  );
}
