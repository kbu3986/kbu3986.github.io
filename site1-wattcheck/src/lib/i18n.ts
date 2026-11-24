import type { Metadata } from "next";

export type Locale = "en" | "ko";
export const LOCALES: Locale[] = ["en", "ko"];

export function isValidLocale(value: string): value is Locale {
  return value === "en" || value === "ko";
}

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://kbu3986.github.io/wattcheck-global"
).replace(/\/$/, "");

export function buildAlternates(locale: Locale, subPath: string = ""): Metadata["alternates"] {
  const normalizedSub = subPath
    ? subPath.startsWith("/")
      ? subPath
      : `/${subPath}`
    : "";

  return {
    canonical: `${SITE_URL}/${locale}${normalizedSub}`,
    languages: {
      en: `${SITE_URL}/en${normalizedSub}`,
      ko: `${SITE_URL}/ko${normalizedSub}`,
      "x-default": `${SITE_URL}/en${normalizedSub}`,
    },
  };
}

export const DICTIONARY = {
  en: {
    brandName: "WattCheck",
    brandTagline: "Airline Power Bank Wh Rules & Device Charge Sizer",
    nav: {
      calculator: "Wh Calculator",
      airlines: "Airline Rules",
      devices: "Device Sizer",
      mahChart: "mAh to Wh Chart",
      koreaRules: "Korea 2026 Rules",
    },
    hero: {
      badge: "2026 IATA · TSA/FAA · Korea MOLIT Aviation Rules Updated",
      title: "Can I Bring My Power Bank on a Plane?",
      subtitle:
        "Convert mAh ↔ Wh ↔ kWh instantly, check 2026 airline carry-on battery rules (including Korea's zip-lock & overhead-bin ban), and calculate exact 0–100% charges for 40+ devices.",
    },
    calc: {
      title: "Bidirectional mAh ↔ Wh ↔ kWh Calculator",
      subtitle: "Type in any field — mAh, Wh, or kWh updates instantaneously",
      mahLabel: "Capacity (mAh)",
      whLabel: "Energy (Wh — Airline Metric)",
      kwhLabel: "Kilowatt-Hours (kWh)",
      voltageLabel: "Nominal Battery Voltage (V)",
      customVoltage: "Custom Voltage (V)",
      efficiencyLabel: "Real-World USB-C DC-DC Conversion Efficiency",
      efficiencyHint:
        "Standard power banks step 3.7V cells up to 5V/9V/20V USB-C PD, losing ~15–20% as heat. 82% is the lab-verified average.",
      ratedEnergy: "Rated Label Wh",
      netUsableEnergy: "Net Usable Wh",
      quickPresets: "Popular Power Bank Sizes:",
      formulaNote: "Formula: Wh = (mAh × V) ÷ 1,000  |  Net Wh = Wh × Efficiency%",
    },
    verdict: {
      checkedBagWarning: "NEVER pack lithium power banks in checked luggage — carry-on cabin ONLY.",
      green: {
        badge: "CARRY-ON APPROVED (≤ 100 Wh)",
        title: "Allowed in Cabin Worldwide Without Airline Approval",
        desc: "Cleared on TSA/FAA, EASA, IATA, Korean Air, Delta,ANA, and 99% of global airlines as carry-on baggage. Keep the printed Wh/mAh label legible.",
        piecesGlobal: "Global IATA/FAA: Up to 20 spare batteries (carrier limits apply)",
        piecesKorea: "Korean Airlines (2026): Up to 5 pcs (≤100Wh) without approval",
      },
      amber: {
        badge: "AIRLINE APPROVAL REQUIRED (100.1 – 160 Wh)",
        title: "Check-In Counter Inspection & Approval Required (Max 2 pcs)",
        desc: "Batteries between 100.1 Wh and 160 Wh require explicit airline check-in desk approval and an inspection sticker. Strict maximum of 2 pieces per passenger; banned in checked bags.",
        piecesGlobal: "Global Limit: Max 2 pieces with prior airline approval",
        piecesKorea: "Korean Airlines (2026): Check-in counter sticker + individual insulation pouch mandatory",
      },
      red: {
        badge: "STRICTLY BANNED ON FLIGHTS (> 160 Wh)",
        title: "Prohibited on All Passenger Aircraft (Carry-On & Checked)",
        desc: "Lithium batteries exceeding 160 Wh are classified as Class 9 Dangerous Goods and cannot fly on commercial passenger planes—neither in the cabin nor in checked luggage.",
        piecesGlobal: "0 pieces allowed on passenger flights (Cargo DG freight only)",
        piecesKorea: "Confiscated at airport security screening worldwide",
      },
    },
    koreaChecklist: {
      badge: "2025–2026 South Korea Aviation Safety Mandate (MOLIT)",
      title: "Mandatory Korean Airline Power Bank Cabin Rules",
      subtitle:
        "Enforced since March 2025 across Korean Air, Asiana, Jeju Air, Jin Air, T'way, Air Premia, Air Busan, and flights departing Korean airports:",
      items: [
        {
          title: "1. Overhead Bin Storage STRICTLY BANNED",
          desc: "Power banks and e-cigarettes must NEVER be placed inside overhead luggage bins. Keep them on your person or inside the seat-back pocket in front of you.",
        },
        {
          title: "2. Terminal Insulation Tape OR Clear Zip-Lock Pouch",
          desc: "Every power bank must have exposed USB ports covered with insulating tape, port caps, OR be stored individually inside a transparent zip-lock plastic bag / protective pouch.",
        },
        {
          title: "3. In-Flight Power Bank Charging Ban",
          desc: "Charging a power bank using the aircraft's in-seat USB/AC port is prohibited, and Korean carriers prohibit using power banks to charge devices mid-flight—verify crew announcements.",
        },
        {
          title: "4. Quantity & Sticker Tier (≤100Wh: Max 5 pcs / 100–160Wh: Max 2 pcs)",
          desc: "Up to 5 units ≤100Wh allowed per passenger without approval; 100.1–160Wh capped at 2 units with mandatory check-in counter approval stickers. Unlabeled batteries are refused.",
        },
      ],
    },
    estimator: {
      title: "Real-World Device Charge Estimator (0 → 100%)",
      subtitle: "Calculated using net usable Wh after DC-DC voltage boost losses",
      chargesUnit: "full charges",
      viewDeviceGuide: "Full Charging Spec →",
      allCategories: "All",
      categories: {
        smartphone: "Phones",
        laptop: "Laptops",
        tablet: "Tablets",
        handheld: "Gaming",
        "drone-camera": "Drones & Cam",
        "cpap-medical": "CPAP & XR",
      },
    },
    affiliate: {
      headingEn: "Recommended Travel-Safe Power Banks for Your Size",
      subEn: "Matched to your calculated Wh tier & USB-C PD output requirements",
      ctaAmazon: "Check Price on Amazon",
      ctaCoupang: "쿠팡 최저가 확인하기",
      ftcDisclosureEn:
        "Disclosure: As an Amazon Associate, WattCheck earns from qualifying purchases at no additional cost to you.",
      ftcDisclosureKo:
        "이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.",
    },
    footer: {
      about:
        "WattCheck provides engineering-accurate battery Wh conversions, 2026 global airline carry-on compliance matrices, and USB-C PD device sizing.",
      disclaimer:
        "Always verify your battery's printed factory Wh rating and consult your operating carrier before departure, as airport security officers hold final discretion.",
      quickLinks: "Programmatic Directories",
      popularAirlines: "Top Airline Rules",
      popularDevices: "Top Device Guides",
      popularMah: "Popular mAh Conversions",
    },
  },
  ko: {
    brandName: "와트체크 (WattCheck)",
    brandTagline: "항공기 보조배터리 기내반입 Wh 계산기 & 기기별 충전 횟수 가이드",
    nav: {
      calculator: "Wh 계산기",
      airlines: "항공사별 규정",
      devices: "기기별 충전횟수",
      mahChart: "mAh → Wh 변환표",
      koreaRules: "2026 국내선·국제선 규정",
    },
    hero: {
      badge: "2025–2026 국토교통부 보조배터리 기내반입 강화 규정 완벽 반영",
      title: "내 보조배터리, 비행기 기내 반입 될까?",
      subtitle:
        "mAh ↔ Wh ↔ kWh 양방향 실시간 변환부터 100Wh·160Wh 기내 반입 판정, 지퍼백·절연테이프·선반 보관 금지 체크리스트, 스마트폰·노트북 실사용 완충 횟수까지 한 번에 확인하세요.",
    },
    calc: {
      title: "mAh ↔ Wh ↔ kWh 실시간 양방향 계산기",
      subtitle: "mAh, Wh, kWh 중 아무 칸이나 입력하면 즉시 자동 변환됩니다",
      mahLabel: "배터리 용량 (mAh)",
      whLabel: "전력량 (Wh — 항공사 반입 기준)",
      kwhLabel: "킬로와트시 (kWh)",
      voltageLabel: "배터리 정격 전압 (V)",
      customVoltage: "직접 전압 입력 (V)",
      efficiencyLabel: "실사용 DC-DC 승압 변환 효율",
      efficiencyHint:
        "보조배터리 내부 셀(3.7V)을 USB-C 고속충전(5V/9V/20V)으로 승압할 때 열 손실로 약 15~20%가 소모됩니다. 평균 실사용 효율은 82%입니다.",
      ratedEnergy: "표기 정격 용량 (Wh)",
      netUsableEnergy: "실제 가용 용량 (Wh)",
      quickPresets: "자주 찾는 보조배터리 용량:",
      formulaNote: "계산 공식: Wh = (mAh × V) ÷ 1,000  |  실사용 Wh = 정격 Wh × 변환효율%",
    },
    verdict: {
      checkedBagWarning: "위탁수하물(부치는 짐) 반입 절대 금지 — 반드시 승객이 직접 휴대하여 기내 탑승!",
      green: {
        badge: "기내 반입 가능 (100Wh 이하 · 승인 불필요)",
        title: "전 세계 항공사 승인 없이 기내 휴대 반입 가능",
        desc: "대한항공, 아시아나, 제주항공, 진에어, 티웨이 및 미국 TSA/전 세계 항공사 기내 반입 기준(100Wh 이하)을 통과합니다. 용량 표기 라벨이 지워지지 않았는지 확인하세요.",
        piecesGlobal: "해외 일반 항공사: 최대 15~20개 기내 휴대 가능 (항공사별 상이)",
        piecesKorea: "한국 국적기(2026): 1인당 최대 5개까지 항공사 승인 없이 반입 가능",
      },
      amber: {
        badge: "항공사 사전 승인 필수 (100.1 ~ 160Wh)",
        title: "체크인 카운터 승인 스티커 부착 시 기내 반입 가능 (최대 2개)",
        desc: "100Wh 초과 ~ 160Wh 이하 대용량 배터리는 공항 발권 카운터에서 항공사 확인 및 승인 스티커를 받아야 하며, 1인당 최대 2개까지만 기내 휴대할 수 있습니다.",
        piecesGlobal: "국제 공통 기준: 항공사 사전 승인 시 1인 최대 2개",
        piecesKorea: "한국 국적기(2026): 발권 카운터 승인 스티커 부착 + 개별 지퍼백/절연 조치 필수",
      },
      red: {
        badge: "항공기 반입 절대 금지 (160Wh 초과)",
        title: "여객기 기내 휴대 및 위탁수하물 모두 반입 불가",
        desc: "160Wh를 초과하는 대용량 파워뱅크·캠핑용 배터리는 국제항공운송협회(IATA) 위험물로 분류되어 여객기에 절대 실을 수 없습니다. 공항 보안검색대에서 즉시 적발·폐기됩니다.",
        piecesGlobal: "여객기 반입 0개 (위험물 화물기 별도 신고 운송만 가능)",
        piecesKorea: "인천·김포 등 모든 공항 보안검색대 통과 불가",
      },
    },
    koreaChecklist: {
      badge: "2025–2026 대한민국 국토교통부 기내 안전 의무 수칙",
      title: "한국 출발 및 국적 항공사 보조배터리 필수 체크리스트",
      subtitle:
        "2025년 3월부터 대한항공·아시아나·제주항공·진에어·티웨이·에어프레미아·에어부산 등 전 국적기에서 시행 중인 핵심 규정입니다:",
      items: [
        {
          title: "1. 기내 머리 위 선반(오버헤드 빈) 보관 절대 금지",
          desc: "보조배터리와 전자담배는 기내 선반에 넣을 수 없습니다. 반드시 몸에 지니거나 앞좌석 등받이 주머니에 눈에 보이게 보관해야 합니다.",
        },
        {
          title: "2. 투명 지퍼백 개별 보관 또는 단자 절연테이프 부착",
          desc: "합선(단락) 방지를 위해 보조배터리를 1개씩 투명 비닐 지퍼백/전용 파우치에 넣거나, USB 노출 단자에 절연테이프·보호캡을 부착해야 합니다.",
        },
        {
          title: "3. 기내 보조배터리 충전 및 사용 제한",
          desc: "기내 좌석 USB 포트로 보조배터리를 충전하는 행위는 엄격히 금지되며, 운항 중 보조배터리를 이용한 기기 충전 역시 제한됩니다.",
        },
        {
          title: "4. 용량별 개수 제한 (100Wh 이하 5개 / 100~160Wh 2개 승인)",
          desc: "100Wh 이하는 1인 5개까지 무승인 반입(6개 이상은 의료 등 사유 승인 필요), 100~160Wh는 카운터 승인 스티커 부착 후 최대 2개까지 허용됩니다. 용량 미표기 제품은 반입 거절됩니다.",
        },
      ],
    },
    estimator: {
      title: "스마트폰 · 노트북 · 게임기 실사용 완충 횟수 (0 → 100%)",
      subtitle: "승압 열 손실을 반영한 실사용 Wh 기준으로 정확하게 계산합니다",
      chargesUnit: "회 완충",
      viewDeviceGuide: "상세 충전 스펙 보기 →",
      allCategories: "전체",
      categories: {
        smartphone: "스마트폰",
        laptop: "노트북",
        tablet: "태블릿",
        handheld: "휴대용 게임기",
        "drone-camera": "드론·카메라",
        "cpap-medical": "양압기·기타",
      },
    },
    affiliate: {
      headingEn: "Recommended Travel-Safe Power Banks",
      subEn: "기내 반입 규정을 준수하는 용량별 맞춤 보조배터리 & 준비물 추천",
      ctaAmazon: "Amazon 가격 확인",
      ctaCoupang: "쿠팡에서 최저가 보기",
      ftcDisclosureEn:
        "Disclosure: As an Amazon Associate, WattCheck earns from qualifying purchases.",
      ftcDisclosureKo:
        "이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.",
    },
    footer: {
      about:
        "와트체크(WattCheck)는 정확한 배터리 Wh 변환 공식과 2026년 최신 국내외 항공사 기내 반입 규정, 기기별 USB-C PD 충전 가이드를 제공합니다.",
      disclaimer:
        "보조배터리 본체에 인쇄된 정격 용량(Wh/mAh) 라벨이 훼손된 경우 보안검색대에서 반입이 거절될 수 있으므로 출국 전 반드시 실물 표기를 확인하세요.",
      quickLinks: "전체 디렉토리 바로가기",
      popularAirlines: "주요 항공사 반입 규정",
      popularDevices: "인기 기기별 배터리 용량",
      popularMah: "용량별 mAh → Wh 계산",
    },
  },
} as const;

export function getDictionary(locale: Locale) {
  return DICTIONARY[locale];
}
