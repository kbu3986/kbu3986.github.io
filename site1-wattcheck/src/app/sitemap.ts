import type { MetadataRoute } from "next";
import { SITE_URL, LOCALES } from "@/lib/i18n";
import { DEVICES } from "@/data/devices";
import { AIRLINES } from "@/data/airlines";
import { MAH_CAPACITIES } from "@/data/mahCapacities";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    const buildLangAlternates = (subPath: string) => ({
      languages: {
        en: `${SITE_URL}/en${subPath}`,
        ko: `${SITE_URL}/ko${subPath}`,
        "x-default": `${SITE_URL}/en${subPath}`,
      },
    });

    // Home
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: buildLangAlternates(""),
    });

    // Directory Hubs
    for (const hub of ["/airlines", "/devices", "/mah", "/korea-2026-rules"]) {
      entries.push({
        url: `${SITE_URL}/${locale}${hub}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: buildLangAlternates(hub),
      });
    }

    // Trust & AdSense Review Mandatory Pages (/about & /privacy)
    for (const trustPage of ["/about", "/privacy"]) {
      entries.push({
        url: `${SITE_URL}/${locale}${trustPage}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: buildLangAlternates(trustPage),
      });
    }

    // 40 Devices per locale = 80 routes
    for (const device of DEVICES) {
      const sub = `/device/${device.slug}`;
      entries.push({
        url: `${SITE_URL}/${locale}${sub}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: buildLangAlternates(sub),
      });
    }

    // 30 Airlines per locale = 60 routes
    for (const airline of AIRLINES) {
      const sub = `/airline/${airline.slug}`;
      entries.push({
        url: `${SITE_URL}/${locale}${sub}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.85,
        alternates: buildLangAlternates(sub),
      });
    }

    // 20 mAh Capacities per locale = 40 routes
    for (const mah of MAH_CAPACITIES) {
      const sub = `/mah/${mah.slug}`;
      entries.push({
        url: `${SITE_URL}/${locale}${sub}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: buildLangAlternates(sub),
      });
    }
  }

  return entries;
}
