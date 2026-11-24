import {
  CalculatedMetrics,
  CalculatorInput,
  CategoryId,
  Currency,
  EnrichedProduct,
  MassUnit,
  ProductSpec,
  VsComparisonResult,
} from "./types";

/**
 * Converts a mass value ('g' or 'mg') into pure grams ('g') for unit-safe ratios.
 */
export function toGrams(value: number, unit: MassUnit): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return unit === "mg" ? value / 1000 : value;
}

/**
 * Assigns an intuitive Purity Grade based on active-to-serving mass concentration.
 */
export function computePurityGrade(
  purityPercent: number,
  category?: CategoryId
): "A+" | "A" | "B" | "C" | "D" {
  // RTD shakes & chicken breasts naturally contain water/moisture (70-92% H2O),
  // so grade thresholds adjust when evaluating hydrated foods/drinks vs dry powders/oils.
  if (category === "rtd-protein") {
    if (purityPercent >= 22) return "A+";
    if (purityPercent >= 10) return "A";
    if (purityPercent >= 8) return "B";
    if (purityPercent >= 6) return "C";
    return "D";
  }
  if (category === "electrolytes") {
    if (purityPercent >= 25) return "A+";
    if (purityPercent >= 18) return "A";
    if (purityPercent >= 10) return "B";
    if (purityPercent >= 6) return "C";
    return "D";
  }
  if (purityPercent >= 85) return "A+";
  if (purityPercent >= 75) return "A";
  if (purityPercent >= 60) return "B";
  if (purityPercent >= 40) return "C";
  return "D";
}

/**
 * Core PureGram Active-Ingredient & Filler Tax Calculation Engine.
 *
 * Formulas:
 * - servingGrams = servingWeight converted to grams (1g = 1000mg)
 * - activeGrams  = activePerServing converted to grams
 * - purityPercent = (activeGrams / servingGrams) * 100  (clamped 0..100)
 * - fillerPercent = 100 - purityPercent
 * - totalPureActiveGrams = totalServings * activeGrams
 * - costPerPureGram = price / totalPureActiveGrams
 * - costPerBenchmarkUnit = costPerPureGram * benchmarkGrams
 *     * Protein: benchmark = 10g  -> cost per 10g Pure Protein
 *     * Creatine: benchmark = 5g  -> cost per 5g Pure Creatine
 *     * Omega-3: benchmark = 1000mg (1g) -> cost per 1000mg Pure EPA+DHA
 *     * Electrolytes: benchmark = 1000mg (1g) -> cost per 1000mg Pure Electrolytes
 * - monthlyHabitCost = (price / totalServings) * dailyServings * 30
 */
export function calculatePureGramMetrics(
  input: CalculatorInput,
  category?: CategoryId
): CalculatedMetrics {
  const safePrice = Math.max(0, Number(input.price) || 0);
  const safeServings = Math.max(0.0001, Number(input.totalServings) || 1);
  const servingGrams = Math.max(
    0.0001,
    toGrams(Number(input.servingWeight) || 0, input.servingUnit)
  );
  const rawActiveGrams = Math.max(
    0,
    toGrams(Number(input.activePerServing) || 0, input.activeUnit)
  );
  const activeGrams = Math.min(servingGrams, rawActiveGrams);
  const benchmarkGrams = Math.max(
    0.0001,
    toGrams(Number(input.benchmarkAmount) || 1, input.benchmarkUnit)
  );
  const caloriesPerServing = Math.max(0, Number(input.caloriesPerServing) || 0);
  const dailyServings = Math.max(0.1, Number(input.dailyServings) || 1);

  const purityPercent = Math.min(
    100,
    Math.max(0, (activeGrams / servingGrams) * 100)
  );
  const fillerPercent = Math.max(0, 100 - purityPercent);

  const fillerGramsPerServing = Math.max(0, servingGrams - activeGrams);
  const totalContainerGrams = safeServings * servingGrams;
  const totalPureActiveGrams = safeServings * activeGrams;
  const totalFillerGrams = safeServings * fillerGramsPerServing;

  const costPerServing = safePrice / safeServings;
  const costPerPureGram =
    totalPureActiveGrams > 0 ? safePrice / totalPureActiveGrams : 0;
  const costPerBenchmarkUnit = costPerPureGram * benchmarkGrams;
  const fillerTaxCost = safePrice * (fillerPercent / 100);
  const monthlyHabitCost = costPerServing * dailyServings * 30;

  const caloriesPerActiveGram =
    activeGrams > 0 ? caloriesPerServing / activeGrams : 0;
  const caloriesPerBenchmarkUnit = caloriesPerActiveGram * benchmarkGrams;

  return {
    purityPercent,
    fillerPercent,
    servingGrams,
    activeGrams,
    fillerGramsPerServing,
    totalContainerGrams,
    totalPureActiveGrams,
    totalFillerGrams,
    costPerServing,
    costPerPureGram,
    costPerBenchmarkUnit,
    fillerTaxCost,
    monthlyHabitCost,
    caloriesPerServing,
    caloriesPerActiveGram,
    caloriesPerBenchmarkUnit,
    purityGrade: computePurityGrade(purityPercent, category),
  };
}

