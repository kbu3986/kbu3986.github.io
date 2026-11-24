import Link from "next/link";
import { Award, ExternalLink, ShoppingBag } from "lucide-react";
import { ALL_PRODUCTS, CATEGORY_MAP } from "@/data/catalog";
import {
  COUPANG_IFRAME_URL,
  COUPANG_REDIRECT_URL,
  defaultCurrencyForLocale,
  formatCurrency,
  FTC_DISCLOSURE_EN,
  FTC_DISCLOSURE_KO,
} from "@/lib/i18n";
import { CategoryId, Locale } from "@/lib/types";
import { BuyButtons } from "./BuyButtons";

interface AffiliateCardsProps {
  locale: Locale;
  category?: CategoryId;
}

export function AffiliateCards({ locale, category }: AffiliateCardsProps) {
  const isKo = locale === "ko";
  const currency = defaultCurrencyForLocale(locale);

  const pool = category
    ? ALL_PRODUCTS.filter((p) => p.category === category)
    : ALL_PRODUCTS;

  const topValuePicks = [...pool]
    .sort((a, b) => {
      const mA = isKo ? a.metricsKrw : a.metricsUsd;
      const mB = isKo ? b.metricsKrw : b.metricsUsd;
      return mA.costPerBenchmarkUnit - mB.costPerBenchmarkUnit;
    })
    .slice(0, 3);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-5">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-700">
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>
              {isKo
                ? "순수그램 가성비 TOP 3 실시간 최저가 비교"
                : "Top 3 Pure-Gram Value Picks — Live Retail Check"}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            {isKo
              ? "유효성분 1g당 가격이 가장 우수한 상위 제품들의 현재 할인·로켓배송 가격을 확인하세요."
              : "Check live Subscribe & Save, coupon, and bulk pricing on our highest active-value winners."}
          </p>
        </div>

        {isKo && COUPANG_REDIRECT_URL ? (
          <a
            href={COUPANG_REDIRECT_URL}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="inline-flex items-center gap-1.5 self-start rounded-xl bg-rose-600 px-3.5 py-2 text-xs font-extrabold text-white hover:bg-rose-700 transition-colors"
          >
            <span>쿠팡 헬스·단백질 특가전 바로가기</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : null}
      </div>

      {/* Optional Coupang Partners Dynamic Banner Iframe (when NEXT_PUBLIC_COUPANG_IFRAME_URL is set) */}
      {isKo && COUPANG_IFRAME_URL ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3 text-center">
          <iframe
            src={COUPANG_IFRAME_URL}
            title="쿠팡 파트너스 추천 상품"
            width="100%"
            height="160"
            frameBorder="0"
            scrolling="no"
            referrerPolicy="unsafe-url"
            className="mx-auto max-w-full border-0"
          />
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {topValuePicks.map((prod, idx) => {
          const cat = CATEGORY_MAP[prod.category];
          const m = isKo ? prod.metricsKrw : prod.metricsUsd;
          return (
            <div
              key={prod.slug}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 font-extrabold text-emerald-700">
                    <Award className="h-3.5 w-3.5 text-amber-500" />#{idx + 1}{" "}
                    {cat.shortName[locale]}
                  </span>
                  <span className="rounded bg-white px-1.5 py-0.5 text-[11px] font-bold text-slate-700 border border-slate-200">
                    {m.purityPercent.toFixed(0)}% {isKo ? "순도" : "Pure"}
                  </span>
                </div>
                <Link
                  href={`/${locale}/product/${prod.slug}`}
                  className="mt-2 block text-sm font-extrabold text-slate-900 hover:text-emerald-700"
                >
                  {prod.brand[locale]} — {prod.name[locale]}
                </Link>
                <div className="mt-2 text-lg font-black text-emerald-700">
                  {formatCurrency(m.costPerBenchmarkUnit, currency, "unit")}
                  <span className="ml-1 text-[11px] font-normal text-slate-500">
                    / {cat.benchmarkLabel[locale]}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <BuyButtons product={prod} locale={locale} compact />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] font-medium text-slate-600 border-t border-slate-100 pt-3">
        {isKo ? FTC_DISCLOSURE_KO : FTC_DISCLOSURE_EN}
      </p>
    </section>
  );
}
