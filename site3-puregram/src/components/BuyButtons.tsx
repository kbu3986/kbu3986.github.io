import { ExternalLink, ShoppingCart, Sparkles } from "lucide-react";
import { EnrichedProduct, Locale } from "@/lib/types";
import {
  buildAmazonUrl,
  buildCoupangUrl,
  buildIherbUrl,
  COUPANG_REDIRECT_URL,
  DICTIONARY,
  FTC_DISCLOSURE_EN,
  FTC_DISCLOSURE_KO,
} from "@/lib/i18n";

interface BuyButtonsProps {
  product: EnrichedProduct;
  locale: Locale;
  compact?: boolean;
  showDisclosure?: boolean;
}

export function BuyButtons({
  product,
  locale,
  compact = false,
  showDisclosure = false,
}: BuyButtonsProps) {
  const t = DICTIONARY[locale];

  if (locale === "ko") {
    return (
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <a
            href={buildCoupangUrl(product.coupangQuery)}
            target="_blank"
            rel="sponsored nofollow noopener"
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg bg-rose-600 font-bold text-white shadow-sm hover:bg-rose-700 transition-colors ${
              compact ? "px-2.5 py-1.5 text-xs" : "px-4 py-2.5 text-sm"
            }`}
          >
            <ShoppingCart className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
            <span>{t.buyCoupang}</span>
            <ExternalLink className="h-3 w-3 opacity-80" />
          </a>
          {COUPANG_REDIRECT_URL && !compact && (
            <a
              href={COUPANG_REDIRECT_URL}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-400 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              <span>쿠팡 특가 기획전</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-80" />
            </a>
          )}
          {!compact && (
            <a
              href={buildIherbUrl(product.iherbQuery)}
              target="_blank"
              rel="sponsored nofollow noopener"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-600/40 bg-emerald-50 px-3.5 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
            >
              <span>{t.buyIherb}</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-80" />
            </a>
          )}
        </div>
        {showDisclosure && (
          <p className="text-[11px] font-medium text-slate-600 leading-snug">
            {FTC_DISCLOSURE_KO}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center gap-1.5">
        <a
          href={buildAmazonUrl(product.amazonQuery)}
          target="_blank"
          rel="sponsored nofollow noopener"
          className={`inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-500 font-bold text-slate-950 shadow-sm hover:bg-amber-400 transition-colors ${
            compact ? "px-2.5 py-1.5 text-xs" : "px-4 py-2.5 text-sm"
          }`}
        >
          <ShoppingCart className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
          <span>{t.buyAmazon}</span>
          <ExternalLink className="h-3 w-3 opacity-80" />
        </a>
        <a
          href={buildIherbUrl(product.iherbQuery)}
          target="_blank"
          rel="sponsored nofollow noopener"
          className={`inline-flex items-center justify-center gap-1 rounded-lg border border-emerald-600/30 bg-emerald-50 font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors ${
            compact ? "px-2 py-1.5 text-xs" : "px-3.5 py-2.5 text-sm"
          }`}
        >
          <span>{t.buyIherb}</span>
          <ExternalLink className="h-3 w-3 opacity-75" />
        </a>
      </div>
      {showDisclosure && (
        <p className="text-[11px] text-slate-500 leading-snug">
          {FTC_DISCLOSURE_EN}
        </p>
      )}
    </div>
  );
}

export function AffiliateDisclosureBanner({ locale }: { locale: Locale }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-2.5 text-xs text-slate-800">
      {locale === "ko" ? (
        <span className="font-semibold text-slate-900">
          📢 {FTC_DISCLOSURE_KO}
        </span>
      ) : (
        <span>{FTC_DISCLOSURE_EN}</span>
      )}
    </div>
  );
}
