"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpDown,
  Award,
  Flame,
  Scale,
  Search,
  ShieldCheck,
} from "lucide-react";
import {
  CATEGORIES,
  CATEGORY_MAP,
  getRelatedVsPairsForProduct,
} from "@/data/catalog";
import {
  defaultCurrencyForLocale,
  DICTIONARY,
  formatCurrency,
} from "@/lib/i18n";
import {
  CategoryId,
  Currency,
  EnrichedProduct,
  Locale,
} from "@/lib/types";
import { AffiliateDisclosureBanner, BuyButtons } from "./BuyButtons";
import { PurityBar } from "./PurityBar";

type SortOption = "cost" | "purity" | "calories" | "monthly";
type OriginFilter = "ALL" | "KR" | "GLOBAL";

interface LiveLeaderboardProps {
  products: EnrichedProduct[];
  locale: Locale;
  initialCategory?: CategoryId | "ALL";
  lockCategory?: boolean;
}

export function LiveLeaderboard({
  products,
  locale,
  initialCategory = "ALL",
  lockCategory = false,
}: LiveLeaderboardProps) {
  const t = DICTIONARY[locale];
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | "ALL">(
    initialCategory
  );
  const [sortBy, setSortBy] = useState<SortOption>("cost");
  const [originFilter, setOriginFilter] = useState<OriginFilter>("ALL");
  const [query, setQuery] = useState<string>("");
  const [currency, setCurrency] = useState<Currency>(
    defaultCurrencyForLocale(locale)
  );

  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter((item) => {
        if (selectedCategory !== "ALL" && item.category !== selectedCategory) {
          return false;
        }
        if (originFilter === "KR" && item.origin !== "KR") return false;
        if (originFilter === "GLOBAL" && item.origin === "KR") return false;
        if (!q) return true;
        return (
          item.name.en.toLowerCase().includes(q) ||
          item.name.ko.toLowerCase().includes(q) ||
          item.brand.en.toLowerCase().includes(q) ||
          item.brand.ko.toLowerCase().includes(q) ||
          item.slug.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const mA = currency === "USD" ? a.metricsUsd : a.metricsKrw;
        const mB = currency === "USD" ? b.metricsUsd : b.metricsKrw;
        if (sortBy === "cost") {
          return mA.costPerBenchmarkUnit - mB.costPerBenchmarkUnit;
        }
        if (sortBy === "purity") {
          return mB.purityPercent - mA.purityPercent;
        }
        if (sortBy === "calories") {
          return mA.caloriesPerActiveGram - mB.caloriesPerActiveGram;
        }
        return mA.monthlyHabitCost - mB.monthlyHabitCost;
      });
  }, [products, selectedCategory, sortBy, originFilter, query, currency]);

  return (
    <section id="leaderboard" className="space-y-4">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            {t.leaderboardTitle}
          </h2>
          <p className="mt-1 text-sm text-slate-600">{t.leaderboardSubtitle}</p>
        </div>

        {/* Currency Toggle */}
        <div className="inline-flex self-start rounded-xl border border-slate-200 bg-white p-1 text-xs font-bold shadow-xs">
          <button
            type="button"
            onClick={() => setCurrency("USD")}
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              currency === "USD"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            $ USD
          </button>
          <button
            type="button"
            onClick={() => setCurrency("KRW")}
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              currency === "KRW"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            ₩ KRW
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      {!lockCategory && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("ALL")}
            className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
              selectedCategory === "ALL"
                ? "bg-emerald-600 text-white shadow-xs"
                : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-400"
            }`}
          >
            {t.allCategories} ({products.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  active
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-emerald-400"
                }`}
              >
                {cat.shortName[locale]} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Search, Origin & Sort Controls */}
      <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs lg:grid-cols-12">
        <div className="relative lg:col-span-5">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 lg:col-span-3">
          {(["ALL", "GLOBAL", "KR"] as OriginFilter[]).map((orig) => (
            <button
              key={orig}
              type="button"
              onClick={() => setOriginFilter(orig)}
              className={`rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors ${
                originFilter === orig
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {orig === "ALL"
                ? locale === "ko"
                  ? "전체 브랜드"
                  : "All Brands"
                : orig === "KR"
                ? locale === "ko"
                  ? "🇰🇷 국내 제품"
                  : "🇰🇷 Korean"
                : locale === "ko"
                ? "🌎 해외 직구"
                : "🌎 Global / US"}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 lg:col-span-4 lg:justify-end">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 mr-1">
            <ArrowUpDown className="h-3.5 w-3.5" />
          </span>
          {(
            [
              { id: "cost", label: t.sortByCost },
              { id: "purity", label: t.sortByPurity },
              { id: "calories", label: t.sortByCalories },
              { id: "monthly", label: t.sortByMonthly },
            ] as { id: SortOption; label: string }[]
          ).map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSortBy(opt.id)}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors ${
                sortBy === opt.id
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mandatory Disclosure Above / With Monetized Leaderboard */}
      <AffiliateDisclosureBanner locale={locale} />

      {/* Desktop Leaderboard Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
        <table className="w-full min-w-[920px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-900 text-xs font-bold uppercase tracking-wider text-slate-300">
              <th className="py-3.5 pl-4 pr-2 w-12">{t.colRank}</th>
              <th className="py-3.5 px-3">{t.colProduct}</th>
              <th className="py-3.5 px-3 w-52">{t.colPurity}</th>
              <th className="py-3.5 px-3">{t.colTrueCost}</th>
              <th className="py-3.5 px-3">{t.colCalorieEff}</th>
              <th className="py-3.5 px-3">{t.colMonthly}</th>
              <th className="py-3.5 pl-3 pr-4">{t.colActions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredAndSorted.map((product, index) => {
              const cat = CATEGORY_MAP[product.category];
              const m =
                currency === "USD" ? product.metricsUsd : product.metricsKrw;
              const containerPrice =
                currency === "USD" ? product.priceUsd : product.priceKrw;
              const topVs = getRelatedVsPairsForProduct(product.slug, 1)[0];

              return (
                <tr
                  key={product.slug}
                  className="hover:bg-emerald-50/30 transition-colors"
                >
                  <td className="py-4 pl-4 pr-2 align-top">
                    <span
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${
                        index === 0
                          ? "bg-amber-400 text-slate-950 shadow-xs"
                          : index === 1
                          ? "bg-slate-300 text-slate-900"
                          : index === 2
                          ? "bg-amber-700/20 text-amber-900"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {index === 0 ? (
                        <Award className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
                    </span>
                  </td>

                  <td className="py-4 px-3 align-top max-w-xs">
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="font-bold uppercase tracking-wide text-emerald-700">
                        {product.brand[locale]}
                      </span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium text-slate-600">
                        {cat.shortName[locale]}
                      </span>
                      {product.thirdPartyTested && (
                        <span className="inline-flex items-center gap-0.5 rounded bg-sky-50 px-1.5 py-0.5 font-semibold text-sky-700">
                          <ShieldCheck className="h-3 w-3" />
                          {product.thirdPartyTested}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/${locale}/product/${product.slug}`}
                      className="mt-1 block font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                    >
                      {product.name[locale]}
                    </Link>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {product.packageLabel[locale]} ·{" "}
                      <span className="font-semibold text-slate-700">
                        {formatCurrency(containerPrice, currency, "total")}
                      </span>
                      {" · "}
                      {product.activePerServing}
                      {cat.unit} / {product.servingWeight}
                      {cat.unit}
                    </p>
                  </td>

                  <td className="py-4 px-3 align-top">
                    <PurityBar
                      purityPercent={m.purityPercent}
                      grade={m.purityGrade}
                      locale={locale}
                      compact
                    />
                    <p className="mt-1 text-[11px] text-slate-500">
                      {t.fillerLabel}: {m.fillerPercent.toFixed(1)}%
                    </p>
                  </td>

                  <td className="py-4 px-3 align-top">
                    <div className="text-base font-black text-emerald-700">
                      {formatCurrency(m.costPerBenchmarkUnit, currency, "unit")}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {cat.benchmarkLabel[locale]}
                    </div>
                  </td>

                  <td className="py-4 px-3 align-top">
                    <div className="inline-flex items-center gap-1 font-bold text-slate-800 text-xs">
                      <Flame className="h-3.5 w-3.5 text-orange-500" />
                      {product.caloriesPerServing > 0
                        ? `${m.caloriesPerActiveGram.toFixed(1)} kcal/g`
                        : "0 kcal"}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {product.caloriesPerServing} kcal /{" "}
                      {locale === "ko" ? "1회" : "serv"}
                    </div>
                  </td>

                  <td className="py-4 px-3 align-top">
                    <div className="font-bold text-slate-900">
                      {formatCurrency(m.monthlyHabitCost, currency, "total")}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {formatCurrency(m.costPerServing, currency, "unit")} /{" "}
                      {locale === "ko" ? "일" : "day"}
                    </div>
                  </td>

                  <td className="py-4 pl-3 pr-4 align-top">
                    <div className="flex flex-col gap-1.5">
                      <BuyButtons product={product} locale={locale} compact />
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <Link
                          href={`/${locale}/product/${product.slug}`}
                          className="text-slate-700 hover:text-emerald-700 underline underline-offset-2"
                        >
                          {t.viewAudit}
                        </Link>
                        {topVs && (
                          <Link
                            href={`/${locale}/vs/${topVs.pairSlug}`}
                            className="inline-flex items-center gap-0.5 text-emerald-700 hover:text-emerald-800"
                          >
                            <Scale className="h-3 w-3" />
                            {t.compare1v1}
                          </Link>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredAndSorted.length === 0 && (
          <div className="py-12 text-center text-sm text-slate-500">
            {locale === "ko"
              ? "검색 조건에 일치하는 제품이 없습니다. 다른 키워드를 입력해 보세요."
              : "No supplements matched your filter. Try clearing the search box."}
          </div>
        )}
      </div>
    </section>
  );
}
