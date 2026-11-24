import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  isValidLocale,
  buildAlternates,
  getDictionary,
  SITE_URL,
} from "@/lib/i18n";
import HomeContent from "@/components/HomeContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale);

  const title =
    locale === "ko"
      ? "와트체크 (WattCheck) — 비행기 보조배터리 기내반입 Wh 계산기 & 충전 횟수"
      : "WattCheck — Airline Power Bank Wh Rules, mAh to Wh Calculator & Sizer";

  return {
    title: { absolute: title },
    description: dict.hero.subtitle,
    alternates: buildAlternates(locale, ""),
    openGraph: {
      title,
      description: dict.hero.subtitle,
      url: `${SITE_URL}/${locale}`,
      siteName: "WattCheck",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: dict.hero.subtitle,
    },
  };
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  return <HomeContent locale={locale} />;
}
