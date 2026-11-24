import { ProductSpec } from "@/lib/types";

export const PERFORMANCE_PRODUCTS: ProductSpec[] = [
  // ======================== 3. CREATINE MONOHYDRATE (8) ========================
  {
    slug: "optimum-micronized-creatine",
    category: "creatine",
    brand: { en: "Optimum Nutrition", ko: "옵티멈뉴트리션 (ON)" },
    name: {
      en: "Micronized Creatine Monohydrate Powder Unflavored",
      ko: "마이크로나이즈드 크레아틴 모노하이드레이트 파우더",
    },
    packageLabel: {
      en: "600 g · 120 Servings",
      ko: "600g 대용량 · 120회분",
    },
    origin: "US",
    totalServings: 120,
    servingWeight: 5,
    activePerServing: 5,
    activeBreakdown: {
      en: "100% Pure Micronized Creatine Monohydrate (Zero Fillers)",
      ko: "100% 순수 미분화 크레아틴 모노하이드레이트 (부형제 0%)",
    },
    caloriesPerServing: 0,
    priceUsd: 32.99,
    priceKrw: 39900,
    amazonQuery: "Optimum Nutrition Micronized Creatine Monohydrate Powder 600g",
    iherbQuery: "Optimum Nutrition Micronized Creatine Powder 600g",
    coupangQuery: "옵티멈뉴트리션 마이크로나이즈드 크레아틴 600g",
    summary: {
      en: "100% label purity across 120 full 5g doses with Informed Choice banned-substance testing—delivering 4 months of daily creatine at pennies per day.",
      ko: "순도 100% 미분화 크레아틴에 인폼드초이스 도핑 인증까지 갖춘 표준 제품. 600g 한 통으로 4개월(120일)간 매일 5g씩 섭취할 수 있습니다.",
    },
    pros: {
      en: [
        "100.0% pure active creatine—zero sugars, acids, or fillers",
        "Informed Choice tested and fine 200-mesh suspension",
        "4 full months of daily 5g dosing in a single tub",
      ],
      ko: [
        "순도 100.0% 단일 성분으로 부형제 거품 완벽 제로",
        "인폼드초이스 인증으로 선수 및 동호인 모두 안심 섭취",
        "120회분 대용량으로 한 달 유지비 약 1만 원 미만",
      ],
    },
    cons: {
      en: [
        "Slightly pricier per 5g than generic 1kg bulk bags",
        "Scoop often settles deep inside powder during transit",
      ],
      ko: [
        "무브랜드 벌크 제품보다는 5g당 단가가 소폭 높음",
        "무맛 분말 특성상 찬물에는 완전히 녹지 않고 부유함",
      ],
    },
    thirdPartyTested: "Informed Choice",
    lastChecked: "2026-11-20",
  },
  {
    slug: "thorne-creatine-nsf",
    category: "creatine",
    brand: { en: "Thorne", ko: "쏜리서치 (Thorne)" },
    name: {
      en: "Thorne Creatine Monohydrate NSF Certified for Sport",
      ko: "쏜리서치 크레아틴 모노하이드레이트 (NSF 스포츠 인증)",
    },
    packageLabel: {
      en: "450 g · 90 Servings",
      ko: "450g · 90회분",
    },
    origin: "US",
    totalServings: 90,
    servingWeight: 5,
    activePerServing: 5,
    activeBreakdown: {
      en: "100% Ultra-Fine Micronized Creatine Monohydrate (NSF Sport Lot-Tested)",
      ko: "100% 초미세 크레아틴 모노하이드레이트 (전 로트 NSF 스포츠 검사)",
    },
    caloriesPerServing: 0,
    priceUsd: 42.0,
    priceKrw: 56000,
    amazonQuery: "Thorne Creatine Monohydrate 90 Servings NSF",
    iherbQuery: "Thorne Creatine 450g",
    coupangQuery: "쏜리서치 크레아틴 450g",
    summary: {
      en: "Clinical gold-standard purity favored by pro sports teams and longevity physicians. Every batch is NSF Certified for Sport with superior water dispersion.",
      ko: "메이저리그·올림픽 선수단과 저속노화 전문가들이 선호하는 클리니컬 등급 크레아틴. 순도 100%에 전 배치 NSF 스포츠 인증 및 최상급 입자도를 갖췄습니다.",
    },
    pros: {
      en: [
        "100.0% purity plus gold-standard NSF Certified for Sport lot testing",
        "Ultra-fine particle size disperses noticeably better than budget powders",
      ],
      ko: [
        "전 생산 로트 NSF Certified for Sport 중금속·불순물 완벽 검증",
        "입자가 매우 고와 물에 섞었을 때 모래알 같은 이물감이 적음",
      ],
    },
    cons: {
      en: [
        "Costs ~2x per 5g compared to Nutricost or BulkSupplements",
      ],
      ko: [
        "가성비 브랜드 대비 5g당 가격이 약 2배 수준으로 프리미엄 포지션",
      ],
    },
    thirdPartyTested: "NSF Certified for Sport",
    lastChecked: "2026-11-20",
  },
  {
    slug: "nutricost-creatine-monohydrate",
    category: "creatine",
    brand: { en: "Nutricost", ko: "뉴트리코스트 (Nutricost)" },
    name: {
      en: "Micronized Creatine Monohydrate Unflavored 500g",
      ko: "마이크로나이즈드 크레아틴 모노하이드레이트 무맛 500g",
    },
    packageLabel: {
      en: "500 g · 100 Servings",
      ko: "500g · 100회분",
    },
    origin: "US",
    totalServings: 100,
    servingWeight: 5,
    activePerServing: 5,
    activeBreakdown: {
      en: "100% Micronized Creatine Monohydrate (200 Mesh, GMP Facility)",
      ko: "100% 200메쉬 미분화 크레아틴 모노하이드레이트 (GMP 시설 제조)",
    },
    caloriesPerServing: 0,
    priceUsd: 21.95,
    priceKrw: 27900,
    amazonQuery: "Nutricost Creatine Monohydrate Micronized Powder 500g",
    iherbQuery: "Nutricost Creatine Monohydrate 500g",
    coupangQuery: "뉴트리코스트 크레아틴 모노하이드레이트 500g",
    summary: {
      en: "Amazon & iHerb bestseller combining rigid plastic tub convenience, 100% pure 200-mesh micronized creatine, and roughly $0.22 per 5g daily serving.",
      ko: "아이허브·쿠팡 직구 가성비 1순위 크레아틴. 단단한 플라스틱 통에 100회분(500g) 순도 100% 크레아틴을 담아 하루 200원대 유지비를 실현합니다.",
    },
    pros: {
      en: [
        "Exceptional ~$0.22 per 5g pure creatine inside a sturdy screw-top tub",
        "100.0% purity, 0 calories, third-party ISO-accredited lab tested",
      ],
      ko: [
        "5g 기준 270원대 압도적 가성비와 튼튼한 원통 용기",
        "200메쉬 미세 분말 및 제3기관 ISO 연구소 순도 테스트 통과",
      ],
    },
    cons: {
      en: [
        "Does not carry athlete banned-substance seals like NSF Sport",
      ],
      ko: [
        "도핑 검사를 받는 엘리트 등록 선수는 NSF/Informed 인증 제품 권장",
      ],
    },
    thirdPartyTested: "ISO Lab Tested",
    lastChecked: "2026-11-20",
  },
  {
    slug: "bulksupplements-creatine-monohydrate",
    category: "creatine",
    brand: { en: "BulkSupplements", ko: "벌크서플리먼트 (BulkSupplements)" },
    name: {
      en: "Pure Micronized Creatine Monohydrate 1kg Bag",
      ko: "순수 마이크로나이즈드 크레아틴 모노하이드레이트 1kg",
    },
    packageLabel: {
      en: "1,000 g (2.2 lb) · 200 Servings",
      ko: "1kg 초대용량 파우치 · 200회분",
    },
    origin: "US",
    totalServings: 200,
    servingWeight: 5,
    activePerServing: 5,
    activeBreakdown: {
      en: "100% Pure Creatine Monohydrate Bulk Pouch",
      ko: "100% 단일 성분 순수 크레아틴 모노하이드레이트 벌크팩",
    },
    caloriesPerServing: 0,
    priceUsd: 31.96,
    priceKrw: 41500,
    amazonQuery: "BulkSupplements Creatine Monohydrate Powder 1kg",
    iherbQuery: "Creatine Monohydrate 1kg",
    coupangQuery: "벌크서플리먼트 크레아틴 1kg",
    summary: {
      en: "200 days of 5g pure creatine in one minimalist foil pouch—setting the absolute floor for true cost per 5g pure creatine (~$0.16 / ₩208).",
      ko: "화려한 통을 없애고 1kg(200일분) 순수 크레아틴만 채운 극단적 가성비 팩. 순수 크레아틴 5g당 약 208원으로 전체 리더보드 최저가를 기록합니다.",
    },
    pros: {
      en: [
        "#1 lowest cost per 5g pure creatine (~$0.16/serving, ~$4.80/month)",
        "100.0% purity with 1,000g net active weight",
      ],
      ko: [
        "크레아틴 카테고리 전체 1위 최저가 (한 달 유지비 약 6,200원)",
        "순도 100.0% · 총 200회분으로 반년 이상 넉넉하게 섭취 가능",
      ],
    },
    cons: {
      en: [
        "No scoop included and foil zipper bag is messy—decant into a jar",
      ],
      ko: [
        "계량 스쿱 미포함 및 파우치 지퍼 밀폐가 불편해 밀폐용기 소분 필수",
      ],
    },
    thirdPartyTested: "NSF GMP Facility",
    lastChecked: "2026-11-20",
  },
  {
    slug: "muscletech-celltech-creatine",
    category: "creatine",
    brand: { en: "MuscleTech", ko: "머슬텍 (MuscleTech)" },
    name: {
      en: "Cell-Tech Creatine Post-Workout Fruit Punch",
      ko: "셀텍 크레아틴 포스트워크아웃 후르츠펀치",
    },
    packageLabel: {
      en: "3 lb (1.36 kg) · 28 Servings",
      ko: "1.36kg (3파운드) · 28회분",
    },
    origin: "US",
    totalServings: 28,
    servingWeight: 49,
    activePerServing: 5,
    activeBreakdown: {
      en: "5g Creatine Monohydrate + 38g Multi-Stage Carbs/Sugars + BCAAs/ALA",
      ko: "크레아틴 5g + 복합 탄수화물·당류 38g + 아미노산·알파리포산",
    },
    caloriesPerServing: 180,
    priceUsd: 34.99,
    priceKrw: 44500,
    amazonQuery: "MuscleTech Cell-Tech Creatine Powder Fruit Punch 3 lb",
    iherbQuery: "MuscleTech Cell Tech Creatine",
    coupangQuery: "머슬텍 셀텍 크레아틴 1.36kg",
    summary: {
      en: "Classic 'insulin-spike' creatine matrix exposed by PureGram math: a massive 3 lb tub holds only 28 servings because 89.8% of every 49g scoop is sugar/carbs & flavoring!",
      ko: "거대한 1.36kg 통이지만 1회 스쿱(49g) 중 크레아틴은 5g(순도 10.2%)뿐이고 나머지 89.8%는 인슐린 부스팅용 탄수화물·당류여서 총 28회분에 불과합니다.",
    },
    pros: {
      en: [
        "Convenient post-workout carb + creatine insulin spike for hardgainers",
        "Sweet fruit punch taste hides chalkiness completely",
      ],
      ko: [
        "운동 직후 빠른 글리코겐 보충이 필요한 마른 체형 벌크업에 유리",
        "상큼한 음료 맛으로 무맛 크레아틴을 못 먹는 분에게 편리",
      ],
    },
    cons: {
      en: [
        "Massive 89.8% non-creatine weight (180 kcal & 15g sugar per 5g creatine)",
        "Over 5x more expensive per 5g creatine than pure unflavored tubs",
      ],
      ko: [
        "부형제·탄수화물 비중 89.8%로 순수 크레아틴 5g당 단가가 5배 이상 비쌈",
        "5g 크레아틴 섭취마다 180kcal를 함께 섭취해 다이어트 시 부적합",
      ],
    },
    lastChecked: "2026-11-20",
  },
  {
    slug: "transparent-labs-creatine-hmb",
    category: "creatine",
    brand: { en: "Transparent Labs", ko: "트랜스페어런트랩스" },
    name: {
      en: "StrengthSeries Creatine HMB Unflavored / Blue Raspberry",
      ko: "스트렝스시리즈 크레아틴 + HMB 복합 파우더",
    },
    packageLabel: {
      en: "297 g · 30 Servings",
      ko: "297g · 30회분",
    },
    origin: "US",
    totalServings: 30,
    servingWeight: 9.9,
    activePerServing: 5,
    activeBreakdown: {
      en: "5g Creatine Monohydrate + 1.5g myHMB + BioPerine + Vitamin D",
      ko: "크레아틴 모노하이드레이트 5g + HMB 1.5g + 바이오페린 + 비타민D",
    },
    caloriesPerServing: 0,
    priceUsd: 49.99,
    priceKrw: 68000,
    amazonQuery: "Transparent Labs Creatine HMB 30 Servings",
    iherbQuery: "Creatine HMB Powder",
    coupangQuery: "트랜스페어런트랩스 크레아틴 HMB",
    summary: {
      en: "Stacks 5g creatine with 1.5g HMB and Vitamin D with Informed Sport certification—clean ingredients, though PureGram shows you pay ~7x more per 5g creatine for the HMB add-on.",
      ko: "크레아틴 5g에 근손실 방지 성분 HMB 1.5g을 결합하고 인공색소를 뺀 프리미엄 스택. 다만 순수 크레아틴 기준으로 환산하면 1회 단가가 매우 높습니다.",
    },
    pros: {
      en: [
        "Combines 5g creatine + 1.5g HMB + Vitamin D with zero artificial dyes",
        "Informed Sport certified with public Certificate of Analysis (CoA)",
      ],
      ko: [
        "크레아틴과 HMB를 한 스쿱에 해결하며 인폼드스포츠 인증 보유",
        "인공 감미료·색소 무첨가 및 로트별 성적서 투명 공개",
      ],
    },
    cons: {
      en: [
        "50.5% creatine-by-weight purity due to HMB & natural flavor system",
        "Steep ~$50/month recurring habit cost for 30 servings",
      ],
      ko: [
        "30회분 약 6만 8천 원으로 한 달 유지비가 순수 크레아틴 대비 7배 이상",
        "크레아틴 순수 가성비만 따지면 단일 모노하이드레이트가 훨씬 경제적",
      ],
    },
    thirdPartyTested: "Informed Sport",
    lastChecked: "2026-11-20",
  },
  {
    slug: "myprotein-creapure-creatine",
    category: "creatine",
    brand: { en: "Myprotein", ko: "마이프로틴 (Myprotein)" },
    name: {
      en: "Creapure® Micronized Creatine Powder (German-Made)",
      ko: "크레아퓨어(Creapure®) 독일산 순수 크레아틴 500g",
    },
    packageLabel: {
      en: "500 g · 100 Servings",
      ko: "500g · 100회분",
    },
    origin: "UK",
    totalServings: 100,
    servingWeight: 5,
    activePerServing: 5,
    activeBreakdown: {
      en: "100% AlzChem Trostberg GmbH German Creapure® (99.99% Assay)",
      ko: "독일 알츠켐(AlzChem) 정품 Creapure® 원료 100% (불순물 극소화)",
    },
    caloriesPerServing: 0,
    priceUsd: 34.99,
    priceKrw: 38900,
    amazonQuery: "Creapure Creatine Monohydrate Powder 500g",
    iherbQuery: "Creapure Creatine Monohydrate",
    coupangQuery: "마이프로틴 크레아퓨어 500g",
    summary: {
      en: "Uses 100% German-manufactured Creapure® (tested free of DCD and DHT synthesis byproducts) at a fraction of boutique supplement brand markups.",
      ko: "전 세계 최고 순도 원료로 꼽히는 독일 알츠켐사의 정품 크레아퓨어(Creapure®) 100% 제품. 원산지 신뢰도와 순수그램 가성비를 동시에 잡았습니다.",
    },
    pros: {
      en: [
        "Genuine German AlzChem Creapure® raw material at accessible pricing",
        "100.0% label purity across 100 full 5g servings",
      ],
      ko: [
        "중국산 원료 우려 없는 100% 독일산 정품 크레아퓨어 원료 사용",
        "순도 100.0% · 100회분 구성으로 월 1만 1천 원대의 합리적 유지비",
      ],
    },
    cons: {
      en: [
        "Frequently sells out during major seasonal sales",
      ],
      ko: [
        "인기 품목이라 할인 시즌 품절이 잦고 파우치 보관이 다소 불편함",
      ],
    },
    thirdPartyTested: "Creapure® Cologne List",
    lastChecked: "2026-11-20",
  },
  {
    slug: "now-sports-creatine-monohydrate",
    category: "creatine",
    brand: { en: "NOW Sports", ko: "나우푸드 스포츠 (NOW)" },
    name: {
      en: "NOW Sports Micronized Creatine Monohydrate Powder",
      ko: "나우 스포츠 마이크로나이즈드 크레아틴 파우더 600g",
    },
    packageLabel: {
      en: "600 g (1.3 lb) · 120 Servings",
      ko: "600g 대용량 통 · 120회분",
    },
    origin: "US",
    totalServings: 120,
    servingWeight: 5,
    activePerServing: 5,
    activeBreakdown: {
      en: "100% Pure Creatine Monohydrate (UL GMP Certified)",
      ko: "100% 순수 미분화 크레아틴 모노하이드레이트 (UL GMP 품질인증)",
    },
    caloriesPerServing: 0,
    priceUsd: 24.99,
    priceKrw: 31900,
    amazonQuery: "NOW Sports Micronized Creatine Monohydrate 600g",
    iherbQuery: "NOW Foods Sports Micronized Creatine 600g",
    coupangQuery: "나우푸드 크레아틴 파우더 600g",
    summary: {
      en: "Trusted family-owned US lab testing meets 600g rigid-tub value—hitting ~$0.21 per 5g pure creatine with zero additives.",
      ko: "반세기 업력의 나우푸드 자체 분석 연구소 검증을 거친 600g 대용량 크레아틴. 통 포장이면서도 5g당 260원대의 탁월한 가성비를 보여줍니다.",
    },
    pros: {
      en: [
        "Top-3 lowest cost per 5g creatine with rigid canister convenience",
        "UL NPA A-rated GMP manufacturing and in-house ICP-MS lab testing",
      ],
      ko: [
        "원통 용기 제품 중 최상위 가성비 (120회분 · 한 달 약 7,900원)",
        "UL GMP A등급 시설 제조 및 엄격한 자체 중금속 품질 검사",
      ],
    },
    cons: {
      en: [
        "Sold by weight without an included plastic scoop (use 1 level tsp = 5g)",
      ],
      ko: [
        "환경 정책상 플라스틱 스쿱이 동봉되지 않아 티스푼(깎아서 1스푼=5g) 사용",
      ],
    },
    thirdPartyTested: "UL GMP Certified",
    lastChecked: "2026-11-20",
  },

  // ======================== 4. OMEGA-3 FISH OIL (8) ========================
  // STRICTLY RANKED BY PURE COMBINED EPA+DHA (mg), NEVER TOTAL FISH OIL!
  {
    slug: "sports-research-triple-strength-omega-3",
    category: "omega-3",
    brand: { en: "Sports Research", ko: "스포츠리서치 (Sports Research)" },
    name: {
      en: "Triple Strength Omega-3 Fish Oil 1250mg (IFOS 5-Star rTG)",
      ko: "트리플 스트렝스 오메가3 rTG 1250mg (150소프트젤)",
    },
    packageLabel: {
      en: "150 Softgels · 150 Servings (1 Softgel/Day)",
      ko: "150캡슐 대용량 · 150일분 (1일 1캡슐)",
    },
    origin: "US",
    totalServings: 150,
    servingWeight: 1250,
    activePerServing: 950,
    activeBreakdown: {
      en: "690mg EPA + 260mg DHA = 950mg Pure EPA+DHA in 1250mg Wild Alaska Pollock rTG Oil",
      ko: "EPA 690mg + DHA 260mg = 순수 EPA+DHA 950mg (알래스카 명태 단일어종 rTG)",
    },
    caloriesPerServing: 15,
    priceUsd: 36.95,
    priceKrw: 46900,
    amazonQuery: "Sports Research Triple Strength Omega 3 Fish Oil 150 Softgels",
    iherbQuery: "Sports Research Omega 3 Fish Oil Triple Strength 150",
    coupangQuery: "스포츠리서치 오메가3 트리플 스트렝스 150정",
    summary: {
      en: "One single softgel packs 950mg pure combined EPA+DHA inside 1,250mg wild Alaska pollock rTG oil (76.0% purity, IFOS 5-Star)—dominating both US and Korean direct-import value charts.",
      ko: "직구 오메가3 부동의 1위. 알래스카 명태 유래 rTG 어유 1,250mg 중 무려 950mg이 순수 EPA+DHA(순도 76.0%)이며, 하루 1알로 끝나 가성비와 편의성 모두 압도적입니다.",
    },
    pros: {
      en: [
        "High 76.0% pure EPA+DHA concentration in bioavailable rTG triglyceride form",
        "IFOS 5-Star + MSC Sustainable Wild Alaska Pollock certified",
        "150-day supply at ~$0.26 per 1000mg pure EPA+DHA",
      ],
      ko: [
        "하루 단 1알로 순수 EPA+DHA 950mg 섭취 완료 (순도 76.0%)",
        "IFOS 최고 등급(5스타) 산패도·중금속 인증 및 rTG 생체이용률",
        "순수 EPA+DHA 1000mg당 약 329원으로 압도적인 장기 가성비",
      ],
    },
    cons: {
      en: [
        "1,250mg softgel is fairly large for pill-sensitive swallowers",
      ],
      ko: [
        "캡슐 크기가 다소 커서 큰 알약을 삼키기 어려운 분은 주의 필요",
      ],
    },
    thirdPartyTested: "IFOS 5-Star · MSC",
    lastChecked: "2026-11-20",
  },
  {
    slug: "nordic-naturals-ultimate-omega",
    category: "omega-3",
    brand: { en: "Nordic Naturals", ko: "노르딕내추럴스 (Nordic Naturals)" },
    name: {
      en: "Ultimate Omega Lemon 1280mg (180 Softgels)",
      ko: "얼티밋 오메가 레몬맛 rTG 오메가3 (180소프트젤)",
    },
    packageLabel: {
      en: "180 Softgels · 90 Servings (2 Softgels/Serving)",
      ko: "180캡슐 · 90회분 (1회 2캡슐)",
    },
    origin: "US",
    totalServings: 90,
    servingWeight: 2000,
    activePerServing: 1100,
    activeBreakdown: {
      en: "650mg EPA + 450mg DHA = 1,100mg Pure EPA+DHA per 2,000mg Fish Oil (rTG)",
      ko: "2캡슐(어유 2000mg) 중 EPA 650mg + DHA 450mg = 순수 EPA+DHA 1,100mg",
    },
    caloriesPerServing: 20,
    priceUsd: 69.95,
    priceKrw: 84900,
    amazonQuery: "Nordic Naturals Ultimate Omega Lemon 180 Softgels",
    iherbQuery: "Nordic Naturals Ultimate Omega 180 Softgels",
    coupangQuery: "노르딕내추럴스 얼티밋 오메가 180정",
    summary: {
      en: "Renowned Norwegian freshness and zero fishy burps, but PureGram's label audit reveals 2 softgels (2,000mg oil) yield 1,100mg pure EPA+DHA (55.0% purity) at nearly 3x the unit cost of value rTG rivals.",
      ko: "신선도와 레몬향 무비린내로 명성이 높지만, 영양성분표 기준 2캡슐(어유 2,000mg) 중 순수 EPA+DHA는 1,100mg(순도 55.0%)이며 1000mg당 단가는 상당히 높습니다.",
    },
    pros: {
      en: [
        "Industry-leading TOTOX oxidation freshness & pleasant natural lemon oil",
        "Re-esterified triglyceride (rTG) form with public batch CoAs",
      ],
      ko: [
        "특유의 레몬 오일 배합으로 어취·트림 시 비린내가 거의 없음",
        "전 제품 로트별 산패도(TOTOX) 성적서를 공개하는 프리미엄 품질",
      ],
    },
    cons: {
      en: [
        "55.0% pure EPA+DHA ratio trails newer 76–85% triple-strength softgels",
        "Premium ~$0.71 per 1000mg pure EPA+DHA requires 2 pills/day",
      ],
      ko: [
        "순도 55.0%로 80%대 초고순도 rTG 대비 캡슐 내 기타 지방 비중 존재",
        "순수 EPA+DHA 1000mg당 약 858원으로 프리미엄 가격대",
      ],
    },
    thirdPartyTested: "Friend of the Sea · CoA",
    lastChecked: "2026-11-20",
  },
  {
    slug: "thorne-super-epa",
    category: "omega-3",
    brand: { en: "Thorne", ko: "쏜리서치 (Thorne)" },
    name: {
      en: "Super EPA Concentrated Fish Oil (NSF Certified)",
      ko: "쏜리서치 슈퍼 EPA 고농축 오메가3 (90캡슐)",
    },
    packageLabel: {
      en: "90 Gelcaps · 90 Servings (1 Gelcap/Serving)",
      ko: "90캡슐 · 90회분 (1캡슐 기준)",
    },
    origin: "US",
    totalServings: 90,
    servingWeight: 1000,
    activePerServing: 695,
    activeBreakdown: {
      en: "425mg EPA + 270mg DHA = 695mg Pure EPA+DHA per 1,000mg Gelcap",
      ko: "1캡슐(어유 1000mg) 중 EPA 425mg + DHA 270mg = 순수 EPA+DHA 695mg",
    },
    caloriesPerServing: 10,
    priceUsd: 43.0,
    priceKrw: 57000,
    amazonQuery: "Thorne Super EPA 90 Gelcaps",
    iherbQuery: "Thorne Super EPA 90",
    coupangQuery: "쏜리서치 슈퍼 EPA 90캡슐",
    summary: {
      en: "High-EPA cardiovascular & athletic recovery formula hitting 69.5% EPA+DHA purity in a manageable 1,000mg gelcap with NSF Certified for Sport pedigree.",
      ko: "혈행 및 운동 염증 케어에 유리한 고함량 EPA 비율과 69.5% 순도를 1,000mg 중형 캡슐에 담아낸 클리니컬 등급 오메가3입니다.",
    },
    pros: {
      en: [
        "Solid 69.5% pure EPA+DHA concentration in a smaller 1,000mg gelcap",
        "Molecular distillation tested for PCBs, dioxins, and mercury",
      ],
      ko: [
        "1000mg 적당한 캡슐 크기에 69.5% 고순도 EPA+DHA 농축",
        "엄격한 분자증류 정제로 중금속·다이옥신 완벽 배제",
      ],
    },
    cons: {
      en: [
        "Higher cost per 1000mg EPA+DHA (~$0.69) than retail IFOS value picks",
      ],
      ko: [
        "순수 EPA+DHA 1000mg당 약 911원으로 가성비보다는 브랜드 신뢰도 중심",
      ],
    },
    thirdPartyTested: "NSF Certified",
    lastChecked: "2026-11-20",
  },
  {
    slug: "carlson-elite-omega-3-gems",
    category: "omega-3",
    brand: { en: "Carlson Labs", ko: "칼슨랩스 (Carlson)" },
    name: {
      en: "Elite Omega-3 Gems Wild Norwegian Lemon 1600mg",
      ko: "엘리트 오메가3 젬스 노르웨이 레몬맛 (120소프트젤)",
    },
    packageLabel: {
      en: "120 Softgels · 60 Servings (2 Softgels/Serving)",
      ko: "120캡슐 · 60회분 (1회 2캡슐)",
    },
    origin: "US",
    totalServings: 60,
    servingWeight: 2500,
    activePerServing: 1400,
    activeBreakdown: {
      en: "800mg EPA + 600mg DHA = 1,400mg Pure EPA+DHA per 2,500mg Fish Oil",
      ko: "2캡슐(어유 2500mg) 중 EPA 800mg + DHA 600mg = 순수 EPA+DHA 1,400mg",
    },
    caloriesPerServing: 25,
    priceUsd: 47.9,
    priceKrw: 61900,
    amazonQuery: "Carlson Elite Omega-3 Gems 120 Softgels",
    iherbQuery: "Carlson Labs Elite Omega-3 Gems",
    coupangQuery: "칼슨랩스 엘리트 오메가3 120정",
    summary: {
      en: "IFOS 5-Star Norwegian cold-water fish oil delivering a hefty 1,400mg pure EPA+DHA per 2-gel serving (56.0% purity) at mid-tier cost per active gram.",
      ko: "IFOS 5스타 인증 노르웨이 심해 어유를 사용해 2캡슐당 1,400mg의 고함량 EPA+DHA(순도 56.0%)를 공급하는 전통의 프리미엄 오메가3입니다.",
    },
    pros: {
      en: [
        "Potent 1,400mg combined EPA+DHA dose with IFOS 5-Star verification",
        "Nitrogen-flushed bottling minimizes lipid oxidation",
      ],
      ko: [
        "IFOS 5스타 인증 및 질소 충전 공정으로 뛰어난 산패 안전성",
        "1회 1,400mg의 넉넉한 순수 EPA+DHA 섭취 가능",
      ],
    },
    cons: {
      en: [
        "56.0% purity means 1,100mg of non-EPA/DHA lipids per 2-softgel dose",
      ],
      ko: [
        "순도 56.0%로 85%급 초고순도 제품 대비 캡슐 총섭취량이 많음",
      ],
    },
    thirdPartyTested: "IFOS 5-Star · IGEN",
    lastChecked: "2026-11-20",
  },
  {
    slug: "viva-naturals-triple-strength-omega-3",
    category: "omega-3",
    brand: { en: "Viva Naturals", ko: "비바내추럴스 (Viva Naturals)" },
    name: {
      en: "Triple-Strength rTG Omega-3 Fish Oil 2,200mg",
      ko: "트리플 스트렝스 초임계 rTG 오메가3 (90소프트젤)",
    },
    packageLabel: {
      en: "90 Softgels · 45 Servings (2 Softgels/Serving)",
      ko: "90캡슐 · 45회분 (2캡슐 기준 초고함량)",
    },
    origin: "US",
    totalServings: 45,
    servingWeight: 2200,
    activePerServing: 1880,
    activeBreakdown: {
      en: "1,400mg EPA + 480mg DHA = 1,880mg Pure EPA+DHA in 2,200mg Oil (85.5% Purity!)",
      ko: "어유 2,200mg 중 EPA 1,400mg + DHA 480mg = 순수 EPA+DHA 1,880mg (순도 85.5%!)",
    },
    caloriesPerServing: 20,
    priceUsd: 35.99,
    priceKrw: 45900,
    amazonQuery: "Viva Naturals Triple Strength Omega 3 Fish Oil 90 Softgels",
    iherbQuery: "Triple Strength rTG Omega 3 90 Softgels",
    coupangQuery: "비바내추럴스 트리플 스트렝스 오메가3 90정",
    summary: {
      en: "Supercritical CO2 extraction achieves an astonishing 85.5% pure EPA+DHA concentration (1,880mg active out of 2,200mg oil!) with IFOS 5-Star testing—minimal filler oil waste.",
      ko: "초임계 추출 rTG 공법으로 어유 2,200mg 중 무려 1,880mg을 순수 EPA+DHA로 채운 85.5% 초고순도 괴물 스펙. 불필요한 기름 섭취를 극소화합니다.",
    },
    pros: {
      en: [
        "#1 Highest Omega-3 Purity in our index at 85.5% pure EPA+DHA",
        "Supercritical extraction + IFOS 5-Star + Labdoor top tier",
        "Can take just 1 softgel/day (940mg EPA+DHA) to stretch tub to 90 days!",
      ],
      ko: [
        "오메가3 카테고리 1위 85.5% 압도적 순도 (불필요 지방 단 14.5%)",
        "하루 1알만 먹어도 순수 EPA+DHA 940mg 충족 가능해 90일분 활용 가능",
        "초임계 추출 + IFOS 5스타 인증으로 순도·가성비 동시 석권",
      ],
    },
    cons: {
      en: [
        "Bottle smell can be slightly marine in warm climates if unrefrigerated",
      ],
      ko: [
        "여름철 상온 보관 시 캡슐 연질화가 있을 수 있어 냉장·서늘한 보관 권장",
      ],
    },
    thirdPartyTested: "IFOS 5-Star · Labdoor",
    lastChecked: "2026-11-20",
  },
  {
    slug: "kirkland-signature-fish-oil-1000",
    category: "omega-3",
    brand: { en: "Kirkland Signature", ko: "커클랜드 시그니처 (코스트코)" },
    name: {
      en: "Fish Oil 1000mg Standard Concentrate (400 Softgels)",
      ko: "피쉬오일 1000mg 대용량 오메가3 (400소프트젤)",
    },
    packageLabel: {
      en: "400 Softgels · 400 Servings (1 Softgel/Serving)",
      ko: "400캡슐 초대용량 · 400회분 (1캡슐 기준)",
    },
    origin: "US",
    totalServings: 400,
    servingWeight: 1000,
    activePerServing: 250,
    activeBreakdown: {
      en: "250mg Combined EPA+DHA inside 1,000mg Fish Oil (75% Non-Active Lipids!)",
      ko: "어유 1,000mg 중 순수 EPA+DHA 합산 단 250mg (나머지 750mg은 일반 어유 지방!)",
    },
    caloriesPerServing: 10,
    priceUsd: 14.99,
    priceKrw: 21900,
    amazonQuery: "Kirkland Signature Fish Oil 1000mg 400 Softgels",
    iherbQuery: "Fish Oil 1000mg 400 Softgels",
    coupangQuery: "커클랜드 피쉬오일 1000mg 400정",
    summary: {
      en: "Case study #1 in PureGram's Omega-3 Filler Tax! Cheap per 1000mg EPA+DHA on paper (~$0.15), YET only 25.0% pure—meaning you must swallow FOUR giant pills (3,000mg useless fat!) to get 1,000mg EPA+DHA.",
      ko: "오메가3 '총중량 착시'의 대표 사례! 가격은 매우 저렴하지만 어유 1,000mg 중 실제 오메가3(EPA+DHA)는 250mg(순도 25.0%)뿐이라 1,000mg을 채우려면 큰 알약 4알과 불필요한 기름 3,000mg을 삼켜야 합니다.",
    },
    pros: {
      en: [
        "USP Verified quality at rock-bottom ~$0.15 per 1000mg EPA+DHA",
        "Massive 400-count bottle sits under $15 at warehouse clubs",
      ],
      ko: [
        "USP 미국약전 인증 보유 및 순수 EPA+DHA 1000mg당 단가 자체는 최저가",
        "2만 원대 초반의 매우 저렴한 통당 구매 가격",
      ],
    },
    cons: {
      en: [
        "SEVERE 75.0% Filler Oil Tax—only 25.0% pure EPA+DHA concentration!",
        "Requires 4 softgels (40 kcal oil) daily to match 1 triple-strength rTG pill",
      ],
      ko: [
        "치명적 저순도(25.0%): 캡슐 내용물의 75%가 유효성분 외 일반 기름!",
        "하루 권장량 1,000mg 섭취 시 매일 4알씩 먹어야 하고 흡수율 낮은 EE형",
      ],
    },
    thirdPartyTested: "USP Verified",
    lastChecked: "2026-11-20",
  },
  {
    slug: "ckd-promega-rtg-omega-3",
    category: "omega-3",
    brand: { en: "Chong Kun Dang Health", ko: "종근당건강 프로메가" },
    name: {
      en: "Promega rTG Omega-3 Dual Enteric Mini Capsules (3-Box)",
      ko: "프로메가 알티지 오메가3 듀얼 장용성 (60캡슐 × 3박스)",
    },
    packageLabel: {
      en: "180 Enteric Capsules · 90 Servings (2 Small Caps/Day)",
      ko: "180캡슐 (3개월분) · 90회분 (1일 2소형캡슐)",
    },
    origin: "KR",
    totalServings: 90,
    servingWeight: 1040,
    activePerServing: 600,
    activeBreakdown: {
      en: "600mg Pure EPA+DHA + Vitamin E inside 1,040mg Enteric rTG Oil",
      ko: "장용성 2소형캡슐(1,040mg) 중 순수 EPA+DHA 600mg + 비타민E",
    },
    caloriesPerServing: 10,
    priceUsd: 31.99,
    priceKrw: 36900,
    amazonQuery: "Korean Enteric rTG Omega 3 Mini Softgels",
    iherbQuery: "Enteric Coated rTG Omega 3",
    coupangQuery: "종근당건강 프로메가 알티지 오메가3 듀얼 3박스",
    summary: {
      en: "Korea's #1 pharmacy & Coupang domestic Omega-3 featuring enteric-coated mini rTG capsules that dissolve in the intestine (zero fishy burps) at 57.7% purity.",
      ko: "대한민국 판매 1위 국민 오메가3. 위에서 녹지 않고 장에서 녹는 장용성 소형 rTG 캡슐로 어취와 목넘김 부담을 없앴으며 순도는 57.7%(1,040mg 중 600mg)입니다.",
    },
    pros: {
      en: [
        "Enteric coating + compact capsule size eliminates reflux and swallowing gag",
        "Individually PTP blister-packed to block humidity and oxidation",
      ],
      ko: [
        "장용성 코팅 + 소형 캡슐로 비린내 역류 및 목넘김 불편 제로",
        "개별 PTP 포장으로 여름철 산패 및 캡슐 달라붙음 완벽 방지",
      ],
    },
    cons: {
      en: [
        "600mg daily dose and 57.7% purity cost ~2x per 1000mg vs US IFOS bulk tubs",
      ],
      ko: [
        "순수 EPA+DHA 1000mg당 약 683원으로 해외 대용량 직구품 대비 약 2배",
      ],
    },
    thirdPartyTested: "MFDS Health Functional Food (식약처 건기식)",
    lastChecked: "2026-11-20",
  },
  {
    slug: "korea-eundan-pure-rtg-omega-3",
    category: "omega-3",
    brand: { en: "Korea Eundan", ko: "고려은단" },
    name: {
      en: "Pure rTG Omega-3 Easy Mini Blister Pack (3-Box)",
      ko: "퓨어 알티지 오메가3 이지 (60캡슐 × 3박스)",
    },
    packageLabel: {
      en: "180 Mini Plant Softgels · 90 Servings (2 Caps/Day)",
      ko: "180식물성캡슐 (3개월분) · 90회분 (1일 2캡슐)",
    },
    origin: "KR",
    totalServings: 90,
    servingWeight: 1020,
    activePerServing: 600,
    activeBreakdown: {
      en: "600mg Pure EPA+DHA in 1,020mg DSM/KD Pharma Grade rTG Oil (Plant Capsule)",
      ko: "소형 식물성 2캡슐(1,020mg) 중 순수 EPA+DHA 600mg + 비타민E",
    },
    caloriesPerServing: 10,
    priceUsd: 33.99,
    priceKrw: 38900,
    amazonQuery: "Plant Softgel Mini rTG Omega 3 600mg",
    iherbQuery: "Mini rTG Omega 3",
    coupangQuery: "고려은단 퓨어 알티지 오메가3 이지 3박스",
    summary: {
      en: "Pairs easy-swallow gelatin-free plant softgels and blister packaging with 58.8% rTG purity—a top Korean gift and daily compliance choice.",
      ko: "소화 잘 되는 식물성 소형 캡슐과 위생적인 개별 PTP 포장을 적용해 58.8% 순도(1,020mg 중 600mg)를 구현한 국내 대표 스테디셀러입니다.",
    },
    pros: {
      en: [
        "Carrageenan/gelatin-free plant capsule gentle on sensitive stomachs",
        "Hygienic individual blister strips prevent air exposure",
      ],
      ko: [
        "동물성 젤라틴 없는 식물성 연질캡슐과 초소형 사이즈로 섭취 편의 최상",
        "개별 포장으로 휴대성 및 산패 방지에 탁월",
      ],
    },
    cons: {
      en: [
        "Higher cost per 1000mg pure EPA+DHA (~₩720) than 950mg single-gel imports",
      ],
      ko: [
        "1회 600mg 설계로 고용량(1000mg+) 섭취 목적 시 가성비는 직구품이 우위",
      ],
    },
    thirdPartyTested: "MFDS Health Functional Food (식약처 건기식)",
    lastChecked: "2026-11-20",
  },
];
