"use client";

import { useEffect } from "react";
import { ShieldAlert } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { normalizeAdsenseClientId } from "@/lib/env";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdBannerProps {
  locale: Locale;
  slot?: string;
  format?: "horizontal" | "rectangle";
  className?: string;
}

export default function AdBanner({
  locale,
  slot = "8492019283",
  format = "horizontal",
  className = "",
}: AdBannerProps) {
  const adsenseId = normalizeAdsenseClientId(process.env.NEXT_PUBLIC_ADSENSE_ID);

  useEffect(() => {
    if (!adsenseId) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script not loaded or blocked by client browser
    }
  }, [adsenseId]);

  if (adsenseId) {
    return (
      <div
        className={`my-6 overflow-hidden rounded-xl border border-slate-200/80 bg-white p-2 text-center ${className}`}
        aria-label="Advertisement"
      >
        <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          {locale === "ko" ? "광고 · SPONSORED" : "ADVERTISEMENT"}
        </div>
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={adsenseId}
          data-ad-slot={slot}
          data-ad-format={format === "rectangle" ? "rectangle" : "auto"}
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <aside
      aria-label="Sponsor Notice"
      className={`my-6 rounded-2xl border border-slate-200/90 bg-gradient-to-r from-slate-50 via-white to-blue-50/50 px-5 py-4 shadow-sm ${className}`}
    >
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
            <ShieldAlert className="h-4 w-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-slate-200/80 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                {locale === "ko" ? "출국 전 안전 팁 · SPONSOR" : "TRAVEL CHECK · SPONSOR"}
              </span>
              <span className="text-xs font-bold text-slate-800">
                {locale === "ko"
                  ? "보조배터리 용량(Wh) 표기 지워짐 확인 필수!"
                  : "Verify Legible Factory Wh Print Before Airport Security"}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-slate-600">
              {locale === "ko"
                ? "용량 숫자가 지워진 보조배터리는 100Wh 이하라도 인천·수완나품·중국 공항 검색대에서 반입이 거절됩니다."
                : "Airport officers reject unmarked power banks even if compact. Keep factory Wh/mAh labels sharp and terminals insulated."}
            </p>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-blue-700 shrink-0">
          IATA Dangerous Goods Reg. 2.3.5.9
        </span>
      </div>
    </aside>
  );
}
