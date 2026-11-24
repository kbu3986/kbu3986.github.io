import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  FlaskConical,
  Scale,
  Sparkles,
} from "lucide-react";
import { AdBanner } from "@/components/AdBanner";
import { AffiliateCards } from "@/components/AffiliateCards";
import { LiveLeaderboard } from "@/components/LiveLeaderboard";
import { PureGramCalculator } from "@/components/PureGramCalculator";
import {
  ALL_PRODUCTS,
  CATEGORIES,
  CURATED_VS_PAIRS,
  getProductsByCategory,
  PRODUCT_MAP,
} from "@/data/catalog";
import { compareProducts } from "@/lib/calculator";
import {
  defaultCurrencyForLocale,
  DICTIONARY,
  formatCurrency,
  isValidLocale,
} from "@/lib/i18n";
import {
  buildFaqJsonLd,
  buildItemListJsonLd,
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
    subpath: "",
    title: isKo
      ? "순수그램 가성비 사전 (PureGram) — 단백질·오메가3·크레아틴 유효성분 1g당 진짜 가격 비교"
      : "PureGram Index — True Cost Per Active Gram & 1v1 Supplement Leaderboard",
    description: isKo
      ? "스쿱 부형제와 캡슐 총중량 거품을 제거합니다! 유청 WPI/WPC 프로틴, 식물성 단백질, 크레아틴, 오메가3(순수 EPA+DHA), 전해질, 더단백·닭가슴살 48종의 유효성분 1g당 가격과 순도 랭킹."
      : "Stop paying the supplement Filler Tax. Compare 48+ bestselling protein powders, creatine, pure EPA+DHA omega-3s, electrolytes, and RTD shakes by true cost per pure active gram.",
  });
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const isKo = locale === "ko";
  const t = DICTIONARY[locale];
  const currency = defaultCurrencyForLocale(locale);

  // Pick 2 featured rivalries per category = 12 featured matchups
  const featuredMatchups = CATEGORIES.flatMap((cat) =>
    CURATED_VS_PAIRS.filter((p) => p.category === cat.id).slice(0, 2)
  );

  const faqs = isKo
    ? [
        {
          question: "순수그램(PureGram) 가성비 지수는 일반 통 가격 비교와 무엇이 다른가요?",
          answer:
            "일반 쇼핑몰은 100g당 가격이나 총 캡슐 수만 표시하지만, 실제 프로틴 스쿱의 20~53%는 코코아·크리머 부형제이고 저가 오메가3 캡슐의 70% 이상은 일반 지방입니다. 순수그램은 오직 순수 단백질 10g, 순수 EPA+DHA 1000mg, 순수 크레아틴 5g당 진짜 가격만을 산출합니다.",
        },
        {
          question: "오메가3 순위를 매길 때 왜 총 어유(Fish Oil) 중량을 쓰지 않나요?",
          answer:
            "1000mg 어유 캡슐이라도 EPA+DHA 합산이 250mg(순도 25%)인 제품과 950mg(순도 76%)인 제품은 유효성분이 거의 4배 차이 나기 때문입니다. 순수그램은 오직 순수 EPA+DHA 합산 1000mg당 단가로만 순위를 계산합니다.",
        },
        {
          question: "RTD 단백질 음료와 닭가슴살은 파우더 대비 가성비가 얼마나 차이 나나요?",
          answer:
            "대용량 WPC/SPI 파우더는 순수 단백질 10g당 250~450원 수준이며, 빙그레 더단백·셀렉스 프로핏·하림 닭가슴살 대용량 박스는 10g당 640~720원 수준으로 편의성 대비 매우 우수한 효율을 보입니다.",
        },
      ]
    : [
        {
          question: "What is the Supplement 'Filler Tax' and how does PureGram calculate it?",
          answer:
            "The Filler Tax is the percentage of a supplement's scoop or softgel weight made up of creamers, maltodextrin, gums, sugars, or non-omega-3 carrier oils. PureGram divides container price strictly by total pure active grams (Total Servings × Active Ingredient per Serving).",
        },
        {
          question: "Why are Omega-3 supplements ranked by 1,000mg EPA+DHA instead of 1,000mg Fish Oil?",
          answer:
            "A standard '1000mg Fish Oil' pill often contains only 250–300mg of combined EPA+DHA—meaning 70–75% is non-active lipid filler! Ranking by 1,000mg pure EPA+DHA reveals the true active concentration and real unit value.",
        },
        {
          question: "How often are PureGram reference prices and leaderboards updated?",
          answer:
            "PureGram runs an automated scheduled daily sync script against reference USD and KRW retail snapshots and allows instant live price overrides inside our interactive calculator.",
        },
      ];

  const jsonLd = [
    buildWebAppJsonLd(locale),
    buildItemListJsonLd(t.leaderboardTitle, locale, ALL_PRODUCTS.slice(0, 20)),
    buildFaqJsonLd(faqs),
  ];

  return (
    <div className="space-y-12 pb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Banner */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t.heroBadge}</span>
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl leading-tight">
              {t.heroTitle}
            </h1>
            <p className="mt-4 text-base text-slate-300 sm:text-lg leading-relaxed">
              {t.heroSubtitle}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-extrabold text-slate-950 shadow-sm hover:bg-emerald-400 transition-colors"
              >
                <FlaskConical className="h-4 w-4" />
                {t.navCalculator}
              </a>
              <Link
                href={`/${locale}/vs`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 transition-colors"
              >
                <Scale className="h-4 w-4 text-emerald-400" />
                {isKo
                  ? `1:1 영양제 맞대결 (${CURATED_VS_PAIRS.length}개)`
                  : `Browse ${CURATED_VS_PAIRS.length} 1v1 Matchups`}
              </Link>
            </div>
          </div>

          {/* Live Index KPI Strip */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="text-2xl font-black text-emerald-400">
                {ALL_PRODUCTS.length}
              </div>
              <div className="text-xs text-slate-400">
                {isKo ? "정밀 분석된 글로벌·국내 제품" : "Lab-Math Audited Products"}
              </div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="text-2xl font-black text-emerald-400">
                {CURATED_VS_PAIRS.length}
              </div>
              <div className="text-xs text-slate-400">
                {isKo ? "카테고리별 1:1 순도 맞대결" : "Head-to-Head 1v1 Audits"}
              </div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="text-2xl font-black text-amber-400">25%–90%</div>
              <div className="text-xs text-slate-400">
                {isKo ? "실제 유효성분 순도 격차" : "Real Label Purity Spread"}
              </div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
              <div className="text-2xl font-black text-white">6</div>
              <div className="text-xs text-slate-400">
                {isKo ? "반복구매 핵심 헬스 카테고리" : "Repeat-Buy Supplement Tiers"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-14 px-4 sm:px-6 lg:px-8">
        {/* 6 Category Quick Leader Cards */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900">
              {t.categoriesHeading}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => {
              const items = getProductsByCategory(cat.id).sort((a, b) => {
                const mA = currency === "USD" ? a.metricsUsd : a.metricsKrw;
                const mB = currency === "USD" ? b.metricsUsd : b.metricsKrw;
                return mA.costPerBenchmarkUnit - mB.costPerBenchmarkUnit;
              });
              const topPick = items[0];
              const topM =
                currency === "USD" ? topPick.metricsUsd : topPick.metricsKrw;

              return (
                <Link
                  key={cat.id}
                  href={`/${locale}/category/${cat.id}`}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                        {cat.benchmarkLabel[locale]}
                      </span>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 group-hover:text-emerald-600 transition-transform" />
                    </div>
                    <h3 className="mt-3 text-base font-extrabold text-slate-900 group-hover:text-emerald-700">
                      {cat.name[locale]}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-slate-600 leading-relaxed">
                      {cat.description[locale]}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-700 truncate max-w-[65%]">
                      <Award className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                      <span className="truncate">{topPick.brand[locale]}</span>
                    </span>
                    <span className="font-black text-emerald-700">
                      {formatCurrency(topM.costPerBenchmarkUnit, currency, "unit")}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <AdBanner locale={locale} slot="home-above-calculator" />

        {/* Interactive Filler Tax & Pure Gram Calculator */}
        <PureGramCalculator locale={locale} />

        {/* Live Filterable & Sortable Leaderboard */}
        <LiveLeaderboard products={ALL_PRODUCTS} locale={locale} />

        <AffiliateCards locale={locale} />

        <AdBanner locale={locale} slot="home-below-leaderboard" />

        {/* Popular 1v1 Head-to-Head Matchups */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                {t.popularMatchups}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {isKo
                  ? "가장 많이 검색되는 라이벌 제품들의 순도(%)·부형제 비율·유효성분 진짜 단가를 1:1로 판독합니다."
                  : "Side-by-side purity bars, active gram cost winners, and filler waste audits for top supplement rivalries."}
              </p>
            </div>
            <Link
              href={`/${locale}/vs`}
              className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-800"
            >
              <span>
                {isKo
                  ? `전체 ${CURATED_VS_PAIRS.length}개 비교 보기`
                  : `View All ${CURATED_VS_PAIRS.length} Matchups`}
              </span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredMatchups.map((pair) => {
              const pA = PRODUCT_MAP[pair.slugA];
              const pB = PRODUCT_MAP[pair.slugB];
              if (!pA || !pB) return null;
              const cmp = compareProducts(pA, pB, currency);
              const winnerProd =
                cmp.costWinner === "B" ? pB : pA;

              return (
                <Link
                  key={pair.pairSlug}
                  href={`/${locale}/vs/${pair.pairSlug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-xs hover:border-emerald-500 transition-all"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <span>1v1 PUREGRAM AUDIT</span>
                    <span className="text-emerald-600">
                      {cmp.costSavingsPercent > 0
                        ? `${cmp.costSavingsPercent.toFixed(0)}% ${
                            isKo ? "단가 차이" : "Cost Gap"
                          }`
                        : "TIE"}
                    </span>
                  </div>
                  <div className="mt-2.5 space-y-1.5">
                    <div className="flex items-center justify-between gap-2 text-sm font-bold text-slate-900">
                      <span className="truncate">
                        {pA.brand[locale]} {pA.name[locale].split(" ").slice(0, 3).join(" ")}
                      </span>
                      <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-xs font-semibold text-slate-700">
                        {cmp.metricsA.purityPercent.toFixed(0)}%
                      </span>
                    </div>
                    <div className="text-center text-[10px] font-black tracking-widest text-slate-400">
                      — VS —
                    </div>
                    <div className="flex items-center justify-between gap-2 text-sm font-bold text-slate-900">
                      <span className="truncate">
                        {pB.brand[locale]} {pB.name[locale].split(" ").slice(0, 3).join(" ")}
                      </span>
                      <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-xs font-semibold text-slate-700">
                        {cmp.metricsB.purityPercent.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold truncate">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      {isKo ? "가성비 승:" : "Value Winner:"}{" "}
                      {winnerProd.brand[locale]}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-600" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Methodology & FAQ SEO Block */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-extrabold text-slate-900">
            {t.methodologyTitle}
          </h2>
          <div className="mt-6 space-y-5">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="border-b border-slate-100 pb-5 last:border-none last:pb-0"
              >
                <h3 className="text-base font-bold text-slate-900">
                  Q. {faq.question}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
