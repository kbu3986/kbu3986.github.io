import { ProductSpec } from "@/lib/types";

export const HYDRATION_RTD_PRODUCTS: ProductSpec[] = [
  // ======================== 5. ELECTROLYTES & HYDRATION (8) ========================
  {
    slug: "lmnt-zero-sugar-electrolytes",
    category: "electrolytes",
    brand: { en: "LMNT", ko: "LMNT (엘엠엔티)" },
    name: {
      en: "Zero-Sugar Electrolytes Citrus Salt (30 Stick Packs)",
      ko: "제로슈거 고함량 전해질 파우더 시트러스 솔트 (30포)",
    },
    packageLabel: {
      en: "30 Stick Packs · 30 Servings",
      ko: "30스틱 · 30회분",
    },
    origin: "US",
    totalServings: 30,
    servingWeight: 6000,
    activePerServing: 1260,
    activeBreakdown: {
      en: "1,000mg Sodium + 200mg Potassium + 60mg Magnesium = 1,260mg Active Ions",
      ko: "나트륨 1,000mg + 칼륨 200mg + 마그네슘 60mg = 순수 전해질 이온 1,260mg",
    },
    caloriesPerServing: 5,
    priceUsd: 45.0,
    priceKrw: 62000,
    amazonQuery: "LMNT Zero Sugar Electrolytes Citrus Salt 30 Count",
    iherbQuery: "Zero Sugar High Sodium Electrolytes",
    coupangQuery: "LMNT 전해질 파우더 시트러스 30포",
    summary: {
      en: "Cult-favorite ketogenic & heavy-sweater hydration stick packing a full 1,000mg sodium (1,260mg total pure ions = 21.0% elemental purity) with zero cane sugar.",
      ko: "땀 배출이 많은 러너·크로스핏터·저탄고지 식단가들의 필수템. 설탕 없이 1포(6,000mg)당 무려 1,260mg 순수 전해질(순도 21.0%)을 공급합니다.",
    },
    pros: {
      en: [
        "Serious 1,260mg pure active electrolytes per stick with 0g sugar",
        "Clinically aligned sodium-to-potassium ratio for heavy sweat loss",
      ],
      ko: [
        "당류 0g이면서 1포당 1,260mg 초고함량 전해질 이온 제공",
        "장거리 러닝·사우나·여름 고강도 훈련 시 즉각적인 나트륨 보충",
      ],
    },
    cons: {
      en: [
        "$1.50 per stick ($45/month) vs ~$0.53/scoop for unbagged bulk salt tubs",
      ],
      ko: [
        "1포당 2천 원 이상으로 벌크 통 제품(리라이트 등) 대비 휴대용 스틱 비용이 큼",
      ],
    },
    lastChecked: "2026-11-20",
  },
  {
    slug: "liquid-iv-hydration-multiplier",
    category: "electrolytes",
    brand: { en: "Liquid I.V.", ko: "리퀴드아이브이 (Liquid I.V.)" },
    name: {
      en: "Hydration Multiplier Lemon Lime (16 Stick Packs)",
      ko: "하이드레이션 멀티플라이어 레몬라임 (16스틱)",
    },
    packageLabel: {
      en: "16 Stick Packs · 16 Servings",
      ko: "16스틱 · 16회분",
    },
    origin: "US",
    totalServings: 16,
    servingWeight: 16000,
    activePerServing: 870,
    activeBreakdown: {
      en: "500mg Sodium + 370mg Potassium = 870mg Active Ions (+ 11g Cane Sugar/Dextrose)",
      ko: "나트륨 500mg + 칼륨 370mg = 순수 전해질 870mg (나머지 11g은 포도당·설탕)",
    },
    caloriesPerServing: 45,
    priceUsd: 24.99,
    priceKrw: 32900,
    amazonQuery: "Liquid I.V. Hydration Multiplier Lemon Lime 16 Pack",
    iherbQuery: "Liquid IV Hydration Multiplier 16",
    coupangQuery: "리퀴드아이브이 레몬라임 16포",
    summary: {
      en: "Uses glucose-sodium cotransport (ORS) for rapid fluid uptake, but PureGram exposes its 5.4% elemental purity: 11g of every 16g stick is cane sugar/dextrose at $1.79 per 1000mg active ions.",
      ko: "포도당-나트륨 공동수송 원리로 수분 흡수는 빠르지만, 16g 대형 스틱 중 순수 전해질은 870mg(순도 5.4%)뿐이며 11g이 설탕·포도당이라 전해질 단가는 매우 높습니다.",
    },
    pros: {
      en: [
        "True glucose-ORS co-transport plus B-vitamins & Vitamin C",
        "Great recovery aid after travel dehydration or stomach bugs",
      ],
      ko: [
        "WHO 경구수액 원리를 응용해 숙취·탈수 시 수분 흡수 속도가 빠름",
        "비타민 B군과 비타민 C가 함께 배합된 상큼한 이온음료 맛",
      ],
    },
    cons: {
      en: [
        "Only 5.4% active ion purity—68%+ of packet weight is sugar (45 kcal)",
        "Very expensive ~$1.79 per 1,000mg pure electrolytes",
      ],
      ko: [
        "순수 전해질 순도 5.4% — 스틱 무게 대부분이 당류(11g, 45kcal)",
        "순수 전해질 1000mg당 약 2,360원으로 가성비 하위권",
      ],
    },
    lastChecked: "2026-11-20",
  },
  {
    slug: "dripdrop-hydration-powder",
    category: "electrolytes",
    brand: { en: "DripDrop", ko: "드립드롭 (DripDrop)" },
    name: {
      en: "ORS Hydration Electrolyte Powder Berry/Lemon (32 Sticks)",
      ko: "ORS 수분보충 전해질 파우더 32스틱",
    },
    packageLabel: {
      en: "32 Stick Packs · 32 Servings",
      ko: "32스틱 · 32회분",
    },
    origin: "US",
    totalServings: 32,
    servingWeight: 10000,
    activePerServing: 554,
    activeBreakdown: {
      en: "330mg Sodium + 185mg Potassium + 39mg Magnesium = 554mg Active Ions",
      ko: "나트륨 330mg + 칼륨 185mg + 마그네슘 39mg = 순수 전해질 554mg",
    },
    caloriesPerServing: 35,
    priceUsd: 35.99,
    priceKrw: 47900,
    amazonQuery: "DripDrop Hydration Electrolyte Powder 32 Sticks",
    iherbQuery: "DripDrop Hydration 32",
    coupangQuery: "드립드롭 전해질 파우더 32포",
    summary: {
      en: "Doctor-developed low-osmolarity ORS stick with half the sugar of sports drinks, though 554mg active ions per 10,000mg packet yields 5.5% elemental purity.",
      ko: "의사가 개발한 저삼투압 경구수액 스틱으로 맛과 흡수 밸런스가 좋으나, 10g 포당 순수 전해질 이온은 554mg(순도 5.5%)으로 고가형 포지션입니다.",
    },
    pros: {
      en: [
        "Balanced medical-style osmolarity with added magnesium & zinc",
        "32-count box stretches a full month of single-stick hydration",
      ],
      ko: [
        "마그네슘과 아연까지 포함된 의학적 저삼투압 배합",
        "자극적이지 않고 깔끔한 베리·레몬 맛",
      ],
    },
    cons: {
      en: [
        "High ~$2.03 cost per 1,000mg pure electrolytes due to moderate 554mg dose",
        "Contains 7g sugar (35 kcal) per stick",
      ],
      ko: [
        "1포당 순수 전해질 함량이 554mg이라 1000mg당 환산 단가가 높음",
        "당류 7g(35kcal) 포함으로 무당 식단에는 부적합",
      ],
    },
    thirdPartyTested: "NSF Certified for Sport",
    lastChecked: "2026-11-20",
  },
  {
    slug: "ultima-replenisher-electrolyte",
    category: "electrolytes",
    brand: { en: "Ultima Replenisher", ko: "울티마 리플레니셔 (Ultima)" },
    name: {
      en: "Daily Electrolyte Hydration Powder Lemonade (90-Serving Tub)",
      ko: "데일리 전해질 수분보충 파우더 레모네이드 (90회분 통)",
    },
    packageLabel: {
      en: "306 g Canister · 90 Servings",
      ko: "306g 대용량 통 · 90회분",
    },
    origin: "US",
    totalServings: 90,
    servingWeight: 3400,
    activePerServing: 405,
    activeBreakdown: {
      en: "55mg Sodium + 250mg Potassium + 100mg Magnesium = 405mg Active Ions",
      ko: "나트륨 55mg + 칼륨 250mg + 마그네슘 100mg = 순수 전해질 405mg",
    },
    caloriesPerServing: 0,
    priceUsd: 38.99,
    priceKrw: 49900,
    amazonQuery: "Ultima Replenisher Electrolyte Powder 90 Servings Lemonade",
    iherbQuery: "Ultima Replenisher 90 Servings",
    coupangQuery: "울티마 리플레니셔 전해질 90회분",
    summary: {
      en: "Zero-calorie potassium & magnesium-forward daily water enhancer across 90 scoops (low 55mg sodium—great for desk sipping, not marathon sweat).",
      ko: "나트륨은 낮추고 칼륨(250mg)·마그네슘(100mg) 비중을 높인 0kcal 일상 수분보충 파우더. 90회분 통 구성으로 사무실 데일리 물 대용에 적합합니다.",
    },
    pros: {
      en: [
        "90 servings per canister keeps 30-day daily habit cost down to ~$13",
        "0 calories, plant-based colors, high potassium-to-sodium ratio",
      ],
      ko: [
        "90회분 대용량으로 한 달 유지비 약 1만 6천 원대의 경제적 데일리 음용",
        "0kcal 무설탕 및 칼륨·마그네슘 보충에 특화된 구성",
      ],
    },
    cons: {
      en: [
        "Only 55mg sodium is far too low for heavy endurance sweating",
        "11.9% elemental purity yields moderate cost per 1,000mg ions",
      ],
      ko: [
        "나트륨이 55mg뿐이라 폭염 야외 러닝·고강도 발한용으로는 부족함",
      ],
    },
    lastChecked: "2026-11-20",
  },
  {
    slug: "nuun-sport-electrolyte-tablets",
    category: "electrolytes",
    brand: { en: "Nuun", ko: "눈 스포츠 (Nuun)" },
    name: {
      en: "Nuun Sport Electrolyte Effervescent Tablets (4-Tube / 40 Tabs)",
      ko: "눈 스포츠 전해질 발포정 4튜브 세트 (40정)",
    },
    packageLabel: {
      en: "4 Tubes × 10 Tablets · 40 Servings",
      ko: "10정 × 4튜브 · 총 40회분",
    },
    origin: "US",
    totalServings: 40,
    servingWeight: 5000,
    activePerServing: 475,
    activeBreakdown: {
      en: "300mg Sodium + 150mg Potassium + 25mg Magnesium = 475mg Active Ions",
      ko: "나트륨 300mg + 칼륨 150mg + 마그네슘 25mg = 순수 전해질 475mg",
    },
    caloriesPerServing: 15,
    priceUsd: 23.99,
    priceKrw: 31500,
    amazonQuery: "Nuun Sport Electrolyte Tablets 4 Pack",
    iherbQuery: "Nuun Sport Electrolyte Tablets",
    coupangQuery: "눈 스포츠 전해질 발포정 4팩",
    summary: {
      en: "Waterproof bike-jersey tubes drop neatly into cycling bottles, though sodium bicarbonate/citric fizz agents take up 90.5% of the 5,000mg tablet weight.",
      ko: "자전거 물통·등산 배낭에 쏙 들어가는 휴대용 발포정. 발포 기제(구연산·탄산수소염) 특성상 5g 알약 중 순수 전해질 이온은 475mg(순도 9.5%)입니다.",
    },
    pros: {
      en: [
        "Crush-proof waterproof tubes ideal for cycling, running, and carry-on bags",
        "Informed Choice certified with crisp light fizz (15 kcal)",
      ],
      ko: [
        "가루 날림 없이 물통에 톡 떨어뜨리는 최고의 휴대성 및 인폼드초이스 인증",
        "15kcal의 가벼운 청량감으로 러닝·라이딩 중 음용 편리",
      ],
    },
    cons: {
      en: [
        "9.5% active purity because fizzing binder base makes up most tablet mass",
      ],
      ko: [
        "발포 부형제 무게 비중이 커서 순수 전해질 1000mg당 단가는 벌크 파우더보다 높음",
      ],
    },
    thirdPartyTested: "Informed Choice",
    lastChecked: "2026-11-20",
  },
  {
    slug: "redmond-re-lyte-unflavored",
    category: "electrolytes",
    brand: { en: "Redmond Life", ko: "레드몬드 리라이트 (Re-Lyte)" },
    name: {
      en: "Re-Lyte Hydration Unflavored / Lemon Lime Bulk Tub (75 Servings)",
      ko: "리라이트 고함량 전해질 파우더 대용량 통 (75회분)",
    },
    packageLabel: {
      en: "352 g Tub · 75 Servings",
      ko: "352g 통 · 75회분",
    },
    origin: "US",
    totalServings: 75,
    servingWeight: 4700,
    activePerServing: 1450,
    activeBreakdown: {
      en: "1,000mg Sodium (Ancient Sea Salt) + 400mg Potassium + 50mg Magnesium = 1,450mg Ions",
      ko: "유타 고대해양염 나트륨 1,000mg + 칼륨 400mg + 마그네슘 50mg = 순수 전해질 1,450mg",
    },
    caloriesPerServing: 0,
    priceUsd: 39.99,
    priceKrw: 53900,
    amazonQuery: "Redmond Re-Lyte Hydration Electrolyte Mix Tub",
    iherbQuery: "Redmond Re-Lyte Hydration",
    coupangQuery: "레드몬드 리라이트 전해질 파우더",
    summary: {
      en: "PureGram's high-sodium value champion: packs 1,450mg pure electrolytes into a 4.7g scoop (30.9% elemental purity!) across 75 scoops—cutting LMNT's cost per 1000mg by ~69%!",
      ko: "전해질 순수그램 가성비 챔피언! 스틱 포장을 없애고 1스쿱(4.7g)에 무려 1,450mg 순수 전해질(순도 30.9%)을 담아 LMNT 대비 유효성분 단가를 약 1/3로 줄였습니다.",
    },
    pros: {
      en: [
        "#1 Highest Electrolyte Purity (30.9%) with 1,450mg active ions per scoop",
        "Only ~$0.37 per 1,000mg pure electrolytes—nearly 70% cheaper than stick packs",
        "Zero sugar, zero calories, unrefined Utah Real Salt trace minerals",
      ],
      ko: [
        "전해질 카테고리 순도 1위(30.9%) · 1회 1,450mg 초고함량 이온",
        "순수 전해질 1000mg당 약 496원으로 스틱형 프리미엄 브랜드 대비 65%+ 절약",
        "0kcal 무설탕 및 천연 미네랄 솔트 사용",
      ],
    },
    cons: {
      en: [
        "Tub format is less pocket-friendly on race day than single sticks",
        "Trace mineral sediment settles slightly at bottom of glass",
      ],
      ko: [
        "통 분말 형태라 야외 러닝 시 작은 약통이나 물통에 미리 타서 나가야 함",
        "천연 광물염 특성상 컵 바닥에 미세한 침전물이 남을 수 있음",
      ],
    },
    lastChecked: "2026-11-20",
  },
  {
    slug: "nutricost-electrolyte-complex",
    category: "electrolytes",
    brand: { en: "Nutricost", ko: "뉴트리코스트 (Nutricost)" },
    name: {
      en: "Electrolyte Complex Hydration Powder Fruit Punch (120 Servings)",
      ko: "일렉트로라이트 전해질 파우더 대용량 120회분",
    },
    packageLabel: {
      en: "528 g Tub · 120 Servings",
      ko: "528g 대용량 통 · 120회분",
    },
    origin: "US",
    totalServings: 120,
    servingWeight: 4400,
    activePerServing: 680,
    activeBreakdown: {
      en: "220mg Sodium + 380mg Potassium + 80mg Magnesium = 680mg Active Ions",
      ko: "나트륨 220mg + 칼륨 380mg + 마그네슘 80mg = 순수 전해질 680mg",
    },
    caloriesPerServing: 5,
    priceUsd: 24.95,
    priceKrw: 31900,
    amazonQuery: "Nutricost Electrolyte Powder 120 Servings",
    iherbQuery: "Nutricost Electrolyte Complex Powder 120",
    coupangQuery: "뉴트리코스트 전해질 파우더 120회분",
    summary: {
      en: "120 scoops for ~$25 makes this the lowest 30-day habit cost (~$6.24/mo) and lowest cost per 1,000mg pure electrolytes (~$0.31) in the entire hydration index.",
      ko: "120회분 대용량 통이 3만 원대 초반! 한 달 유지비 약 7,900원, 순수 전해질 1000mg당 약 391원으로 전해질 카테고리 전체 최저가를 달성했습니다.",
    },
    pros: {
      en: [
        "#1 Lowest cost per 1,000mg pure electrolytes (~$0.31) and ~$6.24/mo habit cost",
        "120 servings last a full 4 months of daily gym bottles",
      ],
      ko: [
        "순수 전해질 1000mg당 약 391원 · 월 유지비 7천 원대로 가성비 전체 1위",
        "당류 무첨가(스테비아 감미) 및 비타민 B·C 부원료 포함",
      ],
    },
    cons: {
      en: [
        "Sweet fruit-punch stevia flavor can taste bold unless diluted in 500ml+ water",
      ],
      ko: [
        "맛이 꽤 진하고 달콤해 생수 500ml~700ml에 넉넉히 희석해야 깔끔함",
      ],
    },
    thirdPartyTested: "ISO Lab Tested",
    lastChecked: "2026-11-20",
  },
  {
    slug: "lingtea-zero-hydration",
    category: "electrolytes",
    brand: { en: "Lingtea", ko: "링티 (Lingtea)" },
    name: {
      en: "Lingtea Zero Peach Hydration Stick (30 Sticks / 3-Box)",
      ko: "링티 제로 복숭아맛 수분보충 스틱 (10포 × 3박스)",
    },
    packageLabel: {
      en: "30 Sticks · 30 Servings",
      ko: "9.5g × 30포 (3박스) · 30회분",
    },
    origin: "KR",
    totalServings: 30,
    servingWeight: 9500,
    activePerServing: 620,
    activeBreakdown: {
      en: "420mg Sodium + 200mg Potassium = 620mg Electrolytes (+ Taurine, Vit C, Erythritol)",
      ko: "나트륨 420mg + 칼륨 200mg = 순수 전해질 620mg (+ 타우린·비타민C·에리스리톨)",
    },
    caloriesPerServing: 0,
    priceUsd: 39.9,
    priceKrw: 45900,
    amazonQuery: "Lingtea Korean Hydration Electrolyte Stick",
    iherbQuery: "Zero Sugar Peach Electrolyte Stick",
    coupangQuery: "링티 제로 복숭아맛 3박스",
    summary: {
      en: "Viral Korean military-doctor hydration brand in zero-calorie peach form: refreshing taste and giftable packaging, though 6.5% active ion purity carries a steep brand premium.",
      ko: "군인의 피로·탈수 회복 스토리로 유명한 대한민국 국민 수분 스틱의 제로 칼로리 버전. 맛은 훌륭하나 에리스리톨 부원료 비중으로 순수 전해질 순도는 6.5%입니다.",
    },
    pros: {
      en: [
        "Delicious zero-calorie peach iced-tea taste encourages daily water intake",
        "Includes Vitamin C, taurine, and zinc in sleek pocket sticks",
      ],
      ko: [
        "0kcal 복숭아 아이스티 맛으로 물 마시기 싫어하는 분도 500ml 완음 가능",
        "개별 스틱 포장과 고급 케이스로 선물용·출장용 만족도 높음",
      ],
    },
    cons: {
      en: [
        "6.5% active ion purity and ~$2.15 (₩2,468) per 1,000mg pure electrolytes",
      ],
      ko: [
        "순수 전해질 1000mg당 약 2,468원으로 해외 대용량 전해질 파우더 대비 5~6배 고가",
      ],
    },
    thirdPartyTested: "HACCP Korea",
    lastChecked: "2026-11-20",
  },

  // ======================== 6. RTD PROTEIN & CHICKEN BREAST (8) ========================
  {
    slug: "fairlife-core-power-elite-42g",
    category: "rtd-protein",
    brand: { en: "fairlife", ko: "페어라이프 (fairlife)" },
    name: {
      en: "Core Power Elite High Protein Milk Shake 42g Chocolate (12-Pack)",
      ko: "코어파워 엘리트 42g 초고단백 쉐이크 초콜릿 (12병)",
    },
    packageLabel: {
      en: "12 Bottles × 414 ml (14 fl oz) · 12 Servings",
      ko: "414ml × 12병 박스 · 12회분",
    },
    origin: "US",
    totalServings: 12,
    servingWeight: 414,
    activePerServing: 42,
    activeBreakdown: {
      en: "42g Ultra-Filtered Lactose-Free Complete Milk Protein (Whey + Casein)",
      ko: "초미세여과 락토프리 우유 단백질 42g (유청 + 카제인 자연 비율)",
    },
    caloriesPerServing: 230,
    priceUsd: 44.99,
    priceKrw: 64900,
    amazonQuery: "Fairlife Core Power Elite 42g Protein Shake Chocolate 12 Pack",
    iherbQuery: "High Protein RTD Shake 42g",
    coupangQuery: "페어라이프 코어파워 엘리트 42g 12개",
    summary: {
      en: "Ultra-filtered real milk delivers an insane 42g lactose-free protein in one bottle that tastes like melted ice cream (10.1% liquid protein density, 5.48 kcal/g).",
      ko: "분말을 탄 물이 아닌 진짜 우유를 초미세여과해 한 병에 무려 42g 유당제거 단백질을 압축한 괴물 RTD. 맛과 함량 모두 미국 편의점·아마존 최강자입니다.",
    },
    pros: {
      en: [
        "Massive 42g complete milk protein in a single grab-and-go bottle",
        "Lactose-free ultra-filtered real milk—zero chalky powder grit",
        "Competitive ~$0.89 per 10g protein despite RTD bottle convenience!",
      ],
      ko: [
        "한 병으로 닭가슴살 2팩 분량인 순수 단백질 42g 원샷 충전",
        "락토프리 초미세여과 우유 공법으로 비릿한 단백질 가루 맛 전혀 없음",
      ],
    },
    cons: {
      en: [
        "Contains sucralose & acesulfame potassium sweeteners",
        "Heavy overseas shipping surcharge when imported to Korea",
      ],
      ko: [
        "액상 중량 특성상 한국 직구 시 배송비가 붙어 국내 RTD 대비 단가 상승",
      ],
    },
    lastChecked: "2026-11-20",
  },
  {
    slug: "fairlife-nutrition-plan-30g",
    category: "rtd-protein",
    brand: { en: "fairlife", ko: "페어라이프 (fairlife)" },
    name: {
      en: "Nutrition Plan 30g Protein Chocolate Shake (12-Pack)",
      ko: "뉴트리션 플랜 30g 초콜릿 프로틴 쉐이크 (12병)",
    },
    packageLabel: {
      en: "12 Bottles × 340 ml (11.5 fl oz) · 12 Servings",
      ko: "340ml × 12병 · 12회분",
    },
    origin: "US",
    totalServings: 12,
    servingWeight: 340,
    activePerServing: 30,
    activeBreakdown: {
      en: "30g Ultra-Filtered Milk Protein (2g Sugar, Lactose-Free)",
      ko: "초미세여과 락토프리 우유 단백질 30g (당류 단 2g)",
    },
    caloriesPerServing: 150,
    priceUsd: 28.99,
    priceKrw: 42900,
    amazonQuery: "Fairlife Nutrition Plan 30g Protein Shake Chocolate 12 Pack",
    iherbQuery: "30g Protein Shake 12 Pack",
    coupangQuery: "페어라이프 뉴트리션 플랜 30g",
    summary: {
      en: "Costco & Amazon viral sensation: 30g protein at just 150 calories (lean 5.0 kcal/g ratio!) and ~$0.81 per 10g protein—rivalling mid-tier powders with zero shaker cleanup.",
      ko: "미국 코스트코·아마존 품절 대란 주역! 30g 고단백에 열량은 단 150kcal(단백질 1g당 5.0kcal)이며 설거지 없는 액상임에도 가성비가 탁월합니다.",
    },
    pros: {
      en: [
        "Elite 5.0 kcal/g protein lean ratio (30g protein in 150 kcal)",
        "Only ~$0.81 per 10g protein—cheapest premium US milk RTD",
      ],
      ko: [
        "150kcal에 단백질 30g을 담은 완벽한 다이어트 매크로(5.0kcal/g)",
        "초코우유 그대로의 깔끔한 맛과 유당 제거 소화 편의성",
      ],
    },
    cons: {
      en: [
        "Frequent warehouse club stockouts drive secondary reseller markups",
      ],
      ko: [
        "인기가 너무 많아 현지 품절 및 리셀 가격 변동이 잦음",
      ],
    },
    lastChecked: "2026-11-20",
  },
  {
    slug: "premier-protein-shake-30g",
    category: "rtd-protein",
    brand: { en: "Premier Protein", ko: "프리미어 프로틴 (Premier)" },
    name: {
      en: "30g High Protein Shake Chocolate (12-Pack Cartons)",
      ko: "프리미어 프로틴 30g 고단백 쉐이크 초콜릿 (12팩)",
    },
    packageLabel: {
      en: "12 Cartons × 325 ml (11 fl oz) · 12 Servings",
      ko: "325ml × 12팩 · 12회분",
    },
    origin: "US",
    totalServings: 12,
    servingWeight: 325,
    activePerServing: 30,
    activeBreakdown: {
      en: "30g Milk Protein Concentrate + Calcium Caseinate + Whey Concentrate (1g Sugar)",
      ko: "우유단백농축물(MPC) + 카제인칼슘 + 농축유청 30g (당류 1g + 24종 비타민)",
    },
    caloriesPerServing: 160,
    priceUsd: 29.99,
    priceKrw: 38900,
    amazonQuery: "Premier Protein Shake 30g Chocolate 12 Pack",
    iherbQuery: "Premier Protein Shake Chocolate",
    coupangQuery: "프리미어 프로틴 쉐이크 초콜릿 12팩",
    summary: {
      en: "Convenient tetra-carton 30g shake fortified with 24 vitamins & minerals at 160 kcal (9.2% liquid protein density) and wide Korean & US warehouse availability.",
      ko: "한국 코스트코와 쿠팡에서도 쉽게 구할 수 있는 30g 고단백 멸균팩 음료. 당류 1g, 160kcal에 24종 비타민·미네랄까지 챙긴 검증된 베스트셀러입니다.",
    },
    pros: {
      en: [
        "30g protein with only 1g sugar plus 24 added micronutrients",
        "Widely stocked in both US Amazon and Korean Costco/Coupang",
      ],
      ko: [
        "국내 코스트코·쿠팡 정식 유통으로 구하기 쉬운 30g 고단백 RTD",
        "단백질 10g당 약 1,080원으로 국내 20g 음료들보다 오히려 경제적",
      ],
    },
    cons: {
      en: [
        "Contains dairy lactose (unlike ultra-filtered Fairlife)",
      ],
      ko: [
        "MPC 원료 기반이라 유당에 매우 민감한 분은 WPI 음료 권장",
      ],
    },
    lastChecked: "2026-11-20",
  },
  {
    slug: "muscle-milk-pro-series-40g",
    category: "rtd-protein",
    brand: { en: "Muscle Milk", ko: "머슬밀크 (Muscle Milk)" },
    name: {
      en: "Pro Advanced Nutrition 40g Protein Shake Knockout Chocolate (12-Pack)",
      ko: "머슬밀크 프로 시리즈 40g 초고단백 쉐이크 (12병)",
    },
    packageLabel: {
      en: "12 Bottles × 414 ml · 12 Servings",
      ko: "414ml × 12병 · 12회분",
    },
    origin: "US",
    totalServings: 12,
    servingWeight: 414,
    activePerServing: 40,
    activeBreakdown: {
      en: "40g Milk Protein Isolate + Calcium Caseinate + Whey (Zero Dairy Lactose)",
      ko: "분리우유단백(MPI) + 카제인 + 유청 총 40g (무유당 Non-Dairy 기준)",
    },
    caloriesPerServing: 210,
    priceUsd: 39.99,
    priceKrw: 54900,
    amazonQuery: "Muscle Milk Pro Series 40g Protein Shake 12 Pack",
    iherbQuery: "Muscle Milk Pro 40g",
    coupangQuery: "머슬밀크 프로 40g 프로틴 쉐이크",
    summary: {
      en: "Packs 40g pure protein into 210 calories (5.25 kcal/g—even leaner than Core Power Elite 42g!) at ~$0.83 per 10g protein.",
      ko: "한 병 210kcal에 단백질 40g(1g당 5.25kcal)을 채워 넣은 고효율 빌더용 RTD. 코어파워 엘리트 대비 가격 부담도 한층 낮췄습니다.",
    },
    pros: {
      en: [
        "40g protein at 210 kcal beats Fairlife Elite on calorie-to-protein lean ratio",
        "Strong ~$0.83 per 10g protein across 480g total carton protein",
      ],
      ko: [
        "40g 초고단백이면서 열량은 210kcal로 칼로리 효율 매우 우수",
        "1박스 총 순수 단백질 480g 제공으로 고강도 웨이트 후 간편 섭취",
      ],
    },
    cons: {
      en: [
        "Richer artificial cocoa-casein thickness requires serving ice-cold",
      ],
      ko: [
        "카제인 특유의 걸쭉함이 있어 반드시 차갑게 냉장해 마셔야 맛있음",
      ],
    },
    thirdPartyTested: "NSF Certified for Sport",
    lastChecked: "2026-11-20",
  },
  {
    slug: "the-danbaek-drink-choco-20g",
    category: "rtd-protein",
    brand: { en: "Binggrae The:Danbaek", ko: "빙그레 더단백" },
    name: {
      en: "The:Danbaek Protein Drink Choco 20g (18-Pack)",
      ko: "더단백 드링크 초코 20g 멸균팩 (250ml × 18팩)",
    },
    packageLabel: {
      en: "18 Cartons × 250 ml · 18 Servings",
      ko: "250ml × 18팩 박스 · 18회분",
    },
    origin: "KR",
    totalServings: 18,
    servingWeight: 250,
    activePerServing: 20,
    activeBreakdown: {
      en: "20g Complete Milk Protein (MPC, <1g Sugar, 105 kcal)",
      ko: "100% 우유단백질(MPC) 20g · 당류 1g 미만 · 105kcal",
    },
    caloriesPerServing: 105,
    priceUsd: 21.99,
    priceKrw: 24900,
    amazonQuery: "Korean Chocolate Protein Drink Carton 20g",
    iherbQuery: "Chocolate RTD Protein Shake 20g",
    coupangQuery: "빙그레 더단백 드링크 초코 250ml 18팩",
    summary: {
      en: "Korea's #1 convenience-store & Coupang RTD protein carton! Binggrae's dairy expertise delivers 20g protein in 105 kcal (<1g sugar) at just ~₩692 per 10g protein in 18-pack boxes.",
      ko: "대한민국 쿠팡·편의점 RTD 단백질 음료 압도적 1위! 바나나맛우유 명가 빙그레의 기술로 당류 1g 미만, 105kcal에 단백질 20g을 깔끔한 초코우유 맛으로 구현했습니다.",
    },
    pros: {
      en: [
        "Super-lean 105 kcal for 20g protein (5.25 kcal/g) with <1g sugar",
        "Outstanding Korean box value at ~₩692 per 10g pure protein!",
        "Room-temperature shelf-stable 250ml tetra pack",
      ],
      ko: [
        "18팩 박스 구매 시 순수 단백질 10g당 약 692원으로 RTD 최고 가성비!",
        "105kcal · 당류 1g 미만의 완벽한 다이어트 스펙과 텁텁함 없는 맛",
        "실온 보관 멸균팩으로 사무실·가방 휴대 최고",
      ],
    },
    cons: {
      en: [
        "Contains milk protein concentrate (lactose-sensitive drinkers prefer WPI ProFit)",
      ],
      ko: [
        "우유단백(MPC) 기반이라 심한 유당불내증은 분리유청 클리어 음료 권장",
      ],
    },
    thirdPartyTested: "HACCP Korea",
    lastChecked: "2026-11-20",
  },
  {
    slug: "selex-profit-wpi-drink",
    category: "rtd-protein",
    brand: { en: "Maeil Selex", ko: "매일유업 셀렉스" },
    name: {
      en: "Selex ProFit Clear WPI Drink Peach 20g (24-Pack)",
      ko: "셀렉스 프로핏 분리유청(WPI) 드링크 복숭아 (330ml × 24병)",
    },
    packageLabel: {
      en: "24 PET Bottles × 330 ml · 24 Servings",
      ko: "330ml × 24병 박스 · 24회분",
    },
    origin: "KR",
    totalServings: 24,
    servingWeight: 330,
    activePerServing: 20,
    activeBreakdown: {
      en: "20g 100% Clear Whey Protein Isolate (0g Fat, 0g Sugar, 0g Lactose!)",
      ko: "100% 순수 분리유청단백(WPI) 20g (지방 0g · 당류 0g · 유당 0g!)",
    },
    caloriesPerServing: 88,
    priceUsd: 29.99,
    priceKrw: 33900,
    amazonQuery: "Clear Whey Isolate RTD Protein Drink Peach",
    iherbQuery: "Clear Whey Isolate Drink",
    coupangQuery: "셀렉스 프로핏 복숭아 330ml 24개",
    summary: {
      en: "Refreshing clear peach sports-drink style WPI: 20g lactose-free isolate at an astonishing 88 calories (4.40 kcal/g—tied with ISO100!) and ~₩706 per 10g protein.",
      ko: "우유 느낌 전혀 없는 이온음료 스타일의 100% WPI 클리어 음료! 유당·지방·당류 0g, 단 88kcal에 단백질 20g(1g당 4.4kcal 초저열량!)을 담아 여름 운동 중 마시기 최고입니다.",
    },
    pros: {
      en: [
        "#1 Leanest RTD in our index: 88 kcal for 20g WPI (4.40 kcal/g!)",
        "100% lactose-free, fat-free, sugar-free clear peach hydration",
        "Great ~₩706 per 10g pure WPI in 24-bottle bulk case",
      ],
      ko: [
        "RTD 전체 칼로리 효율 1위: 단 88kcal로 순수 WPI 20g 섭취 (4.4kcal/g!)",
        "유당 0% · 지방 0% · 당류 0%로 유당불내증 완벽 해방",
        "운동 중 갈증 해소와 단백질 보충을 동시에 해결하는 상큼한 복숭아 맛",
      ],
    },
    cons: {
      en: [
        "Slight whey-isolate astringency on the dry finish (typical of clear WPI)",
      ],
      ko: [
        "클리어 WPI 특유의 입안이 살짝 코팅되는 깔끔·떫은 끝맛 존재",
      ],
    },
    thirdPartyTested: "HACCP Korea",
    lastChecked: "2026-11-20",
  },
  {
    slug: "harim-chicken-breast-black-pepper",
    category: "rtd-protein",
    brand: { en: "Harim", ko: "하림 (Harim)" },
    name: {
      en: "IFF Sous-Vide Chicken Breast Black Pepper 100g (20-Pack)",
      ko: "하림 닭가슴살 블랙페퍼 수비드 100g (20팩)",
    },
    packageLabel: {
      en: "20 Frozen Pouches × 100 g · 20 Servings",
      ko: "100g × 20팩 냉동 묶음 · 20회분",
    },
    origin: "KR",
    totalServings: 20,
    servingWeight: 100,
    activePerServing: 23,
    activeBreakdown: {
      en: "23g Whole-Food Korean Chicken Breast Protein (8h Brined Sous-Vide)",
      ko: "국내산 냉장 닭가슴살 원물 단백질 23g (8시간 저온 숙성 수비드)",
    },
    caloriesPerServing: 110,
    priceUsd: 26.99,
    priceKrw: 29800,
    amazonQuery: "Cooked Sous Vide Chicken Breast Pouches",
    iherbQuery: "High Protein Chicken Breast Pack",
    coupangQuery: "하림 닭가슴살 블랙페퍼 100g 20팩",
    summary: {
      en: "Whole-food benchmark! At 23.0% protein-by-weight (highest physical density in RTD/Food!), 110 kcal (4.78 kcal/g), and ~₩648 per 10g protein, Harim beats almost every RTD shake on solid satiety.",
      ko: "보충제와 비교하는 진짜 원물 기준점! 100g 한 팩에 순수 단백질 23g(중량 밀도 23.0%), 110kcal, 단백질 10g당 약 648원으로 씹는 포만감과 가성비 모두 최상위권입니다.",
    },
    pros: {
      en: [
        "Real whole-food chew & satiety at ~₩648 ($0.59) per 10g pure protein!",
        "Lean 4.78 kcal/g protein ratio with juicy sous-vide black pepper seasoning",
      ],
      ko: [
        "순수 단백질 10g당 약 648원으로 마시는 RTD 음료들보다 더 저렴함!",
        "110kcal 저열량에 씹는 식사 포만감까지 챙기는 다이어트 정석",
      ],
    },
    cons: {
      en: [
        "Requires freezer storage and 90-second microwave thawing",
      ],
      ko: [
        "냉동 보관 및 전자레인지 해동이 필요해 즉석 휴대성은 음료보다 낮음",
      ],
    },
    thirdPartyTested: "HACCP Korea",
    lastChecked: "2026-11-20",
  },
  {
    slug: "masitdak-steamed-chicken-breast",
    category: "rtd-protein",
    brand: { en: "Masitdak", ko: "맛있닭 (랭킹닭컴)" },
    name: {
      en: "Soft Steamed Chicken Breast Original/Garlic 100g (20-Pack)",
      ko: "맛있닭 소프트 스팀 닭가슴살 오리지널 100g (20팩)",
    },
    packageLabel: {
      en: "20 Pouches × 100 g · 20 Servings",
      ko: "100g × 20팩 · 20회분",
    },
    origin: "KR",
    totalServings: 20,
    servingWeight: 100,
    activePerServing: 24,
    activeBreakdown: {
      en: "24g Steamed Diced Whole Chicken Breast Protein",
      ko: "스팀 오븐 공법 국내산 닭가슴살 원물 단백질 24g",
    },
    caloriesPerServing: 115,
    priceUsd: 28.99,
    priceKrw: 31900,
    amazonQuery: "Steamed Chicken Breast Meal Prep Packs",
    iherbQuery: "Ready to Eat Protein Pack",
    coupangQuery: "맛있닭 스팀 닭가슴살 오리지널 100g 20팩",
    summary: {
      en: "Korea's iconic meal-prep chicken pack pre-sliced into tender steam-locked chunks, delivering 24g protein per 100g pouch (24.0% density) and ~₩665 per 10g protein.",
      ko: "퍽퍽한 닭가슴살의 편견을 깬 누적 판매 수억 팩 스테디셀러. 한입 크기로 썰려 있고 스팀 공법으로 촉촉하며 100g당 24g 단백질(밀도 24.0%)을 제공합니다.",
    },
    pros: {
      en: [
        "Highest physical protein density (24.0%) in our RTD & Whole-Food tier",
        "Pre-sliced steam-cooked pieces eat easily straight from the microwaved pouch",
      ],
      ko: [
        "100g당 단백질 24g(밀도 24.0%) · 10g당 약 665원의 뛰어난 식단 가성비",
        "먹기 좋게 슬라이스되어 있어 칼·가위 없이 전자레인지 조리 후 바로 섭취",
      ],
    },
    cons: {
      en: [
        "Requires freezer space and microwave access",
      ],
      ko: [
        "20팩 대량 구매 시 냉동실 보관 공간 확보가 필수",
      ],
    },
    thirdPartyTested: "HACCP Korea",
    lastChecked: "2026-11-20",
  },
];