export function getBenchmarkForCategory(category: CategoryId): {
  amount: number;
  unit: MassUnit;
} {
  switch (category) {
    case "whey-protein":
    case "plant-protein":
    case "rtd-protein":
      return { amount: 10, unit: "g" }; // per 10g Pure Protein
    case "creatine":
      return { amount: 5, unit: "g" }; // per 5g Pure Creatine
    case "omega-3":
      return { amount: 1000, unit: "mg" }; // per 1000mg Pure EPA+DHA
    case "electrolytes":
      return { amount: 1000, unit: "mg" }; // per 1000mg Pure Electrolytes
  }
}

export function getUnitForCategory(category: CategoryId): MassUnit {
  return category === "omega-3" || category === "electrolytes" ? "mg" : "g";
}

export function enrichProduct(spec: ProductSpec): EnrichedProduct {
  const unit = getUnitForCategory(spec.category);
  const benchmark = getBenchmarkForCategory(spec.category);

  const metricsUsd = calculatePureGramMetrics(
    {
      price: spec.priceUsd,
      currency: "USD",
      totalServings: spec.totalServings,
      servingWeight: spec.servingWeight,
      servingUnit: unit,
      activePerServing: spec.activePerServing,
      activeUnit: unit,
      benchmarkAmount: benchmark.amount,
      benchmarkUnit: benchmark.unit,
      caloriesPerServing: spec.caloriesPerServing,
      dailyServings: 1,
    },
    spec.category
  );

  const metricsKrw = calculatePureGramMetrics(
    {
      price: spec.priceKrw,
      currency: "KRW",
      totalServings: spec.totalServings,
      servingWeight: spec.servingWeight,
      servingUnit: unit,
      activePerServing: spec.activePerServing,
      activeUnit: unit,
      benchmarkAmount: benchmark.amount,
      benchmarkUnit: benchmark.unit,
      caloriesPerServing: spec.caloriesPerServing,
      dailyServings: 1,
    },
    spec.category
  );

  return {
    ...spec,
    metricsUsd,
    metricsKrw,
  };
}

export function compareProducts(
  productA: EnrichedProduct,
  productB: EnrichedProduct,
  currency: Currency
): VsComparisonResult {
  const metricsA = currency === "USD" ? productA.metricsUsd : productA.metricsKrw;
  const metricsB = currency === "USD" ? productB.metricsUsd : productB.metricsKrw;

  const eps = 0.0001;

  // Lower cost per pure benchmark unit wins
  let costWinner: "A" | "B" | "tie" = "tie";
  let costSavingsPercent = 0;
  if (Math.abs(metricsA.costPerBenchmarkUnit - metricsB.costPerBenchmarkUnit) > eps) {
    if (metricsA.costPerBenchmarkUnit < metricsB.costPerBenchmarkUnit) {
      costWinner = "A";
      costSavingsPercent =
        ((metricsB.costPerBenchmarkUnit - metricsA.costPerBenchmarkUnit) /
          metricsB.costPerBenchmarkUnit) *
        100;
    } else {
      costWinner = "B";
      costSavingsPercent =
        ((metricsA.costPerBenchmarkUnit - metricsB.costPerBenchmarkUnit) /
          metricsA.costPerBenchmarkUnit) *
        100;
    }
  }

  // Higher purity % wins
  let purityWinner: "A" | "B" | "tie" = "tie";
  const purityDiffPoints = Math.abs(metricsA.purityPercent - metricsB.purityPercent);
  if (purityDiffPoints > 0.05) {
    purityWinner = metricsA.purityPercent > metricsB.purityPercent ? "A" : "B";
  }

  // Lower calories per active gram wins (leaner active delivery)
  let calorieWinner: "A" | "B" | "tie" = "tie";
  if (Math.abs(metricsA.caloriesPerActiveGram - metricsB.caloriesPerActiveGram) > 0.05) {
    calorieWinner =
      metricsA.caloriesPerActiveGram < metricsB.caloriesPerActiveGram ? "A" : "B";
  }

  // Lower 30-day habit cost wins
  let monthlyWinner: "A" | "B" | "tie" = "tie";
  if (Math.abs(metricsA.monthlyHabitCost - metricsB.monthlyHabitCost) > eps) {
    monthlyWinner =
      metricsA.monthlyHabitCost < metricsB.monthlyHabitCost ? "A" : "B";
  }

  // Composite PureGram Index Winner: 60% weight on True Cost per Pure Gram, 40% weight on Purity %
  let pointsA = 0;
  let pointsB = 0;
  if (costWinner === "A") pointsA += 2;
  else if (costWinner === "B") pointsB += 2;

  if (purityWinner === "A") pointsA += 1.5;
  else if (purityWinner === "B") pointsB += 1.5;

  if (calorieWinner === "A") pointsA += 0.5;
  else if (calorieWinner === "B") pointsB += 0.5;

  const overallWinner: "A" | "B" | "tie" =
    pointsA > pointsB ? "A" : pointsB > pointsA ? "B" : "tie";

  return {
    productA,
    productB,
    metricsA,
    metricsB,
    costWinner,
    costSavingsPercent,
    purityWinner,
    purityDiffPoints,
    calorieWinner,
    monthlyWinner,
    overallWinner,
  };
}
