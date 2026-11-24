import type { Metadata } from "next";
import { SITE_URL, formatCurrency } from "./i18n";
import { CategoryMeta, EnrichedProduct, Locale } from "./types";

interface BuildPageMetadataParams {
  locale: Locale;
  subpath?: string; // e.g. "" or "/category/omega-3" or "/product/..." or "/vs/..."
  title: string;
  description: string;
}

export function buildPageMetadata({
  locale,
  subpath = "",
  title,
  description,
}: BuildPageMetadataParams): Metadata {
  const normalizedSub = subpath
    ? subpath.startsWith("/")
      ? subpath
      : `/${subpath}`
    : "";
  const canonicalUrl = `${SITE_URL}/${locale}${normalizedSub}`;
  const enUrl = `${SITE_URL}/en${normalizedSub}`;
  const koUrl = `${SITE_URL}/ko${normalizedSub}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: enUrl,
        ko: koUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName:
        locale === "ko"
          ? "순수그램 가성비 사전 (PureGram)"
          : "PureGram Supplement Index",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      alternateLocale: locale === "ko" ? ["en_US"] : ["ko_KR"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function buildFaqJsonLd(
  faqs: { question: string; answer: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function buildItemListJsonLd(
  name: string,
  locale: Locale,
  items: EnrichedProduct[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: `${p.brand[locale]} ${p.name[locale]}`,
      url: `${SITE_URL}/${locale}/product/${p.slug}`,
    })),
  };
}

export function buildProductJsonLd(
  product: EnrichedProduct,
  category: CategoryMeta,
  locale: Locale
): Record<string, unknown> {
  const isKo = locale === "ko";
  const m = isKo ? product.metricsKrw : product.metricsUsd;
  const currency = isKo ? "KRW" : "USD";
  const price = isKo ? product.priceKrw : product.priceUsd;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.brand[locale]} ${product.name[locale]}`,
    description: product.summary[locale],
    brand: {
      "@type": "Brand",
      name: product.brand[locale],
    },
    category: category.name[locale],
    url: `${SITE_URL}/${locale}/product/${product.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: currency,
      price: price,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/${locale}/product/${product.slug}`,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: isKo ? "유효성분 순도 (%)" : "Active Ingredient Purity (%)",
        value: `${m.purityPercent.toFixed(1)}%`,
      },
      {
        "@type": "PropertyValue",
        name: isKo ? "부형제 비율 (%)" : "Filler / Non-Active Ratio (%)",
        value: `${m.fillerPercent.toFixed(1)}%`,
      },
      {
        "@type": "PropertyValue",
        name: `${category.benchmarkLabel[locale]} Cost`,
        value: formatCurrency(m.costPerBenchmarkUnit, currency, "unit"),
      },
    ],
  };
}

export function buildWebAppJsonLd(locale: Locale): Record<string, unknown> {
  const isKo = locale === "ko";
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: isKo
      ? "순수그램 가성비 사전 — 영양제·프로틴 순도 & 1g당 가격 계산기"
      : "PureGram Index — Supplement Purity & True Cost Per Active Gram Calculator",
    url: `${SITE_URL}/${locale}`,
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: isKo ? "KRW" : "USD",
    },
  };
}
