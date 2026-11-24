import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ShieldCheck } from "lucide-react";
import {
  FTC_DISCLOSURE_EN,
  FTC_DISCLOSURE_KO,
  isValidLocale,
  SITE_URL,
  SUPPORTED_LOCALES,
} from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const isKo = locale === "ko";

  return buildPageMetadata({
    locale,
    subpath: "/privacy",
    title: isKo
      ? "개인정보처리방침 및 쿠키·제휴 광고 고지 — 순수그램 가성비 사전"
      : "Privacy Policy, Cookie & Affiliate Disclosure — PureGram Index",
    description: isKo
      ? "순수그램 가성비 사전(PureGram)의 개인정보처리방침, 구글 애드센스(DoubleClick DART 쿠키) 맞춤형 광고 안내 및 쿠팡 파트너스·아마존 제휴 고지 사항입니다."
      : "PureGram Index Privacy Policy covering browser-local calculation privacy, Google AdSense DoubleClick DART cookies, opt-out controls, Amazon Associates, and Coupang Partners disclosures.",
  });
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const isKo = locale === "ko";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isKo ? "개인정보처리방침 — 순수그램" : "Privacy Policy — PureGram Index",
    url: `${SITE_URL}/${locale}/privacy`,
    inLanguage: locale,
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <Link href={`/${locale}`} className="hover:text-emerald-700">
          {isKo ? "순수그램 홈" : "PureGram Home"}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-bold text-slate-900">
          {isKo ? "개인정보처리방침" : "Privacy Policy"}
        </span>
      </nav>

      <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs space-y-6 text-sm leading-relaxed text-slate-700">
        <header className="border-b border-slate-200 pb-5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>
              {isKo ? "시행일: 2026년 11월 20일" : "Last Updated: November 20, 2026"}
            </span>
          </div>
          <h1 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900">
            {isKo
              ? "개인정보처리방침 및 제휴·광고 쿠키 정책"
              : "Privacy Policy, Advertising Cookies & Affiliate Disclosure"}
          </h1>
        </header>

        {isKo ? (
          <>
            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                1. 개인정보 수집 최소화 및 클라이언트 연산 원칙
              </h2>
              <p>
                <strong>순수그램 가성비 사전 (PureGram Index)</strong>은 별도의 회원가입이나 로그인 없이 모든 순도·단가 계산기와 리더보드를 무료로 제공합니다. 사용자가 부형제 거품 계산기에 입력하는 제품 가격, 제공량, 영양성분 수치 등 모든 입력 데이터는 사용자의 웹 브라우저 내부에서만 즉시 연산되며 외부 서버로 전송되거나 저장되지 않습니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                2. 구글 애드센스(Google AdSense) 및 DoubleClick DART 쿠키 안내
              </h2>
              <p>
                본 웹사이트는 무료 정보 제공 및 운영 유지를 위해 제3자 광고 서비스인 <strong>Google AdSense(구글 애드센스)</strong>를 게재할 수 있습니다.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  Google을 포함한 제3자 광고 사업자는 쿠키(특히 <strong>DoubleClick DART 쿠키</strong>)를 사용하여 이용자가 본 사이트 및 다른 웹사이트를 방문한 기록을 바탕으로 관심사 기반 맞춤형 광고를 제공할 수 있습니다.
                </li>
                <li>
                  이용자는 언제든지{" "}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-700 underline"
                  >
                    Google 광고 설정(adssettings.google.com)
                  </a>{" "}
                  또는{" "}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-700 underline"
                  >
                    aboutads.info
                  </a>
                  를 방문하여 개인 맞춤형 광고를 위한 DART 쿠키 사용을 해제(Opt-out)할 수 있습니다.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                3. 제휴 마케팅 고지 (쿠팡 파트너스 · 아마존 어소시에이트 · 아이허브)
              </h2>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 font-semibold text-slate-900">
                {FTC_DISCLOSURE_KO}
              </div>
              <p>
                또한 영문 및 직구 페이지의 외부 구매처 링크에는 Amazon Services LLC Associates Program 및 iHerb Rewards 제휴 링크가 포함될 수 있으며, 이용자가 해당 링크를 통해 구매할 경우 구매자에게 추가 비용 부담 없이 사이트 운영을 위한 소정의 수수료가 발생할 수 있습니다. 제휴 여부는 순수그램의 영양성분 수학 공식이나 순도(%) 랭킹 산정에 어떠한 영향도 미치지 않습니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                4. 자동 수집 로그 및 외부 사이트 링크
              </h2>
              <p>
                정적 호스팅(GitHub Pages / Vercel 등 CDN) 인프라 특성상 보안 및 트래픽 안정성 유지를 위해 익명화된 IP 주소, 브라우저 유형, 접속 일시 등 표준 웹 서버 로그가 처리될 수 있습니다. 외부 쇼핑몰(쿠팡, 아마존, 아이허브 등)로 이동한 이후에는 해당 쇼핑몰의 개인정보처리방침이 적용됩니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                5. 문의처
              </h2>
              <p>
                영양성분표 데이터 정정 요청이나 개인정보처리방침 관련 문의는{" "}
                <Link
                  href="/ko/about"
                  className="font-semibold text-emerald-700 underline"
                >
                  서비스 소개 및 문의 안내 페이지
                </Link>{" "}
                또는 이메일(<code>editorial@puregram-index.org</code>)로 연락해 주시기 바랍니다.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                1. Data Minimization & Client-Side Calculation Privacy
              </h2>
              <p>
                <strong>PureGram Index</strong> requires no account registration or login. Every calculation you perform inside the Filler Tax & Pure Gram Calculator—including supplement prices, serving weights, and active gram inputs—is processed strictly locally inside your browser and is never transmitted to or stored in a personal user database.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                2. Google AdSense & DoubleClick DART Cookies
              </h2>
              <p>
                To keep PureGram free and independent, we may display advertisements served by <strong>Google AdSense</strong> and certified third-party ad networks:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  Third-party vendors, including Google, use cookies (including the <strong>DoubleClick DART cookie</strong>) to serve ads based on a user&apos;s prior visits to this website or other websites on the internet.
                </li>
                <li>
                  Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to PureGram and/or other sites on the Internet.
                </li>
                <li>
                  Users may opt out of personalized advertising at any time by visiting{" "}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-700 underline"
                  >
                    Google Ads Settings (adssettings.google.com)
                  </a>{" "}
                  or{" "}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-700 underline"
                  >
                    www.aboutads.info/choices/
                  </a>
                  .
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                3. Affiliate Programs Disclosure (Amazon Associates, iHerb & Coupang Partners)
              </h2>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 font-medium text-slate-900">
                {FTC_DISCLOSURE_EN}
              </div>
              <p>
                PureGram Index participates in the <strong>Amazon Services LLC Associates Program</strong>, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. On Korean-language pages, PureGram also participates in <strong>Coupang Partners</strong> ({FTC_DISCLOSURE_KO}). Affiliate relationships never alter our mathematical purity formulas or leaderboard rankings.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                4. Standard CDN Logs & External Retail Links
              </h2>
              <p>
                Our static hosting infrastructure (such as GitHub Pages or Vercel CDN) processes standard non-identifying HTTP request logs (browser user-agent, referrer, timestamp, and anonymized IP) strictly for security and content delivery. Once you click an outbound retail link to Amazon, iHerb, or Coupang, your session is governed by that merchant&apos;s respective privacy policy.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                5. Contact & Policy Updates
              </h2>
              <p>
                For privacy inquiries or nutrition label audit updates, please visit our{" "}
                <Link
                  href="/en/about"
                  className="font-semibold text-emerald-700 underline"
                >
                  About & Methodology page
                </Link>{" "}
                or email <code>editorial@puregram-index.org</code>.
              </p>
            </section>
          </>
        )}
      </article>
    </div>
  );
}
