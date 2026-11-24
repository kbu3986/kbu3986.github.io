import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Zap, BookOpen, Mail, CheckCircle2, ChevronRight } from "lucide-react";
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
      ? "서비스 소개, Wh 계산 검증 방법론 및 문의 — 와트체크 (WattCheck)"
      : "About WattCheck, Engineering Methodology & Contact";

  const description =
    locale === "ko"
      ? "와트체크(WattCheck)가 항공기 보조배터리 Wh 규정(IATA·FAA·국토교통부)과 기기별 실사용 충전 횟수(82% 승압 효율)를 산출하는 공학적 방법론 및 운영·문의 안내입니다."
      : "Learn how WattCheck verifies IATA/FAA/MOLIT airline lithium battery regulations, models 82% USB-C DC-DC boost efficiency, and maintains 90+ airline and device guides.";

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/about"),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/about`,
      siteName: "WattCheck",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      type: "website",
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name:
        locale === "ko"
          ? "와트체크(WattCheck) 소개 및 계산 방법론"
          : "About WattCheck & Engineering Methodology",
      url: `${SITE_URL}/${locale}/about`,
      inLanguage: locale === "ko" ? "ko-KR" : "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "WattCheck",
      url: SITE_URL,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "editorial & technical support",
        email: "editorial@wattcheck-global.org",
        availableLanguage: ["English", "Korean"],
      },
    },
  ];

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
          {locale === "ko" ? "서비스 소개 및 문의" : "About & Methodology"}
        </span>
      </nav>

      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 space-y-8 text-slate-700 leading-relaxed">
        <header className="border-b border-slate-200 pb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800">
            <Zap className="h-3.5 w-3.5" />
            {locale === "ko"
              ? "항공 안전 & 전력 공학 레퍼런스 프로젝트"
              : "Aviation Battery & USB-C Engineering Reference"}
          </span>
          <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
            {locale === "ko"
              ? "와트체크(WattCheck) 서비스 소개 및 계산 방법론"
              : "About WattCheck, Data Methodology & Contact"}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {locale === "ko"
              ? "복잡한 mAh·Wh 단위 혼선으로 공항 보안검색대에서 보조배터리를 압수당하거나, 잘못된 전압·출력을 구매하는 문제를 해결하기 위해 만들어진 무료 글로벌 유틸리티입니다."
              : "WattCheck was built to eliminate airport security confiscations caused by confusing mAh vs. Wh battery labels and misleading power bank capacity claims."}
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <BookOpen className="h-5 w-5 text-blue-600" />
            {locale === "ko"
              ? "1. 전력량(Wh) 및 실사용 충전 횟수 산출 공식"
              : "1. Engineering Formulas & 82% Efficiency Model"}
          </h2>
          <p className="text-sm">
            {locale === "ko"
              ? "대부분의 소비자는 보조배터리 표기 용량(예: 10,000mAh)을 스마트폰 배터리(예: 5,000mAh)로 단순 나눗셈하여 2회 완충될 것이라 오해합니다. 하지만 보조배터리 내부 리튬 셀 정격 전압(3.6V~3.85V)과 USB-C PD 승압 전압(5V/9V/15V/20V) 차이 및 열 손실을 반영해야 정확한 계산이 가능합니다."
              : "Simply dividing a 10,000 mAh power bank by a 5,000 mAh phone battery overestimates real-world charges by ~20–30%. WattCheck computes true energy transfer in Watt-hours (Wh):"}
          </p>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-800 space-y-1.5">
            <div>1) Rated Wh = (mAh × Nominal Cell Voltage V) ÷ 1,000</div>
            <div>2) Net Usable Wh = Rated Wh × (DC-DC Conversion Efficiency % ÷ 100)</div>
            <div>3) Full 0–100% Charges = Net Usable Wh ÷ Target Device Battery Wh</div>
          </div>
          <p className="text-sm">
            {locale === "ko"
              ? "와트체크의 기본 변환 효율(82%)은 최신 동기식 부스트 컨버터(USB-C PD 3.0/3.1) 및 케이블 저항·수신 기기 PMIC 충전 손실을 종합한 실측 평균값이며, 사용자가 슬라이더(65%~95%)로 직접 조정할 수 있습니다."
              : "Our 82% default efficiency reflects lab-tested USB-C PD boost conversion plus cable and phone PMIC charging losses, with an interactive 65%–95% slider for custom testing."}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            {locale === "ko"
              ? "2. 항공 위험물 및 기내 반입 규정 데이터 출처"
              : "2. Primary Aviation Regulatory Sources"}
          </h2>
          <ul className="list-disc pl-5 text-sm space-y-1.5">
            <li>
              <strong>IATA Dangerous Goods Regulations (DGR 2.3.5.9 / Table 2.3.A)</strong>:{" "}
              {locale === "ko"
                ? "국제항공운송협회 여객 휴대 리튬이온 배터리 100Wh 무승인 및 100~160Wh 승인(최대 2개) 기준"
                : "Global 100 Wh carry-on threshold & 100.1–160 Wh airline approval band (max 2 units)."}
            </li>
            <li>
              <strong>South Korea MOLIT (국토교통부 2025–2026 항공 안전 표준안)</strong>:{" "}
              {locale === "ko"
                ? "기내 선반(오버헤드 빈) 보관 금지, 투명 지퍼백·절연테이프 단락 방지 의무, 기내 충전 제한 및 100Wh 이하 5개 수량 기준"
                : "Overhead bin storage ban, terminal tape / clear zip-lock pouch mandate, and 5-piece ≤100 Wh cap across Korean carriers."}
            </li>
            <li>
              <strong>US FAA PackSafe / TSA, EASA, Japan MLIT & China CAAC (3C Rule)</strong>:{" "}
              {locale === "ko"
                ? "미국·유럽·일본 국토교통성 및 중국 민항국 CCC 인증 의무화 최신 고시 반영"
                : "Country-specific enforcement updates including Japan's July 2025 bin ban, Singapore/Emirates in-flight bans, and China's June 2025 CCC mark mandate."}
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <Mail className="h-5 w-5 text-blue-600" />
            {locale === "ko"
              ? "3. 문의 및 데이터 정정 제보 (Contact)"
              : "3. Editorial Contact & Rule Update Reports"}
          </h2>
          <p className="text-sm">
            {locale === "ko"
              ? "항공사 수하물 규정 변경 제보, 신규 스마트 기기 스펙 추가 요청, 제휴 및 기술 문의는 아래 공식 채널로 연락해 주세요."
              : "Spotted a newly updated airline cabin bulletin or want us to add a new laptop, handheld, or medical CPAP battery spec? Reach our editorial engineering team:"}
          </p>
          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 text-sm space-y-1">
            <div>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:editorial@wattcheck-global.org"
                className="font-mono text-blue-700 underline"
              >
                editorial@wattcheck-global.org
              </a>
            </div>
            <div>
              <strong>GitHub Issue Tracker:</strong>{" "}
              <a
                href="https://github.com/kbu3986/wattcheck-global/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline"
              >
                github.com/kbu3986/wattcheck-global/issues
              </a>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            {locale === "ko" ? (
              <>
                개인정보 및 쿠키·광고 정책은{" "}
                <Link href="/ko/privacy" className="text-blue-700 underline">
                  개인정보처리방침
                </Link>
                에서 확인하실 수 있습니다.
              </>
            ) : (
              <>
                Review our cookie, AdSense, and affiliate policies on our{" "}
                <Link href="/en/privacy" className="text-blue-700 underline">
                  Privacy Policy
                </Link>{" "}
                page.
              </>
            )}
          </p>
        </section>
      </article>
    </div>
  );
}
