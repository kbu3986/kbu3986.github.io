import { CategoryId, CategoryMeta } from "@/lib/types";

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "whey-protein",
    name: {
      en: "Whey & Isolate Protein",
      ko: "유청·분리유청 프로틴 (WPC/WPI)",
    },
    shortName: {
      en: "Whey & Isolate",
      ko: "유청·WPI 프로틴",
    },
    description: {
      en: "Compare WPC, WPI, and hydrolyzed whey protein powders by pure protein gram cost, scoop filler percentage, and calorie-to-protein ratio.",
      ko: "WPC 농축유청·WPI 분리유청·가수분해 프로틴 파우더의 스쿱당 부형제 비율을 걷어내고 순수 단백질 10g당 진짜 가격과 칼로리 효율을 비교합니다.",
    },
    activeIngredientLabel: {
      en: "Pure Protein",
      ko: "순수 단백질",
    },
    servingLabel: {
      en: "Scoop Weight",
      ko: "1회 스쿱 중량",
    },
    unit: "g",
    benchmarkAmount: 10,
    benchmarkLabel: {
      en: "10g Pure Protein",
      ko: "순수 단백질 10g",
    },
    auditNote: {
      en: "A pure whey isolate typically achieves 80–86% protein-by-weight purity, whereas creamer-heavy dessert blends drop below 50% purity.",
      ko: "고순도 WPI 분리유청은 스쿱 중량 대비 순수 단백질 비율이 80~86%에 달하지만, 맛 위주의 복합 파우더는 크리머·말토덱스트린 비중이 50%를 넘기도 합니다.",
    },
  },
  {
    id: "plant-protein",
    name: {
      en: "Plant & Vegan Protein",
      ko: "식물성·비건 프로틴",
    },
    shortName: {
      en: "Plant / Vegan",
      ko: "식물성 프로틴",
    },
    description: {
      en: "Audit pea, soy, brown rice, and organic plant protein blends by net protein purity, fiber/gum filler ratio, and true cost per 10g protein.",
      ko: "완두콩·대두·현미 등 식물성 비건 프로틴의 검류·당류 부형제 비중을 분석하고 순수 단백질 10g당 실질 가성비를 산출합니다.",
    },
    activeIngredientLabel: {
      en: "Pure Plant Protein",
      ko: "순수 식물성 단백질",
    },
    servingLabel: {
      en: "Scoop Weight",
      ko: "1회 스쿱 중량",
    },
    unit: "g",
    benchmarkAmount: 10,
    benchmarkLabel: {
      en: "10g Pure Protein",
      ko: "순수 단백질 10g",
    },
    auditNote: {
      en: "Unflavored pea and soy isolates reach 88–90% purity, while heavily sweetened organic smoothie blends often require 45g+ scoops to deliver 20g protein.",
      ko: "무맛 분리대두(SPI)·분리완두단백은 순도가 88~90%에 육박하는 반면, 곡물·크리머 블렌드는 20g 단백질을 섭취하기 위해 45g 이상의 파우더를 먹어야 합니다.",
    },
  },
  {
    id: "creatine",
    name: {
      en: "Creatine Monohydrate",
      ko: "크레아틴 모노하이드레이트",
    },
    shortName: {
      en: "Creatine",
      ko: "크레아틴",
    },
    description: {
      en: "Compare 100% micronized creatine monohydrate, Creapure®, NSF Sport tubs, and flavored creatine blends by true cost per 5g pure creatine.",
      ko: "100% 마이크로나이즈드 크레아틴, 독일산 크레아퓨어(Creapure), NSF 인증 제품 및 가미형 블렌드의 순수 크레아틴 5g당 진짜 단가를 비교합니다.",
    },
    activeIngredientLabel: {
      en: "Pure Creatine",
      ko: "순수 크레아틴",
    },
    servingLabel: {
      en: "Serving Weight",
      ko: "1회 섭취 중량",
    },
    unit: "g",
    benchmarkAmount: 5,
    benchmarkLabel: {
      en: "5g Pure Creatine",
      ko: "순수 크레아틴 5g",
    },
    auditNote: {
      en: "Unflavored creatine monohydrate has 100% active label purity. Flavored or 'post-workout matrix' creatines can add 50–89% sugar, citric acid, or pricey co-factors.",
      ko: "무맛 순수 크레아틴 모노하이드레이트는 순도 100%가 표준이며, 향료·당류가 첨가된 복합 크레아틴은 1스쿱 중 최대 89%가 탄수화물·부형제일 수 있습니다.",
    },
  },
  {
    id: "omega-3",
    name: {
      en: "Omega-3 Fish Oil (EPA+DHA)",
      ko: "오메가3 (순수 EPA+DHA)",
    },
    shortName: {
      en: "Omega-3 (EPA+DHA)",
      ko: "오메가3",
    },
    description: {
      en: "Ranked strictly by combined pure EPA+DHA mg per 1000mg—NEVER total fish oil weight. Expose low-concentration 30% fish oils vs 80%+ rTG concentrates.",
      ko: "총 어유(Fish Oil) 캡슐 무게가 아닌 오직 '순수 EPA+DHA 합산 함량 1000mg당 가격'으로 순위를 매깁니다. 저순도 EE형과 고순도 rTG형의 기름 부형제 격차를 확인하세요.",
    },
    activeIngredientLabel: {
      en: "Pure EPA+DHA",
      ko: "순수 EPA+DHA 합산",
    },
    servingLabel: {
      en: "Total Fish Oil Weight",
      ko: "1회 총 어유 중량",
    },
    unit: "mg",
    benchmarkAmount: 1000,
    benchmarkLabel: {
      en: "1000mg Pure EPA+DHA",
      ko: "순수 EPA+DHA 1000mg",
    },
    auditNote: {
      en: "CRITICAL: A '1000mg Fish Oil' softgel with 300mg EPA+DHA is 70% non-omega-3 oil filler! Always compare cost per 1,000mg of combined EPA+DHA.",
      ko: "주의: '1000mg 피쉬오일' 표기 제품이라도 실제 EPA+DHA가 250~300mg이면 나머지 70~75%는 불필요한 지방입니다. 반드시 순수 EPA+DHA 1000mg당 가격을 비교하세요.",
    },
  },
  {
    id: "electrolytes",
    name: {
      en: "Electrolytes & Hydration",
      ko: "전해질·수분보충 파우더",
    },
    shortName: {
      en: "Electrolytes",
      ko: "전해질·수분보충",
    },
    description: {
      en: "Audit hydration sticks, salt packets, and effervescent tablets by combined pure Na + K + Mg electrolytes (per 1000mg) vs cane sugar & acidulant weight.",
      ko: "전해질 스틱·발포정·수분보충 파우더의 순수 전해질(나트륨+칼륨+마그네슘 합산 1000mg) 단가와 설탕·구연산 부형제 비중을 정밀 비교합니다.",
    },
    activeIngredientLabel: {
      en: "Pure Electrolytes (Na+K+Mg)",
      ko: "순수 전해질 (Na+K+Mg)",
    },
    servingLabel: {
      en: "Stick / Scoop Weight",
      ko: "1포·1스쿱 총중량",
    },
    unit: "mg",
    benchmarkAmount: 1000,
    benchmarkLabel: {
      en: "1000mg Pure Electrolytes",
      ko: "순수 전해질 1000mg",
    },
    auditNote: {
      en: "ORS glucose hydration sticks include 10–11g sugar for rapid gut transport, whereas ketogenic salt mixes pack 1,200mg+ active ions with zero sugar.",
      ko: "포도당 기반 경구수액(ORS) 스틱은 빠른 흡수를 위해 당류가 포함되며, 제로슈거 고염분 전해질 파우더는 당류 없이 순수 이온 함량을 극대화합니다.",
    },
  },
  {
    id: "rtd-protein",
    name: {
      en: "RTD Protein & Chicken Breast",
      ko: "단백질 음료(RTD)·닭가슴살",
    },
    shortName: {
      en: "RTD & Chicken",
      ko: "단백질음료·닭가슴살",
    },
    description: {
      en: "Compare convenient ready-to-drink protein shakes and sous-vide chicken breast packs against powders by true cost per 10g protein and calorie lean ratio.",
      ko: "편의점·쿠팡 인기 RTD 단백질 음료(더단백·셀렉스·페어라이프)와 닭가슴살 팩의 순수 단백질 10g당 가격 및 칼로리 대비 단백질 효율을 비교합니다.",
    },
    activeIngredientLabel: {
      en: "Pure Protein",
      ko: "순수 단백질",
    },
    servingLabel: {
      en: "Bottle / Pack Weight",
      ko: "1병·1팩 총중량",
    },
    unit: "g",
    benchmarkAmount: 10,
    benchmarkLabel: {
      en: "10g Pure Protein",
      ko: "순수 단백질 10g",
    },
    auditNote: {
      en: "Note: For ready-to-drink bottles and whole-food chicken breast, non-protein mass is primarily natural water/hydration rather than dry powder filler.",
      ko: "참고: 마시는 RTD 음료와 원물 닭가슴살의 비단백질 중량 대부분은 분말 부형제가 아닌 '수분(물)'이므로, 순수 단백질 10g당 단가와 칼로리 효율을 중심으로 비교하세요.",
    },
  },
];

export const CATEGORY_MAP: Record<CategoryId, CategoryMeta> = CATEGORIES.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<CategoryId, CategoryMeta>
);

export function getCategoryById(id: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.id === id);
}
