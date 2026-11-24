import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, ChevronRight } from "lucide-react";
import {
  LOCALES,
  isValidLocale,
  buildAlternates,
  SITE_URL,
} from "@/lib/i18n";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const title =
    locale === "ko"
      ? "개인정보처리방침 및 쿠키·제휴 광고 고지 — 와트체크 (WattCheck)"
      : "Privacy Policy, Cookie Notice & Affiliate Disclosure — WattCheck";

  const description =
    locale === "ko"
      ? "와트체크(WattCheck)의 개인정보처리방침, 구글 애드센스(Google AdSense) DART 쿠키 사용 및 맞춤형 광고 거부 안내, 쿠팡 파트너스·아마존 어소시에이트 제휴 고지 정책입니다."
      : "WattCheck Privacy Policy covering local browser calculation processing, Google AdSense DoubleClick DART cookies and opt-out controls, Amazon Associates, and Coupang Partners disclosures.";

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/privacy"),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/privacy`,
      siteName: "WattCheck",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
    },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name:
      locale === "ko"
        ? "개인정보처리방침 — 와트체크 (WattCheck)"
        : "Privacy Policy — WattCheck",
    url: `${SITE_URL}/${locale}/privacy`,
    inLanguage: locale === "ko" ? "ko-KR" : "en-US",
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={jsonLd} />

      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-slate-500"
      >
        <Link href={`/${locale}`} className="hover:text-blue-700">
          {locale === "ko" ? "홈" : "Home"}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-900">
          {locale === "ko" ? "개인정보처리방침" : "Privacy Policy"}
        </span>
      </nav>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 space-y-8 text-slate-700 leading-relaxed">
        <header className="border-b border-slate-200 pb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800">
            <ShieldCheck className="h-3.5 w-3.5" />
            {locale === "ko" ? "시행일: 2026년 1월 1일" : "Effective Date: January 1, 2026"}
          </span>
          <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
            {locale === "ko"
              ? "개인정보처리방침 및 광고·제휴 고지"
              : "Privacy Policy & Advertising Disclosure"}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {locale === "ko"
              ? "와트체크(WattCheck, 이하 '본 사이트')는 이용자의 개인정보를 소중히 보호하며, 대한민국 개인정보보호법 및 글로벌 개인정보 보호 기준(GDPR/CCPA)과 구글 애드센스 게시자 정책을 준수합니다."
              : "WattCheck ('we', 'our', or 'this site') respects your privacy and is committed to complete transparency regarding browser data, Google AdSense advertising cookies, and affiliate links."}
          </p>
        </header>

        {locale === "ko" ? (
          <>
            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                1. 개인정보의 수집 및 브라우저 내 연산 원칙
              </h2>
              <p className="text-sm">
                본 사이트는 회원가입이나 로그인 없이 모든 보조배터리 전력량(mAh ↔ Wh ↔ kWh) 계산기 및 항공사 기내 반입 판정 기능을 무료로 제공합니다. 사용자가 계산기에 입력하는 배터리 용량·전압·효율 등의 수치는 사용자의 기기(웹 브라우저) 내부에서만 즉시 계산되며, 별도의 외부 데이터베이스 서버로 전송되거나 저장되지 않습니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                2. 로그 데이터 및 기본 웹 분석
              </h2>
              <p className="text-sm">
                표준 웹 호스팅 및 콘텐츠 전송 네트워크(CDN) 운영 과정에서 IP 주소, 브라우저 유형, 운영체제, 방문 일시, 참조 페이지 URL 등 비식별 기술 로그가 보안 유지 및 트래픽 오류 분석 목적으로 자동 생성될 수 있습니다. 해당 정보는 개인을 직접 식별하는 용도로 사용되지 않습니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                3. Google AdSense 및 DoubleClick DART 쿠키 안내
              </h2>
              <p className="text-sm">
                본 사이트는 무료 정보 제공 및 운영 유지를 위해 제3자 광고 서비스인 <strong>구글 애드센스(Google AdSense)</strong>를 게재할 수 있습니다.
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1.5">
                <li>
                  Google을 포함한 제3자 광고 사업자는 쿠키(DoubleClick DART 쿠키 등)를 사용하여 이용자가 본 사이트 및 다른 웹사이트를 방문한 기록을 바탕으로 관심사 기반 맞춤형 광고를 제공할 수 있습니다.
                </li>
                <li>
                  이용자는 언제든지{" "}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-700 underline"
                  >
                    Google 광고 설정(Ads Settings)
                  </a>{" "}
                  또는{" "}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-700 underline"
                  >
                    aboutads.info
                  </a>
                  에 접속하여 맞춤형 광고를 위한 DART 쿠키 사용을 직접 해제(Opt-out)할 수 있습니다.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                4. 제휴 마케팅(Affiliate) 수익 고지 — 쿠팡 파트너스 및 아마존 어소시에이트
              </h2>
              <p className="text-sm">
                본 사이트의 한국어 페이지 및 영문 페이지에는 항공 기내 반입 규정에 부합하는 보조배터리·절연 파우치·케이블 등의 제품 구매 편의를 돕기 위한 제휴 링크가 포함되어 있습니다.
              </p>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs font-semibold text-slate-700 space-y-1.5">
                <p>
                  • 한국 공정거래위원회 표시·광고 지침 고지: &ldquo;이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.&rdquo;
                </p>
                <p>
                  • 영문 Amazon Associates 고지: As an Amazon Associate, WattCheck earns from qualifying purchases at no additional cost to the buyer.
                </p>
              </div>
              <p className="text-sm">
                제휴 링크를 통해 구매가 이루어지더라도 구매자가 지불하는 상품 가격에는 어떠한 추가 비용도 발생하지 않으며, 본 사이트의 기내 반입 Wh 계산 공식 및 항공사 안전 규정 데이터는 광고주로부터 독립적으로 작성됩니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                5. 이용자의 권리 및 쿠키 거부 방법
              </h2>
              <p className="text-sm">
                이용자는 사용 중인 웹 브라우저(Chrome, Safari, Edge, Firefox 등)의 환경설정에서 쿠키 저장을 거부하거나 기존 저장된 쿠키를 삭제할 수 있습니다. 쿠키 저장을 차단하더라도 와트체크의 모든 계산기 및 규정 조회 기능은 정상적으로 이용하실 수 있습니다.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                6. 문의처 (Contact)
              </h2>
              <p className="text-sm">
                개인정보처리방침, 항공사 규정 데이터 정정 요청 또는 사이트 이용 관련 문의사항은{" "}
                <Link href="/ko/about" className="font-semibold text-blue-700 underline">
                  서비스 소개 및 문의 안내 페이지
                </Link>
                를 통해 접수하실 수 있습니다.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                1. Zero Account Registration & Local Browser Processing
              </h2>
              <p className="text-sm">
                WattCheck requires no user registration, login, or personal profile. All battery capacity conversions (mAh ↔ Wh ↔ kWh), voltage presets, and DC-DC efficiency calculations execute locally inside your web browser and are never transmitted to or stored in a user database.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                2. Standard Log Files
              </h2>
              <p className="text-sm">
                Like standard static web applications and CDNs, hosting infrastructure may record non-identifying technical request metadata—such as anonymized IP addresses, browser user-agent strings, timestamps, and referring URLs—strictly for security monitoring, uptime reliability, and aggregate traffic diagnostics.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                3. Google AdSense & DoubleClick DART Cookies
              </h2>
              <p className="text-sm">
                We may display advertisements served by <strong>Google AdSense</strong> to keep WattCheck free for travelers worldwide.
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1.5">
                <li>
                  Third-party vendors, including Google, use cookies (such as the DoubleClick DART cookie) to serve ads based on a user&apos;s prior visits to this website or other websites on the internet.
                </li>
                <li>
                  Google&apos;s use of advertising cookies enables it and its partners to serve relevant ads to users based on their visit to WattCheck and/or other sites on the Internet.
                </li>
                <li>
                  Users may opt out of personalized advertising at any time by visiting{" "}
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-700 underline"
                  >
                    Google Ads Settings
                  </a>{" "}
                  or by visiting{" "}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-700 underline"
                  >
                    www.aboutads.info/choices
                  </a>
                  .
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                4. Affiliate Program Participation (Amazon Associates & Coupang Partners)
              </h2>
              <p className="text-sm">
                WattCheck participates in affiliate marketing programs designed to provide a means for websites to earn advertising fees by linking to compliant travel gear:
              </p>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs font-semibold text-slate-700 space-y-1.5">
                <p>
                  • <strong>Amazon Associates Disclosure</strong>: As an Amazon Associate, WattCheck earns from qualifying purchases at no extra cost to you.
                </p>
                <p>
                  • <strong>Coupang Partners Disclosure (Korean Locale)</strong>: 이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
                </p>
              </div>
              <p className="text-sm">
                Clicking an affiliate link never increases the price you pay, and our engineering formulas and aviation safety verdicts remain 100% objective and independent.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                5. Your Privacy Rights (GDPR / CCPA) & Cookie Controls
              </h2>
              <p className="text-sm">
                You can disable or clear cookies at any time through your browser settings without losing access to any WattCheck calculator or airline compliance feature. Depending on your jurisdiction (EEA/UK GDPR, California CCPA/CPRA, South Korea PIPA), you have the right to opt out of personalized ad tracking via the industry opt-out portals linked above.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-extrabold text-slate-900">
                6. Contact Information
              </h2>
              <p className="text-sm">
                For privacy inquiries or regulatory data updates, please see our{" "}
                <Link href="/en/about" className="font-semibold text-blue-700 underline">
                  About, Methodology & Contact page
                </Link>
                .
              </p>
            </section>
          </>
        )}
      </article>
    </div>
  );
}
