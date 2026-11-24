import { ADSENSE_CLIENT_ID } from "@/lib/i18n";
import { Locale } from "@/lib/types";

interface AdBannerProps {
  locale: Locale;
  slot?: string;
  format?: "horizontal" | "rectangle";
  className?: string;
}

export function AdBanner({
  locale,
  slot = "puregram-top-slot",
  format = "horizontal",
  className = "",
}: AdBannerProps) {
  if (ADSENSE_CLIENT_ID) {
    return (
      <div
        className={`my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2 text-center ${className}`}
        aria-label="Advertisement"
      >
        <div className="mb-1 text-[10px] font-medium uppercase tracking-widest text-slate-400">
          {locale === "ko" ? "광고 · 스폰서" : "Advertisement"}
        </div>
        <ins
          className="adsbygoogle block"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slot}
          data-ad-format={format === "rectangle" ? "rectangle" : "auto"}
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <aside
      className={`my-6 rounded-xl border border-dashed border-slate-300 bg-slate-50/80 px-4 py-3 text-center ${className}`}
      aria-label={locale === "ko" ? "스폰서 영역" : "Sponsor Slot"}
    >
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-700">
            {locale === "ko" ? "AD · 제휴안내" : "SPONSORED"}
          </span>
          <span>
            {locale === "ko"
              ? "반복 구매하는 프로틴·오메가3·크레아틴, 통 가격 대신 '순수 유효성분 1g 단가'를 먼저 확인하세요."
              : "Compare repeat-purchase supplements by pure active gram before checking live retail deals."}
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          AdSense Ready ({slot})
        </span>
      </div>
    </aside>
  );
}
