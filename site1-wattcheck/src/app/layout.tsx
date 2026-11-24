import type { Metadata } from "next";
import { SITE_URL } from "@/lib/i18n";
import {
  normalizeAdsenseClientId,
  sanitizeMetaToken,
} from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "WattCheck — Airline Power Bank Wh Rules & mAh to Wh Calculator",
    template: "%s | WattCheck",
  },
  description:
    "Instant mAh ↔ Wh ↔ kWh calculator, 2026 global & Korean airline power bank carry-on rules, and real-world USB-C PD device charge estimator.",
  applicationName: "WattCheck",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseId = normalizeAdsenseClientId(process.env.NEXT_PUBLIC_ADSENSE_ID);
  const gscVerification = sanitizeMetaToken(process.env.NEXT_PUBLIC_GSC_VERIFICATION);
  const naverVerification = sanitizeMetaToken(process.env.NEXT_PUBLIC_NAVER_VERIFICATION);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {adsenseId && (
          <>
            <meta name="google-adsense-account" content={adsenseId} />
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
              crossOrigin="anonymous"
            />
          </>
        )}
        {gscVerification && (
          <meta name="google-site-verification" content={gscVerification} />
        )}
        {naverVerification && (
          <meta name="naver-site-verification" content={naverVerification} />
        )}
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
