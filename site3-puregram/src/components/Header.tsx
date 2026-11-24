import Link from "next/link";
import { FlaskConical, Scale, Calculator, Trophy } from "lucide-react";
import { Locale } from "@/lib/types";
import { DICTIONARY } from "@/lib/i18n";
import { CATEGORIES } from "@/data/categories";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const t = DICTIONARY[locale];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 group shrink-0"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
            <FlaskConical className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-tight text-white">
                PureGram
              </span>
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                {locale === "ko" ? "순수그램" : "INDEX"}
              </span>
            </div>
            <p className="hidden text-[11px] text-slate-400 sm:block">
              {t.siteTagline}
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-300">
          <Link
            href={`/${locale}#leaderboard`}
            className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
          >
            <Trophy className="h-4 w-4 text-emerald-400" />
            {t.navLeaderboard}
          </Link>
          <Link
            href={`/${locale}/calculator`}
            className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
          >
            <Calculator className="h-4 w-4 text-emerald-400" />
            {t.navCalculator}
          </Link>
          <Link
            href={`/${locale}/vs`}
            className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
          >
            <Scale className="h-4 w-4 text-emerald-400" />
            {t.navVersus}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
        </div>
      </div>

      {/* Category Quick-Jump Subbar */}
      <div className="border-t border-slate-800/80 bg-slate-900/70">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2 text-xs sm:px-6 lg:px-8 no-scrollbar">
          <Link
            href={`/${locale}/calculator`}
            className="md:hidden shrink-0 rounded-md bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 font-semibold text-emerald-300"
          >
            {t.navCalculator}
          </Link>
          <Link
            href={`/${locale}/vs`}
            className="md:hidden shrink-0 rounded-md bg-slate-800 px-2.5 py-1 font-semibold text-slate-200"
          >
            {t.navVersus}
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/${locale}/category/${cat.id}`}
              className="shrink-0 rounded-md px-2.5 py-1 font-medium text-slate-300 hover:bg-slate-800 hover:text-emerald-300 transition-colors"
            >
              {cat.shortName[locale]}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
