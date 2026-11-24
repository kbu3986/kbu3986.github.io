"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { Locale } from "@/lib/types";

interface LanguageSwitcherProps {
  locale: Locale;
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname() || `/${locale}`;

  const getLocalizedPath = (targetLocale: Locale) => {
    if (/^\/(en|ko)(\/|$)/.test(pathname)) {
      return pathname.replace(/^\/(en|ko)(?=\/|$)/, `/${targetLocale}`);
    }
    return `/${targetLocale}`;
  };

  const enHref = getLocalizedPath("en");
  const koHref = getLocalizedPath("ko");

  return (
    <div
      className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/90 p-0.5 text-xs font-semibold"
      aria-label="Language Switcher"
    >
      <span className="px-2 text-slate-400 hidden sm:inline-flex items-center">
        <Globe className="h-3.5 w-3.5" />
      </span>
      <Link
        href={enHref}
        hrefLang="en"
        className={`rounded-full px-2.5 py-1 transition-colors ${
          locale === "en"
            ? "bg-emerald-500 text-slate-950 shadow-sm"
            : "text-slate-300 hover:text-white"
        }`}
      >
        EN
      </Link>
      <span className="text-slate-600 px-0.5">|</span>
      <Link
        href={koHref}
        hrefLang="ko"
        className={`rounded-full px-2.5 py-1 transition-colors ${
          locale === "ko"
            ? "bg-emerald-500 text-slate-950 shadow-sm"
            : "text-slate-300 hover:text-white"
        }`}
      >
        한국어
      </Link>
    </div>
  );
}
