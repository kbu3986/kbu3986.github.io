"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Calculator,
  CheckCircle2,
  Coins,
  Flame,
  Sparkles,
} from "lucide-react";
import { calculatePureGramMetrics } from "@/lib/calculator";
import {
  defaultCurrencyForLocale,
  DICTIONARY,
  formatCurrency,
} from "@/lib/i18n";
import { CategoryId, Currency, Locale, MassUnit } from "@/lib/types";
import { PurityBar } from "./PurityBar";

interface PresetConfig {
  id: string;
  category: CategoryId;
  labelEn: string;
  labelKo: string;
  benchmarkAmount: number;
  unit: MassUnit;
  benchmarkLabelEn: string;
  benchmarkLabelKo: string;
  activeLabelEn: string;
  activeLabelKo: string;
  servingLabelEn: string;
  servingLabelKo: string;
  sampleUsd: number;
  sampleKrw: number;
  servings: number;
  servingWeight: number;
  activeWeight: number;
  calories: number;
}

const PRESETS: PresetConfig[] = [
  {
    id: "protein",
    category: "whey-protein",
    labelEn: "Protein Powder (per 10g)",
    labelKo: "프로틴 파우더 (10g 기준)",
    benchmarkAmount: 10,
    unit: "g",
    benchmarkLabelEn: "per 10g Pure Protein",
    benchmarkLabelKo: "순수 단백질 10g당",
    activeLabelEn: "Pure Protein / Serving (g)",
    activeLabelKo: "1회 순수 단백질 함량 (g)",
    servingLabelEn: "Scoop / Serving Weight (g)",
    servingLabelKo: "1회 스쿱 총중량 (g)",
    sampleUsd: 84.99,
    sampleKrw: 98900,
    servings: 74,
    servingWeight: 30.4,
    activeWeight: 24,
    calories: 120,
  },
  {
    id: "omega3",
    category: "omega-3",
    labelEn: "Omega-3 EPA+DHA (per 1000mg)",
    labelKo: "오메가3 EPA+DHA (1000mg 기준)",
    benchmarkAmount: 1000,
    unit: "mg",
    benchmarkLabelEn: "per 1000mg Pure EPA+DHA",
    benchmarkLabelKo: "순수 EPA+DHA 1000mg당",
    activeLabelEn: "Combined Pure EPA+DHA (mg)",
    activeLabelKo: "1회 순수 EPA+DHA 합산 (mg)",
    servingLabelEn: "Total Fish Oil Weight (mg)",
    servingLabelKo: "1회 총 어유 캡슐중량 (mg)",
    sampleUsd: 36.95,
    sampleKrw: 46900,
    servings: 150,
    servingWeight: 1250,
    activeWeight: 950,
    calories: 15,
  },
  {
    id: "creatine",
    category: "creatine",
    labelEn: "Creatine (per 5g)",
    labelKo: "크레아틴 (5g 기준)",
    benchmarkAmount: 5,
    unit: "g",
    benchmarkLabelEn: "per 5g Pure Creatine",
    benchmarkLabelKo: "순수 크레아틴 5g당",
    activeLabelEn: "Pure Creatine / Serving (g)",
    activeLabelKo: "1회 순수 크레아틴 (g)",
    servingLabelEn: "Scoop Weight (g)",
    servingLabelKo: "1회 스쿱 총중량 (g)",
    sampleUsd: 24.99,
    sampleKrw: 31900,
    servings: 120,
    servingWeight: 5,
    activeWeight: 5,
    calories: 0,
  },
  {
    id: "electrolytes",
    category: "electrolytes",
    labelEn: "Electrolytes (per 1000mg)",
    labelKo: "전해질 파우더 (1000mg 기준)",
    benchmarkAmount: 1000,
    unit: "mg",
    benchmarkLabelEn: "per 1000mg Pure Electrolytes",
    benchmarkLabelKo: "순수 전해질 1000mg당",
    activeLabelEn: "Pure Na+K+Mg Ions (mg)",
    activeLabelKo: "1회 나트륨+칼륨+마그네슘 합산 (mg)",
    servingLabelEn: "Stick / Scoop Weight (mg)",
    servingLabelKo: "1포·1스쿱 총중량 (mg)",
    sampleUsd: 45.0,
    sampleKrw: 62000,
    servings: 30,
    servingWeight: 6000,
    activeWeight: 1260,
    calories: 5,
  },
];

