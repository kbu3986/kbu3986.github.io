export type SafetyTier = "green" | "amber" | "red";

export interface VoltagePreset {
  id: string;
  voltage: number;
  labelEn: string;
  labelKo: string;
  subEn: string;
  subKo: string;
}

export const VOLTAGE_PRESETS: VoltagePreset[] = [
  {
    id: "li-ion-37",
    voltage: 3.7,
    labelEn: "3.7V Standard Li-ion",
    labelKo: "3.7V 표준 보조배터리",
    subEn: "95% of USB power banks",
    subKo: "일반 리튬이온 보조배터리 표준",
  },
  {
    id: "high-density-385",
    voltage: 3.85,
    labelEn: "3.85V High-Density",
    labelKo: "3.85V 고밀도 폴리머",
    subEn: "Slim MagSafe & phone cells",
    subKo: "맥세이프·슬림형 고전압 셀",
  },
  {
    id: "21700-36",
    voltage: 3.6,
    labelEn: "3.6V 21700 Cylindrical",
    labelKo: "3.6V 21700 원통형 셀",
    subEn: "Anker Prime 27,650mAh (99.54Wh)",
    subKo: "앤커 프라임 등 고출력 노트북용",
  },
  {
    id: "lifepo4-128",
    voltage: 12.8,
    labelEn: "12.8V LiFePO4 Station",
    labelKo: "12.8V 인산철 파워뱅크",
    subEn: "Camping & CPAP power stations",
    subKo: "캠핑용 인산철(LiFePO4) 파워스테이션",
  },
];

export const DEFAULT_EFFICIENCY_PERCENT = 82;

/**
 * Core Formula: Wh = (mAh * V) / 1000
 */
export function mahToWh(mah: number, voltage: number): number {
  if (!Number.isFinite(mah) || !Number.isFinite(voltage) || mah < 0 || voltage <= 0) {
    return 0;
  }
  return (mah * voltage) / 1000;
}

/**
 * Inverse Formula: mAh = (Wh * 1000) / V
 */
export function whToMah(wh: number, voltage: number): number {
  if (!Number.isFinite(wh) || !Number.isFinite(voltage) || wh < 0 || voltage <= 0) {
    return 0;
  }
  return (wh * 1000) / voltage;
}

/**
 * Wh to kWh: kWh = Wh / 1000
 */
export function whToKwh(wh: number): number {
  if (!Number.isFinite(wh) || wh < 0) {
    return 0;
  }
  return wh / 1000;
}

/**
 * kWh to Wh: Wh = kWh * 1000
 */
export function kwhToWh(kwh: number): number {
  if (!Number.isFinite(kwh) || kwh < 0) {
    return 0;
  }
  return kwh * 1000;
}

/**
 * Net usable energy delivered after boost/buck DC-DC regulator & cable heat losses.
 */
export function calculateNetUsableWh(
  ratedWh: number,
  efficiencyPercent: number = DEFAULT_EFFICIENCY_PERCENT
): number {
  if (!Number.isFinite(ratedWh) || ratedWh <= 0) return 0;
  const clampedEff = Math.min(100, Math.max(50, efficiencyPercent));
  return ratedWh * (clampedEff / 100);
}

/**
 * Exact 0-to-100% device charges from a power bank of `ratedWh` capacity.
 */
export function calculateDeviceCharges(
  ratedWh: number,
  deviceWh: number,
  efficiencyPercent: number = DEFAULT_EFFICIENCY_PERCENT
): number {
  if (!Number.isFinite(deviceWh) || deviceWh <= 0) return 0;
  const usableWh = calculateNetUsableWh(ratedWh, efficiencyPercent);
  return usableWh / deviceWh;
}

/**
 * IATA / ICAO / FAA / Korean MOLIT Passenger Cabin Battery Tier:
 * - <= 100 Wh: green (Carry-on allowed worldwide without airline approval)
 * - 100.01 - 160 Wh: amber (Airline approval required, max 2 pieces)
 * - > 160 Wh: red (Strictly prohibited on passenger aircraft)
 */
export function getCabinSafetyTier(wh: number): SafetyTier {
  if (wh <= 100) return "green";
  if (wh <= 160) return "amber";
  return "red";
}

export function formatNumber(val: number, maxDecimals: number = 2): string {
  if (!Number.isFinite(val)) return "0";
  return Number(val.toFixed(maxDecimals)).toLocaleString("en-US", {
    maximumFractionDigits: maxDecimals,
  });
}
