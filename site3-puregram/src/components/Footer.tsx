import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { Locale } from "@/lib/types";
import {
  DICTIONARY,
  FTC_DISCLOSURE_EN,
  FTC_DISCLOSURE_KO,
} from "@/lib/i18n";
import { CATEGORIES, CURATED_VS_PAIRS, PRODUCT_MAP } from "@/data/catalog";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = DICTIONARY[locale];
  const featuredPairs = CURATED_VS_PAIRS.filter((_, idx) => idx % 14 === 0).slice(
    0,
    8
  );

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <FlaskConical className="h-5 w-5 text-emerald-400" />
              <span>{t.siteTitle}</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              {t.footerDisclaimer}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {t.categoriesHeading}
            </h3>
            <ul className="mt-3 space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/${locale}/category/${cat.id}`}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {cat.name[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              {t.popularMatchups}
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
              {featuredPairs.map((pair) => {
                const pA = PRODUCT_MAP[pair.slugA];
                const pB = PRODUCT_MAP[pair.slugB];
                if (!pA || !pB) return null;
                return (
                  <Link
                    key={pair.pairSlug}
                    href={`/${locale}/vs/${pair.pairSlug}`}
                    className="truncate text-slate-400 hover:text-emerald-300 transition-colors"
                  >
                    {pA.brand[locale]} vs {pB.brand[locale]}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mandatory Affiliate & Korean FTC Coupang Partners Compliance Banner */}
        <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900/90 p-4 text-xs leading-relaxed text-slate-300">
          {locale === "ko" ? (
            <div className="space-y-1">
              <p className="font-semibold text-amber-300">
                {FTC_DISCLOSURE_KO}
              </p>
              <p className="text-slate-400">
                표기된 가격은 스냅샷 기준 참고가이며, 판매처 할인·쿠폰·환율 변동에 따라 실시간 최저가는 달라질 수 있습니다.
              </p>
            </div>
          ) : (
            <p className="text-slate-300">{FTC_DISCLOSURE_EN}</p>
          )}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} PureGram Index. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={`/${locale}/about`} className="hover:text-slate-300">
              {locale === "ko" ? "소개·산출공식" : "About & Methodology"}
            </Link>
            <Link href={`/${locale}/privacy`} className="hover:text-slate-300">
              {locale === "ko" ? "개인정보처리방침" : "Privacy Policy"}
            </Link>
            <Link href={`/${locale}/calculator`} className="hover:text-slate-300">
              {t.navCalculator}
            </Link>
            <Link href={`/${locale}/vs`} className="hover:text-slate-300">
              {t.navVersus}
            </Link>
            <Link href="/sitemap.xml" className="hover:text-slate-300">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
