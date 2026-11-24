import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Award,
  ChevronRight,
  Flame,
  Sparkles,
} from "lucide-react";
import { AdBanner } from "@/components/AdBanner";
import { AffiliateCards } from "@/components/AffiliateCards";
import { BuyButtons } from "@/components/BuyButtons";
import { LiveLeaderboard } from "@/components/LiveLeaderboard";
import { PureGramCalculator } from "@/components/PureGramCalculator";
import {
  CATEGORIES,
  getCategoryById,
  getProductsByCategory,
  getVsPairsByCategory,
  PRODUCT_MAP,
} from "@/data/catalog";
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
    CATEGORIES.map((cat) => ({
      locale,
      category: cat.id,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isValidLocale(locale)) return {};
  const cat = getCategoryById(category);
  if (!cat) return {};

  const isKo = locale === "ko";
  return buildPageMetadata({
    locale,
    subpath: `/category/${cat.id}`,
    title: isKo
      ? `${cat.name.ko} 가성비 순위 & 순도 비교 (${cat.benchmarkLabel.ko} 단가 랭킹)`
      : `Best ${cat.name.en} Ranked by True Cost per ${cat.benchmarkLabel.en}`,
    description: cat.description[locale],
  });
}

export default async function CategoryLeaderboardPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  if (!isValidLocale(locale)) notFound();
  const cat = getCategoryById(category);
  if (!cat) notFound();

  const isKo = locale === "ko";
  const currency = defaultCurrencyForLocale(locale);
  const products = getProductsByCategory(cat.id);

  const byBestCost = [...products].sort((a, b) => {
    const mA = currency === "USD" ? a.metricsUsd : a.metricsKrw;
    const mB = currency === "USD" ? b.metricsUsd : b.metricsKrw;
    return mA.costPerBenchmarkUnit - mB.costPerBenchmarkUnit;
  });

  const byHighestPurity = [...products].sort(
    (a, b) => b.metricsUsd.purityPercent - a.metricsUsd.purityPercent
  );

  const byLeanestCalories = [...products].sort(
    (a, b) =>
      a.metricsUsd.caloriesPerActiveGram - b.metricsUsd.caloriesPerActiveGram
  );

  const costChamp = byBestCost[0];
  const purityChamp = byHighestPurity[0];
  const leanChamp = byLeanestCalories[0];

  const categoryPairs = getVsPairsByCategory(cat.id);

  const costChampM =
    currency === "USD" ? costChamp.metricsUsd : costChamp.metricsKrw;

  const faqs = isKo
    ? [
        {
          question: `${cat.name.ko} 카테고리에서 ${cat.benchmarkLabel.ko}당 가장 저렴한 가성비 1위 제품은 무엇인가요?`,
          answer: `현재 기준 ${costChamp.brand.ko} ${costChamp.name.ko} 제품이 ${cat.benchmarkLabel.ko}당 ${formatCurrency(costChampM.costPerBenchmarkUnit, currency, "unit")}(유효 순도 ${costChampM.purityPercent.toFixed(1)}%)로 1위를 기록하고 있습니다.`,
        },
        {
          question: `${cat.name.ko} 중 부형제가 가장 적고 순도(%)가 가장 높은 제품은 무엇인가요?`,
          answer: `${purityChamp.brand.ko} ${purityChamp.name.ko} 제품이 1회 총중량 대비 유효성분 순도 ${purityChamp.metricsKrw.purityPercent.toFixed(1)}%로 가장 높은 순도를 보입니다.`,
        },
      ]
    : [
        {
          question: `Which ${cat.name.en} has the lowest true cost per ${cat.benchmarkLabel.en}?`,
          answer: `Based on PureGram's active-gram audit, ${costChamp.brand.en} ${costChamp.name.en} ranks #1 at ${formatCurrency(costChampM.costPerBenchmarkUnit, currency, "unit")} per ${cat.benchmarkLabel.en} (${costChampM.purityPercent.toFixed(1)}% label purity).`,
        },
        {
          question: `Which ${cat.name.en} has the highest active ingredient purity and lowest filler?`,
          answer: `${purityChamp.brand.en} ${purityChamp.name.en} leads this category with ${purityChamp.metricsUsd.purityPercent.toFixed(1)}% active purity (${purityChamp.metricsUsd.fillerPercent.toFixed(1)}% non-active mass).`,
        },
      ];

  const jsonLd = [
    buildItemListJsonLd(cat.name[locale], locale, byBestCost),
    buildFaqJsonLd(faqs),
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Link href={`/${locale}`} className="hover:text-emerald-700">
          {isKo ? "순수그램 홈" : "PureGram Home"}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-bold text-slate-900">{cat.name[locale]}</span>
      </nav>

      {/* Hero Header */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
          <Sparkles className="h-3.5 w-3.5" />
          <span>
            {isKo ? "기준 단위:" : "Ranked By:"} {cat.benchmarkLabel[locale]}
          </span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          {isKo
            ? `${cat.name.ko} 순수그램 가성비 & 순도 리더보드`
            : `${cat.name.en} — True Cost & Purity Leaderboard`}
        </h1>
        <p className="max-w-3xl text-base text-slate-600 leading-relaxed">
          {cat.description[locale]}
        </p>

        {/* Category Lab Audit Callout */}
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-300/80 bg-amber-50 p-4 text-xs sm:text-sm text-amber-950">
          <AlertCircle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
          <p className="font-medium leading-relaxed">{cat.auditNote[locale]}</p>
        </div>
      </header>

      {/* 3 Category Podium Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border-2 border-emerald-500 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-700">
            <Award className="h-4 w-4 text-amber-500" />
            <span>
              {isKo ? "#1 최저 유효성분 단가" : "#1 Lowest Active Cost"}
            </span>
          </div>
          <Link
            href={`/${locale}/product/${costChamp.slug}`}
            className="mt-2 block text-base font-extrabold text-slate-900 hover:text-emerald-700"
          >
            {costChamp.brand[locale]} — {costChamp.name[locale]}
          </Link>
          <div className="mt-2 text-2xl font-black text-emerald-700">
            {formatCurrency(costChampM.costPerBenchmarkUnit, currency, "unit")}
            <span className="ml-1 text-xs font-medium text-slate-500">
              / {cat.benchmarkLabel[locale]}
            </span>
          </div>
          <div className="mt-3">
            <BuyButtons product={costChamp} locale={locale} compact />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-sky-700">
            <Sparkles className="h-4 w-4" />
            <span>{isKo ? "#1 최고 유효 순도" : "#1 Highest Purity %"}</span>
          </div>
          <Link
            href={`/${locale}/product/${purityChamp.slug}`}
            className="mt-2 block text-base font-extrabold text-slate-900 hover:text-emerald-700"
          >
            {purityChamp.brand[locale]} — {purityChamp.name[locale]}
          </Link>
          <div className="mt-2 text-2xl font-black text-slate-900">
            {purityChamp.metricsUsd.purityPercent.toFixed(1)}%
            <span className="ml-1 text-xs font-medium text-slate-500">
              {isKo ? "순수 비율" : "Active Purity"}
            </span>
          </div>
          <div className="mt-3">
            <BuyButtons product={purityChamp} locale={locale} compact />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-orange-700">
            <Flame className="h-4 w-4 text-orange-500" />
            <span>
              {isKo ? "#1 최고 칼로리 효율" : "#1 Leanest Calorie Ratio"}
            </span>
          </div>
          <Link
            href={`/${locale}/product/${leanChamp.slug}`}
            className="mt-2 block text-base font-extrabold text-slate-900 hover:text-emerald-700"
          >
            {leanChamp.brand[locale]} — {leanChamp.name[locale]}
          </Link>
          <div className="mt-2 text-2xl font-black text-slate-900">
            {leanChamp.caloriesPerServing > 0
              ? `${leanChamp.metricsUsd.caloriesPerActiveGram.toFixed(1)} kcal/g`
              : "0 kcal"}
            <span className="ml-1 text-xs font-medium text-slate-500">
              ({leanChamp.caloriesPerServing} kcal)
            </span>
          </div>
          <div className="mt-3">
            <BuyButtons product={leanChamp} locale={locale} compact />
          </div>
        </div>
      </div>

      {/* Category Sortable Leaderboard */}
      <LiveLeaderboard
        products={products}
        locale={locale}
        initialCategory={cat.id}
        lockCategory
      />

      <AdBanner locale={locale} slot={`cat-${cat.id}`} />

      <AffiliateCards locale={locale} category={cat.id} />

      {/* Category Interactive Calculator */}
      <PureGramCalculator locale={locale} initialCategory={cat.id} />

      {/* Category 1v1 Head-to-Head Matchups */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-slate-900">
          {isKo
            ? `${cat.name.ko} 1:1 라이벌 맞대결 (${categoryPairs.length}개)`
            : `${cat.name.en} 1v1 Head-to-Head Comparisons (${categoryPairs.length})`}
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categoryPairs.map((pair) => {
            const pA = PRODUCT_MAP[pair.slugA];
            const pB = PRODUCT_MAP[pair.slugB];
            if (!pA || !pB) return null;
            return (
              <Link
                key={pair.pairSlug}
                href={`/${locale}/vs/${pair.pairSlug}`}
                className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-3.5 text-xs font-bold text-slate-800 hover:border-emerald-500 hover:text-emerald-700 transition-colors"
              >
                <span className="truncate">
                  {pA.brand[locale]} ({pA.name[locale].split(" ")[0]}) vs{" "}
                  {pB.brand[locale]} ({pB.name[locale].split(" ")[0]})
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Category FAQ */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-extrabold text-slate-900">
          {isKo ? "자주 묻는 질문 (FAQ)" : "Frequently Asked Questions"}
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
