import { ProductSpec } from "@/lib/types";

export const PROTEIN_PRODUCTS: ProductSpec[] = [
  // ======================== 1. WHEY & ISOLATE PROTEIN (8) ========================
  {
    slug: "optimum-gold-standard-whey",
    category: "whey-protein",
    brand: { en: "Optimum Nutrition", ko: "옵티멈뉴트리션 (ON)" },
    name: {
      en: "Gold Standard 100% Whey Double Rich Chocolate",
      ko: "골드스탠다드 100% 웨이 프로틴 더블리치 초콜릿",
    },
    packageLabel: {
      en: "5 lb (2.27 kg) · 74 Servings",
      ko: "2.27kg (5파운드) · 74회분",
    },
    origin: "US",
    totalServings: 74,
    servingWeight: 30.4,
    activePerServing: 24,
    activeBreakdown: {
      en: "WPI Primary + WPC + Hydrolyzed Whey Peptides (5.5g BCAA)",
      ko: "분리유청(WPI) 주원료 + 농축유청(WPC) + 가수분해유청 (BCAA 5.5g)",
    },
    caloriesPerServing: 120,
    priceUsd: 84.99,
    priceKrw: 98900,
    amazonQuery: "Optimum Nutrition Gold Standard 100 Whey 5 lb",
    iherbQuery: "Optimum Nutrition Gold Standard 100 Whey 5 lb",
    coupangQuery: "옵티멈뉴트리션 골드스탠다드 웨이 2.27kg",
    summary: {
      en: "The global benchmark whey blend leading with Whey Protein Isolate. Delivers 78.9% protein purity with minimal gums and instant mixability.",
      ko: "전 세계 판매 1위 표준 유청 프로틴. WPI를 제1원료로 배합해 스쿱당 78.9%의 준수한 단백질 순도와 뛰어난 풀림성을 자랑합니다.",
    },
    pros: {
      en: [
        "78.9% scoop purity with WPI listed as primary ingredient",
        "Informed Choice certified against banned substances",
        "Lean 120 kcal per 24g pure protein (5.0 kcal/g ratio)",
      ],
      ko: [
        "스쿱 중량 대비 78.9%의 높은 순수 단백질 밀도",
        "인폼드초이스(Informed Choice) 도핑 안전 인증",
        "단백질 24g당 120kcal로 군더더기 없는 칼로리 효율",
      ],
    },
    cons: {
      en: [
        "Retail tub prices rose over 25% vs historical averages",
        "Contains trace lactose from secondary WPC fraction",
      ],
      ko: [
        "환율 및 원유가 상승으로 과거 대비 정가 부담 증가",
        "WPC 일부 포함으로 심한 유당불내증은 순수 WPI 권장",
      ],
    },
    thirdPartyTested: "Informed Choice",
    lastChecked: "2026-11-20",
  },
  {
    slug: "dymatize-iso100-hydrolyzed",
    category: "whey-protein",
    brand: { en: "Dymatize", ko: "다이마타이즈 (Dymatize)" },
    name: {
      en: "ISO100 Hydrolyzed 100% Whey Protein Isolate",
      ko: "ISO100 가수분해 분리유청 WPI 프로틴 초코",
    },
    packageLabel: {
      en: "5 lb (2.27 kg) · 76 Servings",
      ko: "2.27kg (5파운드) · 76회분",
    },
    origin: "US",
    totalServings: 76,
    servingWeight: 30,
    activePerServing: 25,
    activeBreakdown: {
      en: "Hydrolyzed Whey Isolate + Whey Protein Isolate (<1g Sugar/Lactose)",
      ko: "가수분해 분리유청(WPH/WPI) + 순수 분리유청 (유당·지방 극소량)",
    },
    caloriesPerServing: 110,
    priceUsd: 96.99,
    priceKrw: 124900,
    amazonQuery: "Dymatize ISO100 Hydrolyzed Protein Powder 5 lb",
    iherbQuery: "Dymatize ISO100 Hydrolyzed 5 lb",
    coupangQuery: "다이마타이즈 ISO100 2.27kg",
    summary: {
      en: "Ultra-fast digesting hydrolyzed whey isolate engineered for strict macros and lactose sensitivity, hitting an elite 83.3% purity and 4.4 kcal/g protein.",
      ko: "유당과 지방을 극한으로 걸러낸 프리미엄 가수분해 WPI. 30g 스쿱 중 25g이 순수 단백질(순도 83.3%)이며 110kcal 초저열량을 구현합니다.",
    },
    pros: {
      en: [
        "Elite 83.3% active protein purity (only 5g flavoring/minerals per scoop)",
        "Ultra-lean 4.40 kcal per gram of protein—ideal for cutting",
        "Virtually lactose-free digestion with Informed Choice testing",
      ],
      ko: [
        "83.3% 최상급 순도 (부형제·코코아분말 합산 단 5g)",
        "단백질 1g당 4.4kcal로 다이어트 커팅기 최고 효율",
        "유당 정제로 속 불편함이 거의 없는 빠른 흡수력",
      ],
    },
    cons: {
      en: [
        "Premium sticker price compared to standard WPC blends",
        "Thinner mouthfeel than creamer-loaded dessert shakes",
      ],
      ko: [
        "일반 WPC 대비 높은 통당 구매 가격",
        "크리머가 없어 묵직한 밀크쉐이크 식감보다는 깔끔한 편",
      ],
    },
    thirdPartyTested: "Informed Choice",
    lastChecked: "2026-11-20",
  },
  {
    slug: "myprotein-impact-whey",
    category: "whey-protein",
    brand: { en: "Myprotein", ko: "마이프로틴 (Myprotein)" },
    name: {
      en: "Impact Whey Protein Natural Chocolate",
      ko: "임팩트 웨이 프로틴 내추럴 초콜릿",
    },
    packageLabel: {
      en: "5.5 lb (2.5 kg) · 100 Servings",
      ko: "2.5kg 대용량 파우치 · 100회분",
    },
    origin: "UK",
    totalServings: 100,
    servingWeight: 25,
    activePerServing: 20,
    activeBreakdown: {
      en: "100% Whey Protein Concentrate (4.5g BCAA)",
      ko: "농축유청단백(WPC) 단일원료 (BCAA 4.5g)",
    },
    caloriesPerServing: 103,
    priceUsd: 69.99,
    priceKrw: 74900,
    amazonQuery: "Myprotein Impact Whey Protein 5.5 lb",
    iherbQuery: "Myprotein Impact Whey Protein",
    coupangQuery: "마이프로틴 임팩트 웨이 프로틴 2.5kg",
    summary: {
      en: "No-frills pouch packaging passes savings straight to pure protein gram cost. At 80.0% purity across 100 scoops, it dominates bulk value leaderboards.",
      ko: "플라스틱 통 대신 대용량 파우치 포장으로 단가를 낮춘 가성비 대명사. 25g 스쿱당 20g 단백질(순도 80.0%)로 10g당 단가 최상위권을 기록합니다.",
    },
    pros: {
      en: [
        "Outstanding cost per 10g pure protein in 2.5kg bulk bag",
        "Solid 80.0% protein-to-scoop purity without heavy thickeners",
        "Labdoor Grade A tested batch history",
      ],
      ko: [
        "2.5kg 대용량 기준 순수 단백질 10g당 압도적 가성비",
        "스쿱 대비 순도 80.0%로 불필요한 증점제 최소화",
        "100회분 구성으로 30일 일일 유지비 매우 저렴",
      ],
    },
    cons: {
      en: [
        "Resealable pouch zipper can trap powder and be finicky",
        "Standard WPC contains natural dairy lactose",
      ],
      ko: [
        "지퍼백 밀폐력이 플라스틱 용기보다 불편하다는 평",
        "농축유청(WPC) 특성상 유당 민감자는 주의 필요",
      ],
    },
    thirdPartyTested: "Labdoor A",
    lastChecked: "2026-11-20",
  },
  {
    slug: "myprotein-impact-whey-isolate",
    category: "whey-protein",
    brand: { en: "Myprotein", ko: "마이프로틴 (Myprotein)" },
    name: {
      en: "Impact Whey Isolate Chocolate Smooth",
      ko: "임팩트 웨이 아이솔레이트 (WPI) 초콜릿 스무스",
    },
    packageLabel: {
      en: "5.5 lb (2.5 kg) · 100 Servings",
      ko: "2.5kg 파우치 · 100회분",
    },
    origin: "UK",
    totalServings: 100,
    servingWeight: 25,
    activePerServing: 22,
    activeBreakdown: {
      en: "Cross-Flow Microfiltered Whey Protein Isolate (88% Purity)",
      ko: "미세여과 분리유청단백 WPI 100% (순도 88%)",
    },
    caloriesPerServing: 93,
    priceUsd: 89.99,
    priceKrw: 96900,
    amazonQuery: "Myprotein Impact Whey Isolate 5.5 lb",
    iherbQuery: "Myprotein Impact Whey Isolate",
    coupangQuery: "마이프로틴 임팩트 웨이 아이솔레이트 2.5kg",
    summary: {
      en: "Achieves a staggering 88.0% flavored purity (22g protein in a tiny 25g scoop) at only 93 calories, delivering arguably the best WPI pure-gram value globally.",
      ko: "초코맛 기준 25g 스쿱에 순수 단백질 22g을 담아 무려 88.0% 순도와 93kcal를 달성한 고순도 가성비 WPI 끝판왕입니다.",
    },
    pros: {
      en: [
        "Category-leading 88.0% purity and 4.23 kcal/g lean efficiency",
        "2,200g total pure protein packed inside one 2.5kg bag",
        "Significantly cheaper per 10g WPI than bottled US brands",
      ],
      ko: [
        "카테고리 최상위 88.0% 순도 및 1g당 4.23kcal 초저열량",
        "한 포대에 순수 단백질만 무려 2,200g 함유",
        "유당 제거 WPI 중 순수그램당 단가 최상위 경쟁력",
      ],
    },
    cons: {
      en: [
        "Foams slightly right after vigorous shaking",
        "Pouch storage often benefits from transferring to an airtight tub",
      ],
      ko: [
        "쉐이킹 직후 거품이 약간 발생해 30초 안정화 권장",
        "소분 용기에 덜어 쓰는 것이 보관상 편리함",
      ],
    },
    thirdPartyTested: "Informed Choice",
    lastChecked: "2026-11-20",
  },
  {
    slug: "bsn-syntha-6",
    category: "whey-protein",
    brand: { en: "BSN", ko: "BSN (비에스엔)" },
    name: {
      en: "Syntha-6 Ultra-Premium Protein Matrix Chocolate Milkshake",
      ko: "신타6 울트라 프리미엄 프로틴 초콜릿 밀크쉐이크",
    },
    packageLabel: {
      en: "5 lb (2.27 kg) · 48 Servings",
      ko: "2.27kg (5파운드) · 48회분",
    },
    origin: "US",
    totalServings: 48,
    servingWeight: 47,
    activePerServing: 22,
    activeBreakdown: {
      en: "6-Source Blend: WPC, WPI, Calcium Caseinate, Micellar Casein, Milk Isolate, Egg",
      ko: "6중 복합단백 (농축유청·분리유청·카제인·밀크아이솔레이트·난백)",
    },
    caloriesPerServing: 200,
    priceUsd: 64.99,
    priceKrw: 76500,
    amazonQuery: "BSN Syntha-6 Protein Powder 5 lb Chocolate",
    iherbQuery: "BSN Syntha 6 5 lb",
    coupangQuery: "BSN 신타6 초콜릿 밀크쉐이크 2.27kg",
    summary: {
      en: "Famous milkshake taste, but PureGram's audit reveals why: a 47g scoop holds only 22g protein (46.8% purity) and 25g carbs/fats/creamer, leaving only 48 scoops in a 5 lb tub.",
      ko: "압도적인 밀크쉐이크 맛으로 유명하지만 순도 분석 결과 47g 대형 스쿱 중 단백질은 22g(순도 46.8%)이며 나머지 53.2%는 크리머·탄수화물·지방입니다.",
    },
    pros: {
      en: [
        "Unbeatable gourmet milkshake flavor and creamy texture",
        "Sustained-release whey + casein + egg blend suits meal replacement",
      ],
      ko: [
        "시중 프로틴 중 독보적인 카페 밀크쉐이크급 풍미",
        "유청+카제인 복합 배합으로 포만감 및 식사대용에 적합",
      ],
    },
    cons: {
      en: [
        "High 53.2% non-protein filler/carb/lipid weight ('Filler Tax' alert)",
        "200 kcal per 22g protein (9.09 kcal/g) and only 48 servings per 5 lb tub",
      ],
      ko: [
        "부형제·당·지방 비중이 53.2%로 같은 2.27kg 통인데도 48회분에 불과",
        "단백질 22g 섭취 시 200kcal를 함께 먹게 되어 다이어트 시 불리",
      ],
    },
    lastChecked: "2026-11-20",
  },
  {
    slug: "kirkland-signature-whey",
    category: "whey-protein",
    brand: { en: "Kirkland Signature", ko: "커클랜드 시그니처 (코스트코)" },
    name: {
      en: "Creamy Chocolate 100% Whey Protein",
      ko: "크리미 초콜릿 유청 프로틴 파우더",
    },
    packageLabel: {
      en: "5.4 lb (2.45 kg) · 70 Servings",
      ko: "2.45kg 대용량 · 70회분",
    },
    origin: "US",
    totalServings: 70,
    servingWeight: 35,
    activePerServing: 25,
    activeBreakdown: {
      en: "Whey Protein Isolate + Whey Protein Concentrate (5.6g BCAA)",
      ko: "분리유청단백(WPI) + 농축유청단백(WPC) 블렌드",
    },
    caloriesPerServing: 130,
    priceUsd: 54.99,
    priceKrw: 69900,
    amazonQuery: "Kirkland Signature Creamy Chocolate Whey Protein 5.4 lb",
    iherbQuery: "Whey Protein Isolate Concentrate 5 lb",
    coupangQuery: "커클랜드 시그니처 웨이 프로틴 2.45kg",
    summary: {
      en: "Costco's powerhouse entry disrupts the whey index with 1,750g of total pure protein for ~$55, crushing brand-name competitors on true cost per 10g protein.",
      ko: "코스트코 PB 커클랜드의 가성비 괴물 유청 프로틴. 1회 25g 단백질(순도 71.4%)을 70회분 제공하여 순수 단백질 10g당 가격 파괴를 이뤘습니다.",
    },
    pros: {
      en: [
        "Industry-low cost per 10g pure protein among major US retail brands",
        "Generous 25g pure protein per scoop at only 130 kcal",
        "USP / third-party quality standards typical of Kirkland Signature",
      ],
      ko: [
        "순수 단백질 총 1,750g 대비 압도적으로 저렴한 실구매가",
        "1스쿱당 단백질 25g · 130kcal의 균형 잡힌 영양 설계",
        "호불호 적은 부드러운 밀크초코 풍미",
      ],
    },
    cons: {
      en: [
        "Limited flavor selection (primarily Creamy Chocolate)",
        "71.4% purity leaves 10g cocoa/gum/carb base per 35g scoop",
      ],
      ko: [
        "초콜릿 단일 맛 위주라 다양한 맛 선택지가 부족함",
        "온라인 리셀 구매 시 매장가보다 소폭 프리미엄 발생 가능",
      ],
    },
    lastChecked: "2026-11-20",
  },
  {
    slug: "selex-core-protein-pro",
    category: "whey-protein",
    brand: { en: "Maeil Selex", ko: "매일유업 셀렉스" },
    name: {
      en: "Selex Core Protein Pro Powder Double Pack",
      ko: "셀렉스 코어프로틴 프로 파우더 더블기획",
    },
    packageLabel: {
      en: "1.216 kg (608g × 2 Cans) · 32 Servings",
      ko: "608g × 2캔 (1,216g) · 32회분",
    },
    origin: "KR",
    totalServings: 32,
    servingWeight: 38,
    activePerServing: 20,
    activeBreakdown: {
      en: "Hydrolyzed Low-Molecular Whey + Isolated Soy + Milk Protein + Leucine",
      ko: "저분자 가수분해유청단백 + 분리대두단백 + 분리우유단백 (류신 강화)",
    },
    caloriesPerServing: 140,
    priceUsd: 42.99,
    priceKrw: 46900,
    amazonQuery: "Korean Hydrolyzed Whey Protein Powder Selex",
    iherbQuery: "Hydrolyzed Whey Protein Powder",
    coupangQuery: "셀렉스 코어프로틴 프로 608g 2개",
    summary: {
      en: "Korea's #1 adult & family daily protein formula featuring patented low-molecular hydrolyzed protein plus calcium, vitamin D, and leucine—built for gentle digestion over raw isolate purity.",
      ko: "대한민국 대표 건강기능식품 단백질. 저분자 가수분해 단백질과 류신·칼슘·비타민D를 배합해 소화 흡수력을 높였으나 순수 단백질 밀도는 52.6%입니다.",
    },
    pros: {
      en: [
        "Gentle hydrolyzed formula fortified with leucine, calcium & vitamin D",
        "Mild savory grain-milk taste beloved by Korean parents and beginners",
      ],
      ko: [
        "저분자 가수분해 공법으로 중장년층·입문자도 속이 편안함",
        "칼슘·마그네슘·비타민D까지 함께 챙기는 올인원 설계",
      ],
    },
    cons: {
      en: [
        "52.6% protein purity due to added vitamins, minerals, and savory base",
        "Higher cost per 10g pure protein than dedicated sports whey tubs",
      ],
      ko: [
        "비타민·미네랄·부원료 비중으로 순수 단백질 순도는 52.6%",
        "헬스 전용 대용량 포대 대비 순수 단백질 10g당 단가는 높은 편",
      ],
    },
    thirdPartyTested: "MFDS Health Functional Food (식약처 건기식)",
    lastChecked: "2026-11-20",
  },
  {
    slug: "calobye-perfect-power-shake",
    category: "whey-protein",
    brand: { en: "Calobye", ko: "칼로바이 (Calobye)" },
    name: {
      en: "Perfect Power Shake WPC/WPI Chocolate",
      ko: "퍼펙트 파워쉐이크 대용량 초코맛 2kg",
    },
    packageLabel: {
      en: "4.4 lb (2.0 kg) · 45 Servings",
      ko: "2kg 대용량 통 · 45회분",
    },
    origin: "KR",
    totalServings: 45,
    servingWeight: 44,
    activePerServing: 27,
    activeBreakdown: {
      en: "Whey Protein Concentrate (WPC) + Whey Protein Isolate (WPI)",
      ko: "농축유청단백(WPC) + 분리유청단백(WPI) 배합",
    },
    caloriesPerServing: 165,
    priceUsd: 49.99,
    priceKrw: 58900,
    amazonQuery: "Chocolate Whey Protein Concentrate Isolate 4.4 lb",
    iherbQuery: "Chocolate Whey Protein Powder",
    coupangQuery: "칼로바이 퍼펙트 파워쉐이크 초코맛 2kg",
    summary: {
      en: "Domestic Korean fitness bestseller delivering fast domestic shipping and sweet chocolate milk taste with 27g protein per 44g serving (61.4% purity).",
      ko: "빠른 국내 로켓배송과 달콤한 초코우유 맛으로 인기 높은 국내 대표 헬스 보충제. 1회 44g 중 단백질 27g(순도 61.4%)을 제공합니다.",
    },
    pros: {
      en: [
        "High 27g protein hit per serving with next-day Korean delivery",
        "Approachable sweet cocoa flavor without artificial aftertaste",
      ],
      ko: [
        "통관 대기 없이 당일·익일 수령 가능한 국내 대용량 보충제",
        "1회 27g의 넉넉한 단백질 함량과 달콤한 초코우유 맛",
      ],
    },
    cons: {
      en: [
        "61.4% purity trails imported 80%+ unblended isolates",
        "165 kcal per serving reflects added cocoa and carbohydrate base",
      ],
      ko: [
        "순도 61.4%로 해외 고순도 WPI/WPC(80% 내외) 대비 부원료 비중 존재",
        "1회 165kcal로 초저열량 커팅용보다는 벌크·일상 운동용에 적합",
      ],
    },
    thirdPartyTested: "HACCP Korea",
    lastChecked: "2026-11-20",
  },

  // ======================== 2. PLANT / VEGAN PROTEIN (8) ========================
  {
    slug: "orgain-organic-protein",
    category: "plant-protein",
    brand: { en: "Orgain", ko: "올게인 (Orgain)" },
    name: {
      en: "Organic Plant Based Protein Powder Creamy Chocolate Fudge",
      ko: "오가닉 식물성 프로틴 파우더 크리미 초콜릿 퍼지",
    },
    packageLabel: {
      en: "2.74 lb (1.24 kg) · 27 Servings",
      ko: "1.24kg · 27회분",
    },
    origin: "US",
    totalServings: 27,
    servingWeight: 46,
    activePerServing: 21,
    activeBreakdown: {
      en: "USDA Organic Pea + Organic Brown Rice + Organic Chia Seed",
      ko: "USDA 유기농 완두콩 + 유기농 현미 + 치아씨드 복합 식물성 단백",
    },
    caloriesPerServing: 150,
    priceUsd: 34.99,
    priceKrw: 44900,
    amazonQuery: "Orgain Organic Vegan Protein Powder 2.74 lb Chocolate",
    iherbQuery: "Orgain Organic Protein Powder 1.24 kg",
    coupangQuery: "올게인 오가닉 프로틴 초콜릿 1.24kg",
    summary: {
      en: "America's #1 selling organic vegan shake tastes remarkably smooth, though its organic erythritol/creamier base means a 46g two-scoop serving yields 21g protein (45.7% purity).",
      ko: "북미 판매 1위 유기농 비건 프로틴. 특유의 텁텁함을 잡았으나 유기농 크리머·에리스리톨 부원료 때문에 46g 섭취 시 단백질은 21g(순도 45.7%)입니다.",
    },
    pros: {
      en: [
        "USDA Certified Organic, Soy-Free, Dairy-Free, Non-GMO",
        "Smooth texture that masks typical earthy pea protein bitterness",
      ],
      ko: [
        "USDA 유기농 인증 및 대두·유제품 무첨가 클린 레시피",
        "식물성 특유의 비린맛이 적고 부드러운 초코 풍미",
      ],
    },
    cons: {
      en: [
        "45.7% protein-by-weight purity requires large 46g double scoops",
        "Only 27 servings per tub increases 30-day replenishment frequency",
      ],
      ko: [
        "1회 46g 중 순수 단백질이 21g(순도 45.7%)으로 부원료 비중이 큼",
        "한 통 27회분이라 매일 섭취 시 한 달이 채 안 되어 소진됨",
      ],
    },
    thirdPartyTested: "USDA Organic",
    lastChecked: "2026-11-20",
  },
  {
    slug: "vega-sport-premium-protein",
    category: "plant-protein",
    brand: { en: "Vega Sport", ko: "베가 스포츠 (Vega)" },
    name: {
      en: "Premium Vegan Protein Chocolate (NSF Certified)",
      ko: "프리미엄 비건 스포츠 프로틴 초콜릿 (NSF 인증)",
    },
    packageLabel: {
      en: "4.1 lb (1.86 kg) · 45 Servings",
      ko: "1.86kg 대용량 · 45회분",
    },
    origin: "CA",
    totalServings: 45,
    servingWeight: 41,
    activePerServing: 30,
    activeBreakdown: {
      en: "Pea Protein + Pumpkin Seed + Organic Sunflower Seed + Alfalfa + Tart Cherry",
      ko: "완두단백 + 호박씨 + 해바라기씨 + 알팔파 + 타트체리 회복 포뮬러",
    },
    caloriesPerServing: 170,
    priceUsd: 79.99,
    priceKrw: 99000,
    amazonQuery: "Vega Sport Premium Vegan Protein Powder 4.1 lb",
    iherbQuery: "Vega Sport Premium Protein Chocolate",
    coupangQuery: "베가 스포츠 프리미엄 비건 프로틴",
    summary: {
      en: "Built for serious plant-based athletes: packs 30g complete protein into a 41g scoop (73.2% purity—exceptionally high for flavored vegan blends) with NSF Certified for Sport assurance.",
      ko: "비건 엘리트 선수용 고함량 프로틴. 가미형 식물성임에도 41g 스쿱당 무려 30g 단백질(순도 73.2%)과 타트체리를 담았으며 NSF 스포츠 인증을 획득했습니다.",
    },
    pros: {
      en: [
        "73.2% purity with a massive 30g protein and 5g BCAA per scoop",
        "NSF Certified for Sport—trusted by olympic and pro athletes",
        "Includes tart cherry powder for post-training recovery",
      ],
      ko: [
        "맛 첨가 비건 프로틴 중 드문 73.2% 고순도 및 1회 30g 고단백",
        "NSF Certified for Sport 획득으로 완벽한 중금속·도핑 검증",
        "타트체리 추출물 배합으로 운동 후 리커버리 지원",
      ],
    },
    cons: {
      en: [
        "Premium price per tub pushes up upfront outlay",
        "Noticeable stevia sweetness if mixed with too little water",
      ],
      ko: [
        "프리미엄 원료와 인증 비용으로 통당 가격대가 높음",
        "스테비아 단맛이 진해 물 정량 이상 희석 권장",
      ],
    },
    thirdPartyTested: "NSF Certified for Sport",
    lastChecked: "2026-11-20",
  },
  {
    slug: "naked-pea-protein-isolate",
    category: "plant-protein",
    brand: { en: "Naked Nutrition", ko: "네이키드 뉴트리션 (Naked)" },
    name: {
      en: "Naked Pea 100% Unflavored Pea Protein Isolate",
      ko: "네이키드 피 100% 무첨가 분리완두단백 파우더",
    },
    packageLabel: {
      en: "5 lb (2.27 kg) · 76 Servings",
      ko: "2.27kg (5파운드) · 76회분",
    },
    origin: "US",
    totalServings: 76,
    servingWeight: 30,
    activePerServing: 27,
    activeBreakdown: {
      en: "Single Ingredient: 100% Yellow Split Pea Protein Isolate (North American Farms)",
      ko: "단일 원료 100%: 북미산 노란 완두콩 분리단백 (향료·감미료 0%)",
    },
    caloriesPerServing: 120,
    priceUsd: 57.99,
    priceKrw: 76000,
    amazonQuery: "Naked Pea Protein Powder Unflavored 5 lb",
    iherbQuery: "Pea Protein Isolate Unflavored 5 lb",
    coupangQuery: "네이키드 피 프로틴 분리완두단백 2.27kg",
    summary: {
      en: "Zero sweeteners, zero gums, single ingredient. Delivers a ferocious 90.0% purity (27g protein per 30g scoop) and independent heavy-metal testing at rock-bottom cost per 10g.",
      ko: "인공향료·감미료 0% 단일 원료 분리완두단백. 30g 중 무려 27g이 순수 단백질(순도 90.0%!)이며 비건 프로틴 순수그램 가성비 최상위권을 차지합니다.",
    },
    pros: {
      en: [
        "Phenomenal 90.0% active protein purity—zero filler tax",
        "2,052g pure plant protein per tub crushes flavored competitors on price",
        "Independent third-party heavy metal testing published",
      ],
      ko: [
        "90.0% 초고순도 달성 — 부형제 거품(Filler Tax) 제로 수준",
        "한 통에 순수 단백질만 2,052g 들어 있어 압도적인 10g당 가성비",
        "독립 연구소 중금속 검사 완료 클린 라벨",
      ],
    },
    cons: {
      en: [
        "Raw unflavored yellow pea taste requires blending into smoothies",
        "Naturally chalkier mouthfeel when shaken with plain water alone",
      ],
      ko: [
        "무맛 원물 그대로라 맹물에 타면 콩물·곡물 맛이 강함",
        "바나나·두유·코코아가루와 블렌딩해 마시는 것을 권장",
      ],
    },
    thirdPartyTested: "3rd-Party Heavy Metal Tested",
    lastChecked: "2026-11-20",
  },
  {
    slug: "ghost-vegan-protein",
    category: "plant-protein",
    brand: { en: "GHOST Lifestyle", ko: "고스트 (GHOST)" },
    name: {
      en: "GHOST Vegan Protein Chocolate Cereal Milk",
      ko: "고스트 비건 프로틴 초콜릿 시리얼 밀크",
    },
    packageLabel: {
      en: "2.1 lb (952 g) · 28 Servings",
      ko: "952g · 28회분",
    },
    origin: "US",
    totalServings: 28,
    servingWeight: 34,
    activePerServing: 20,
    activeBreakdown: {
      en: "Fully Disclosed Label: Pea Concentrate 80% + Organic Pumpkin 70% + Watermelon Seed 75%",
      ko: "100% 함량 투명 공개: 완두단백 + 유기농 호박씨단백 + 수박씨단백",
    },
    caloriesPerServing: 120,
    priceUsd: 44.99,
    priceKrw: 59500,
    amazonQuery: "GHOST Vegan Protein Powder Chocolate Cereal Milk",
    iherbQuery: "Ghost Vegan Protein",
    coupangQuery: "고스트 비건 프로틴 초콜릿",
    summary: {
      en: "Full-disclosure label shows exact gram weights of pea, pumpkin, and watermelon seed proteins, delivering dessert-tier flavor at 58.8% scoop purity and 120 calories.",
      ko: "원료별 단백질 투입량을 라벨에 100% 투명 공개하는 라이프스타일 브랜드. 비건 프로틴 중 손꼽히는 시리얼 밀크 맛과 58.8% 순도를 제공합니다.",
    },
    pros: {
      en: [
        "100% transparent non-proprietary protein sub-source breakdown",
        "Best-in-class flavor & creamy mouthfeel for a dairy-free powder",
      ],
      ko: [
        "완두·호박씨·수박씨 단백질 배합 비율을 그램 단위로 투명 공개",
        "유청 프로틴으로 착각할 만큼 뛰어난 디저트 풍미",
      ],
    },
    cons: {
      en: [
        "High cost per 10g pure protein ($0.80+/10g) due to boutique tub sizing",
        "58.8% purity sits mid-pack behind unflavored isolates",
      ],
      ko: [
        "한 통 총중량이 952g(28회분)으로 순수 단백질 10g당 단가가 비쌈",
        "가성비보다는 맛과 클린 성분 공개를 중시하는 소비자용",
      ],
    },
    lastChecked: "2026-11-20",
  },
  {
    slug: "sunwarrior-warrior-blend",
    category: "plant-protein",
    brand: { en: "Sunwarrior", ko: "선워리어 (Sunwarrior)" },
    name: {
      en: "Organic Warrior Blend Vegan Protein Chocolate",
      ko: "오가닉 워리어 블렌드 식물성 프로틴 초콜릿",
    },
    packageLabel: {
      en: "1.65 lb (750 g) · 30 Servings",
      ko: "750g · 30회분",
    },
    origin: "US",
    totalServings: 30,
    servingWeight: 25,
    activePerServing: 18,
    activeBreakdown: {
      en: "Organic Fermented Pea + Organic Hemp Seed + Organic Goji Berry + MCT",
      ko: "유기농 발효 완두단백 + 유기농 햄프씨드 + 구기자 + 코코넛 MCT",
    },
    caloriesPerServing: 100,
    priceUsd: 39.99,
    priceKrw: 52000,
    amazonQuery: "Sunwarrior Warrior Blend Organic Vegan Protein 750g",
    iherbQuery: "Sunwarrior Warrior Blend Chocolate 750g",
    coupangQuery: "선워리어 워리어 블렌드 프로틴 750g",
    summary: {
      en: "Clean fermented organic pea and hemp formula packs 18g protein into a compact 25g scoop (72.0% purity) with only 100 kcal and zero added sugar.",
      ko: "유기농 발효 완두콩과 햄프씨드를 조합해 25g 스쿱에 18g 단백질(순도 72.0%)과 100kcal를 담아낸 저탄수·케토 친화형 비건 프로틴입니다.",
    },
    pros: {
      en: [
        "Strong 72.0% purity for a flavored USDA Organic vegan protein",
        "Only 100 kcal per scoop with MCT oil and fermented digestibility",
      ],
      ko: [
        "유기농 초코맛 제품임에도 72.0%의 우수한 단백질 순도",
        "발효 완두단백 사용으로 가스 참이 적고 100kcal로 가벼움",
      ],
    },
    cons: {
      en: [
        "Smaller 750g tub holds 540g total protein, raising per-10g price",
        "Earthy hemp note noticeable in plain water",
      ],
      ko: [
        "750g 소용량 통 기준이라 대용량 제품 대비 g당 단가가 높음",
        "햄프씨드 특유의 고소하면서도 쌉쌀한 끝맛 존재",
      ],
    },
    thirdPartyTested: "USDA Organic",
    lastChecked: "2026-11-20",
  },
  {
    slug: "garden-of-life-raw-organic-protein",
    category: "plant-protein",
    brand: { en: "Garden of Life", ko: "가든오브라이프 (Garden of Life)" },
    name: {
      en: "Raw Organic Protein & Greens Sprouted Blend",
      ko: "로우 오가닉 발아 곡물 식물성 프로틴 바닐라",
    },
    packageLabel: {
      en: "1.25 lb (560 g) · 20 Servings",
      ko: "560g · 20회분",
    },
    origin: "US",
    totalServings: 20,
    servingWeight: 28,
    activePerServing: 22,
    activeBreakdown: {
      en: "13 Raw Sprouted Organic Grains/Seeds + Probiotics & Digestive Enzymes",
      ko: "13종 유기농 발아 곡물·씨앗 단백 + 프로바이오틱스 유산균 & 소화효소",
    },
    caloriesPerServing: 110,
    priceUsd: 36.99,
    priceKrw: 48900,
    amazonQuery: "Garden of Life Raw Organic Protein Powder",
    iherbQuery: "Garden of Life Raw Organic Protein",
    coupangQuery: "가든오브라이프 로우 오가닉 프로틴",
    summary: {
      en: "Cold-processed sprouted grains plus live probiotics and enzymes hit an impressive 78.6% purity (22g protein in 28g scoop) with dual USDA Organic + NSF certifications.",
      ko: "비가열(Raw) 발아 유기농 원료와 유산균·소화효소를 함께 담아 스쿱당 78.6% 고순도(28g 중 22g 단백질)와 110kcal를 달성한 프리미엄 클린 프로틴입니다.",
    },
    pros: {
      en: [
        "High 78.6% purity and lean 5.0 kcal/g calorie ratio",
        "Includes 3 billion CFU probiotics and 13 digestive enzymes",
      ],
      ko: [
        "식물성 발아 곡물임에도 78.6%의 높은 순도와 110kcal 저열량",
        "소화효소와 유산균이 포함되어 장이 예민한 분에게 적합",
      ],
    },
    cons: {
      en: [
        "Only 20 servings per tub makes monthly habit cost steep",
        "Grainy raw sprouted texture isn't for dessert-shake fans",
      ],
      ko: [
        "한 통 20회분 소용량이라 순수 단백질 10g당 가격이 높은 편",
        "비가열 곡물 특유의 거친 식감이 있어 스무디 믹서 활용 권장",
      ],
    },
    thirdPartyTested: "USDA Organic · Informed Choice",
    lastChecked: "2026-11-20",
  },
  {
    slug: "myprotein-soy-protein-isolate",
    category: "plant-protein",
    brand: { en: "Myprotein", ko: "마이프로틴 (Myprotein)" },
    name: {
      en: "Soy Protein Isolate 90% Unflavored / Vanilla",
      ko: "소이 프로틴 아이솔레이트 (분리대두단백 SPI) 2.5kg",
    },
    packageLabel: {
      en: "5.5 lb (2.5 kg) · 83 Servings",
      ko: "2.5kg 대용량 · 83회분",
    },
    origin: "UK",
    totalServings: 83,
    servingWeight: 30,
    activePerServing: 27,
    activeBreakdown: {
      en: "Defatted Non-GMO Soy Protein Isolate (90% Pure Protein Content)",
      ko: "탈지 대두 유래 순수 분리대두단백 SPI (단백질 순도 90%)",
    },
    caloriesPerServing: 108,
    priceUsd: 49.99,
    priceKrw: 53900,
    amazonQuery: "Soy Protein Isolate Powder 5 lb",
    iherbQuery: "Soy Protein Isolate Powder",
    coupangQuery: "마이프로틴 소이 프로틴 아이솔레이트 2.5kg",
    summary: {
      en: "The undisputed king of pure protein per dollar across ALL categories: 90.0% purity (27g protein per 30g scoop, 2,241g pure protein per bag) at an ultra-lean 108 calories.",
      ko: "전체 프로틴 카테고리를 통틀어 순수 단백질 1g당 가성비 절대 강자. 30g 스쿱당 27g 단백질(순도 90.0%), 108kcal의 극강 스펙을 자랑합니다.",
    },
    pros: {
      en: [
        "90.0% active protein purity and complete PDCAAS 1.0 amino acid score",
        "Lowest true cost per 10g protein in the entire PureGram database",
        "Ultra-lean 4.0 kcal/g protein—virtually zero fat or sugar",
      ],
      ko: [
        "순도 90.0% 및 아미노산가(PDCAAS 1.0) 완전단백질 달성",
        "순수그램 데이터베이스 전체 최저 수준의 단백질 10g당 가격",
        "유당 0%·지방 극소량으로 유당불내증 및 다이어트에 최적",
      ],
    },
    cons: {
      en: [
        "Thickens rapidly like pudding—requires 350–400ml cold water",
        "Not suitable for shoppers avoiding soy allergens",
      ],
      ko: [
        "점도가 높아 물 350ml 이상 넉넉히 타야 목넘김이 부드러움",
        "대두 알레르기가 있는 경우 완두단백(Pea)으로 대체 필요",
      ],
    },
    lastChecked: "2026-11-20",
  },
  {
    slug: "labnosh-plant-protein-powder",
    category: "plant-protein",
    brand: { en: "Labnosh", ko: "랩노쉬 (Labnosh)" },
    name: {
      en: "Plant Protein Powder Deep Cacao Pouch",
      ko: "식물성 프로틴 파우더 딥카카오 대용량",
    },
    packageLabel: {
      en: "1.76 lb (800 g) · 20 Servings",
      ko: "800g 지퍼백 · 20회분",
    },
    origin: "KR",
    totalServings: 20,
    servingWeight: 40,
    activePerServing: 21,
    activeBreakdown: {
      en: "Isolated Soy Protein + Pea Protein + Dutch Cacao & Grain Crunch",
      ko: "분리대두단백(ISP) + 분리완두단백 + 네덜란드산 카카오 배합",
    },
    caloriesPerServing: 145,
    priceUsd: 26.99,
    priceKrw: 32900,
    amazonQuery: "Korean Cacao Soy Pea Vegan Protein Powder",
    iherbQuery: "Chocolate Soy Pea Vegan Protein",
    coupangQuery: "랩노쉬 식물성 프로틴 파우더 카카오",
    summary: {
      en: "Popular Korean meal-friendly vegan shake blending soy and pea isolates with rich Dutch cacao for easy water mixing at 52.5% scoop purity.",
      ko: "물만 넣어도 진한 초코라떼 맛이 나는 국내 인기 비건 파우더. 맛 구현을 위한 코코아·당알코올 배합으로 순수 단백질 순도는 52.5%(40g 중 21g)입니다.",
    },
    pros: {
      en: [
        "Rich Dutch cacao taste mixes smoothly in cold water without a blender",
        "Affordable entry price with fast Korean rocket shipping",
      ],
      ko: [
        "비건 입문자도 거부감 없이 마시는 진한 네덜란드 카카오 풍미",
        "3만 원대 초반의 부담 없는 진입 가격과 빠른 국내 배송",
      ],
    },
    cons: {
      en: [
        "52.5% protein purity means nearly half the scoop is flavoring/base",
        "20-serving pouch requires frequent restocking for daily lifters",
      ],
      ko: [
        "스쿱당 순도가 52.5%로 무맛 SPI(90%) 대비 부원료 비중이 높음",
        "20회분 구성이라 장기 대량 섭취 시 가성비는 대용량 대비 열세",
      ],
    },
    thirdPartyTested: "HACCP Korea",
    lastChecked: "2026-11-20",
  },
];
