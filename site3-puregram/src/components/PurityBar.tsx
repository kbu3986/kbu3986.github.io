import { Locale } from "@/lib/types";
import { DICTIONARY } from "@/lib/i18n";

interface PurityBarProps {
  purityPercent: number;
  grade: "A+" | "A" | "B" | "C" | "D";
  locale: Locale;
  compact?: boolean;
}

export function PurityBar({
  purityPercent,
  grade,
  locale,
  compact = false,
}: PurityBarProps) {
  const t = DICTIONARY[locale];
  const clamped = Math.min(100, Math.max(0, purityPercent));
  const filler = Math.max(0, 100 - clamped);

  const gradeColors: Record<string, string> = {
    "A+": "bg-emerald-600 text-white",
    A: "bg-teal-600 text-white",
    B: "bg-sky-600 text-white",
    C: "bg-amber-500 text-slate-950",
    D: "bg-rose-600 text-white",
  };

  return (
    <div className="w-full min-w-[140px]">
      <div className="mb-1 flex items-center justify-between gap-1 text-xs">
        <span className="font-bold text-slate-900">
          {clamped.toFixed(1)}%{" "}
          <span className="font-normal text-slate-500">
            {compact ? "" : t.purityLabel}
          </span>
        </span>
        <span
          className={`rounded px-1.5 py-0.5 text-[10px] font-extrabold ${
            gradeColors[grade] || "bg-slate-600 text-white"
          }`}
        >
          {grade}
        </span>
      </div>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-rose-100 border border-slate-200/80">
        <div
          className="h-full bg-emerald-500 transition-all"
          style={{ width: `${clamped}%` }}
          title={`${t.purityLabel}: ${clamped.toFixed(1)}%`}
        />
        <div
          className="h-full bg-rose-300/70"
          style={{ width: `${filler}%` }}
          title={`${t.fillerLabel}: ${filler.toFixed(1)}%`}
        />
      </div>
      {!compact && (
        <div className="mt-1 flex justify-between text-[11px] text-slate-500">
          <span className="text-emerald-700 font-medium">
            {t.purityLabel} {clamped.toFixed(1)}%
          </span>
          <span className="text-rose-600 font-medium">
            {t.fillerLabel} {filler.toFixed(1)}%
          </span>
        </div>
      )}
    </div>
  );
}
