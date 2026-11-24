import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  ChevronRight,
  Flame,
  Scale,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { AdBanner } from "@/components/AdBanner";
import { BuyButtons } from "@/components/BuyButtons";
import { PureGramCalculator } from "@/components/PureGramCalculator";
import { PurityBar } from "@/components/PurityBar";
import {
  ALL_PRODUCTS,
  CATEGORY_MAP,
  getProductBySlug,
  getProductsByCategory,
  getRelatedVsPairsForProduct,
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
  buildPageMetadata,
  buildProductJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    ALL_PRODUCTS.map((prod) => ({
      locale,
      slug: prod.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const product = getProductBySlug(slug);
  if (!product) return {};

  const cat = CATEGORY_MAP[product.category];
  const isKo = locale === "ko";
  const m = isKo ? product.metricsKrw : product.metricsUsd;
  const curr = defaultCurrencyForLocale(locale);

  return buildPageMetadata({
    locale,
    subpath: `/product/${product.slug}`,
    title: isKo
      ? `${product.brand.ko} ${product.name.ko} 순도(${m.purityPercent.toFixed(1)}%) & ${cat.benchmarkLabel.ko}당 진짜 가격 분석`
      : `${product.brand.en} ${product.name.en} Purity Audit (${m.purityPercent.toFixed(1)}%) & True Cost per ${cat.benchmarkLabel.en}`,
    description: isKo
      ? `${product.name.ko} 영양성분 정밀 판독: 순도 ${m.purityPercent.toFixed(1)}%, 부형제 비율 ${m.fillerPercent.toFixed(1)}%, ${cat.benchmarkLabel.ko}당 ${formatCurrency(m.costPerBenchmarkUnit, curr, "unit")}, 30일 유지비 ${formatCurrency(m.monthlyHabitCost, curr, "total")}.`
      : `${product.name.en} lab-math breakdown: ${m.purityPercent.toFixed(1)}% active purity, ${m.fillerPercent.toFixed(1)}% filler ratio, ${formatCurrency(m.costPerBenchmarkUnit, curr, "unit")} per ${cat.benchmarkLabel.en}.`,
  });
}

export default async function ProductAuditPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const isKo = locale === "ko";
  const cat = CATEGORY_MAP[product.category];
  const currency = defaultCurrencyForLocale(locale);
  const m = isKo ? product.metricsKrw : product.metricsUsd;
  const altCurrency = isKo ? "USD" : "KRW";
  const altM = isKo ? product.metricsUsd : product.metricsKrw;
  const priceMain = isKo ? product.priceKrw : product.priceUsd;
  const priceAlt = isKo ? product.priceUsd : product.priceKrw;

  // Compute rank inside category
  const catPeers = getProductsByCategory(product.category).sort((a, b) => {
    const mA = isKo ? a.metricsKrw : a.metricsUsd;
    const mB = isKo ? b.metricsKrw : b.metricsUsd;
    return mA.costPerBenchmarkUnit - mB.costPerBenchmarkUnit;
  });
  const rankInCat = catPeers.findIndex((p) => p.slug === product.slug) + 1;

  const relatedVs = getRelatedVsPairsForProduct(product.slug, 8);

  const faqs = isKo
    ? [
        {
          question: `${product.brand.ko} ${product.name.ko}의 실제 유효성분 순도는 몇 %인가요?`,
          answer: `1회 섭취 중량 ${product.servingWeight}${cat.unit} 중 순수 유효성분(${cat.activeIngredientLabel.ko})은 ${product.activePerServing}${cat.unit}으로, 순도는 ${m.purityPercent.toFixed(1)}%(등급 ${m.purityGrade})이며 비유효·부형제 비율은 ${m.fillerPercent.toFixed(1)}%입니다.`,
        },
        {
          question: `${product.name.ko}의 ${cat.benchmarkLabel.ko}당 진짜 가격과 한 달 유지비는 얼마인가요?`,
          answer: `참고가 ${formatCurrency(priceMain, currency, "total")} 기준 ${cat.benchmarkLabel.ko}당 가격은 ${formatCurrency(m.costPerBenchmarkUnit, currency, "unit")}이며, 매일 1회 섭취 시 30일 유지비는 ${formatCurrency(m.monthlyHabitCost, currency, "total")}입니다.`,
        },
      ]
    : [
        {
          question: `What is the true active ingredient purity of ${product.brand.en} ${product.name.en}?`,
          answer: `Each ${product.servingWeight}${cat.unit} serving delivers ${product.activePerServing}${cat.unit} of ${cat.activeIngredientLabel.en}, resulting in ${m.purityPercent.toFixed(1)}% purity (Grade ${m.purityGrade}) and ${m.fillerPercent.toFixed(1)}% non-active mass.`,
        },
        {
          question: `How much does ${product.name.en} cost per ${cat.benchmarkLabel.en} and per month?`,
          answer: `At a reference price of ${formatCurrency(priceMain, currency, "total")}, it costs ${formatCurrency(m.costPerBenchmarkUnit, currency, "unit")} per ${cat.benchmarkLabel.en} and ${formatCurrency(m.monthlyHabitCost, currency, "total")} per 30 days at 1 serving/day.`,
        },
      ];

  const jsonLd = [
    buildProductJsonLd(product, cat, locale),
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
        <span className="font-bold text-slate-900 truncate">
          {product.brand[locale]} {product.name[locale]}
        </span>
      </nav>

      {/* Main Product Audit Card */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs lg:col-span-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-md bg-emerald-100 px-2.5 py-1 font-extrabold text-emerald-800">
              #{rankInCat} / {catPeers.length}{" "}
              {isKo ? `${cat.shortName.ko} 가성비` : `in ${cat.shortName.en}`}
            </span>
            {product.thirdPartyTested && (
              <span className="inline-flex items-center gap-1 rounded-md bg-sky-50 px-2.5 py-1 font-bold text-sky-800">
                <ShieldCheck className="h-3.5 w-3.5" />
                {product.thirdPartyTested}
              </span>
            )}
            <span className="rounded-md bg-slate-100 px-2.5 py-1 font-semibold text-slate-600">
              {product.packageLabel[locale]}
            </span>
          </div>

          <div>
            <p className="text-sm font-extrabold uppercase tracking-wider text-emerald-700">
              {product.brand[locale]}
            </p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              {product.name[locale]}
            </h1>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
              {product.summary[locale]}
            </p>
          </div>

          {/* Purity Bar */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <PurityBar
              purityPercent={m.purityPercent}
              grade={m.purityGrade}
              locale={locale}
            />
            {product.activeBreakdown && (
              <p className="mt-2.5 text-xs font-medium text-slate-700">
                <strong className="text-slate-900">
                  {isKo ? "원료·유효성분 구성:" : "Active Spec Breakdown:"}
                </strong>{" "}
                {product.activeBreakdown[locale]}
              </p>
            )}
          </div>

          {/* 6-Box Spec Breakdown */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
              <div className="text-xs font-semibold text-emerald-800">
                {cat.benchmarkLabel[locale]}
              </div>
              <div className="mt-1 text-2xl font-black text-emerald-700">
                {formatCurrency(m.costPerBenchmarkUnit, currency, "unit")}
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500">
                ({formatCurrency(altM.costPerBenchmarkUnit, altCurrency, "unit")})
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-xs font-semibold text-slate-500">
                {isKo ? "순수 1g당 가격" : "True Cost / 1g Active"}
              </div>
              <div className="mt-1 text-xl font-extrabold text-slate-900">
                {formatCurrency(m.costPerPureGram, currency, "unit")}
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500">
                {isKo
                  ? `총 순수량 ${m.totalPureActiveGrams.toFixed(0)}g`
                  : `${m.totalPureActiveGrams.toFixed(0)}g total active`}
              </div>
            </div>

            <div className="rounded-xl border border-rose-200 bg-rose-50/30 p-4">
              <div className="text-xs font-semibold text-rose-700">
                {isKo ? "부형제 거품 금액" : "Filler Tax Waste"}
              </div>
              <div className="mt-1 text-xl font-extrabold text-rose-600">
                {formatCurrency(m.fillerTaxCost, currency, "total")}
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500">
                {m.fillerPercent.toFixed(1)}%{" "}
                {isKo ? "비유효 중량" : "non-active mass"}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-xs font-semibold text-slate-500">
                {isKo ? "30일 일일 유지비" : "30-Day Habit Cost"}
              </div>
              <div className="mt-1 text-xl font-extrabold text-slate-900">
                {formatCurrency(m.monthlyHabitCost, currency, "total")}
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500">
                {formatCurrency(m.costPerServing, currency, "unit")} /{" "}
                {isKo ? "1회" : "serving"}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                <Flame className="h-3.5 w-3.5 text-orange-500" />
                <span>{isKo ? "칼로리 효율" : "Calorie Ratio"}</span>
              </div>
              <div className="mt-1 text-xl font-extrabold text-slate-900">
                {product.caloriesPerServing > 0
                  ? `${m.caloriesPerActiveGram.toFixed(1)} kcal/g`
                  : "0 kcal"}
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500">
                {product.caloriesPerServing} kcal / {isKo ? "1회" : "serving"}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-xs font-semibold text-slate-500">
                {isKo ? "1회 함량 스펙" : "Label Dose Spec"}
              </div>
              <div className="mt-1 text-xl font-extrabold text-slate-900">
                {product.activePerServing}
                {cat.unit}
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500">
                / {product.servingWeight}
                {cat.unit} ({product.totalServings}x)
              </div>
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-4">
              <h2 className="text-sm font-extrabold text-emerald-900">
                {isKo ? "장점 (Strengths)" : "PureGram Audit Pros"}
              </h2>
              <ul className="mt-2.5 space-y-2 text-xs sm:text-sm text-slate-700">
                {product.pros[locale].map((pro) => (
                  <li key={pro} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-rose-200 bg-rose-50/30 p-4">
              <h2 className="text-sm font-extrabold text-rose-900">
                {isKo ? "아쉬운 점 (Watchouts)" : "Filler & Cost Watchouts"}
              </h2>
              <ul className="mt-2.5 space-y-2 text-xs sm:text-sm text-slate-700">
                {product.cons[locale].map((con) => (
                  <li key={con} className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 shrink-0 text-rose-500 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Sticky Action & Price Check Sidebar */}
        <aside className="space-y-4 lg:col-span-4">
          <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {isKo ? "기준 스냅샷 가격" : "Reference Retail Price"}
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">
                {formatCurrency(priceMain, currency, "total")}
              </span>
              <span className="text-xs font-medium text-slate-500">
                ({formatCurrency(priceAlt, altCurrency, "total")})
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {product.packageLabel[locale]} ·{" "}
              {isKo ? "업데이트:" : "Checked:"} {product.lastChecked}
            </p>

            <div className="mt-5">
              <BuyButtons product={product} locale={locale} showDisclosure />
            </div>
          </div>

          {/* Quick 1v1 Matchups Sidebar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
            <h2 className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900">
              <Scale className="h-4 w-4 text-emerald-600" />
              <span>
                {isKo
                  ? `${product.brand.ko} 1:1 라이벌 비교`
                  : `Compare 1v1 vs Category Rivals`}
              </span>
            </h2>
            <ul className="mt-3 divide-y divide-slate-100 text-xs">
              {relatedVs.map((pair) => {
                const otherSlug =
                  pair.slugA === product.slug ? pair.slugB : pair.slugA;
                const rival = PRODUCT_MAP[otherSlug];
                if (!rival) return null;
                return (
                  <li key={pair.pairSlug} className="py-2.5 first:pt-0 last:pb-0">
                    <Link
                      href={`/${locale}/vs/${pair.pairSlug}`}
                      className="flex items-center justify-between font-semibold text-slate-700 hover:text-emerald-700"
                    >
                      <span className="truncate pr-2">
                        vs {rival.brand[locale]} {rival.name[locale]}
                      </span>
                      <span className="shrink-0 rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
                        VS →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>

      <AdBanner locale={locale} slot={`product-${product.slug}`} />

      {/* Pre-loaded Custom Price Calculator */}
      <div className="space-y-2">
        <h2 className="text-xl font-extrabold text-slate-900">
          {isKo
            ? "할인·특가 적용 시 실시간 순수그램 재계산"
            : "Test Live Sale / Subscribe-and-Save Price"}
        </h2>
        <PureGramCalculator
          locale={locale}
          initialCategory={product.category}
          initialValues={{
            priceUsd: product.priceUsd,
            priceKrw: product.priceKrw,
            servings: product.totalServings,
            servingWeight: product.servingWeight,
            activeWeight: product.activePerServing,
            calories: product.caloriesPerServing,
          }}
        />
      </div>

      {/* Product FAQ */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-extrabold text-slate-900">
          {isKo ? "제품 순도 & 가성비 자주 묻는 질문" : "Product Purity & Cost FAQ"}
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
