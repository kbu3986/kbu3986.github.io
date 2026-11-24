import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Coins,
  Flame,
  Scale,
  Trash2,
  Trophy,
} from "lucide-react";
import { AdBanner } from "@/components/AdBanner";
import { AffiliateDisclosureBanner, BuyButtons } from "@/components/BuyButtons";
import { PurityBar } from "@/components/PurityBar";
import {
  CATEGORY_MAP,
  CURATED_VS_PAIRS,
  getProductBySlug,
  getVsPairBySlug,
  getVsPairsByCategory,
  PRODUCT_MAP,
} from "@/data/catalog";
import { compareProducts } from "@/lib/calculator";
import {
  defaultCurrencyForLocale,
  formatCurrency,
  isValidLocale,
  SUPPORTED_LOCALES,
} from "@/lib/i18n";
import {
  buildFaqJsonLd,
  buildItemListJsonLd,
  buildPageMetadata,
} from "@/lib/seo";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    CURATED_VS_PAIRS.map((pair) => ({
      locale,
      pair: pair.pairSlug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; pair: string }>;
}): Promise<Metadata> {
  const { locale, pair } = await params;
  if (!isValidLocale(locale)) return {};
  const spec = getVsPairBySlug(pair);
  if (!spec) return {};

  const pA = getProductBySlug(spec.slugA);
  const pB = getProductBySlug(spec.slugB);
  if (!pA || !pB) return {};

  const cat = CATEGORY_MAP[spec.category];
  const isKo = locale === "ko";
  const curr = defaultCurrencyForLocale(locale);
  const cmp = compareProducts(pA, pB, curr);

  return buildPageMetadata({
    locale,
    subpath: `/vs/${spec.pairSlug}`,
    title: isKo
      ? `${pA.brand.ko} vs ${pB.brand.ko} 1:1 비교 — 순도(${cmp.metricsA.purityPercent.toFixed(0)}% vs ${cmp.metricsB.purityPercent.toFixed(0)}%) & 진짜 가성비 승자`
      : `${pA.brand.en} vs ${pB.brand.en} — Purity (${cmp.metricsA.purityPercent.toFixed(0)}% vs ${cmp.metricsB.purityPercent.toFixed(0)}%) & True Cost per ${cat.benchmarkLabel.en}`,
    description: isKo
      ? `${pA.name.ko} vs ${pB.name.ko} 정밀 맞대결! 부형제 거품 비율, 칼로리 효율, ${cat.benchmarkLabel.ko}당 진짜 가격 승자와 30일 유지비 차이를 비교합니다.`
      : `Head-to-head audit: ${pA.name.en} vs ${pB.name.en}. Compare active purity bars, filler waste, calorie efficiency, and true cost per ${cat.benchmarkLabel.en}.`,
  });
}

