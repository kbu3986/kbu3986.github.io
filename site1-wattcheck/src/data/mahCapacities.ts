export interface MahCapacityPage {
  amount: number;
  slug: string;
  typicalUseEn: string;
  typicalUseKo: string;
  exampleModelsEn: string;
  exampleModelsKo: string;
  airlineNoteEn: string;
  airlineNoteKo: string;
  recommendedWatts: number;
  featured?: boolean;
}

export const MAH_CAPACITIES: MahCapacityPage[] = [
  {
    amount: 3000,
    slug: "3000",
    typicalUseEn: "Lipstick-sized emergency phone booster (~0.5–0.7 phone charges)",
    typicalUseKo: "초소형 도킹형·립스틱형 비상 보조배터리 (스마트폰 약 0.5~0.7회 충전)",
    exampleModelsEn: " Mini USB-C plug-in capsule banks, older MagSafe mini packs",
    exampleModelsKo: "미니 도킹형 일체형 보조배터리, 초경량 슬림팩",
    airlineNoteEn:
      "At just 11.1 Wh (3.7V), 3,000 mAh is nearly 9x below the 100 Wh airline cap and flies carry-on everywhere.",
    airlineNoteKo:
      "3.7V 기준 11.1Wh에 불과해 전 세계 모든 항공사 기내 반입 기준(100Wh 이하)을 여유 있게 통과합니다.",
    recommendedWatts: 20,
  },
  {
    amount: 5000,
    slug: "5000",
    typicalUseEn: "Ultra-slim MagSafe / Qi2 magnetic snap-on phone battery (~0.8–1.0 phone charge)",
    typicalUseKo: "초슬림 맥세이프(MagSafe)·Qi2 부착형 보조배터리 (스마트폰 약 0.8~1회 충전)",
    exampleModelsEn: "Anker Nano MagGo 5K, Ugreen Uno Magnetic 5000mAh",
    exampleModelsKo: "앤커 맥고 5000mAh, 유그린 맥세이프 슬림 5000mAh",
    airlineNoteEn:
      "18.5 Wh @ 3.7V (19.25 Wh @ 3.85V)—100% cabin-approved worldwide. Fits effortlessly inside a tiny clear zip-lock bag.",
    airlineNoteKo:
      "3.7V 기준 18.5Wh(3.85V 기준 19.25Wh)로 기내 반입 100% 가능하며, 작은 지퍼백에도 쏙 들어가는 휴대성 최강 용량입니다.",
    recommendedWatts: 20,
    featured: true,
  },
  {
    amount: 8000,
    slug: "8000",
    typicalUseEn: "Compact pocket battery with built-in cable (~1.3–1.6 phone charges)",
    typicalUseKo: "컴팩트 포켓형 보조배터리 (스마트폰 약 1.3~1.6회 충전)",
    exampleModelsEn: " Slim magnetic 8K packs & travel organizer batteries",
    exampleModelsKo: "8000mAh 맥세이프 대용량 및 파우치 일체형 배터리",
    airlineNoteEn:
      "29.6 Wh @ 3.7V—clears every global and Korean airline carry-on screening with zero paperwork.",
    airlineNoteKo:
      "3.7V 기준 29.6Wh로 항공사 별도 승인 없이 자유롭게 기내 휴대가 가능합니다.",
    recommendedWatts: 22.5,
  },
  {
    amount: 10000,
    slug: "10000",
    typicalUseEn: "World's #1 daily & travel smartphone power bank (~1.6–2.0 phone charges)",
    typicalUseKo: "국민 표준 휴대용 보조배터리 용량 (스마트폰 약 1.6~2회 완충)",
    exampleModelsEn: "Anker Zolo 10K 30W, Samsung 10,000mAh 25W, Xiaomi 10K",
    exampleModelsKo: "삼성 정품 10000mAh 25W, 앤커 졸로 10000mAh, 샤오미 10000mAh",
    airlineNoteEn:
      "37.0 Wh @ 3.7V (38.5 Wh @ 3.85V)—well under the 100 Wh limit! Korean airlines allow up to 5 units of 10,000 mAh in carry-on without approval.",
    airlineNoteKo:
      "3.7V 기준 정확히 37Wh로 항공 100Wh 기준의 절반도 되지 않습니다! 대한항공·제주항공 등 한국 국적기 기준 1인 최대 5개까지 승인 없이 기내 반입됩니다.",
    recommendedWatts: 30,
    featured: true,
  },
  {
    amount: 12000,
    slug: "12000",
    typicalUseEn: "High-output compact phone + tablet travel bank (~2.0–2.4 phone charges)",
    typicalUseKo: "고출력 미니 노트북·태블릿 겸용 보조배터리 (스마트폰 약 2~2.4회 완충)",
    exampleModelsEn: "Anker Prime 12,000mAh 130W, Baseus Blade Mini 12K",
    exampleModelsKo: "앤커 프라임 12000mAh 130W, 베이스어스 12000mAh",
    airlineNoteEn:
      "44.4 Wh @ 3.7V—under half the 100 Wh limit, yet high-rate 21700 cells can burst up to 100W–130W for MacBook Air top-ups.",
    airlineNoteKo:
      "3.7V 기준 44.4Wh로 기내 반입이 완벽히 자유로우면서도 65W~130W 고출력을 지원하는 프리미엄 모델이 많습니다.",
    recommendedWatts: 65,
  },
  {
    amount: 15000,
    slug: "15000",
    typicalUseEn: "Mid-size all-day travel & AC-plug hybrid charger (~2.5–3.0 phone charges)",
    typicalUseKo: "중형 멀티 여행용 & 콘센트 일체형 보조배터리 (스마트폰 약 2.5~3회 완충)",
    exampleModelsEn: "Anker Fusion 15K, Ugreen Nexode 15,000mAh",
    exampleModelsKo: "앤커 퓨전 15000mAh, 유그린 15000mAh PD 보조배터리",
    airlineNoteEn:
      "55.5 Wh @ 3.7V—100% carry-on approved on all airlines without check-in counter stickers.",
    airlineNoteKo:
      "3.7V 기준 55.5Wh로 전 세계 모든 여객기 기내에 승인 절차 없이 휴대 탑승할 수 있습니다.",
    recommendedWatts: 45,
  },
  {
    amount: 20000,
    slug: "20000",
    typicalUseEn: "Sweet-spot laptop + phone international flight bank (~3.3 phone or ~1.15 laptop charges)",
    typicalUseKo: "해외여행·노트북 겸용 베스트셀러 용량 (스마트폰 3.3회 / 노트북 약 1.1회 완충)",
    exampleModelsEn: "Anker Prime 20,000mAh 200W, Ugreen Nexode 20K 130W, Samsung 20,000mAh 45W",
    exampleModelsKo: "삼성 45W 20000mAh, 앤커 프라임 20000mAh, 유그린 넥소드 20000mAh 130W",
    airlineNoteEn:
      "74.0 Wh @ 3.7V—the gold-standard travel size! Safely below 100 Wh on every airline (including Emirates' <100 Wh rule and Korean carriers).",
    airlineNoteKo:
      "3.7V 기준 74Wh로 100Wh 한도 이내여서 별도 항공사 승인 스티커 없이 전 세계 어디든 기내 반입이 가능한 최적의 대용량 규격입니다!",
    recommendedWatts: 65,
    featured: true,
  },
  {
    amount: 24000,
    slug: "24000",
    typicalUseEn: "140W USB-C PD 3.1 MacBook Pro & Steam Deck powerhouse (~88.8 Wh)",
    typicalUseKo: "140W 초고속 맥북 프로 · 스팀덱 전용 고성능 보조배터리 (88.8Wh)",
    exampleModelsEn: "Anker 737 PowerCore 24K (86.4Wh / 88.8Wh 140W PD 3.1)",
    exampleModelsKo: "앤커 737 파워코어 24000mAh 140W, Cuktech 24000mAh",
    airlineNoteEn:
      "88.8 Wh @ 3.7V (86.4 Wh @ 3.6V)—comfortably under 100 Wh, no airline approval needed!",
    airlineNoteKo:
      "3.7V 기준 88.8Wh(3.6V 셀 기준 86.4Wh)로 100Wh 미만이므로 항공사 사전 승인 없이 기내에 반입할 수 있습니다.",
    recommendedWatts: 140,
    featured: true,
  },
  {
    amount: 25000,
    slug: "25000",
    typicalUseEn: "High-capacity 100W–200W multi-laptop creator bank (~92.5 Wh)",
    typicalUseKo: "100W~200W 노트북·태블릿 동시 충전 크리에이터용 (92.5Wh)",
    exampleModelsEn: "Ugreen Nexode 25,000mAh 200W (90Wh), Cuktech 20 25,000mAh (90Wh)",
    exampleModelsKo: "유그린 넥소드 25000mAh 200W, 쿡테크 20호 25000mAh",
    airlineNoteEn:
      "92.5 Wh @ 3.7V (90.0 Wh @ 3.6V)—clears the ≤100 Wh carry-on gate worldwide without check-in stickers.",
    airlineNoteKo:
      "3.7V 기준 92.5Wh(3.6V 기준 90Wh)로 100Wh 이하 무승인 기내 반입 기준을 깔끔하게 통과합니다.",
    recommendedWatts: 140,
  },
  {
    amount: 26800,
    slug: "26800",
    typicalUseEn: "Classic FAA/TSA 99.16 Wh ceiling carry-on brick",
    typicalUseKo: "전통적인 항공 100Wh 한도 맞춤 대용량 보조배터리 (99.16Wh)",
    exampleModelsEn: "Anker PowerCore+ 26800 PD, Zendure SuperTank 26800",
    exampleModelsKo: "앤커 파워코어 26800 PD, 젠듀어 슈퍼탱크 26800mAh",
    airlineNoteEn:
      "99.16 Wh @ 3.7V—specifically engineered by manufacturers to stay just under 100.0 Wh without triggering airline approval!",
    airlineNoteKo:
      "3.7V 기준 99.16Wh로 제조사들이 항공 100Wh 무승인 커트라인 바로 아래에 맞추기 위해 설계한 클래식 규격입니다.",
    recommendedWatts: 100,
  },
  {
    amount: 27000,
    slug: "27000",
    typicalUseEn: "Exact 99.9 Wh TSA/IATA legal maximum carry-on power bank",
    typicalUseKo: "기내 무승인 반입 가능한 이론상 최대치 용량 (3.7V 기준 99.9Wh!)",
    exampleModelsEn: "27,000mAh 140W/240W USB-C PD 3.1 Laptop & CPAP Power Banks",
    exampleModelsKo: "27000mAh 140W 기내반입 최대용량 노트북·양압기 보조배터리",
    airlineNoteEn:
      "99.9 Wh @ 3.7V! Watch out: if built with 3.85V cells (103.95 Wh), it crosses 100 Wh and needs airline approval—always check the printed Wh label.",
    airlineNoteKo:
      "3.7V 기준 정확히 99.9Wh로 100Wh 이하 무승인 한도의 끝판왕입니다! 단, 3.85V 고전압 셀 제품일 경우 103.95Wh가 되어 카운터 승인이 필요하니 뒷면 Wh 표기를 꼭 확인하세요.",
    recommendedWatts: 140,
    featured: true,
  },
  {
    amount: 27650,
    slug: "27650",
    typicalUseEn: "250W flagship 3.6V 21700-cell max-legal carry-on bank (99.54 Wh!)",
    typicalUseKo: "앤커 프라임 등 3.6V 원통형 셀 기반 99.54Wh 초고출력 플래그십",
    exampleModelsEn: "Anker Prime 27,650mAh 250W Power Bank (Rated 99.54 Wh @ 3.6V)",
    exampleModelsKo: "앤커 프라임 27650mAh 250W 보조배터리 (정격 99.54Wh)",
    airlineNoteEn:
      "Why isn't 27,650 mAh over 100 Wh? Because it uses 3.6V 21700 cells: 27,650 × 3.6 ÷ 1000 = 99.54 Wh! 100% carry-on legal without approval (though >102 Wh if calculated at 3.7V—point security to the printed 99.54 Wh label!).",
    airlineNoteKo:
      "3.7V로 계산하면 102.3Wh처럼 보이지만, 실제 3.6V 21700 셀을 사용해 정격 표기가 '99.54Wh'로 인쇄되어 있어 100Wh 이하 무승인 기내 반입이 합법적으로 가능합니다!",
    recommendedWatts: 140,
    featured: true,
  },
  {
    amount: 30000,
    slug: "30000",
    typicalUseEn: "111 Wh heavy-duty multi-day bank — REQUIRES AIRLINE APPROVAL!",
    typicalUseKo: "111Wh 대용량 보조배터리 — 항공사 체크인 카운터 사전 승인 필수!",
    exampleModelsEn: "Baseus 30,000mAh 65W, Romoss Sense 8P+ 30,000mAh, Xiaomi 30K",
    exampleModelsKo: "베이스어스 30000mAh 65W, 샤오미 30000mAh, 로모스 30000mAh",
    airlineNoteEn:
      "111.0 Wh @ 3.7V — CROSSES THE 100 Wh LIMIT! Allowed in carry-on ONLY with explicit airline check-in desk approval & sticker (max 2 pcs). Banned completely on Emirates!",
    airlineNoteKo:
      "주의! 3.7V 기준 111Wh로 100Wh를 초과합니다! 그냥 보안검색대로 가면 적발되므로 반드시 발권 카운터에서 항공사 승인 스티커(최대 2개)를 받아야 하며, 에미레이트항공 등 일부 외항사는 반입이 아예 불가합니다.",
    recommendedWatts: 65,
    featured: true,
  },
  {
    amount: 40000,
    slug: "40000",
    typicalUseEn: "148 Wh expedition & CPAP battery — AIRLINE APPROVAL REQUIRED (Max 2)",
    typicalUseKo: "148Wh 장박·촬영·양압기용 대용량 — 항공사 사전 승인 시 최대 2개 기내 반입",
    exampleModelsEn: "Mophie Powerstation XXL 40K, Romoss 40,000mAh, Movano 148Wh",
    exampleModelsKo: "40000mAh 100W 대용량 보조배터리, 방송용 V마운트 148Wh 배터리",
    airlineNoteEn:
      "148.0 Wh @ 3.7V — sits near the upper ceiling of the 100.1–160 Wh approval band. Visit a staffed airline check-in counter for inspection stickers; max 2 units.",
    airlineNoteKo:
      "3.7V 기준 148Wh로 항공기 반입 마지노선(160Wh 이하) 구간에 해당합니다. 반드시 유인 체크인 카운터에서 사전 승인 및 스티커 부착(1인 최대 2개) 절차를 거쳐야 합니다.",
    recommendedWatts: 100,
    featured: true,
  },
  {
    amount: 50000,
    slug: "50000",
    typicalUseEn: "185 Wh camping brick — STRICTLY BANNED ON ALL PASSENGER FLIGHTS!",
    typicalUseKo: "185Wh 캠핑·노점용 초대용량 — 여객기 기내·위탁 모두 반입 절대 금지!",
    exampleModelsEn: "50,000mAh LED lantern camping power banks (185 Wh @ 3.7V)",
    exampleModelsKo: "50000mAh 캠핑용 랜턴 보조배터리 (3.7V 기준 185Wh)",
    airlineNoteEn:
      "185.0 Wh @ 3.7V — EXCEEDS 160 Wh! Strictly illegal on all commercial passenger planes (carry-on AND checked). Security will confiscate it at the airport.",
    airlineNoteKo:
      "경고! 3.7V 기준 185Wh로 국제 항공 위험물 기준(160Wh 초과)에 걸려 기내 휴대와 위탁수하물 모두 절대 반입할 수 없습니다. 공항에 가져가면 100% 폐기해야 합니다.",
    recommendedWatts: 65,
    featured: true,
  },
  {
    amount: 60000,
    slug: "60000",
    typicalUseEn: "192–222 Wh mini power station — BANNED ON AIRCRAFT (Road/Camp Only)",
    typicalUseKo: "192~222Wh 미니 파워뱅크 — 항공기 반입 불가 (차박·캠핑 전용)",
    exampleModelsEn: "Anker 548 PowerCore Reserve 60,000mAh (192Wh LiFePO4)",
    exampleModelsKo: "앤커 548 60000mAh 192Wh 캠핑용 보조배터리",
    airlineNoteEn:
      "192 Wh (3.2V LiFePO4) to 222 Wh (3.7V Li-ion)—exceeds 160 Wh and is strictly prohibited on passenger aircraft.",
    airlineNoteKo:
      "인산철(3.2V) 기준 192Wh, 리튬이온(3.7V) 기준 222Wh로 160Wh를 초과하므로 여객기 반입이 전면 금지됩니다.",
    recommendedWatts: 60,
  },
  {
    amount: 80000,
    slug: "80000",
    typicalUseEn: "256–296 Wh outdoor laptop & telescope station — BANNED ON FLIGHTS",
    typicalUseKo: "256~296Wh 야외 촬영·천체관측·낚시용 파워뱅크 — 항공기 반입 금지",
    exampleModelsEn: "80,000mAh DC/USB-C outdoor battery stations",
    exampleModelsKo: "80000mAh 대용량 낚시·차박 보조배터리",
    airlineNoteEn:
      "296 Wh @ 3.7V—nearly double the 160 Wh aviation limit. Ground transport only.",
    airlineNoteKo:
      "3.7V 기준 296Wh로 항공기 반입 한도(160Wh)를 크게 초과하여 육상·해상 이동 시에만 휴대 가능합니다.",
    recommendedWatts: 100,
  },
  {
    amount: 100000,
    slug: "100000",
    typicalUseEn: "320–370 Wh portable power station — STRICTLY BANNED ON FLIGHTS",
    typicalUseKo: "320~370Wh 포터블 파워스테이션 — 항공기 반입 절대 금지 (캠핑 전용)",
    exampleModelsEn: "EcoFlow River 3 (~245–300Wh), Jackery Explorer 300, 100,000mAh stations",
    exampleModelsKo: "에코플로우 리버 시리즈, 잭커리 300, 100000mAh 파워뱅크",
    airlineNoteEn:
      "370 Wh @ 3.7V (or 1,280 Wh if rated at 12.8V pack voltage!)—strictly forbidden on passenger aircraft.",
    airlineNoteKo:
      "셀 기준 370Wh(12.8V 팩 기준 1,280Wh)의 대용량 파워스테이션으로 여객기 반입이 절대 불가능합니다.",
    recommendedWatts: 100,
  },
  {
    amount: 200000,
    slug: "200000",
    typicalUseEn: "640–740 Wh LiFePO4 car-camping & blackout backup station — GROUND ONLY",
    typicalUseKo: "640~740Wh 차박·전기담요·정전 대비 인산철 파워뱅크 — 육상 전용",
    exampleModelsEn: "EcoFlow River 2 Pro (768Wh), Bluetti EB70S (716Wh)",
    exampleModelsKo: "에코플로우 리버 2 프로, 블루에티 700Wh급 인산철 파워뱅크",
    airlineNoteEn:
      "740 Wh @ 3.7V—over 4.6x the 160 Wh aircraft limit. Ship via certified Class 9 ground/sea freight only.",
    airlineNoteKo:
      "740Wh급 파워뱅크는 항공 여객기 반입이 절대 불가하며 차량 캠핑·비상 전원용으로만 사용해야 합니다.",
    recommendedWatts: 100,
  },
  {
    amount: 300000,
    slug: "300000",
    typicalUseEn: "960–1,110 Wh (~1 kWh) full-size LiFePO4 solar generator — GROUND ONLY",
    typicalUseKo: "약 1kWh(960~1,110Wh) 대용량 인산철 파워스테이션 — 항공 반입 절대 불가",
    exampleModelsEn: "EcoFlow Delta 2 / Delta 3 (1,024Wh), Jackery Explorer 1000 v2 (1,070Wh)",
    exampleModelsKo: "에코플로우 델타 2 / 델타 3 (1024Wh), 잭커리 1000 v2 인산철 파워뱅크",
    airlineNoteEn:
      "1,110 Wh (1.11 kWh) @ 3.7V cell-equivalent—almost 7x the maximum 160 Wh limit allowed on planes! Strictly prohibited on all flights.",
    airlineNoteKo:
      "약 1.11kWh(1,110Wh)의 캠핑·가정용 대용량 파워스테이션으로 항공기 반입 한도(160Wh)의 약 7배에 달해 비행기 반입이 절대 불가합니다.",
    recommendedWatts: 140,
    featured: true,
  },
];

export function getMahCapacityByAmount(amountStr: string): MahCapacityPage | undefined {
  const num = Number(amountStr);
  if (!Number.isFinite(num)) return undefined;
  return MAH_CAPACITIES.find((m) => m.amount === num || m.slug === amountStr);
}