interface QuickSample {
  nameEn: string;
  nameKo: string;
  presetId: string;
  priceUsd: number;
  priceKrw: number;
  servings: number;
  servingWeight: number;
  activeWeight: number;
  calories: number;
}

const QUICK_SAMPLES: QuickSample[] = [
  {
    nameEn: "ISO100 Isolate (83.3% Pure)",
    nameKo: "ISO100 분리유청 (순도 83.3%)",
    presetId: "protein",
    priceUsd: 96.99,
    priceKrw: 124900,
    servings: 76,
    servingWeight: 30,
    activeWeight: 25,
    calories: 110,
  },
  {
    nameEn: "Syntha-6 Blend (46.8% Pure)",
    nameKo: "신타6 복합단백 (순도 46.8%)",
    presetId: "protein",
    priceUsd: 64.99,
    priceKrw: 76500,
    servings: 48,
    servingWeight: 47,
    activeWeight: 22,
    calories: 200,
  },
  {
    nameEn: "Budget 25% Fish Oil Trap",
    nameKo: "저순도 25% 일반 오메가3",
    presetId: "omega3",
    priceUsd: 14.99,
    priceKrw: 21900,
    servings: 400,
    servingWeight: 1000,
    activeWeight: 250,
    calories: 10,
  },
  {
    nameEn: "rTG Triple Omega-3 (76% Pure)",
    nameKo: "스포츠리서치 rTG (순도 76%)",
    presetId: "omega3",
    priceUsd: 36.95,
    priceKrw: 46900,
    servings: 150,
    servingWeight: 1250,
    activeWeight: 950,
    calories: 15,
  },
];

interface PureGramCalculatorProps {
  locale: Locale;
  initialCategory?: CategoryId;
  initialValues?: {
    priceUsd: number;
    priceKrw: number;
    servings: number;
    servingWeight: number;
    activeWeight: number;
    calories: number;
  };
}

