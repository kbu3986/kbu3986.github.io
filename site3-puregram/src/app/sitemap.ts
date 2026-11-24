import type { MetadataRoute } from "next";
import {
  ALL_PRODUCTS,
  CATEGORIES,
  CURATED_VS_PAIRS,
  PRICE_FEED_UPDATED_AT,
} from "@/data/catalog";
import { SITE_URL, SUPPORTED_LOCALES } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date(PRICE_FEED_UPDATED_AT);
  const entries: MetadataRoute.Sitemap = [];

  const pushLocalized = (
    subpath: string,
    priority: number,
    changeFrequency: "daily" | "weekly" = "weekly"
  ) => {
    const clean = subpath ? (subpath.startsWith("/") ? subpath : `/${subpath}`) : "";
    for (const locale of SUPPORTED_LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${clean}`,
        lastModified: lastMod,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            en: `${SITE_URL}/en${clean}`,
            ko: `${SITE_URL}/ko${clean}`,
            "x-default": `${SITE_URL}/en${clean}`,
          },
        },
      });
    }
  };

  // Core Hub & Compliance Pages
  pushLocalized("", 1.0, "daily");
  pushLocalized("/calculator", 0.9, "weekly");
  pushLocalized("/vs", 0.9, "daily");
  pushLocalized("/about", 0.7, "weekly");
  pushLocalized("/privacy", 0.6, "weekly");

  // 6 Category Leaderboards * 2 = 12 routes
  for (const cat of CATEGORIES) {
    pushLocalized(`/category/${cat.id}`, 0.9, "daily");
  }

  // 48 Single Product Audit Pages * 2 = 96 routes
  for (const prod of ALL_PRODUCTS) {
    pushLocalized(`/product/${prod.slug}`, 0.85, "weekly");
  }

  // 114 Curated 1v1 Matchups * 2 = 228 routes
  for (const pair of CURATED_VS_PAIRS) {
    pushLocalized(`/vs/${pair.pairSlug}`, 0.8, "weekly");
  }

  return entries;
}
