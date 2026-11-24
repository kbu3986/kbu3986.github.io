import type { Metadata } from "next";
import { buildAlternates, getDictionary, SITE_URL } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: {
    absolute:
      "WattCheck — Airline Power Bank Wh Rules, mAh to Wh Calculator & Sizer",
  },
  description: getDictionary("en").hero.subtitle,
  alternates: buildAlternates("en", ""),
  openGraph: {
    title: "WattCheck — Airline Power Bank Wh Rules & mAh to Wh Calculator",
    description: getDictionary("en").hero.subtitle,
    url: `${SITE_URL}/en`,
    siteName: "WattCheck",
    locale: "en_US",
    type: "website",
  },
};

export default function RootPage() {
  return (
    <div lang="en" className="flex min-h-screen flex-col">
      <Header locale="en" />
      <main className="flex-1">
        <HomeContent locale="en" />
      </main>
      <Footer locale="en" />
    </div>
  );
}
