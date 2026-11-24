import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Scale, Trophy } from "lucide-react";
import { AdBanner } from "@/components/AdBanner";
import { AffiliateDisclosureBanner } from "@/components/BuyButtons";
import {
  CATEGORIES,
  CURATED_VS_PAIRS,
  getVsPairsByCategory,
  PRODUCT_MAP,
} from "@/data/catalog";
import { compareProducts } from "@/lib/calculator";
import {
  defaultCurrencyForLocale,
  formatCurrency,
  isValidLocale,
  SITE_URL,
} from "@/lib/i18n";
import { buildFaqJsonLd, buildPageMetadata } from "@/lib/seo";

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
    subpath: "/vs",
    title: isKo
      ? `영양제·프로틴 1:1 맞대결 사전 (${CURATED_VS_PAIRS.length}개 비교) — 순도 & 진짜 가성비 승자`
      : `1v1 Supplement Versus Directory (${CURATED_VS_PAIRS.length} Matchups) — Purity & Cost Winners`,
    description: isKo
      ? "골드스탠다드 vs ISO100, 신타6 vs 커클랜드, 스포츠리서치 vs 프로메가, 더단백 vs 셀렉스 등 114개 라이벌 영양제의 순도와 유효성분 1g당 가격을 1:1 비교합니다."
      : "Explore 114 head-to-head supplement comparisons across whey protein, vegan protein, creatine, omega-3 EPA+DHA, electrolytes, and RTD protein shakes.",
  });
}

export default async function VsDirectoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const isKo = locale === "ko";
  const currency = defaultCurrencyForLocale(locale);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: isKo
      ? "단백질·영양제 1:1 순수그램 맞대결 목록"
      : "1v1 Supplement Purity & True-Cost Versus Directory",
    numberOfItems: CURATED_VS_PAIRS.length,
    itemListElement: CURATED_VS_PAIRS.slice(0, 30).map((pair, idx) => {
      const pA = PRODUCT_MAP[pair.slugA];
      const pB = PRODUCT_MAP[pair.slugB];
      return {
        "@type": "ListItem",
        position: idx + 1,
        name:
          pA && pB
            ? `${pA.brand[locale]} ${pA.name[locale]} vs ${pB.brand[locale]} ${pB.name[locale]}`
            : pair.pairSlug,
        url: `${SITE_URL}/${locale}/vs/${pair.pairSlug}`,
      };
    }),
  };

  const faqs = isKo
    ? [
        {
          question: "순수그램 1:1 영양제 맞대결에서는 어떤 기준으로 승자를 판정하나요?",
          answer:
            "동일 카테고리 기준 용량(단백질 10g, 오메가3 순수 EPA+DHA 1000mg, 크레아틴 5g, 전해질 1000mg)당 진짜 단가, 스쿱·캡슐 대비 유효성분 순도(%), 칼로리 효율을 종합해 승자를 판정합니다.",
        },
      ]
    : [
        {
          question: "How does PureGram determine the winner in 1v1 supplement matchups?",
          answer:
            "Each matchup compares two same-category products on True Cost per Benchmark Active Unit (10g Protein, 1000mg pure EPA+DHA, 5g Creatine, or 1000mg Electrolytes), Active Purity %, Filler Waste, and Calorie Efficiency.",
        },
      ];

  const jsonLd = [itemListJsonLd, buildFaqJsonLd(faqs)];

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
          <Scale className="h-3.5 w-3.5" />
          {CURATED_VS_PAIRS.length} {isKo ? "정밀 1:1 비교 리포트" : "Head-to-Head Audits"}
        </span>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          {isKo
            ? "단백질·영양제 1:1 순수그램 맞대결 전체 목록"
            : "1v1 Supplement Purity & True-Cost Versus Index"}
        </h1>
        <p className="mt-2 text-base text-slate-600">
          {isKo
            ? "동일 카테고리 인기 라이벌 제품들의 유효성분 순도(%), 부형제 낭비량, 기준 용량당 진짜 가격 승자를 한눈에 확인하세요."
            : "Every matchup pits two same-category rivals head-to-head on active purity %, filler waste, calorie efficiency, and true cost per benchmark active unit."}
        </p>
      </div>

      <AffiliateDisclosureBanner locale={locale} />

      <AdBanner locale={locale} slot="vs-hub-top" />

      {CATEGORIES.map((cat) => {
        const pairs = getVsPairsByCategory(cat.id);
        return (
          <section key={cat.id} className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-xl font-extrabold text-slate-900">
                {cat.name[locale]}{" "}
                <span className="text-sm font-semibold text-emerald-700">
                  ({pairs.length})
                </span>
              </h2>
              <Link
                href={`/${locale}/category/${cat.id}`}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                {isKo ? "카테고리 랭킹 보기 →" : "Category Leaderboard →"}
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {pairs.map((pair) => {
                const pA = PRODUCT_MAP[pair.slugA];
                const pB = PRODUCT_MAP[pair.slugB];
                if (!pA || !pB) return null;
                const cmp = compareProducts(pA, pB, currency);
                const costWinProd = cmp.costWinner === "B" ? pB : pA;
                const winM =
                  cmp.costWinner === "B" ? cmp.metricsB : cmp.metricsA;

                return (
                  <Link
                    key={pair.pairSlug}
                    href={`/${locale}/vs/${pair.pairSlug}`}
                    className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:border-emerald-500 transition-all"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800">
                        {pA.brand[locale]} — {pA.name[locale]}
                      </div>
                      <div className="my-1 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                        VS
                      </div>
                      <div className="text-xs font-bold text-slate-800">
                        {pB.brand[locale]} — {pB.name[locale]}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-[11px]">
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 truncate">
                        <Trophy className="h-3 w-3 shrink-0 text-amber-500" />
                        {costWinProd.brand[locale]} (
                        {formatCurrency(
                          winM.costPerBenchmarkUnit,
                          currency,
                          "unit"
                        )}
                        )
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-emerald-600" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
