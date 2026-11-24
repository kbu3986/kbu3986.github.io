export type DeviceCategory =
  | "smartphone"
  | "laptop"
  | "tablet"
  | "handheld"
  | "drone-camera"
  | "cpap-medical";

export interface DeviceSpec {
  slug: string;
  nameEn: string;
  nameKo: string;
  brand: string;
  category: DeviceCategory;
  batteryWh: number;
  batteryMah: number;
  nominalVoltage: number;
  fastChargeWatts: number;
  recommendedPdWatts: number;
  chargingProtocolEn: string;
  chargingProtocolKo: string;
  travelTipEn: string;
  travelTipKo: string;
  featured?: boolean;
}

export const DEVICES: DeviceSpec[] = [
  // --- SMARTPHONES (11) ---
  {
    slug: "iphone-16-pro-max",
    nameEn: "iPhone 16 Pro Max",
    nameKo: "아이폰 16 프로 맥스",
    brand: "Apple",
    category: "smartphone",
    batteryWh: 18.17,
    batteryMah: 4685,
    nominalVoltage: 3.878,
    fastChargeWatts: 30,
    recommendedPdWatts: 30,
    chargingProtocolEn: "USB-C PD 3.0 (up to ~30W–38W peak burst) + 25W MagSafe Qi2",
    chargingProtocolKo: "USB-C PD 3.0 (피크 약 30~38W) 및 25W 맥세이프 Qi2 무선충전",
    travelTipEn:
      "A slim 10,000 mAh (37 Wh) USB-C PD 30W power bank gives ~1.67 full charges; a 20,000 mAh (74 Wh) travel bank delivers ~3.34 full charges while staying well under the 100 Wh airline cap.",
    travelTipKo:
      "10,000mAh(37Wh) 30W PD 보조배터리로 약 1.67회, 20,000mAh(74Wh)로 약 3.34회 완충할 수 있어 해외여행 시 기내 반입(100Wh 이하)으로 충분합니다.",
    featured: true,
  },
  {
    slug: "iphone-16-pro",
    nameEn: "iPhone 16 Pro",
    nameKo: "아이폰 16 프로",
    brand: "Apple",
    category: "smartphone",
    batteryWh: 13.94,
    batteryMah: 3582,
    nominalVoltage: 3.892,
    fastChargeWatts: 30,
    recommendedPdWatts: 30,
    chargingProtocolEn: "USB-C PD 3.0 (up to 30W) + 25W MagSafe Qi2",
    chargingProtocolKo: "USB-C PD 3.0 (최대 30W급) 및 25W Qi2 맥세이프",
    travelTipEn:
      "Even a pocket-sized 10,000 mAh (37 Wh) bank recharges iPhone 16 Pro over 2.1 times from 0% to 100%.",
    travelTipKo:
      "휴대성 좋은 10,000mAh(37Wh) 보조배터리 하나로도 아이폰 16 프로를 약 2.18회 넉넉하게 완충할 수 있습니다.",
  },
  {
    slug: "iphone-16",
    nameEn: "iPhone 16",
    nameKo: "아이폰 16",
    brand: "Apple",
    category: "smartphone",
    batteryWh: 13.83,
    batteryMah: 3561,
    nominalVoltage: 3.884,
    fastChargeWatts: 30,
    recommendedPdWatts: 30,
    chargingProtocolEn: "USB-C PD 3.0 (27W–30W) + 25W MagSafe",
    chargingProtocolKo: "USB-C PD 3.0 (27~30W) 및 25W 맥세이프 무선충전",
    travelTipEn:
      "Pair with a 20W or 30W USB-C PD compact bank to reach 50% battery in roughly 28 minutes at the airport gate.",
    travelTipKo:
      "20W~30W USB-C PD 출력 보조배터리를 사용하면 공항 대기 중 약 28분 만에 50%까지 빠르게 충전됩니다.",
  },
  {
    slug: "iphone-15-pro-max",
    nameEn: "iPhone 15 Pro Max",
    nameKo: "아이폰 15 프로 맥스",
    brand: "Apple",
    category: "smartphone",
    batteryWh: 17.1,
    batteryMah: 4422,
    nominalVoltage: 3.867,
    fastChargeWatts: 27,
    recommendedPdWatts: 30,
    chargingProtocolEn: "USB-C PD 3.0 (27W sustained peak) + 15W MagSafe",
    chargingProtocolKo: "USB-C PD 3.0 (최대 27W 유선 고속충전) 및 15W 맥세이프",
    travelTipEn:
      "Wired USB-C charging hits ~85% efficiency vs ~65% on wireless MagSafe packs—bring a short USB-C cable for maximum runtime.",
    travelTipKo:
      "맥세이프 무선충전보다 유선 USB-C 케이블 연결 시 발열 손실이 적어 실사용 충전 횟수가 약 25% 더 늘어납니다.",
  },
  {
    slug: "galaxy-s25-ultra",
    nameEn: "Samsung Galaxy S25 Ultra",
    nameKo: "갤럭시 S25 울트라",
    brand: "Samsung",
    category: "smartphone",
    batteryWh: 19.4,
    batteryMah: 5000,
    nominalVoltage: 3.88,
    fastChargeWatts: 45,
    recommendedPdWatts: 45,
    chargingProtocolEn: "Samsung Super Fast Charging 2.0 (45W USB-C PPS 5A/15V)",
    chargingProtocolKo: "삼성 초고속 충전 2.0 (45W USB-C PD 3.0 PPS 지원)",
    travelTipEn:
      "Look for a power bank supporting 45W PPS (not just 45W fixed PD) and use a 5A E-Marker USB-C cable to unlock Super Fast Charging 2.0.",
    travelTipKo:
      "초고속 충전 2.0(45W)을 모두 활용하려면 단순 PD가 아닌 PPS 규격 지원 보조배터리와 5A 케이블을 함께 준비하세요.",
    featured: true,
  },
  {
    slug: "galaxy-s25-plus",
    nameEn: "Samsung Galaxy S25+",
    nameKo: "갤럭시 S25 플러스",
    brand: "Samsung",
    category: "smartphone",
    batteryWh: 19.01,
    batteryMah: 4900,
    nominalVoltage: 3.88,
    fastChargeWatts: 45,
    recommendedPdWatts: 45,
    chargingProtocolEn: "45W USB-C PD 3.0 with PPS",
    chargingProtocolKo: "45W USB-C PD 3.0 PPS 초고속 충전 2.0",
    travelTipEn:
      "A 20,000 mAh (74 Wh) 45W PPS bank delivers ~3.19 complete 0–100% charges across multi-day international flights.",
    travelTipKo:
      "20,000mAh(74Wh) 45W PPS 보조배터리 지참 시 약 3.19회 완충 가능하며 기내 반입(100Wh 이하) 규정을 여유 있게 통과합니다.",
  },
  {
    slug: "galaxy-s25",
    nameEn: "Samsung Galaxy S25",
    nameKo: "갤럭시 S25",
    brand: "Samsung",
    category: "smartphone",
    batteryWh: 15.52,
    batteryMah: 4000,
    nominalVoltage: 3.88,
    fastChargeWatts: 25,
    recommendedPdWatts: 25,
    chargingProtocolEn: "25W USB-C PD 3.0 PPS Super Fast Charging",
    chargingProtocolKo: "25W USB-C PD 3.0 PPS 초고속 충전",
    travelTipEn:
      "Any compact 10,000 mAh (37 Wh) 25W PPS battery charges Galaxy S25 nearly twice while weighing under 200 grams.",
    travelTipKo:
      "가벼운 10,000mAh(37Wh) 25W PPS 보조배터리 하나면 약 1.95회 완충할 수 있어 당일·단기 여행에 최적입니다.",
  },
  {
    slug: "galaxy-s24-ultra",
    nameEn: "Samsung Galaxy S24 Ultra",
    nameKo: "갤럭시 S24 울트라",
    brand: "Samsung",
    category: "smartphone",
    batteryWh: 19.4,
    batteryMah: 5000,
    nominalVoltage: 3.88,
    fastChargeWatts: 45,
    recommendedPdWatts: 45,
    chargingProtocolEn: "45W USB-C PD 3.0 PPS (Super Fast Charging 2.0)",
    chargingProtocolKo: "45W USB-C PD 3.0 PPS 초고속 충전 2.0",
    travelTipEn:
      "A 27,000 mAh (99.9 Wh) TSA-max power bank gives over 4.2 full charges for heavy camera and GPS travel days.",
    travelTipKo:
      "기내 반입 최대치인 27,000mAh(99.9Wh) 보조배터리를 챙기면 여행 중 카메라·지도를 종일 써도 4.2회 이상 완충됩니다.",
  },
  {
    slug: "galaxy-z-fold-6",
    nameEn: "Samsung Galaxy Z Fold 6",
    nameKo: "갤럭시 Z 폴드 6",
    brand: "Samsung",
    category: "smartphone",
    batteryWh: 17.07,
    batteryMah: 4400,
    nominalVoltage: 3.88,
    fastChargeWatts: 25,
    recommendedPdWatts: 30,
    chargingProtocolEn: "25W USB-C PD 3.0 PPS",
    chargingProtocolKo: "25W USB-C PD 3.0 PPS 고속충전",
    travelTipEn:
      "Dual-cell foldable batteries love steady 25W PPS input; a 20,000 mAh pack yields ~3.55 full charges for inner-screen multitasking.",
    travelTipKo:
      "대화면 사용량이 많은 폴드 6는 20,000mAh(74Wh) 보조배터리와 조합하면 약 3.55회 안정적으로 충전됩니다.",
  },
  {
    slug: "galaxy-z-flip-6",
    nameEn: "Samsung Galaxy Z Flip 6",
    nameKo: "갤럭시 Z 플립 6",
    brand: "Samsung",
    category: "smartphone",
    batteryWh: 15.52,
    batteryMah: 4000,
    nominalVoltage: 3.88,
    fastChargeWatts: 25,
    recommendedPdWatts: 25,
    chargingProtocolEn: "25W USB-C PD 3.0 PPS",
    chargingProtocolKo: "25W USB-C PD 3.0 PPS 고속충전",
    travelTipEn:
      "Matches compact 10,000 mAh built-in-cable power banks (~1.95 charges) that slip effortlessly into a small透明 zip-lock pouch.",
    travelTipKo:
      "일체형 케이블이 달린 10,000mAh 슬림 보조배터리(약 1.95회 완충)와 함께 투명 지퍼백에 넣으면 기내 휴대가 매우 간편합니다.",
  },
  {
    slug: "pixel-9-pro-xl",
    nameEn: "Google Pixel 9 Pro XL",
    nameKo: "구글 픽셀 9 프로 XL",
    brand: "Google",
    category: "smartphone",
    batteryWh: 19.58,
    batteryMah: 5060,
    nominalVoltage: 3.87,
    fastChargeWatts: 37,
    recommendedPdWatts: 45,
    chargingProtocolEn: "37W USB-C PD 3.0 PPS (21V PPS rail)",
    chargingProtocolKo: "37W USB-C PD 3.0 PPS (21V PPS 프로파일 지원 시 최고속)",
    travelTipEn:
      "Pixel 9 Pro XL hits peak 37W only when the power bank offers a 21V PPS profile—check 45W/65W laptop-grade PD banks.",
    travelTipKo:
      "최대 37W 속도를 내려면 21V PPS 출력을 지원하는 45W~65W급 PD 보조배터리를 선택하는 것이 좋습니다.",
  },

  // --- LAPTOPS (9) ---
  {
    slug: "macbook-air-m3-13",
    nameEn: "MacBook Air 13\" (M3 / M4)",
    nameKo: "맥북 에어 13인치 (M3 / M4)",
    brand: "Apple",
    category: "laptop",
    batteryWh: 52.6,
    batteryMah: 4626,
    nominalVoltage: 11.37,
    fastChargeWatts: 70,
    recommendedPdWatts: 65,
    chargingProtocolEn: "USB-C PD 3.0 (35W standard / 70W fast charge via MagSafe 3 or Thunderbolt)",
    chargingProtocolKo: "USB-C PD 3.0 (기본 35W / 65W~70W 고속충전 지원)",
    travelTipEn:
      "A 20,000 mAh (74 Wh) 65W PD bank adds ~1.15 full charges (+18 hours of M-series battery life), while a 27,000 mAh (99.9 Wh) bank adds ~1.56 charges.",
    travelTipKo:
      "65W 이상 출력되는 20,000mAh(74Wh) 보조배터리로 약 1.15회, 27,000mAh(99.9Wh) 제품으로 약 1.56회 완충할 수 있습니다.",
    featured: true,
  },
  {
    slug: "macbook-air-m3-15",
    nameEn: "MacBook Air 15\" (M3 / M4)",
    nameKo: "맥북 에어 15인치 (M3 / M4)",
    brand: "Apple",
    category: "laptop",
    batteryWh: 66.5,
    batteryMah: 5838,
    nominalVoltage: 11.39,
    fastChargeWatts: 70,
    recommendedPdWatts: 65,
    chargingProtocolEn: "USB-C PD 3.0 (20V/3.25A 65W–70W fast charge)",
    chargingProtocolKo: "USB-C PD 3.0 (20V 65W~70W 고속충전)",
    travelTipEn:
      "Choose a 24,000–27,650 mAh (~88–99.9 Wh) 65W+ USB-C PD bank to get more than one full 0–100% recharge within carry-on limits.",
    travelTipKo:
      "배터리 용량이 66.5Wh이므로 기내 반입 한도 내 최대급인 25,000~27,650mAh(90~99.9Wh) 65W PD 보조배터리를 권장합니다.",
  },
  {
    slug: "macbook-pro-14-m4",
    nameEn: "MacBook Pro 14\" (M4 / M4 Pro)",
    nameKo: "맥북 프로 14인치 (M4 / M4 프로)",
    brand: "Apple",
    category: "laptop",
    batteryWh: 72.4,
    batteryMah: 6260,
    nominalVoltage: 11.57,
    fastChargeWatts: 96,
    recommendedPdWatts: 100,
    chargingProtocolEn: "USB-C PD 3.0 (96W–100W 20V/5A fast charge)",
    chargingProtocolKo: "USB-C PD 3.0 (96W~100W 20V/5A 고속충전)",
    travelTipEn:
      "Under heavy video/code load, 45W banks may trickle slowly—pack a 100W-capable 27,000 mAh (99.9 Wh) bank (~1.13 full charges).",
    travelTipKo:
      "고부하 작업 중에도 배터리가 줄지 않으려면 100W 단일 출력이 가능한 27,000mAh급(99.9Wh) 노트북 보조배터리가 적합합니다.",
  },
  {
    slug: "macbook-pro-16",
    nameEn: "MacBook Pro 16\" (M3/M4 Max)",
    nameKo: "맥북 프로 16인치 (M3/M4 맥스)",
    brand: "Apple",
    category: "laptop",
    batteryWh: 99.6,
    batteryMah: 8693,
    nominalVoltage: 11.46,
    fastChargeWatts: 140,
    recommendedPdWatts: 140,
    chargingProtocolEn: "USB-C PD 3.1 EPR 140W (28V/5A via MagSafe 3 or Thunderbolt 5)",
    chargingProtocolKo: "USB-C PD 3.1 EPR 140W (28V/5A 초고속 충전)",
    travelTipEn:
      "Apple engineered the 16\" MacBook Pro internal battery at 99.6 Wh specifically to sit 0.4 Wh below the 100 Wh FAA/IATA limit! Pair with a 140W PD 3.1 27,650 mAh (99.54 Wh) bank for ~0.82 extra tank.",
    travelTipKo:
      "맥북 프로 16인치 내장 배터리가 99.6Wh인 이유가 바로 항공 100Wh 규정을 맞추기 위해서입니다. 140W PD 3.1 지원 99Wh급 보조배터리와 최고의 궁합을 보입니다.",
    featured: true,
  },
  {
    slug: "lg-gram-16",
    nameEn: "LG Gram 16 (2025)",
    nameKo: "LG 그램 16 (2025)",
    brand: "LG",
    category: "laptop",
    batteryWh: 77.0,
    batteryMah: 9974,
    nominalVoltage: 7.72,
    fastChargeWatts: 65,
    recommendedPdWatts: 65,
    chargingProtocolEn: "65W USB-C PD 3.0 (20V/3.25A required)",
    chargingProtocolKo: "65W USB-C PD 3.0 (20V 전압 출력 필수)",
    travelTipEn:
      "LG Gram laptops reject 5V/9V phone banks—your power bank MUST output a 20V USB-C PD profile (45W or 65W minimum).",
    travelTipKo:
      "LG 그램은 스마트폰용 18W~22.5W 보조배터리로는 충전되지 않으며, 반드시 20V 전압이 나오는 45W~65W 이상 PD 보조배터리가 필요합니다.",
  },
  {
    slug: "galaxy-book-5-pro-16",
    nameEn: "Samsung Galaxy Book5 Pro 16\"",
    nameKo: "갤럭시 북5 프로 16인치",
    brand: "Samsung",
    category: "laptop",
    batteryWh: 76.1,
    batteryMah: 4920,
    nominalVoltage: 15.47,
    fastChargeWatts: 65,
    recommendedPdWatts: 65,
    chargingProtocolEn: "65W USB-C PD 3.0 (supports 45W/65W travel banks)",
    chargingProtocolKo: "65W USB-C PD 3.0 고속충전 (45W 이상 PD 호환)",
    travelTipEn:
      "One 65W 25,000 mAh (92.5 Wh) power bank charges both your Galaxy Book5 Pro (~1.0 full charge) and Galaxy S25 phone smoothly.",
    travelTipKo:
      "65W 출력 25,000mAh(92.5Wh) 보조배터리 하나면 갤럭시 북5 프로와 갤럭시 스마트폰을 동시에 여행 내내 커버할 수 있습니다.",
  },
  {
    slug: "dell-xps-13",
    nameEn: "Dell XPS 13 (9345 / 9350)",
    nameKo: "델 XPS 13 (9345 / 9350)",
    brand: "Dell",
    category: "laptop",
    batteryWh: 55.0,
    batteryMah: 4725,
    nominalVoltage: 11.64,
    fastChargeWatts: 60,
    recommendedPdWatts: 65,
    chargingProtocolEn: "60W USB-C PD 3.0 (20V/3A)",
    chargingProtocolKo: "60W USB-C PD 3.0 (20V/3A)",
    travelTipEn:
      "Dell BIOS warns if attached to <45W adapters; stick to a 65W USB-C PD 20,000 mAh (74 Wh) bank for ~1.10 full charges.",
    travelTipKo:
      "45W 미만 연결 시 저전력 경고가 뜰 수 있으므로 65W PD 출력을 지원하는 20,000mAh(74Wh) 이상 보조배터리를 선택하세요.",
  },
  {
    slug: "thinkpad-x1-carbon-gen12",
    nameEn: "Lenovo ThinkPad X1 Carbon Gen 12",
    nameKo: "레노버 씽크패드 X1 카본 12세대",
    brand: "Lenovo",
    category: "laptop",
    batteryWh: 57.0,
    batteryMah: 4922,
    nominalVoltage: 11.58,
    fastChargeWatts: 65,
    recommendedPdWatts: 65,
    chargingProtocolEn: "65W USB-C PD 3.0 Rapid Charge (80% in 60 min)",
    chargingProtocolKo: "65W USB-C PD 3.0 래피드 차지 고속충전",
    travelTipEn:
      "Business flyers love pairing X1 Carbon with a 20,000 mAh 65W bank (~1.06 charges) kept in a clear zip-lock bag under the seat.",
    travelTipKo:
      "출장이 잦다면 20,000mAh 65W PD 보조배터리(약 1.06회 완충)를 지퍼백에 넣어 좌석 앞주머니에 휴대하는 구성이 가장 깔끔합니다.",
  },
  {
    slug: "surface-pro-11",
    nameEn: "Microsoft Surface Pro 11",
    nameKo: "마이크로소프트 서피스 프로 11",
    brand: "Microsoft",
    category: "laptop",
    batteryWh: 53.0,
    batteryMah: 4580,
    nominalVoltage: 11.57,
    fastChargeWatts: 65,
    recommendedPdWatts: 65,
    chargingProtocolEn: "65W USB-C PD 3.0 via USB4 ports",
    chargingProtocolKo: "USB4 포트를 통한 65W USB-C PD 고속충전",
    travelTipEn:
      "Leave the proprietary Surface Connect brick at home—any 65W USB-C PD bank charges Surface Pro 11 cleanly via its USB4 ports.",
    travelTipKo:
      "전용 어댑터 없이도 측면 USB-C(USB4) 단자에 65W PD 보조배터리를 꽂으면 약 1.15회(20,000mAh 기준) 완충됩니다.",
  },

  // --- TABLETS (5) ---
  {
    slug: "ipad-pro-m4-13",
    nameEn: "iPad Pro 13\" (M4)",
    nameKo: "아이패드 프로 13인치 (M4)",
    brand: "Apple",
    category: "tablet",
    batteryWh: 38.99,
    batteryMah: 10290,
    nominalVoltage: 3.79,
    fastChargeWatts: 38,
    recommendedPdWatts: 45,
    chargingProtocolEn: "USB-C PD 3.0 (15V rail ~35W–38W peak)",
    chargingProtocolKo: "USB-C PD 3.0 (15V 프로파일 약 35~38W 고속충전)",
    travelTipEn:
      "Note how Apple rates iPads at 3.79V (38.99 Wh): a 20,000 mAh (74 Wh) bank provides ~1.56 full charges for long flights.",
    travelTipKo:
      "아이패드 프로 13인치(38.99Wh)는 20,000mAh(74Wh) 45W PD 보조배터리 사용 시 약 1.56회 완충할 수 있습니다.",
    featured: true,
  },
  {
    slug: "ipad-pro-m4-11",
    nameEn: "iPad Pro 11\" (M4)",
    nameKo: "아이패드 프로 11인치 (M4)",
    brand: "Apple",
    category: "tablet",
    batteryWh: 31.29,
    batteryMah: 8160,
    nominalVoltage: 3.83,
    fastChargeWatts: 33,
    recommendedPdWatts: 35,
    chargingProtocolEn: "USB-C PD 3.0 (~33W peak)",
    chargingProtocolKo: "USB-C PD 3.0 (최대 약 33W 고속충전)",
    travelTipEn:
      "A 20,000 mAh (74 Wh) 30W+ USB-C bank gives nearly 2 full charges (~1.94x), while a 10,000 mAh pack gives ~0.97x emergency boost.",
    travelTipKo:
      "10,000mAh(37Wh)로는 약 0.97회(거의 1회), 20,000mAh(74Wh)로는 약 1.94회 완충됩니다.",
  },
  {
    slug: "ipad-air-m2-11",
    nameEn: "iPad Air 11\" (M2 / M3)",
    nameKo: "아이패드 에어 11인치 (M2 / M3)",
    brand: "Apple",
    category: "tablet",
    batteryWh: 28.93,
    batteryMah: 7606,
    nominalVoltage: 3.8,
    fastChargeWatts: 30,
    recommendedPdWatts: 30,
    chargingProtocolEn: "30W USB-C PD 3.0 (15V/2A)",
    chargingProtocolKo: "30W USB-C PD 3.0 (15V/2A)",
    travelTipEn:
      "Even a lightweight 10,000 mAh (37 Wh) 30W PD bank gives 1.05 full charges for movie marathons on long-haul flights.",
    travelTipKo:
      "30W 출력 10,000mAh(37Wh) 보조배터리로도 약 1.05회 완충이 가능해 장거리 비행 영상 시청용으로 훌륭합니다.",
  },
  {
    slug: "ipad-mini-a17-pro",
    nameEn: "iPad mini (A17 Pro)",
    nameKo: "아이패드 미니 7세대 (A17 Pro)",
    brand: "Apple",
    category: "tablet",
    batteryWh: 19.3,
    batteryMah: 5078,
    nominalVoltage: 3.8,
    fastChargeWatts: 20,
    recommendedPdWatts: 20,
    chargingProtocolEn: "20W USB-C PD (9V/2.22A)",
    chargingProtocolKo: "20W USB-C PD 고속충전",
    travelTipEn:
      "Has almost the exact same Wh battery as a flagship smartphone (19.3 Wh)—a 20,000 mAh bank recharges it over 3.1 times!",
    travelTipKo:
      "배터리 전력량(19.3Wh)이 스마트폰과 비슷해 20,000mAh 보조배터리로 무려 3.14회나 완충할 수 있습니다.",
  },
  {
    slug: "galaxy-tab-s10-ultra",
    nameEn: "Samsung Galaxy Tab S10 Ultra",
    nameKo: "갤럭시 탭 S10 울트라",
    brand: "Samsung",
    category: "tablet",
    batteryWh: 43.46,
    batteryMah: 11200,
    nominalVoltage: 3.88,
    fastChargeWatts: 45,
    recommendedPdWatts: 45,
    chargingProtocolEn: "45W USB-C PD 3.0 PPS Super Fast Charging 2.0",
    chargingProtocolKo: "45W USB-C PD 3.0 PPS 초고속 충전 2.0",
    travelTipEn:
      "With its massive 14.6\" AMOLED screen and 43.46 Wh cell, pack at least a 20,000 mAh (~1.40x) or 27,000 mAh (~1.88x) 45W PPS bank.",
    travelTipKo:
      "11,200mAh(43.46Wh) 대용량 태블릿이므로 20,000mAh 이상(약 1.4회 완충) 45W PPS 보조배터리를 추천합니다.",
  },

  // --- HANDHELD GAMING (6) ---
  {
    slug: "steam-deck-oled",
    nameEn: "Valve Steam Deck OLED",
    nameKo: "스팀덱 OLED (Steam Deck OLED)",
    brand: "Valve",
    category: "handheld",
    batteryWh: 50.0,
    batteryMah: 6470,
    nominalVoltage: 7.72,
    fastChargeWatts: 45,
    recommendedPdWatts: 45,
    chargingProtocolEn: "45W USB-C PD 3.0 (15V/3A profile mandatory for full-speed play+charge)",
    chargingProtocolKo: "45W USB-C PD 3.0 (15V/3A 출력 필수 — 플레이 및 동시 충전)",
    travelTipEn:
      "Steam Deck OLED requires a 15V/3A (45W) PD rail to play AAA games while charging. A 20,000 mAh (74 Wh) 65W bank adds ~1.21 full charges.",
    travelTipKo:
      "게임을 플레이하면서 동시에 충전하려면 15V/3A(45W) 이상 PD 출력이 필수입니다. 20,000mAh(74Wh) 기준 약 1.21회 추가 완충됩니다.",
    featured: true,
  },
  {
    slug: "nintendo-switch-2",
    nameEn: "Nintendo Switch 2",
    nameKo: "닌텐도 스위치 2",
    brand: "Nintendo",
    category: "handheld",
    batteryWh: 19.8,
    batteryMah: 5220,
    nominalVoltage: 3.79,
    fastChargeWatts: 30,
    recommendedPdWatts: 45,
    chargingProtocolEn: "USB-C PD 3.0 (up to ~30W handheld, 60W dock mode)",
    chargingProtocolKo: "USB-C PD 3.0 (휴대 모드 최대 30W급, 독 모드 60W)",
    travelTipEn:
      "A 20,000 mAh (74 Wh) 30W–45W USB-C PD power bank delivers ~3.06 full charges—turning 3 hours of AAA gaming into 12+ hours.",
    travelTipKo:
      "20,000mAh(74Wh) 30W~45W PD 보조배터리 하나면 스위치 2를 약 3.06회 완충해 장거리 비행 내내 즐길 수 있습니다.",
    featured: true,
  },
  {
    slug: "nintendo-switch-oled",
    nameEn: "Nintendo Switch OLED",
    nameKo: "닌텐도 스위치 OLED",
    brand: "Nintendo",
    category: "handheld",
    batteryWh: 16.0,
    batteryMah: 4310,
    nominalVoltage: 3.71,
    fastChargeWatts: 18,
    recommendedPdWatts: 30,
    chargingProtocolEn: "18W USB-C PD (15V/1.2A handheld)",
    chargingProtocolKo: "18W USB-C PD (15V 프로파일 고속충전)",
    travelTipEn:
      "Ultra-efficient 16 Wh battery means even a 10,000 mAh (37 Wh) bank gives ~1.90 full charges!",
    travelTipKo:
      "배터리가 16Wh로 작아 가벼운 10,000mAh(37Wh) 보조배터리만으로도 약 1.9회 완충됩니다.",
  },
  {
    slug: "rog-ally-x",
    nameEn: "ASUS ROG Ally X",
    nameKo: "ASUS ROG 엘라이 X (ROG Ally X)",
    brand: "ASUS",
    category: "handheld",
    batteryWh: 80.0,
    batteryMah: 5175,
    nominalVoltage: 15.46,
    fastChargeWatts: 100,
    recommendedPdWatts: 100,
    chargingProtocolEn: "65W–100W USB-C PD 3.0 (20V/3.25A needed for 30W Turbo Mode)",
    chargingProtocolKo: "65W~100W USB-C PD 3.0 (30W 터보 모드 활성화 시 65W 이상 필수)",
    travelTipEn:
      "ROG Ally X packs a huge 80 Wh battery inside the console itself! Pair with a 27,000 mAh (99.9 Wh) 100W PD bank for ~1.02x extra charge.",
    travelTipKo:
      "본체 배터리가 80Wh로 노트북급이므로, 30W 터보 모드를 지원하는 100W 출력 27,000mAh(99.9Wh) 보조배터리 조합을 추천합니다.",
    featured: true,
  },
  {
    slug: "legion-go",
    nameEn: "Lenovo Legion Go",
    nameKo: "레노버 리전 고 (Legion Go)",
    brand: "Lenovo",
    category: "handheld",
    batteryWh: 49.2,
    batteryMah: 6340,
    nominalVoltage: 7.76,
    fastChargeWatts: 65,
    recommendedPdWatts: 65,
    chargingProtocolEn: "65W USB-C PD 3.0 (20V/3.25A required while gaming)",
    chargingProtocolKo: "65W USB-C PD 3.0 (20V/3.25A 출력 시 플레이 중 고속충전)",
    travelTipEn:
      "Legion Go ignores low-voltage phone chargers—bring a 65W+ 20,000 mAh (74 Wh) bank (~1.23x charges) or 27,000 mAh (~1.66x).",
    travelTipKo:
      "리전 고는 20V 미지원 저출력 보조배터리를 인식하지 않으므로 반드시 65W 이상 노트북용 PD 보조배터리를 사용하세요.",
  },
  {
    slug: "playstation-portal",
    nameEn: "Sony PlayStation Portal",
    nameKo: "플레이스테이션 포털 리모트 플레이어",
    brand: "Sony",
    category: "handheld",
    batteryWh: 16.8,
    batteryMah: 4370,
    nominalVoltage: 3.85,
    fastChargeWatts: 15,
    recommendedPdWatts: 20,
    chargingProtocolEn: "15W USB-C (5V/3A)",
    chargingProtocolKo: "15W USB-C 표준 충전 (5V/3A)",
    travelTipEn:
      "Draws modest power over hotel Wi-Fi; a 10,000 mAh pack adds ~1.81 charges (~9+ extra streaming hours).",
    travelTipKo:
      "10,000mAh(37Wh) 보조배터리 하나로 약 1.81회 추가 완충되어 호텔·공항 와이파이 환경에서 넉넉히 즐길 수 있습니다.",
  },

  // --- DRONES & CAMERAS (7) ---
  {
    slug: "dji-mini-4-pro",
    nameEn: "DJI Mini 4 Pro Flight Battery",
    nameKo: "DJI 미니 4 프로 인텔리전트 플라이트 배터리",
    brand: "DJI",
    category: "drone-camera",
    batteryWh: 18.96,
    batteryMah: 2590,
    nominalVoltage: 7.32,
    fastChargeWatts: 30,
    recommendedPdWatts: 30,
    chargingProtocolEn: "30W USB-C PD via DJI Two-Way Charging Hub",
    chargingProtocolKo: "DJI 양방향 충전 허브 사용 시 30W USB-C PD 고속충전",
    travelTipEn:
      "Notice DJI drone batteries are 2S (7.32V), so 2,590 mAh equals 18.96 Wh! A 20,000 mAh (74 Wh) 30W PD bank recharges ~3.20 drone batteries in the field.",
    travelTipKo:
      "드론 배터리는 7.32V 고전압 구조라 2,590mAh가 곧 18.96Wh입니다. 20,000mAh(74Wh) 30W 보조배터리로 야외에서 약 3.2개 분량을 충전할 수 있습니다.",
    featured: true,
  },
  {
    slug: "dji-air-3s",
    nameEn: "DJI Air 3S Flight Battery",
    nameKo: "DJI 에어 3S 인텔리전트 플라이트 배터리",
    brand: "DJI",
    category: "drone-camera",
    batteryWh: 62.5,
    batteryMah: 4276,
    nominalVoltage: 14.6,
    fastChargeWatts: 100,
    recommendedPdWatts: 100,
    chargingProtocolEn: "65W–100W USB-C PD via DJI Charging Hub",
    chargingProtocolKo: "DJI 멀티 충전 허브 65W~100W USB-C PD 고속충전",
    travelTipEn:
      "Each Air 3S battery is 62.5 Wh (4S 14.6V)—well under 100 Wh per battery, but Korean airlines count spare drone batteries toward your 5-piece ≤100Wh cabin quota!",
    travelTipKo:
      "에어 3S 배터리는 개당 62.5Wh(100Wh 이하)로 기내 반입이 가능하지만, 한국 국적기 탑승 시 보조배터리와 합산해 1인 5개 무승인 한도에 포함됩니다.",
  },
  {
    slug: "dji-osmo-pocket-3",
    nameEn: "DJI Osmo Pocket 3",
    nameKo: "DJI 오즈모 포켓 3",
    brand: "DJI",
    category: "drone-camera",
    batteryWh: 10.01,
    batteryMah: 1300,
    nominalVoltage: 7.7,
    fastChargeWatts: 30,
    recommendedPdWatts: 30,
    chargingProtocolEn: "30W+ USB-C PD fast charge (80% in 16 minutes!)",
    chargingProtocolKo: "30W USB-C PD 초고속 충전 (16분 만에 80% 충전)",
    travelTipEn:
      "Vloggers rejoice: a single 10,000 mAh (37 Wh) 30W PD bank recharges Osmo Pocket 3 over 3.0 times from empty.",
    travelTipKo:
      "10,000mAh(37Wh) 30W PD 보조배터리 하나면 오즈모 포켓 3를 무려 3.03회 완충할 수 있어 여행 브이로그 필수템입니다.",
  },
  {
    slug: "gopro-hero-13",
    nameEn: "GoPro Hero 13 Black (Enduro)",
    nameKo: "고프로 히어로 13 블랙 (엔듀로 배터리)",
    brand: "GoPro",
    category: "drone-camera",
    batteryWh: 7.39,
    batteryMah: 1900,
    nominalVoltage: 3.89,
    fastChargeWatts: 15,
    recommendedPdWatts: 20,
    chargingProtocolEn: "USB-C 5V/3A (camera or Dual Battery Charger)",
    chargingProtocolKo: "USB-C 15W 충전 (본체 직결 또는 듀얼 배터리 충전기)",
    travelTipEn:
      "At just 7.39 Wh per Enduro battery, a 10,000 mAh (37 Wh) bank tops up ~4.10 GoPro batteries during ski or dive trips.",
    travelTipKo:
      "엔듀로 배터리 1개 용량이 7.39Wh라 10,000mAh 보조배터리 하나로 약 4.1개 분량을 거뜬히 충전합니다.",
  },
  {
    slug: "insta360-x4",
    nameEn: "Insta360 X4",
    nameKo: "인스타360 X4",
    brand: "Insta360",
    category: "drone-camera",
    batteryWh: 8.82,
    batteryMah: 2290,
    nominalVoltage: 3.85,
    fastChargeWatts: 30,
    recommendedPdWatts: 30,
    chargingProtocolEn: "9V/2A–30W USB-C PD (80% in 38 minutes)",
    chargingProtocolKo: "USB-C PD 고속충전 (38분 만에 80% 충전)",
    travelTipEn:
      "8K 360° capture drains cells quickly—bring a 20,000 mAh (74 Wh) bank for ~6.88 full Insta360 X4 recharges.",
    travelTipKo:
      "8K 360도 촬영 시 배터리 소모가 빠르므로 20,000mAh(74Wh) 보조배터리를 챙기면 약 6.88회 완충할 수 있습니다.",
  },
  {
    slug: "sony-a7-iv",
    nameEn: "Sony Alpha A7 IV (NP-FZ100)",
    nameKo: "소니 알파 A7M4 / A7 IV (NP-FZ100)",
    brand: "Sony",
    category: "drone-camera",
    batteryWh: 16.4,
    batteryMah: 2280,
    nominalVoltage: 7.2,
    fastChargeWatts: 18,
    recommendedPdWatts: 30,
    chargingProtocolEn: "USB-C PD (9V/2A or 9V/3A direct body power + charge)",
    chargingProtocolKo: "USB-C PD (9V/3A 바디 상시 전원 공급 및 충전 지원)",
    travelTipEn:
      "NP-FZ100 is a 7.2V 2,280 mAh (16.4 Wh) pack. A 20,000 mAh (74 Wh) PD bank recharges ~3.70 Sony batteries or powers multi-hour 4K timelapses.",
    travelTipKo:
      "소니 NP-FZ100 정품 배터리는 7.2V 16.4Wh 규격으로, 20,000mAh(74Wh) PD 보조배터리 하나로 약 3.7회 완충 가능합니다.",
  },
  {
    slug: "canon-eos-r6-ii",
    nameEn: "Canon EOS R6 Mark II (LP-E6NH)",
    nameKo: "캐논 EOS R6 Mark II (LP-E6NH)",
    brand: "Canon",
    category: "drone-camera",
    batteryWh: 16.0,
    batteryMah: 2130,
    nominalVoltage: 7.2,
    fastChargeWatts: 27,
    recommendedPdWatts: 45,
    chargingProtocolEn: "USB-C PD (9V/3A required; non-PD 5V banks CANNOT charge body!)",
    chargingProtocolKo: "USB-C PD 9V/3A 필수 (일반 5V 보조배터리는 바디 충전 불가)",
    travelTipEn:
      "Canon R-series cameras strictly require USB-C Power Delivery (9V/3A+); cheap 5V USB-A banks will not charge LP-E6NH inside the camera.",
    travelTipKo:
      "캐논 미러리스 바디 충전은 반드시 9V/3A 이상 USB-C PD 규격이어야 작동하므로 30W~45W PD 보조배터리를 선택하세요.",
  },

  // --- CPAP & XR / SPECIALTY (2) ---
  {
    slug: "resmed-airmini-cpap",
    nameEn: "ResMed AirMini Travel CPAP (8h Night)",
    nameKo: "레스메드 에어미니 휴대용 양압기 (8시간 수면 기준)",
    brand: "ResMed",
    category: "cpap-medical",
    batteryWh: 56.0,
    batteryMah: 15135,
    nominalVoltage: 24.0,
    fastChargeWatts: 65,
    recommendedPdWatts: 65,
    chargingProtocolEn: "20V USB-C PD (65W+) via 24V DC converter cable (waterless HumidX)",
    chargingProtocolKo: "65W 이상 20V USB-C PD 출력 + 전용 24V 변환 케이블 (무수 가습 필터 기준)",
    travelTipEn:
      "AirMini draws ~6–8W average (~56 Wh for an 8-hour flight sleep without heated hose). A 27,000 mAh (99.9 Wh) 65W PD bank powers ~1.46 full nights and flies carry-on legal! Carry your medical CPAP prescription for airline exemption.",
    travelTipKo:
      "레스메드 에어미니는 8시간 수면 시 약 56Wh를 소모합니다. 기내 반입 가능한 27,000mAh(99.9Wh) 65W PD 보조배터리와 24V 변환 케이블로 기내·캠핑 중 1박 이상 작동하며, 장거리 비행 시 항공사 의료기기 사전 승인을 확인하세요.",
    featured: true,
  },
  {
    slug: "apple-vision-pro",
    nameEn: "Apple Vision Pro External Battery",
    nameKo: "애플 비전 프로 외장 배터리",
    brand: "Apple",
    category: "cpap-medical",
    batteryWh: 35.9,
    batteryMah: 3166,
    nominalVoltage: 11.34,
    fastChargeWatts: 65,
    recommendedPdWatts: 65,
    chargingProtocolEn: "USB-C PD 3.0 (30W–65W pass-through cabin use)",
    chargingProtocolKo: "USB-C PD 3.0 (30W~65W 패스스루 급전 지원)",
    travelTipEn:
      "People mistake Vision Pro's 3,166 mAh figure for a tiny phone cell—because it runs at 11.34V, it actually holds 35.9 Wh! Add a 27,000 mAh (99.9 Wh) 65W PD bank for ~2.28 extra battery cycles (~5+ extra movie hours).",
    travelTipKo:
      "비전 프로 배터리는 3,166mAh지만 전압이 11.34V라 실제로는 35.9Wh입니다. 27,000mAh(99.9Wh) 65W 보조배터리 연결 시 약 2.28회분(5시간 이상) 연장 사용이 가능합니다.",
  },
];

export function getDeviceBySlug(slug: string): DeviceSpec | undefined {
  return DEVICES.find((d) => d.slug === slug);
}