export default async function VsComparisonPage({
  params,
}: {
  params: Promise<{ locale: string; pair: string }>;
}) {
  const { locale, pair } = await params;
  if (!isValidLocale(locale)) notFound();
  const spec = getVsPairBySlug(pair);
  if (!spec) notFound();

  const pA = getProductBySlug(spec.slugA);
  const pB = getProductBySlug(spec.slugB);
  if (!pA || !pB) notFound();

  const isKo = locale === "ko";
  const cat = CATEGORY_MAP[spec.category];
  const currency = defaultCurrencyForLocale(locale);
  const cmp = compareProducts(pA, pB, currency);
  const { metricsA: mA, metricsB: mB } = cmp;

  const overallWinnerProd =
    cmp.overallWinner === "B" ? pB : pA;
  const costWinnerProd =
    cmp.costWinner === "B" ? pB : pA;
  const purityWinnerProd =
    cmp.purityWinner === "B" ? pB : pA;
  const calorieWinnerProd =
    cmp.calorieWinner === "B" ? pB : pA;

  const priceA = isKo ? pA.priceKrw : pA.priceUsd;
  const priceB = isKo ? pB.priceKrw : pB.priceUsd;

  const otherCategoryPairs = getVsPairsByCategory(cat.id)
    .filter((item) => item.pairSlug !== spec.pairSlug)
    .slice(0, 9);

  const faqs = isKo
    ? [
        {
          question: `${pA.brand.ko}와 ${pB.brand.ko} 중 ${cat.benchmarkLabel.ko}당 가성비가 더 좋은 제품은 무엇인가요?`,
          answer: `${costWinnerProd.brand.ko} ${costWinnerProd.name.ko} 제품이 ${cat.benchmarkLabel.ko}당 ${formatCurrency(cmp.costWinner === "B" ? mB.costPerBenchmarkUnit : mA.costPerBenchmarkUnit, currency, "unit")}으로 상대 제품 대비 약 ${cmp.costSavingsPercent.toFixed(1)}% 더 저렴합니다.`,
        },
        {
          question: `두 제품 중 부형제가 적고 유효성분 순도가 더 높은 쪽은 어디인가요?`,
          answer:
            cmp.purityWinner === "tie"
              ? `두 제품 모두 순도 ${mA.purityPercent.toFixed(1)}%로 동일합니다.`
              : `${purityWinnerProd.brand.ko} 제품이 순도 ${(cmp.purityWinner === "B" ? mB.purityPercent : mA.purityPercent).toFixed(1)}%로 상대 제품보다 ${cmp.purityDiffPoints.toFixed(1)}%p 더 높은 유효성분 밀도를 보입니다.`,
        },
      ]
    : [
        {
          question: `Which is cheaper per ${cat.benchmarkLabel.en}: ${pA.brand.en} or ${pB.brand.en}?`,
          answer: `${costWinnerProd.brand.en} ${costWinnerProd.name.en} wins on true active cost at ${formatCurrency(cmp.costWinner === "B" ? mB.costPerBenchmarkUnit : mA.costPerBenchmarkUnit, currency, "unit")} per ${cat.benchmarkLabel.en}—saving ${cmp.costSavingsPercent.toFixed(1)}% per pure active gram.`,
        },
        {
          question: `Which supplement has higher purity and less scoop/capsule filler?`,
          answer:
            cmp.purityWinner === "tie"
              ? `Both products tie at ${mA.purityPercent.toFixed(1)}% active purity.`
              : `${purityWinnerProd.brand.en} leads with ${(cmp.purityWinner === "B" ? mB.purityPercent : mA.purityPercent).toFixed(1)}% purity (+${cmp.purityDiffPoints.toFixed(1)} percentage points less filler mass).`,
        },
      ];

  const jsonLd = [
    buildItemListJsonLd(`${pA.name[locale]} vs ${pB.name[locale]}`, locale, [
      pA,
      pB,
    ]),
    buildFaqJsonLd(faqs),
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500">
        <Link href={`/${locale}`} className="hover:text-emerald-700">
          {isKo ? "홈" : "Home"}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link
          href={`/${locale}/category/${cat.id}`}
          className="hover:text-emerald-700"
        >
          {cat.name[locale]}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-bold text-slate-900">
          {pA.brand[locale]} vs {pB.brand[locale]}
        </span>
      </nav>

      {/* Hero Title */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-extrabold text-emerald-800">
          <Scale className="h-3.5 w-3.5" />
          <span>
            {isKo ? "1:1 순수그램 정밀 비교" : "1v1 PureGram Head-to-Head Audit"}
          </span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-4xl leading-tight">
          {pA.brand[locale]} {pA.name[locale]}{" "}
          <span className="text-emerald-600">vs</span> {pB.brand[locale]}{" "}
          {pB.name[locale]}
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-slate-600">
          {isKo
            ? `통 가격이나 총중량이 아닌 '${cat.benchmarkLabel.ko}당 진짜 단가', '부형제 비율(%)', '칼로리 효율'로 판정한 데이터 결과입니다.`
            : `Side-by-side comparison audited strictly on ${cat.benchmarkLabel.en} cost, label purity %, filler waste, and calorie efficiency.`}
        </p>
      </header>

      {/* Overall PureGram Winner Box (with Direct Buy CTA + Disclosure) */}
      <section className="rounded-2xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-50/70 via-white to-white p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-xs font-extrabold text-white">
              <Trophy className="h-3.5 w-3.5 text-amber-300" />
              <span>
                {isKo
                  ? "순수그램 종합 승자 (Overall Winner)"
                  : "PureGram Overall Index Winner"}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {overallWinnerProd.brand[locale]} —{" "}
              {overallWinnerProd.name[locale]}
            </h2>
            <p className="text-sm text-slate-700 max-w-2xl">
              {isKo
                ? `${costWinnerProd.brand.ko} 제품이 ${cat.benchmarkLabel.ko}당 ${cmp.costSavingsPercent.toFixed(1)}% 더 저렴하며, 순도 측면에서는 ${
                    cmp.purityWinner === "tie"
                      ? `두 제품 모두 ${mA.purityPercent.toFixed(1)}%로 동률입니다.`
                      : `${purityWinnerProd.brand.ko} 제품이 +${cmp.purityDiffPoints.toFixed(1)}%p 우세합니다.`
                  }`
                : `${costWinnerProd.brand.en} delivers ${cmp.costSavingsPercent.toFixed(1)}% lower cost per ${cat.benchmarkLabel.en}, while ${
                    cmp.purityWinner === "tie"
                      ? `both match at ${mA.purityPercent.toFixed(1)}% purity.`
                      : `${purityWinnerProd.brand.en} leads active purity by +${cmp.purityDiffPoints.toFixed(1)} percentage points.`
                  }`}
            </p>
          </div>

          <div className="shrink-0">
            <BuyButtons
              product={overallWinnerProd}
              locale={locale}
              showDisclosure
            />
          </div>
        </div>
      </section>

      {/* 4 Category Verdict Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
            <Coins className="h-4 w-4" />
            <span>
              {isKo ? "유효성분 가성비 승자" : "Pure Gram Cost Winner"}
            </span>
          </div>
          <div className="mt-1.5 text-base font-extrabold text-slate-900">
            {cmp.costWinner === "tie"
              ? isKo
                ? "동률"
                : "Tie"
              : costWinnerProd.brand[locale]}
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            {cmp.costSavingsPercent.toFixed(1)}%{" "}
            {isKo ? "단가 절약" : "cheaper per unit"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700">
            <Award className="h-4 w-4" />
            <span>{isKo ? "고순도(저부형제) 승자" : "Purity % Winner"}</span>
          </div>
          <div className="mt-1.5 text-base font-extrabold text-slate-900">
            {cmp.purityWinner === "tie"
              ? `${mA.purityPercent.toFixed(1)}% (${isKo ? "동률" : "Tie"})`
              : purityWinnerProd.brand[locale]}
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            {cmp.purityWinner === "tie"
              ? isKo
                ? "동일 순도"
                : "Identical label purity"
              : `+${cmp.purityDiffPoints.toFixed(1)}%p ${
                  isKo ? "순도 우위" : "higher concentration"
                }`}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-orange-700">
            <Flame className="h-4 w-4 text-orange-500" />
            <span>{isKo ? "칼로리 효율 승자" : "Calorie Efficiency Winner"}</span>
          </div>
          <div className="mt-1.5 text-base font-extrabold text-slate-900">
            {cmp.calorieWinner === "tie"
              ? isKo
                ? "동률 (0 kcal)"
                : "Tie"
              : calorieWinnerProd.brand[locale]}
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            {mA.caloriesPerActiveGram.toFixed(1)} vs{" "}
            {mB.caloriesPerActiveGram.toFixed(1)} kcal/g
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700">
            <Trash2 className="h-4 w-4" />
            <span>
              {isKo ? "부형제 낭비 비교" : "Filler Tax Waste Gap"}
            </span>
          </div>
          <div className="mt-1.5 text-base font-extrabold text-slate-900">
            {mA.fillerPercent.toFixed(1)}% vs {mB.fillerPercent.toFixed(1)}%
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            {formatCurrency(mA.fillerTaxCost, currency, "total")} vs{" "}
            {formatCurrency(mB.fillerTaxCost, currency, "total")}
          </p>
        </div>
      </div>

      {/* Side-by-Side Contender Cards with Purity Bars & Buy Links */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[
          { prod: pA, m: mA, price: priceA, side: "A" as const },
          { prod: pB, m: mB, price: priceB, side: "B" as const },
        ].map(({ prod, m, price, side }) => {
          const isWinner = cmp.overallWinner === side;
          return (
            <div
              key={prod.slug}
              className={`flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-xs ${
                isWinner
                  ? "border-2 border-emerald-500"
                  : "border-slate-200"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                    {prod.brand[locale]}
                  </span>
                  {isWinner && (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-800">
                      ★ {isKo ? "우세" : "WINNER"}
                    </span>
                  )}
                </div>
                <Link
                  href={`/${locale}/product/${prod.slug}`}
                  className="block text-xl font-black text-slate-900 hover:text-emerald-700"
                >
                  {prod.name[locale]}
                </Link>
                <p className="text-xs text-slate-500">
                  {prod.packageLabel[locale]} ·{" "}
                  {formatCurrency(price, currency, "total")}
                </p>

                <PurityBar
                  purityPercent={m.purityPercent}
                  grade={m.purityGrade}
                  locale={locale}
                />

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-[11px] text-slate-500">
                      {cat.benchmarkLabel[locale]}
                    </div>
                    <div className="text-lg font-black text-emerald-700">
                      {formatCurrency(m.costPerBenchmarkUnit, currency, "unit")}
                    </div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-[11px] text-slate-500">
                      {isKo ? "30일 유지비" : "30-Day Cost"}
                    </div>
                    <div className="text-lg font-black text-slate-900">
                      {formatCurrency(m.monthlyHabitCost, currency, "total")}
                    </div>
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-700">
                  {prod.pros[locale].slice(0, 2).map((pro) => (
                    <li key={pro} className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 mt-0.5" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <BuyButtons product={prod} locale={locale} />
              </div>
            </div>
          );
        })}
      </div>

      <AffiliateDisclosureBanner locale={locale} />

      {/* Full 10-Row Head-to-Head Spec Table */}
      <section className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-900 text-xs font-bold text-white">
              <th className="py-3.5 px-4 w-1/4">
                {isKo ? "비교 항목" : "Audit Metric"}
              </th>
              <th className="py-3.5 px-4 w-[37.5%]">{pA.brand[locale]}</th>
              <th className="py-3.5 px-4 w-[37.5%]">{pB.brand[locale]}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
            <tr>
              <td className="py-3 px-4 font-bold text-slate-700">
                {cat.benchmarkLabel[locale]} {isKo ? "단가" : "True Cost"}
              </td>
              <td
                className={`py-3 px-4 font-black ${
                  cmp.costWinner === "A"
                    ? "bg-emerald-50/60 text-emerald-700"
                    : "text-slate-800"
                }`}
              >
                {formatCurrency(mA.costPerBenchmarkUnit, currency, "unit")}
              </td>
              <td
                className={`py-3 px-4 font-black ${
                  cmp.costWinner === "B"
                    ? "bg-emerald-50/60 text-emerald-700"
                    : "text-slate-800"
                }`}
              >
                {formatCurrency(mB.costPerBenchmarkUnit, currency, "unit")}
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-slate-700">
                {isKo ? "유효성분 순도 (%)" : "Active Purity Ratio"}
              </td>
              <td
                className={`py-3 px-4 font-bold ${
                  cmp.purityWinner === "A"
                    ? "bg-emerald-50/60 text-emerald-700"
                    : "text-slate-800"
                }`}
              >
                {mA.purityPercent.toFixed(1)}% ({mA.purityGrade})
              </td>
              <td
                className={`py-3 px-4 font-bold ${
                  cmp.purityWinner === "B"
                    ? "bg-emerald-50/60 text-emerald-700"
                    : "text-slate-800"
                }`}
              >
                {mB.purityPercent.toFixed(1)}% ({mB.purityGrade})
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-slate-700">
                {isKo ? "부형제·기타중량 비율" : "Filler / Non-Active Ratio"}
              </td>
              <td className="py-3 px-4 text-rose-600 font-semibold">
                {mA.fillerPercent.toFixed(1)}% (
                {formatCurrency(mA.fillerTaxCost, currency, "total")})
              </td>
              <td className="py-3 px-4 text-rose-600 font-semibold">
                {mB.fillerPercent.toFixed(1)}% (
                {formatCurrency(mB.fillerTaxCost, currency, "total")})
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-slate-700">
                {isKo ? "1회 중량 대비 유효성분" : "Active per Serving"}
              </td>
              <td className="py-3 px-4 text-slate-800">
                {pA.activePerServing}
                {cat.unit} / {pA.servingWeight}
                {cat.unit}
              </td>
              <td className="py-3 px-4 text-slate-800">
                {pB.activePerServing}
                {cat.unit} / {pB.servingWeight}
                {cat.unit}
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-slate-700">
                {isKo ? "통 전체 순수 유효성분" : "Total Pure Active in Tub"}
              </td>
              <td className="py-3 px-4 text-slate-800">
                {mA.totalPureActiveGrams.toFixed(0)}g ({pA.totalServings}x)
              </td>
              <td className="py-3 px-4 text-slate-800">
                {mB.totalPureActiveGrams.toFixed(0)}g ({pB.totalServings}x)
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-slate-700">
                {isKo ? "칼로리 효율" : "Calories per Active Gram"}
              </td>
              <td
                className={`py-3 px-4 font-semibold ${
                  cmp.calorieWinner === "A"
                    ? "bg-emerald-50/60 text-emerald-700"
                    : "text-slate-800"
                }`}
              >
                {pA.caloriesPerServing} kcal (
                {mA.caloriesPerActiveGram.toFixed(1)} kcal/g)
              </td>
              <td
                className={`py-3 px-4 font-semibold ${
                  cmp.calorieWinner === "B"
                    ? "bg-emerald-50/60 text-emerald-700"
                    : "text-slate-800"
                }`}
              >
                {pB.caloriesPerServing} kcal (
                {mB.caloriesPerActiveGram.toFixed(1)} kcal/g)
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-slate-700">
                {isKo ? "30일 일일 유지비" : "30-Day Daily Habit Cost"}
              </td>
              <td
                className={`py-3 px-4 font-bold ${
                  cmp.monthlyWinner === "A"
                    ? "bg-emerald-50/60 text-emerald-700"
                    : "text-slate-800"
                }`}
              >
                {formatCurrency(mA.monthlyHabitCost, currency, "total")}
              </td>
              <td
                className={`py-3 px-4 font-bold ${
                  cmp.monthlyWinner === "B"
                    ? "bg-emerald-50/60 text-emerald-700"
                    : "text-slate-800"
                }`}
              >
                {formatCurrency(mB.monthlyHabitCost, currency, "total")}
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-bold text-slate-700">
                {isKo ? "제3기관 품질 인증" : "3rd-Party Testing"}
              </td>
              <td className="py-3 px-4 text-slate-700">
                {pA.thirdPartyTested || (isKo ? "자체 GMP" : "Standard GMP")}
              </td>
              <td className="py-3 px-4 text-slate-700">
                {pB.thirdPartyTested || (isKo ? "자체 GMP" : "Standard GMP")}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <AdBanner locale={locale} slot={`vs-${spec.pairSlug}`} />

      {/* Related Matchups in Category */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-slate-900">
          {isKo
            ? `${cat.name.ko} 다른 1:1 비교 더보기`
            : `More ${cat.name.en} 1v1 Matchups`}
        </h2>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {otherCategoryPairs.map((other) => {
            const oA = PRODUCT_MAP[other.slugA];
            const oB = PRODUCT_MAP[other.slugB];
            if (!oA || !oB) return null;
            return (
              <Link
                key={other.pairSlug}
                href={`/${locale}/vs/${other.pairSlug}`}
                className="rounded-xl border border-slate-200 bg-white p-3.5 text-xs font-bold text-slate-800 hover:border-emerald-500 hover:text-emerald-700 transition-colors truncate"
              >
                {oA.brand[locale]} vs {oB.brand[locale]} →
              </Link>
            );
          })}
        </div>
      </section>

      {/* FAQ Block */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-extrabold text-slate-900">
          {isKo ? "1:1 비교 핵심 질문 요약" : "1v1 Verdict FAQ"}
        </h2>
        <div className="mt-4 space-y-4">
          {faqs.map((f) => (
            <div key={f.question}>
              <h3 className="text-sm font-bold text-slate-900">
                Q. {f.question}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
