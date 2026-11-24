import priceSnapshots from "./price-snapshots.json";
import { CATEGORIES, CATEGORY_MAP, getCategoryById } from "./categories";
import { PROTEIN_PRODUCTS } from "./products-proteins";
import { PERFORMANCE_PRODUCTS } from "./products-performance";
import { HYDRATION_RTD_PRODUCTS } from "./products-hydration-rtd";
import { enrichProduct } from "@/lib/calculator";
import {
  CategoryId,
  EnrichedProduct,
  ProductSpec,
  VsPairSpec,
} from "@/lib/types";

type SnapshotOverride = {
  priceUsd?: number;
  priceKrw?: number;
  lastChecked?: string;
};

const overrides = (priceSnapshots.overrides || {}) as Record<
  string,
  SnapshotOverride
>;

export const PRICE_FEED_UPDATED_AT: string =
  priceSnapshots.updatedAt || "2026-11-20T09:00:00.000Z";

export const RAW_PRODUCTS: ProductSpec[] = [
  ...PROTEIN_PRODUCTS,
  ...PERFORMANCE_PRODUCTS,
  ...HYDRATION_RTD_PRODUCTS,
].map((spec) => {
  const ov = overrides[spec.slug];
  if (!ov) return spec;
  return {
    ...spec,
    priceUsd: typeof ov.priceUsd === "number" ? ov.priceUsd : spec.priceUsd,
    priceKrw: typeof ov.priceKrw === "number" ? ov.priceKrw : spec.priceKrw,
    lastChecked: ov.lastChecked || spec.lastChecked,
  };
});

export const ALL_PRODUCTS: EnrichedProduct[] = RAW_PRODUCTS.map(enrichProduct);

export const PRODUCT_MAP: Record<string, EnrichedProduct> = ALL_PRODUCTS.reduce(
  (acc, item) => {
    acc[item.slug] = item;
    return acc;
  },
  {} as Record<string, EnrichedProduct>
);

export function getProductBySlug(slug: string): EnrichedProduct | undefined {
  return PRODUCT_MAP[slug];
}

export function getProductsByCategory(category: CategoryId): EnrichedProduct[] {
  return ALL_PRODUCTS.filter((p) => p.category === category);
}

/**
 * Curated 19 high-intent head-to-head rivalries per 8-product category
 * = 19 * 6 = 114 canonical `productA-vs-productB` comparison matchups
 * (228 static VS routes across EN + KO).
 */
const RIVALRY_INDEX_PAIRS: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [0, 6],
  [0, 7],
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
  [1, 6],
  [2, 3],
  [2, 5],
  [3, 4],
  [4, 5],
  [4, 6],
  [5, 6],
  [6, 7],
];

export const CURATED_VS_PAIRS: VsPairSpec[] = CATEGORIES.flatMap((cat) => {
  const items = getProductsByCategory(cat.id);
  const pairs: VsPairSpec[] = [];
  for (const [idxA, idxB] of RIVALRY_INDEX_PAIRS) {
    const a = items[idxA];
    const b = items[idxB];
    if (a && b) {
      pairs.push({
        pairSlug: `${a.slug}-vs-${b.slug}`,
        slugA: a.slug,
        slugB: b.slug,
        category: cat.id,
      });
    }
  }
  return pairs;
});

export const VS_PAIR_MAP: Record<string, VsPairSpec> = CURATED_VS_PAIRS.reduce(
  (acc, item) => {
    acc[item.pairSlug] = item;
    return acc;
  },
  {} as Record<string, VsPairSpec>
);

export function getVsPairBySlug(pairSlug: string): VsPairSpec | undefined {
  if (VS_PAIR_MAP[pairSlug]) return VS_PAIR_MAP[pairSlug];
  // Support reverse order lookup if navigated manually
  const parts = pairSlug.split("-vs-");
  if (parts.length === 2) {
    const [a, b] = parts;
    const prodA = PRODUCT_MAP[a];
    const prodB = PRODUCT_MAP[b];
    if (prodA && prodB && prodA.category === prodB.category && a !== b) {
      return {
        pairSlug: `${a}-vs-${b}`,
        slugA: a,
        slugB: b,
        category: prodA.category,
      };
    }
  }
  return undefined;
}

export function getRelatedVsPairsForProduct(
  slug: string,
  limit = 6
): VsPairSpec[] {
  return CURATED_VS_PAIRS.filter(
    (p) => p.slugA === slug || p.slugB === slug
  ).slice(0, limit);
}

export function getVsPairsByCategory(category: CategoryId): VsPairSpec[] {
  return CURATED_VS_PAIRS.filter((p) => p.category === category);
}

export { CATEGORIES, CATEGORY_MAP, getCategoryById };
