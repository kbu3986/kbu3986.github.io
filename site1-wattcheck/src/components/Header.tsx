"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Plane, Globe, ShieldCheck } from "lucide-react";
import { type Locale, getDictionary } from "@/lib/i18n";

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const pathname = usePathname() || `/${locale}`;
  const dict = getDictionary(locale);

  // Extract route subpath after /en or /ko so EN | 한국어 preserves the exact current page
  let subPath = "";
  if (pathname === "/" || pathname === "/en" || pathname === "/ko") {
    subPath = "";
  } else if (pathname.startsWith("/en/")) {
    subPath = pathname.slice(3);
  } else if (pathname.startsWith("/ko/")) {
    subPath = pathname.slice(3);
  }

  const enHref = `/en${subPath}`;
  const koHref = `/ko${subPath}`;

  const navItems = [
    { href: `/${locale}`, label: dict.nav.calculator },
    { href: `/${locale}/airlines`, label: dict.nav.airlines },
    { href: `/${locale}/devices`, label: dict.nav.devices },
    { href: `/${locale}/mah`, label: dict.nav.mahChart },
    { href: `/${locale}/korea-2026-rules`, label: dict.nav.koreaRules, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="group flex items-center gap-2.5 text-slate-900 hover:opacity-90"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-sm">
            <Zap className="h-5 w-5 fill-current" />
          </span>
          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 text-lg font-extrabold tracking-tight leading-none">
              WattCheck
              <span className="hidden rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 sm:inline-flex items-center gap-0.5">
                <Plane className="h-2.5 w-2.5" /> 2026
              </span>
            </span>
            <span className="text-[11px] font-medium text-slate-500">
              {locale === "ko" ? "항공 보조배터리 Wh 계산기" : "Airline Battery Wh Sizer"}
            </span>
          </div>
        </Link>

        <nav
          aria-label="Main Navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {navItems.map((item) => {
            const isActive =
              item.href === `/${locale}`
                ? pathname === `/${locale}` || pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                  item.highlight
                    ? isActive
                      ? "bg-amber-100 text-amber-900"
                      : "text-amber-700 hover:bg-amber-50"
                    : isActive
                    ? "bg-slate-100 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.highlight && (
                  <ShieldCheck className="mr-1 inline-block h-3.5 w-3.5 -mt-0.5" />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Instant EN | 한국어 Language Switcher preserving current route */}
        <div
          className="flex items-center rounded-xl border border-slate-200 bg-slate-100/80 p-0.5 text-xs font-bold"
          role="group"
          aria-label="Language Switcher"
        >
          <Globe className="ml-2 mr-1 hidden h-3.5 w-3.5 text-slate-500 sm:block" />
          <Link
            href={enHref}
            hrefLang="en"
            className={`rounded-lg px-2.5 py-1.5 transition-all ${
              locale === "en"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            EN
          </Link>
          <span className="px-0.5 text-slate-300" aria-hidden="true">
            |
          </span>
          <Link
            href={koHref}
            hrefLang="ko"
            className={`rounded-lg px-2.5 py-1.5 transition-all ${
              locale === "ko"
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            한국어
          </Link>
        </div>
      </div>

      {/* Mobile Secondary Nav */}
      <div className="flex items-center gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className=" shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