export function PureGramCalculator({
  locale,
  initialCategory = "whey-protein",
  initialValues,
}: PureGramCalculatorProps) {
  const t = DICTIONARY[locale];
  const initialPreset =
    PRESETS.find((p) => p.category === initialCategory) ||
    (initialCategory === "plant-protein" || initialCategory === "rtd-protein"
      ? PRESETS[0]
      : PRESETS[0]);

  const [currency, setCurrency] = useState<Currency>(
    defaultCurrencyForLocale(locale)
  );
  const [preset, setPreset] = useState<PresetConfig>(initialPreset);
  const [price, setPrice] = useState<number>(
    initialValues
      ? locale === "ko"
        ? initialValues.priceKrw
        : initialValues.priceUsd
      : locale === "ko"
      ? initialPreset.sampleKrw
      : initialPreset.sampleUsd
  );
  const [totalServings, setTotalServings] = useState<number>(
    initialValues?.servings ?? initialPreset.servings
  );
  const [servingWeight, setServingWeight] = useState<number>(
    initialValues?.servingWeight ?? initialPreset.servingWeight
  );
  const [activePerServing, setActivePerServing] = useState<number>(
    initialValues?.activeWeight ?? initialPreset.activeWeight
  );
  const [calories, setCalories] = useState<number>(
    initialValues?.calories ?? initialPreset.calories
  );
  const [dailyServings, setDailyServings] = useState<number>(1);

  const selectPreset = (next: PresetConfig) => {
    setPreset(next);
    setPrice(currency === "KRW" ? next.sampleKrw : next.sampleUsd);
    setTotalServings(next.servings);
    setServingWeight(next.servingWeight);
    setActivePerServing(next.activeWeight);
    setCalories(next.calories);
  };

  const applySample = (sample: QuickSample) => {
    const found = PRESETS.find((p) => p.id === sample.presetId) || PRESETS[0];
    setPreset(found);
    setPrice(currency === "KRW" ? sample.priceKrw : sample.priceUsd);
    setTotalServings(sample.servings);
    setServingWeight(sample.servingWeight);
    setActivePerServing(sample.activeWeight);
    setCalories(sample.calories);
  };

  const switchCurrency = (nextCurr: Currency) => {
    if (nextCurr === currency) return;
    setCurrency(nextCurr);
    if (nextCurr === "KRW" && price < 1000) {
      setPrice(Math.round(price * 1380));
    } else if (nextCurr === "USD" && price >= 1000) {
      setPrice(Math.round((price / 1380) * 100) / 100);
    }
  };

  const metrics = calculatePureGramMetrics(
    {
      price,
      currency,
      totalServings,
      servingWeight,
      servingUnit: preset.unit,
      activePerServing,
      activeUnit: preset.unit,
      benchmarkAmount: preset.benchmarkAmount,
      benchmarkUnit: preset.unit,
      caloriesPerServing: calories,
      dailyServings,
    },
    preset.category
  );

  const benchmarkText =
    locale === "ko" ? preset.benchmarkLabelKo : preset.benchmarkLabelEn;

  return (
    <section
      id="calculator"
      className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
    >
      {/* Top Header Strip */}
      <div className="border-b border-slate-200 bg-slate-900 px-5 py-4 text-white sm:px-7">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold tracking-tight">
                {t.calcTitle}
              </h2>
              <p className="text-xs text-slate-300">{t.calcSubtitle}</p>
            </div>
          </div>

          <div className="inline-flex self-start rounded-lg border border-slate-700 bg-slate-800 p-0.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => switchCurrency("USD")}
              className={`rounded-md px-3 py-1.5 transition-colors ${
                currency === "USD"
                  ? "bg-emerald-500 text-slate-950"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              $ USD
            </button>
            <button
              type="button"
              onClick={() => switchCurrency("KRW")}
              className={`rounded-md px-3 py-1.5 transition-colors ${
                currency === "KRW"
                  ? "bg-emerald-500 text-slate-950"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              ₩ KRW
            </button>
          </div>
        </div>

        {/* Category Mode Tabs */}
        <div className="mt-4 flex flex-wrap gap-2">
          {PRESETS.map((p) => {
            const active = p.id === preset.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => selectPreset(p)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? "bg-emerald-500 text-slate-950 shadow-sm"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {locale === "ko" ? p.labelKo : p.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Real-World Presets */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 bg-slate-50 px-5 py-2.5 text-xs sm:px-7">
        <span className="inline-flex items-center gap-1 font-semibold text-slate-600">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          {locale === "ko" ? "원클릭 예시 불러오기:" : "1-Click Label Examples:"}
        </span>
        {QUICK_SAMPLES.map((s) => (
          <button
            key={s.nameEn}
            type="button"
            onClick={() => applySample(s)}
            className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:border-emerald-400 hover:text-emerald-700 transition-colors"
          >
            {locale === "ko" ? s.nameKo : s.nameEn}
          </button>
        ))}
      </div>

      {/* Calculator Body */}
      <div className="grid grid-cols-1 gap-6 p-5 sm:p-7 lg:grid-cols-12">
        {/* Left: Inputs */}
        <div className="space-y-4 lg:col-span-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {locale === "ko"
                  ? `제품 구매 가격 (${currency === "KRW" ? "₩" : "$"})`
                  : `Product Price (${currency === "KRW" ? "₩" : "$"})`}
              </label>
              <input
                type="number"
                min={0}
                step={currency === "KRW" ? 500 : 0.5}
                value={price}
                onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {locale === "ko"
                  ? "총 제공 횟수 (Total Servings)"
                  : "Total Servings per Container"}
              </label>
              <input
                type="number"
                min={1}
                step={1}
                value={totalServings}
                onChange={(e) =>
                  setTotalServings(Math.max(1, Number(e.target.value)))
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {locale === "ko" ? preset.servingLabelKo : preset.servingLabelEn}
              </label>
              <input
                type="number"
                min={0.1}
                step={preset.unit === "mg" ? 50 : 0.5}
                value={servingWeight}
                onChange={(e) =>
                  setServingWeight(Math.max(0.1, Number(e.target.value)))
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-700 mb-1">
                {locale === "ko" ? preset.activeLabelKo : preset.activeLabelEn}
              </label>
              <input
                type="number"
                min={0.1}
                step={preset.unit === "mg" ? 25 : 0.5}
                value={activePerServing}
                onChange={(e) =>
                  setActivePerServing(Math.max(0, Number(e.target.value)))
                }
                className="w-full rounded-xl border-2 border-emerald-500/60 bg-emerald-50/30 px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {locale === "ko"
                  ? "1회 칼로리 (kcal, 선택)"
                  : "Calories per Serving (kcal)"}
              </label>
              <input
                type="number"
                min={0}
                step={5}
                value={calories}
                onChange={(e) =>
                  setCalories(Math.max(0, Number(e.target.value)))
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {locale === "ko"
                  ? "하루 섭취 횟수 (30일 유지비 기준)"
                  : "Daily Servings (Habit Frequency)"}
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[1, 1.5, 2].map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setDailyServings(freq)}
                    className={`rounded-xl border py-2.5 text-xs font-bold transition-colors ${
                      dailyServings === freq
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {freq}x / {locale === "ko" ? "일" : "day"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {activePerServing > servingWeight && (
            <div className="flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2.5 text-xs text-amber-900">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
              <span>
                {locale === "ko"
                  ? "순수 유효성분 중량은 1회 총중량을 초과할 수 없어 100%로 자동 보정되었습니다."
                  : "Active ingredient cannot exceed total serving mass; clamped to 100% purity."}
              </span>
            </div>
          )}
        </div>

        {/* Right: Computed Audit Results */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 lg:col-span-6">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {locale === "ko"
                  ? "순수그램 정밀 판독 결과"
                  : "PureGram Audit Verdict"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {locale === "ko" ? "등급" : "Grade"} {metrics.purityGrade}
              </span>
            </div>

            <PurityBar
              purityPercent={metrics.purityPercent}
              grade={metrics.purityGrade}
              locale={locale}
            />

            {/* Primary KPI Cards */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-200 bg-white p-4 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <Coins className="h-4 w-4" />
                  <span>
                    {locale === "ko" ? "진짜 유효성분 가격" : "True Active Cost"}
                  </span>
                </div>
                <div className="mt-1 text-2xl font-black text-slate-900">
                  {formatCurrency(metrics.costPerBenchmarkUnit, currency, "unit")}
                </div>
                <div className="mt-0.5 text-xs text-slate-500">
                  {benchmarkText} · (
                  {formatCurrency(metrics.costPerPureGram, currency, "unit")}/1g)
                </div>
              </div>

              <div className="rounded-xl border border-rose-200 bg-white p-4 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700">
                  <AlertTriangle className="h-4 w-4" />
                  <span>
                    {locale === "ko"
                      ? "부형제 비율 (Filler Tax)"
                      : "Filler Ratio & Waste"}
                  </span>
                </div>
                <div className="mt-1 text-2xl font-black text-rose-600">
                  {metrics.fillerPercent.toFixed(1)}%
                </div>
                <div className="mt-0.5 text-xs text-slate-500">
                  {locale === "ko"
                    ? `구매가 중 ${formatCurrency(metrics.fillerTaxCost, currency, "total")}가 비유효 중량`
                    : `${formatCurrency(metrics.fillerTaxCost, currency, "total")} spent on non-active mass`}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <div className="text-xs font-semibold text-slate-600">
                  {locale === "ko"
                    ? `30일 일일 유지비 (하루 ${dailyServings}회)`
                    : `30-Day Daily Habit (${dailyServings}x/day)`}
                </div>
                <div className="mt-1 text-xl font-extrabold text-slate-900">
                  {formatCurrency(metrics.monthlyHabitCost, currency, "total")}
                  <span className="text-xs font-normal text-slate-500">
                    {" "}
                    / 30d
                  </span>
                </div>
                <div className="mt-0.5 text-xs text-slate-500">
                  {locale === "ko" ? "1회 섭취당" : "Per serving:"}{" "}
                  {formatCurrency(metrics.costPerServing, currency, "unit")}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                <div className="flex items-center gap-1 text-xs font-semibold text-slate-600">
                  <Flame className="h-3.5 w-3.5 text-orange-500" />
                  <span>
                    {locale === "ko"
                      ? "칼로리 효율 및 총 순수량"
                      : "Calorie Efficiency & Net Active"}
                  </span>
                </div>
                <div className="mt-1 text-xl font-extrabold text-slate-900">
                  {calories > 0
                    ? `${metrics.caloriesPerActiveGram.toFixed(1)} kcal/g`
                    : "0 kcal"}
                </div>
                <div className="mt-0.5 text-xs text-slate-500">
                  {locale === "ko"
                    ? `통 전체 순수 성분: ${metrics.totalPureActiveGrams.toFixed(0)}g`
                    : `Total pure active in tub: ${metrics.totalPureActiveGrams.toFixed(0)}g`}
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
            {locale === "ko"
              ? `공식: 순도(%) = (1회 순수성분 ÷ 1회 총중량) × 100 | 진짜 가격 = 총 구매가 ÷ (총 횟수 × 1회 순수성분) × 기준용량`
              : `Formula: Purity % = (Active ÷ Serving Mass) × 100 | True Cost = Price ÷ (Servings × Active) × Benchmark`}
          </p>
        </div>
      </div>
    </section>
  );
}
