import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ADSENSE_CLIENT_ID,
  GSC_VERIFICATION,
  NAVER_VERIFICATION,
  SITE_URL,
} from "@/lib/i18n";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PureGram Index — True Cost Per Active Gram & Supplement Versus",
    template: "%s | PureGram",
  },
  description:
    "Rank protein powders, creatine, omega-3 EPA+DHA, electrolytes, RTD shakes, and chicken breast by pure active gram cost and scoop filler ratio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {ADSENSE_CLIENT_ID ? (
          <>
            <meta name="google-adsense-account" content={ADSENSE_CLIENT_ID} />
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
              crossOrigin="anonymous"
            />
          </>
        ) : null}
        {GSC_VERIFICATION ? (
          <meta name="google-site-verification" content={GSC_VERIFICATION} />
        ) : null}
        {NAVER_VERIFICATION ? (
          <meta name="naver-site-verification" content={NAVER_VERIFICATION} />
        ) : null}
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
