import Link from "next/link";
import { Zap } from "lucide-react";
import { type Locale, getDictionary } from "@/lib/i18n";
import { AIRLINES } from "@/data/airlines";
import { DEVICES } from "@/data/devices";
import { MAH_CAPACITIES } from "@/data/mahCapacities";

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale);
  const topAirlines = AIRLINES.slice(0, 8);
  const topDevices = DEVICES.filter((d) => d.featured).slice(0, 8);
  const topMah = MAH_CAPACITIES.filter((m) => m.featured).slice(0, 8);

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Mission */}
          <div>
            <div className="flex items-center gap-2 text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Zap className="h-4 w-4 fill-current" />
              </span>
              <span className="text-lg font-extrabold tracking-tight">
                {dict.brandName}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              {dict.footer.about}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <Link
                href={`/${locale}/airlines`}
                className="rounded-md bg-slate-800 px-2.5 py-1 text-slate-200 hover:bg-slate-700"
              >
                {dict.nav.airlines}
              </Link>
              <Link
                href={`/${locale}/devices`}
                className="rounded-md bg-slate-800 px-2.5 py-1 text-slate-200 hover:bg-slate-700"
              >
                {dict.nav.devices}
              </Link>
              <Link
                href={`/${locale}/mah`}
                className="rounded-md bg-slate-800 px-2.5 py-1 text-slate-200 hover:bg-slate-700"
              >
                {dict.nav.mahChart}
              </Link>
              <Link
                href={`/${locale}/korea-2026-rules`}
                className="rounded-md bg-amber-900/60 px-2.5 py-1 text-amber-200 hover:bg-amber-800/70"
              >
                {dict.nav.koreaRules}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="rounded-md bg-slate-800 px-2.5 py-1 text-slate-200 hover:bg-slate-700"
              >
                {locale === "ko" ? "서비스 소개" : "About"}
              </Link>
              <Link
                href={`/${locale}/privacy`}
                className="rounded-md bg-slate-800 px-2.5 py-1 text-slate-200 hover:bg-slate-700"
              >
                {locale === "ko" ? "개인정보처리방침" : "Privacy Policy"}
              </Link>
            </div>
          </div>

          {/* Airlines */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              {dict.footer.popularAirlines}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {topAirlines.map((airline) => (
                <li key={airline.slug}>
                  <Link
                    href={`/${locale}/airline/${airline.slug}`}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {locale === "ko" ? airline.nameKo : airline.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Devices */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              {dict.footer.popularDevices}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {topDevices.map((device) => (
                <li key={device.slug}>
                  <Link
                    href={`/${locale}/device/${device.slug}`}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {locale === "ko" ? device.nameKo : device.nameEn} ({device.batteryWh} Wh)
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* mAh Capacities */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              {dict.footer.popularMah}
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              {topMah.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/${locale}/mah/${m.slug}`}
                    className="text-slate-400 transition-colors hover:text-white"
                  >
                    {m.amount.toLocaleString("en-US")} mAh → {((m.amount * 3.7) / 1000).toFixed(1)} Wh
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-xs text-slate-400 space-y-2">
          <p>{dict.footer.disclaimer}</p>
          <p className="text-slate-500">
            {locale === "ko"
              ? dict.affiliate.ftcDisclosureKo
              : dict.affiliate.ftcDisclosureEn}
          </p>
          <div className="flex flex-col justify-between gap-2 pt-2 sm:flex-row sm:items-center">
            <span>
              © {new Date().getFullYear()} WattCheck. IATA / FAA / EASA / MOLIT Reference Tool.
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <Link href={`/${locale}/about`} className="hover:text-white">
                {locale === "ko" ? "소개 및 방법론" : "About & Methodology"}
              </Link>
              <Link href={`/${locale}/privacy`} className="hover:text-white">
                {locale === "ko" ? "개인정보처리방침" : "Privacy Policy"}
              </Link>
              <Link href="/en" className="hover:text-white">
                English (Global)
              </Link>
              <Link href="/ko" className="hover:text-white">
                한국어 (대한민국)
              </Link>
              <Link href="/sitemap.xml" className="hover:text-white">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
