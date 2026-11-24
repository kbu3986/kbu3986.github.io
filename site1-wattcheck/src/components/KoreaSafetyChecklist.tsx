import Link from "next/link";
import { AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { type Locale, getDictionary } from "@/lib/i18n";

interface KoreaSafetyChecklistProps {
  locale: Locale;
  showFullLink?: boolean;
}

export default function KoreaSafetyChecklist({
  locale,
  showFullLink = true,
}: KoreaSafetyChecklistProps) {
  const dict = getDictionary(locale);

  return (
    <div className="mt-6 rounded-2xl border-2 border-amber-300/90 bg-gradient-to-br from-amber-50 via-white to-orange-50/40 p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3 py-1 text-xs font-extrabold tracking-wide text-white">
          <AlertTriangle className="h-3.5 w-3.5" />
          {dict.koreaChecklist.badge}
        </span>
        {showFullLink && (
          <Link
            href={`/${locale}/korea-2026-rules`}
            className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 underline-offset-4 hover:underline"
          >
            {locale === "ko" ? "상세 규정 가이드 보기" : "Full Korea 2026 Rule Guide"}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      <h3 className="mt-3 text-lg font-extrabold text-slate-900">
        {dict.koreaChecklist.title}
      </h3>
      <p className="mt-1 text-sm text-slate-700">
        {dict.koreaChecklist.subtitle}
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {dict.koreaChecklist.items.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-amber-200/80 bg-white/90 p-3.5 shadow-sm"
          >
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
