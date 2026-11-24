"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sliders,
  ArrowLeftRight,
  Plane,
  BatteryCharging,
  Info,
} from "lucide-react";
import {
  VOLTAGE_PRESETS,
  DEFAULT_EFFICIENCY_PERCENT,
  mahToWh,
  whToMah,
  whToKwh,
  kwhToWh,
  calculateNetUsableWh,
  calculateDeviceCharges,
  getCabinSafetyTier,
} from "@/lib/calculator";
import { type Locale, getDictionary } from "@/lib/i18n";
import { DEVICES, type DeviceCategory } from "@/data/devices";
import KoreaSafetyChecklist from "./KoreaSafetyChecklist";
import AffiliateCards from "./AffiliateCards";

interface WattCalculatorProps {
  locale: Locale;
  initialMah?: number;
  initialVoltage?: number;
  highlightDeviceSlug?: string;
  isKoreanAirline?: boolean;
  requiredWattsHint?: number;
  showEstimator?: boolean;
  showAffiliate?: boolean;
}

const QUICK_MAH_CHIPS = [5000, 10000, 20000, 24000, 27000, 27650, 30000, 50000];

export default function WattCalculator({
  locale,
  initialMah = 20000,
  initialVoltage = 3.7,
  highlightDeviceSlug,
  isKoreanAirline = false,
  requiredWattsHint = 45,
  showEstimator = true,
  showAffiliate = true,
}: WattCalculatorProps) {
  const dict = getDictionary(locale);

  const startWh = mahToWh(initialMah, initialVoltage);
  const startKwh = whToKwh(startWh);

  const [voltageStr, setVoltageStr] = useState<string>(String(initialVoltage));
  const [mahStr, setMahStr] = useState<string>(String(initialMah));
  const [whStr, setWhStr] = useState<string>(String(Number(startWh.toFixed(2))));
  const [kwhStr, setKwhStr] = useState<string>(String(Number(startKwh.toFixed(4))));
  const [efficiency, setEfficiency] = useState<number>(DEFAULT_EFFICIENCY_PERCENT);
  const [selectedCategory, setSelectedCategory] = useState<"all" | DeviceCategory>("all");
  const [showKoreaInEn, setShowKoreaInEn] = useState<boolean>(isKoreanAirline);

  const voltage = Math.max(0.1, Number(voltageStr) || 3.7);
  const wh = Math.max(0, Number(whStr) || 0);
  const netUsableWh = calculateNetUsableWh(wh, efficiency);
  const safetyTier = getCabinSafetyTier(wh);

  function handleMahChange(raw: string) {
    setMahStr(raw);
    const parsed = parseFloat(raw);
    if (!Number.isFinite(parsed) || parsed < 0) {
      setWhStr("0");
      setKwhStr("0");
      return;
    }
    const nextWh = mahToWh(parsed, voltage);
    const nextKwh = whToKwh(nextWh);
    setWhStr(String(Number(nextWh.toFixed(2))));
    setKwhStr(String(Number(nextKwh.toFixed(4))));
  }

  function handleWhChange(raw: string) {
    setWhStr(raw);
    const parsed = parseFloat(raw);
    if (!Number.isFinite(parsed) || parsed < 0) {
      setMahStr("0");
      setKwhStr("0");
      return;
    }
    const nextMah = whToMah(parsed, voltage);
    const nextKwh = whToKwh(parsed);
    setMahStr(String(Math.round(nextMah)));
    setKwhStr(String(Number(nextKwh.toFixed(4))));
  }

  function handleKwhChange(raw: string) {
    setKwhStr(raw);
    const parsed = parseFloat(raw);
    if (!Number.isFinite(parsed) || parsed < 0) {
      setWhStr("0");
      setMahStr("0");
      return;
    }
    const nextWh = kwhToWh(parsed);
    const nextMah = whToMah(nextWh, voltage);
    setWhStr(String(Number(nextWh.toFixed(2))));
    setMahStr(String(Math.round(nextMah)));
  }

  function handleVoltageChange(newVoltStr: string) {
    setVoltageStr(newVoltStr);
    const v = parseFloat(newVoltStr);
    const currentMah = parseFloat(mahStr);
    if (Number.isFinite(v) && v > 0 && Number.isFinite(currentMah) && currentMah >= 0) {
      const nextWh = mahToWh(currentMah, v);
      const nextKwh = whToKwh(nextWh);
      setWhStr(String(Number(nextWh.toFixed(2))));
      setKwhStr(String(Number(nextKwh.toFixed(4))));
    }
  }

  function applyQuickMah(amount: number) {
    // Special case: 27,650mAh flagship banks use 3.6V 21700 cells (99.54 Wh)
    const targetV = amount === 27650 ? 3.6 : voltage;
    if (amount === 27650 && voltage !== 3.6) {
      setVoltageStr("3.6");
    }
    setMahStr(String(amount));
    const nextWh = mahToWh(amount, targetV);
    const nextKwh = whToKwh(nextWh);
    setWhStr(String(Number(nextWh.toFixed(2))));
    setKwhStr(String(Number(nextKwh.toFixed(4))));
  }

  // Filter devices for estimator
  const filteredDevices = (() => {
    const base =
      selectedCategory === "all"
        ? highlightDeviceSlug
          ? DEVICES
          : DEVICES.filter((d) => d.featured).concat(
              DEVICES.filter((d) => !d.featured).slice(0, 4)
            )
        : DEVICES.filter((d) => d.category === selectedCategory);

    if (highlightDeviceSlug) {
      const target = DEVICES.find((d) => d.slug === highlightDeviceSlug);
      if (target) {
        return [target, ...base.filter((d) => d.slug !== highlightDeviceSlug)].slice(0, 12);
      }
    }
    return base.slice(0, 12);
  })();

  // Progress bar percentage up to 200 Wh scale
  const meterPct = Math.min(100, (wh / 200) * 100);

  return (
    <div className="space-y-6">
      {/* Main Calculator Card */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
        {/* Card Header */}
        <div className="border-b border-slate-100 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 px-5 py-4 text-white sm:px-7 sm:py-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-extrabold sm:text-xl">
                <ArrowLeftRight className="h-5 w-5 text-blue-400" />
                {dict.calc.title}
              </h2>
              <p className="mt-0.5 text-xs text-blue-200 sm:text-sm">
                {dict.calc.subtitle}
              </p>
            </div>
            <span className="rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 font-mono text-xs font-semibold text-blue-100">
              Wh = mAh × V ÷ 1000
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-7 space-y-6">
          {/* Quick Preset mAh Chips */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              {dict.calc.quickPresets}
            </span>
            <div className="flex flex-wrap gap-2">
              {QUICK_MAH_CHIPS.map((amt) => {
                const isSelected = Math.round(Number(mahStr)) === amt;
                return (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => applyQuickMah(amt)}
                    className={`rounded-xl border px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                      isSelected
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50"
                    }`}
                  >
                    {amt.toLocaleString("en-US")} mAh
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bidirectional 3-Column Inputs: mAh <-> Wh <-> kWh */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* mAh Input */}
            <div className="rounded-2xl border-2 border-slate-200 bg-slate-50/60 p-4 focus-within:border-blue-600 focus-within:bg-white transition-colors">
              <label
                htmlFor="calc-mah-input"
                className="block text-xs font-bold uppercase tracking-wide text-slate-600"
              >
                {dict.calc.mahLabel}
              </label>
              <div className="mt-2 flex items-baseline gap-2">
                <input
                  id="calc-mah-input"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="100"
                  value={mahStr}
                  onChange={(e) => handleMahChange(e.target.value)}
                  className="w-full bg-transparent font-mono text-2xl font-extrabold text-slate-900 outline-none sm:text-3xl"
                />
                <span className="font-mono text-sm font-bold text-slate-400">mAh</span>
              </div>
            </div>

            {/* Wh Input (Highlighted Airline Metric) */}
            <div className="rounded-2xl border-2 border-blue-500 bg-blue-50/40 p-4 focus-within:border-blue-700 focus-within:bg-white transition-colors">
              <label
                htmlFor="calc-wh-input"
                className="block text-xs font-extrabold uppercase tracking-wide text-blue-700"
              >
                {dict.calc.whLabel}
              </label>
              <div className="mt-2 flex items-baseline gap-2">
                <input
                  id="calc-wh-input"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.1"
                  value={whStr}
                  onChange={(e) => handleWhChange(e.target.value)}
                  className="w-full bg-transparent font-mono text-2xl font-extrabold text-blue-950 outline-none sm:text-3xl"
                />
                <span className="font-mono text-sm font-extrabold text-blue-600">Wh</span>
              </div>
            </div>

            {/* kWh Input */}
            <div className="rounded-2xl border-2 border-slate-200 bg-slate-50/60 p-4 focus-within:border-blue-600 focus-within:bg-white transition-colors">
              <label
                htmlFor="calc-kwh-input"
                className="block text-xs font-bold uppercase tracking-wide text-slate-600"
              >
                {dict.calc.kwhLabel}
              </label>
              <div className="mt-2 flex items-baseline gap-2">
                <input
                  id="calc-kwh-input"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.001"
                  value={kwhStr}
                  onChange={(e) => handleKwhChange(e.target.value)}
                  className="w-full bg-transparent font-mono text-2xl font-extrabold text-slate-900 outline-none sm:text-3xl"
                />
                <span className="font-mono text-sm font-bold text-slate-400">kWh</span>
              </div>
            </div>
          </div>

          {/* Voltage Presets + Custom Voltage Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5">
              {dict.calc.voltageLabel}
            </label>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
              {VOLTAGE_PRESETS.map((preset) => {
                const active = Number(voltageStr) === preset.voltage;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleVoltageChange(String(preset.voltage))}
                    className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                      active
                        ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <span
                      className={`font-mono text-sm font-extrabold ${
                        active ? "text-blue-700" : "text-slate-900"
                      }`}
                    >
                      {preset.voltage}V
                    </span>
                    <span className="mt-0.5 text-[11px] font-semibold text-slate-700 leading-tight">
                      {locale === "ko" ? preset.labelKo.replace(/^[0-9.]+V\s*/, "") : preset.labelEn.replace(/^[0-9.]+V\s*/, "")}
                    </span>
                    <span className="mt-0.5 text-[10px] text-slate-500 leading-tight">
                      {locale === "ko" ? preset.subKo : preset.subEn}
                    </span>
                  </button>
                );
              })}

              {/* Custom Voltage Input */}
              <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 focus-within:border-blue-600 focus-within:bg-white">
                <label
                  htmlFor="custom-voltage-input"
                  className="text-[11px] font-bold text-slate-600"
                >
                  {dict.calc.customVoltage}
                </label>
                <div className="mt-1 flex items-baseline gap-1">
                  <input
                    id="custom-voltage-input"
                    type="number"
                    inputMode="decimal"
                    min="0.1"
                    max="1000"
                    step="0.05"
                    value={voltageStr}
                    onChange={(e) => handleVoltageChange(e.target.value)}
                    className="w-full bg-transparent font-mono text-base font-extrabold text-slate-900 outline-none"
                  />
                  <span className="font-mono text-xs font-bold text-slate-500">V</span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-World DC-DC Efficiency Slider */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label
                htmlFor="efficiency-slider"
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 sm:text-sm"
              >
                <Sliders className="h-4 w-4 text-blue-600" />
                {dict.calc.efficiencyLabel}:{" "}
                <span className="font-mono font-extrabold text-blue-700">
                  {efficiency}%
                </span>
              </label>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="text-slate-600">
                  {dict.calc.ratedEnergy}:{" "}
                  <strong className="font-mono text-slate-900">{wh.toFixed(2)} Wh</strong>
                </span>
                <span className="rounded-lg bg-blue-100 px-2.5 py-1 text-blue-800">
                  {dict.calc.netUsableEnergy}:{" "}
                  <strong className="font-mono">{netUsableWh.toFixed(2)} Wh</strong>
                </span>
              </div>
            </div>
            <input
              id="efficiency-slider"
              type="range"
              min={65}
              max={95}
              step={1}
              value={efficiency}
              onChange={(e) => setEfficiency(Number(e.target.value))}
              className="mt-3 h-2 w-full rounded-lg bg-slate-200"
            />
            <p className="mt-1.5 flex items-start gap-1.5 text-xs text-slate-500">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
              <span>{dict.calc.efficiencyHint}</span>
            </p>
          </div>

          {/* AIRLINE CABIN SAFETY VERDICT BADGE */}
          <div
            className={`rounded-2xl border-2 p-5 transition-all ${
              safetyTier === "green"
                ? "border-emerald-500 bg-emerald-50/70"
                : safetyTier === "amber"
                ? "border-amber-500 bg-amber-50/80"
                : "border-rose-600 bg-rose-50/80"
            }`}
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div className="flex items-start gap-3.5">
                {safetyTier === "green" && (
                  <CheckCircle2 className="mt-0.5 h-8 w-8 shrink-0 text-emerald-600" />
                )}
                {safetyTier === "amber" && (
                  <AlertTriangle className="mt-0.5 h-8 w-8 shrink-0 text-amber-600" />
                )}
                {safetyTier === "red" && (
                  <XCircle className="mt-0.5 h-8 w-8 shrink-0 text-rose-600" />
                )}
                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-extrabold tracking-wide text-white ${
                      safetyTier === "green"
                        ? "bg-emerald-600"
                        : safetyTier === "amber"
                        ? "bg-amber-600"
                        : "bg-rose-600"
                    }`}
                  >
                    <Plane className="h-3 w-3" />
                    {dict.verdict[safetyTier].badge}
                  </span>
                  <h3 className="mt-2 text-lg font-extrabold text-slate-900 sm:text-xl">
                    {dict.verdict[safetyTier].title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">
                    {dict.verdict[safetyTier].desc}
                  </p>
                </div>
              </div>

              <div className="shrink-0 rounded-xl bg-white/90 px-4 py-3 text-right shadow-sm border border-slate-200/70">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {locale === "ko" ? "항공사 판정 기준값" : "IATA Rated Energy"}
                </div>
                <div
                  className={`font-mono text-2xl font-black ${
                    safetyTier === "green"
                      ? "text-emerald-700"
                      : safetyTier === "amber"
                      ? "text-amber-700"
                      : "text-rose-700"
                  }`}
                >
                  {wh.toFixed(2)} Wh
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  {Math.round(Number(mahStr) || 0).toLocaleString("en-US")} mAh @ {voltage}V
                </div>
              </div>
            </div>

            {/* Visual 0 - 100 - 160 - 200 Wh Threshold Meter */}
            <div className="mt-4">
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full transition-all duration-200 ${
                    safetyTier === "green"
                      ? "bg-emerald-500"
                      : safetyTier === "amber"
                      ? "bg-amber-500"
                      : "bg-rose-600"
                  }`}
                  style={{ width: `${meterPct}%` }}
                />
                {/* 100 Wh Marker (50%) */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-slate-900/70"
                  style={{ left: "50%" }}
                  title="100 Wh Limit"
                />
                {/* 160 Wh Marker (80%) */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-rose-900"
                  style={{ left: "80%" }}
                  title="160 Wh Max Limit"
                />
              </div>
              <div className="mt-1 flex justify-between font-mono text-[11px] font-bold text-slate-600">
                <span>0 Wh</span>
                <span className="text-emerald-800">100 Wh (No-Approval Limit)</span>
                <span className="text-rose-800">160 Wh (Ban)</span>
                <span>200+ Wh</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 text-xs font-semibold sm:grid-cols-2">
              <div className="rounded-lg bg-white/80 px-3 py-2 text-slate-800">
                • {dict.verdict[safetyTier].piecesGlobal}
              </div>
              <div className="rounded-lg bg-white/80 px-3 py-2 text-slate-800">
                • {dict.verdict[safetyTier].piecesKorea}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-300/60 pt-3 text-xs font-bold text-rose-800">
              <span>⚠ {dict.verdict.checkedBagWarning}</span>
              {locale === "en" && !isKoreanAirline && (
                <button
                  type="button"
                  onClick={() => setShowKoreaInEn((prev) => !prev)}
                  className="rounded-lg bg-amber-600/15 px-2.5 py-1 text-xs font-bold text-amber-900 hover:bg-amber-600/25"
                >
                  {showKoreaInEn
                    ? "Hide Korea 2026 Cabin Rules"
                    : "Flying to/from Korea? View 2026 Zip-Lock & Bin Ban ▾"}
                </button>
              )}
            </div>
          </div>

          {/* 2025-2026 Korean Aviation Safety Checklist (Always shown in KO, Korean airlines in EN, or when toggled) */}
          {(locale === "ko" || isKoreanAirline || showKoreaInEn) && (
            <KoreaSafetyChecklist locale={locale} />
          )}
        </div>
      </div>

      {/* Real-World Device Charge Estimator */}
      {showEstimator && (
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-extrabold text-slate-900 sm:text-xl">
                <BatteryCharging className="h-5 w-5 text-blue-600" />
                {dict.estimator.title}
              </h3>
              <p className="mt-0.5 text-xs text-slate-600 sm:text-sm">
                {dict.estimator.subtitle} ({netUsableWh.toFixed(1)} Wh net @ {efficiency}%)
              </p>
            </div>
            <Link
              href={`/${locale}/devices`}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline"
            >
              {locale === "ko" ? "40개 전체 기기 비교표 보기 →" : "Browse All 40 Devices →"}
            </Link>
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                selectedCategory === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {dict.estimator.allCategories}
            </button>
            {(
              Object.keys(dict.estimator.categories) as Array<
                keyof typeof dict.estimator.categories
              >
            ).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {dict.estimator.categories[cat]}
              </button>
            ))}
          </div>

          {/* Device Cards Grid */}
          <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDevices.map((device) => {
              const charges = calculateDeviceCharges(wh, device.batteryWh, efficiency);
              const isHighlighted = device.slug === highlightDeviceSlug;
              const barWidth = Math.min(100, (charges / 4) * 100);

              return (
                <Link
                  key={device.slug}
                  href={`/${locale}/device/${device.slug}`}
                  className={`group flex flex-col justify-between rounded-2xl border p-4 transition-all hover:shadow-md ${
                    isHighlighted
                      ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600"
                      : "border-slate-200 bg-slate-50/40 hover:border-blue-300 hover:bg-white"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {device.brand}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
                          {locale === "ko" ? device.nameKo : device.nameEn}
                        </h4>
                      </div>
                      <span className="shrink-0 rounded-md bg-slate-200/70 px-2 py-0.5 font-mono text-[11px] font-bold text-slate-700">
                        {device.batteryWh} Wh
                      </span>
                    </div>

                    <div className="mt-3 flex items-baseline justify-between">
                      <div>
                        <span className="font-mono text-2xl font-black text-blue-700">
                          {charges.toFixed(2)}×
                        </span>
                        <span className="ml-1.5 text-xs font-semibold text-slate-600">
                          {dict.estimator.chargesUnit}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500">
                        PD {device.recommendedPdWatts}W
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                    {dict.estimator.viewDeviceGuide}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Context-Aware Monetization Affiliate Cards */}
      {showAffiliate && (
        <AffiliateCards
          locale={locale}
          wh={wh}
          requiredWatts={
            wh >= 65 ? Math.max(65, requiredWattsHint) : requiredWattsHint
          }
        />
      )}
    </div>
  );
}
