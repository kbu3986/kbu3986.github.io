export type Locale = "en" | "ko";

export type Currency = "USD" | "KRW";

export type CategoryId =
  | "whey-protein"
  | "plant-protein"
  | "creatine"
  | "omega-3"
  | "electrolytes"
  | "rtd-protein";

export type MassUnit = "g" | "mg";

export interface LocalizedText {
  en: string;
  ko: string;
}

export interface CategoryMeta {
  id: CategoryId;
  name: LocalizedText;
  shortName: LocalizedText;
  description: LocalizedText;
  activeIngredientLabel: LocalizedText;
  servingLabel: LocalizedText;
  unit: MassUnit;
  benchmarkAmount: number; // 10 (g protein), 5 (g creatine), 1000 (mg EPA+DHA), 1000 (mg electrolytes)
  benchmarkLabel: LocalizedText; // e.g. "10g Pure Protein", "1000mg EPA+DHA", "5g Pure Creatine"
  auditNote: LocalizedText;
}

export interface ProductSpec {
  slug: string;
  category: CategoryId;
  brand: LocalizedText;
  name: LocalizedText;
  packageLabel: LocalizedText; // e.g., "5 lb (2.27 kg) · 74 Scoops"
  origin: "US" | "KR" | "UK" | "CA";
  totalServings: number;
  servingWeight: number; // in category's MassUnit ('g' or 'mg')
  activePerServing: number; // pure active ingredient in category's MassUnit ('g' or 'mg')
  activeBreakdown?: LocalizedText; // e.g., "690mg EPA + 260mg DHA (rTG)" or "1000mg Na + 200mg K + 60mg Mg"
  caloriesPerServing: number;
  priceUsd: number;
  priceKrw: number;
  amazonQuery: string;
  iherbQuery: string;
  coupangQuery: string;
  summary: LocalizedText;
  pros: {
    en: string[];
    ko: string[];
  };
  cons: {
    en: string[];
    ko: string[];
  };
  thirdPartyTested?: string; // e.g., "Informed Choice", "NSF Certified for Sport", "IFOS 5-Star", "HACCP Korea"
  lastChecked: string; // ISO date e.g. "2026-11-20"
}

export interface CalculatorInput {
  price: number;
  currency: Currency;
  totalServings: number;
  servingWeight: number;
  servingUnit: MassUnit;
  activePerServing: number;
  activeUnit: MassUnit;
  benchmarkAmount: number;
  benchmarkUnit: MassUnit;
  caloriesPerServing?: number;
  dailyServings?: number;
}

export interface CalculatedMetrics {
  purityPercent: number;
  fillerPercent: number;
  servingGrams: number;
  activeGrams: number;
  fillerGramsPerServing: number;
  totalContainerGrams: number;
  totalPureActiveGrams: number;
  totalFillerGrams: number;
  costPerServing: number;
  costPerPureGram: number; // cost per 1g pure active ingredient
  costPerBenchmarkUnit: number; // cost per 10g Protein / 5g Creatine / 1000mg EPA+DHA / 1000mg Electrolytes
  fillerTaxCost: number; // portion of container price spent on non-active weight
  monthlyHabitCost: number; // 30-day daily habit cost
  caloriesPerServing: number;
  caloriesPerActiveGram: number;
  caloriesPerBenchmarkUnit: number;
  purityGrade: "A+" | "A" | "B" | "C" | "D";
}

export interface EnrichedProduct extends ProductSpec {
  metricsUsd: CalculatedMetrics;
  metricsKrw: CalculatedMetrics;
}

export interface VsPairSpec {
  pairSlug: string; // `${slugA}-vs-${slugB}`
  slugA: string;
  slugB: string;
  category: CategoryId;
}

export interface VsComparisonResult {
  productA: EnrichedProduct;
  productB: EnrichedProduct;
  metricsA: CalculatedMetrics;
  metricsB: CalculatedMetrics;
  costWinner: "A" | "B" | "tie";
  costSavingsPercent: number;
  purityWinner: "A" | "B" | "tie";
  purityDiffPoints: number;
  calorieWinner: "A" | "B" | "tie";
  monthlyWinner: "A" | "B" | "tie";
  overallWinner: "A" | "B" | "tie";
}
