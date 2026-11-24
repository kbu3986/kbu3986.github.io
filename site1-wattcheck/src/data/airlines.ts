export type AirlineRegion = "korea" | "north-america" | "europe" | "asia-pacific" | "middle-east";

export interface AirlineRule {
  slug: string;
  iataCode: string;
  nameEn: string;
  nameKo: string;
  countryEn: string;
  countryKo: string;
  region: AirlineRegion;
  isKoreanRuleApplicable: boolean;
  maxWhNoApproval: number;
  maxPiecesUnder100Wh: number;
  allows100To160Wh: boolean;
  maxPieces100To160Wh: number;
  checkedBaggageAllowed: false;
  overheadBinAllowed: boolean;
  inFlightUseAllowed: boolean;
  requiresInsulationOrPouch: boolean;
  requiresCccMark?: boolean;
  summaryEn: string;
  summaryKo: string;
  cabinPolicyEn: string;
  cabinPolicyKo: string;
  checkInTipEn: string;
  checkInTipKo: string;
  featured?: boolean;
}

export const AIRLINES: AirlineRule[] = [
  // --- USA / GLOBAL REGULATOR (1) ---
  {
    slug: "tsa-faa",
    iataCode: "TSA/FAA",
    nameEn: "TSA & FAA (US Flights)",
    nameKo: "미국 교통안전청 TSA / 연방항공청 FAA",
    countryEn: "United States",
    countryKo: "미국",
    region: "north-america",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 20,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: true,
    inFlightUseAllowed: true,
    requiresInsulationOrPouch: false,
    summaryEn:
      "Spare lithium-ion power banks ≤100 Wh (~27,000 mAh @ 3.7V) are permitted in carry-on bags only. 101–160 Wh requires airline approval (max 2). Strictly banned in checked bags.",
    summaryKo:
      "100Wh 이하 보조배터리는 기내 휴대수하물로 반입 가능하며 위탁수하물은 전면 금지됩니다. 101~160Wh는 항공사 사전 승인 시 최대 2개까지 허용됩니다.",
    cabinPolicyEn:
      "FAA PackSafe rules allow personal-use quantities (typically up to 20 spare batteries ≤100 Wh across devices) in carry-on baggage with terminals protected from short circuits. Never place power banks in gate-checked bags.",
    cabinPolicyKo:
      "미국 국내선 및 미국 출발편 보안검색(TSA) 통과 시 보조배터리는 반드시 기내 가방에 넣어야 하며, 탑승구 앞에서 캐리어를 위탁(Gate-check)할 때도 보조배터리는 반드시 꺼내어 탑승해야 합니다.",
    checkInTipEn:
      "If flying a regional jet where roller bags are gate-checked, pull your power bank out into your personal backpack before boarding.",
    checkInTipKo:
      "소형 국내선 탑승 시 기내용 캐리어를 탑승구에서 위탁하는 경우가 많으므로, 보조배터리는 처음부터 백팩이나 크로스백에 보관하세요.",
    featured: true,
  },

  // --- SOUTH KOREA CARRIERS (9) — 2025–2026 MOLIT Strict Rules ---
  {
    slug: "korean-air",
    iataCode: "KE",
    nameEn: "Korean Air",
    nameKo: "대한항공 (Korean Air)",
    countryEn: "South Korea",
    countryKo: "대한민국",
    region: "korea",
    isKoreanRuleApplicable: true,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 5,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: false,
    inFlightUseAllowed: false,
    requiresInsulationOrPouch: true,
    summaryEn:
      "≤100 Wh: Max 5 pcs carry-on without approval. 100.1–160 Wh: Max 2 pcs with check-in sticker. Overhead bin storage & in-flight charging banned; zip-lock pouch or terminal tape mandatory.",
    summaryKo:
      "100Wh 이하 최대 5개 무승인 기내 반입, 100~160Wh는 체크인 카운터 승인 스티커 부착 후 최대 2개 반입. 기내 선반 보관 및 기내 사용/충전 금지, 투명 지퍼백 또는 절연테이프 필수.",
    cabinPolicyEn:
      "Under South Korea's 2025–2026 MOLIT directive, Korean Air provides clear zip-lock bags at check-in/gates if needed, prohibits storing power banks in overhead bins, and prohibits charging or discharging power banks during flight.",
    cabinPolicyKo:
      "국토교통부 및 한진그룹 항공 안전 강화 지침에 따라 기내 선반(오버헤드 빈) 보관이 엄격히 금지되며 좌석 주머니나 몸에 소지해야 합니다. 또한 기내에서 보조배터리를 충전하거나 보조배터리로 휴대폰을 충전하는 행위가 금지됩니다.",
    checkInTipEn:
      "Place each battery in its own transparent zip-lock bag before security and keep it in your seat-back pocket during flight.",
    checkInTipKo:
      "출국 전 다이소 투명 지퍼백이나 절연테이프를 미리 준비해 단자를 마감하면 공항 카운터 및 보안검색을 훨씬 빠르게 통과합니다.",
    featured: true,
  },
  {
    slug: "asiana-airlines",
    iataCode: "OZ",
    nameEn: "Asiana Airlines",
    nameKo: "아시아나항공 (Asiana Airlines)",
    countryEn: "South Korea",
    countryKo: "대한민국",
    region: "korea",
    isKoreanRuleApplicable: true,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 5,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: false,
    inFlightUseAllowed: false,
    requiresInsulationOrPouch: true,
    summaryEn:
      "≤100 Wh up to 5 pcs carry-on; 100.1–160 Wh max 2 pcs with Asiana counter approval sticker. Must be insulated in pouch/tape and kept at your seat (never in overhead bins).",
    summaryKo:
      "100Wh 이하 1인 5개 기내 휴대, 100~160Wh 카운터 승인 스티커 부착 후 최대 2개 허용. 기내 선반 보관 절대 금지 및 개별 지퍼백/절연테이프 단자 보호 필수.",
    cabinPolicyEn:
      "Asiana enforces full 2025–2026 Korean aviation battery rules: short-circuit insulation (zip-lock bag or port tape), strict ban on overhead compartment storage, and ban on in-flight power bank charging/discharging.",
    cabinPolicyKo:
      "아시아나항공 전 노선에서 보조배터리는 선반에 넣을 수 없으며 좌석 앞 주머니 또는 직접 소지해야 합니다. 기내 보조배터리 충전 및 사용 역시 제한되므로 기내 좌석 자체 USB 포트를 직접 기기에 연결하세요.",
    checkInTipEn:
      "If bringing 100.1–160 Wh batteries, skip self-bag-drop and visit an Asiana staffed check-in desk for inspection stickers.",
    checkInTipKo:
      "100Wh 초과(예: 30,000mAh 111Wh) 배터리는 모바일 체크인 후에도 반드시 유인 카운터에 들러 용량 확인 스티커를 부착받아야 합니다.",
    featured: true,
  },
  {
    slug: "jeju-air",
    iataCode: "7C",
    nameEn: "Jeju Air",
    nameKo: "제주항공 (Jeju Air)",
    countryEn: "South Korea",
    countryKo: "대한민국",
    region: "korea",
    isKoreanRuleApplicable: true,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 5,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: false,
    inFlightUseAllowed: false,
    requiresInsulationOrPouch: true,
    summaryEn:
      "Strict 2026 Korean LCC enforcement: ≤100 Wh max 5 pcs, 100.1–160 Wh max 2 pcs with counter approval. Visible personal storage & port insulation required; no in-flight use.",
    summaryKo:
      "100Wh 이하 5개, 100~160Wh 카운터 승인 시 2개 기내 반입 가능. 모바일/키오스크 탑승 수속 시 배터리 규정 동의 필수, 선반 보관 및 기내 사용 금지.",
    cabinPolicyEn:
      "Jeju Air requires passengers to confirm lithium battery compliance at kiosk/mobile check-in, keep insulated power banks visibly in the seat pocket or on person, and refrain from using power banks mid-flight.",
    cabinPolicyKo:
      "제주항공은 탑승구 및 기내에서 승무원이 보조배터리 소지 위치를 수시 점검합니다. 캐리어 안에 넣은 채 선반에 올리지 않도록 탑승 직전 반드시 손에 꺼내 두세요.",
    checkInTipEn:
      "Make sure the factory Wh or mAh/V print on your power bank isn't rubbed off—Jeju Air gate staff reject faded labels.",
    checkInTipKo:
      "오래 써서 글씨가 지워진 보조배터리는 용량 확인 불가로 보안검색대에서 압수될 수 있으니 출국 전 인쇄 상태를 꼭 확인하세요.",
    featured: true,
  },
  {
    slug: "jin-air",
    iataCode: "LJ",
    nameEn: "Jin Air",
    nameKo: "진에어 (Jin Air)",
    countryEn: "South Korea",
    countryKo: "대한민국",
    region: "korea",
    isKoreanRuleApplicable: true,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 5,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: false,
    inFlightUseAllowed: false,
    requiresInsulationOrPouch: true,
    summaryEn:
      "≤100 Wh max 5 pcs carry-on; 100.1–160 Wh max 2 pcs with counter sticker. Overhead bin storage & in-flight charging/use strictly prohibited.",
    summaryKo:
      "100Wh 이하 최대 5개 기내 휴대, 100~160Wh 카운터 승인 후 최대 2개 허용. 기내 선반 보관 및 기내 보조배터리 사용·충전 전면 금지.",
    cabinPolicyEn:
      "Aligned with Hanjin Group & MOLIT safety standards, Jin Air bans both charging power banks and using power banks to charge phones/tablets onboard, and mandates zip-lock/tape port protection.",
    cabinPolicyKo:
      "한진그룹 통합 안전 지침에 따라 진에어 전 항공편 기내에서 보조배터리를 이용한 기기 충전이 금지되며, 단자 절연 후 좌석 주머니에 보관해야 합니다.",
    checkInTipEn:
      "Charge your phone to 100% at airport boarding gate outlets before boarding Jin Air since LCC seats lack USB ports and power bank use is banned.",
    checkInTipKo:
      "진에어 기재 특성상 좌석 USB 포트가 없는 항공기가 많고 기내 보조배터리 사용도 제한되므로 탑승 게이트 충전존에서 휴대폰을 미리 충전하세요.",
  },
  {
    slug: "tway-air",
    iataCode: "TW",
    nameEn: "T'way Air",
    nameKo: "티웨이항공 (T'way Air)",
    countryEn: "South Korea",
    countryKo: "대한민국",
    region: "korea",
    isKoreanRuleApplicable: true,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 5,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: false,
    inFlightUseAllowed: false,
    requiresInsulationOrPouch: true,
    summaryEn:
      "≤100 Wh up to 5 pcs without approval; 100.1–160 Wh max 2 pcs with check-in counter approval. Individual clear pouch or terminal tape mandatory; no overhead bin storage.",
    summaryKo:
      "100Wh 이하 최대 5개 무승인 반입, 100~160Wh 카운터 승인 시 최대 2개 허용. 투명 지퍼백 개별 포장 또는 절연테이프 부착 후 좌석 앞 주머니 보관 필수.",
    cabinPolicyEn:
      "Applies across both short-haul Asia routes and T'way long-haul European routes (Paris, Rome, Barcelona, Frankfurt): keep power banks insulated and out of overhead bins.",
    cabinPolicyKo:
      "일본·동남아 단거리뿐 아니라 유럽 장거리 노선에서도 동일하게 선반 보관 금지 및 지퍼백 절연 규정이 적용됩니다.",
    checkInTipEn:
      "On T'way long-haul A330/B777 flights, plug your phone directly into the seat USB port rather than using your power bank mid-flight.",
    checkInTipKo:
      "장거리 노선 탑승 시 보조배터리 대신 기내 좌석의 USB 충전 포트를 직접 이용해 스마트폰을 충전하세요.",
  },
  {
    slug: "air-premia",
    iataCode: "YP",
    nameEn: "Air Premia",
    nameKo: "에어프레미아 (Air Premia)",
    countryEn: "South Korea",
    countryKo: "대한민국",
    region: "korea",
    isKoreanRuleApplicable: true,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 5,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: false,
    inFlightUseAllowed: false,
    requiresInsulationOrPouch: true,
    summaryEn:
      "Long-haul Korean hybrid carrier (B787-9): ≤100 Wh max 5 pcs, 100.1–160 Wh max 2 pcs with approval. Zip-lock/tape insulation required; overhead bin storage prohibited.",
    summaryKo:
      "미주·아시아 노선 보잉 787-9 운항: 100Wh 이하 5개 무승인, 100~160Wh 카운터 승인 시 2개 허용. 지퍼백/절연테이프 필수 및 기내 선반 보관 금지.",
    cabinPolicyEn:
      "Air Premia's Boeing 787-9 Dreamliners feature AC/USB power at seats, while spare lithium power banks must stay insulated in your seat pocket and never in overhead compartments.",
    cabinPolicyKo:
      "에어프레미아 전 좌석에는 전원/USB 단자가 구비되어 있으므로 비행 중에는 좌석 전원을 활용하고 보조배터리는 지퍼백에 넣어 앞주머니에 보관하세요.",
    checkInTipEn:
      "Flying US-to-Incheon on Air Premia? Both TSA rules AND Korean MOLIT cabin storage rules apply simultaneously!",
    checkInTipKo:
      "LA·뉴욕·샌프란시스코에서 한국으로 귀국하는 에어프레미아 편에서도 한국 국적기 기내 보관 수칙(선반 금지·지퍼백)이 동일하게 적용됩니다.",
  },
  {
    slug: "air-busan",
    iataCode: "BX",
    nameEn: "Air Busan",
    nameKo: "에어부산 (Air Busan)",
    countryEn: "South Korea",
    countryKo: "대한민국",
    region: "korea",
    isKoreanRuleApplicable: true,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 5,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: false,
    inFlightUseAllowed: false,
    requiresInsulationOrPouch: true,
    summaryEn:
      "Strictest gate & cabin bag screening in Korea: bags tagged 'No Battery Inside' only go in overhead bins; all power banks must be hand-carried in clear pouches.",
    summaryKo:
      "탑승구 앞 휴대수하물 배터리 유무 확인 태그 부착 시행! 보조배터리는 반드시 가방에서 꺼내 투명 지퍼백에 담아 몸에 소지해야 하며 기내 선반 보관 및 사용 금지.",
    cabinPolicyEn:
      "Air Busan pioneered boarding-gate verification confirming zero batteries inside carry-on bags placed into overhead bins. Keep power banks in a clear zip-lock pouch on your person at boarding.",
    cabinPolicyKo:
      "에어부산은 탑승구에서 기내 선반에 올릴 가방 내부에 보조배터리가 없음을 확인한 뒤 별도 스티커/태그를 부착하므로 탑승 전 미리 보조배터리를 분리해 손에 드세요.",
    checkInTipEn:
      "Hold your clear zip-lock battery pouch visibly in hand at the Air Busan boarding gate for instant clearance.",
    checkInTipKo:
      "탑승구 줄을 설 때 투명 지퍼백에 넣은 보조배터리를 손에 들고 있으면 확인 절차가 5초 만에 끝납니다.",
  },
  {
    slug: "eastar-jet",
    iataCode: "ZE",
    nameEn: "Eastar Jet",
    nameKo: "이스타항공 (Eastar Jet)",
    countryEn: "South Korea",
    countryKo: "대한민국",
    region: "korea",
    isKoreanRuleApplicable: true,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 5,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: false,
    inFlightUseAllowed: false,
    requiresInsulationOrPouch: true,
    summaryEn:
      "≤100 Wh max 5 pcs carry-on; 100.1–160 Wh max 2 pcs with counter sticker. Terminal insulation/zip-lock required; overhead bin storage & mid-flight charging banned.",
    summaryKo:
      "100Wh 이하 5개 무승인 반입, 100~160Wh 카운터 승인 시 2개 허용. 단자 절연 및 투명 지퍼백 보관 필수, 기내 선반 보관 및 기내 사용 금지.",
    cabinPolicyEn:
      "Eastar Jet enforces the full Korean MOLIT cabin lithium safety protocol including port tape/zip-lock bags and personal seat-pocket custody.",
    cabinPolicyKo:
      "국토교통부 표준 지침에 따라 모든 보조배터리는 개별 절연 조치 후 승객이 직접 휴대하거나 앞좌석 포켓에 보관해야 합니다.",
    checkInTipEn:
      "Keep built-in-cable power banks inside a zip-lock bag so exposed USB-C tips cannot touch coins or keys.",
    checkInTipKo:
      "일체형 케이블 보조배터리도 노출된 C타입/8핀 단자가 금속과 닿지 않도록 투명 지퍼백에 개별 보관하세요.",
  },
  {
    slug: "air-seoul",
    iataCode: "RS",
    nameEn: "Air Seoul",
    nameKo: "에어서울 (Air Seoul)",
    countryEn: "South Korea",
    countryKo: "대한민국",
    region: "korea",
    isKoreanRuleApplicable: true,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 5,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: false,
    inFlightUseAllowed: false,
    requiresInsulationOrPouch: true,
    summaryEn:
      "≤100 Wh max 5 pcs carry-on; 100.1–160 Wh max 2 pcs with counter approval. Zip-lock/tape insulation mandatory; banned from overhead bins and in-flight use.",
    summaryKo:
      "100Wh 이하 5개 무승인, 100~160Wh 카운터 승인 시 2개 허용. 지퍼백/절연테이프 필수 및 기내 선반 보관·기내 충전 금지.",
    cabinPolicyEn:
      "Air Seoul follows the unified Korean Air/Asiana/MOLIT battery rulebook: zero batteries in checked luggage or overhead bins, zero in-flight power bank operation.",
    cabinPolicyKo:
      "에어서울 전 노선에서 보조배터리의 기내 선반 보관 및 비행 중 사용·충전이 금지되며, 단자 절연 후 직접 소지해야 합니다.",
    checkInTipEn:
      "Verify Wh capacity before heading to Incheon Airport—unmarked promotional power banks are confiscated.",
    checkInTipKo:
      "사은품으로 받은 무표기 보조배터리는 용량이 적어도 보안검색 통과가 불가하므로 정식 인증 표기 제품만 챙기세요.",
  },

  // --- NORTH AMERICA CARRIERS (4) ---
  {
    slug: "delta-air-lines",
    iataCode: "DL",
    nameEn: "Delta Air Lines",
    nameKo: "델타항공 (Delta Air Lines)",
    countryEn: "United States",
    countryKo: "미국",
    region: "north-america",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 20,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: true,
    inFlightUseAllowed: true,
    requiresInsulationOrPouch: false,
    summaryEn:
      "Up to 20 spare batteries total (including max 2 batteries of 101–160 Wh with Delta approval) in carry-on only. Smart bags must have removable batteries.",
    summaryKo:
      "100Wh 이하 보조배터리 기내 휴대 가능(여분 배터리 합산 최대 20개 한도), 101~160Wh는 승인 시 최대 2개 포함 가능. 위탁수하물 절대 금지.",
    cabinPolicyEn:
      "Delta follows FAA guidelines allowing ≤100 Wh power banks in carry-on bags with terminals protected. Note: codeshare flights operated by Korean Air follow Korean Air's stricter cabin rules!",
    cabinPolicyKo:
      "델타항공 자체 운항편은 기내 사용이 허용되지만, 인천 출발 공동운항(코드쉐어) 실제 운항사가 대한항공인 경우 대한항공의 지퍼백·선반금지·기내사용금지 규정이 적용됩니다!",
    checkInTipEn:
      "Double-check whether your Delta ticket is 'Operated by Korean Air'—operating carrier cabin rules always govern!",
    checkInTipKo:
      "항공권 예매 시 '실제 운항사(Operated by)'가 델타항공인지 대한항공인지 반드시 확인하세요.",
    featured: true,
  },
  {
    slug: "united-airlines",
    iataCode: "UA",
    nameEn: "United Airlines",
    nameKo: "유나이티드항공 (United Airlines)",
    countryEn: "United States",
    countryKo: "미국",
    region: "north-america",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 15,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: true,
    inFlightUseAllowed: true,
    requiresInsulationOrPouch: false,
    summaryEn:
      "Carry-on only for ≤100 Wh lithium banks; max 2 units of 100.1–160 Wh with airline approval. Smart luggage batteries must be removed before gate-checking.",
    summaryKo:
      "100Wh 이하 기내 휴대 전용, 100.1~160Wh는 항공사 승인 하에 최대 2개 허용. 스마트 캐리어 배터리는 분리 후 기내 반입 필수.",
    cabinPolicyEn:
      "United permits ≤100 Wh power banks in cabin baggage; do not leave batteries unattended while charging, and immediately alert crew if any battery feels hot.",
    cabinPolicyKo:
      "베이직 이코노미 등 기내 수하물 제한 등급 탑승 시에도 보조배터리는 반드시 기내 개인 가방(백팩)으로 직접 들고 타야 합니다.",
    checkInTipEn:
      "Basic Economy travelers: keep your power bank in your under-seat personal item so it's never forced into checked hold.",
    checkInTipKo:
      "유나이티드 베이직 이코노미 이용 시 개인 소지품 가방(좌석 밑 보관용) 안에 보조배터리를 넣으세요.",
  },
  {
    slug: "american-airlines",
    iataCode: "AA",
    nameEn: "American Airlines",
    nameKo: "아메리칸항공 (American Airlines)",
    countryEn: "United States",
    countryKo: "미국",
    region: "north-america",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 15,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: true,
    inFlightUseAllowed: true,
    requiresInsulationOrPouch: false,
    summaryEn:
      "≤100 Wh spare power banks allowed in carry-on; max 2 spare packs between 100.1–160 Wh with approval. Strictly prohibited in checked bags.",
    summaryKo:
      "100Wh 이하 기내 반입 허용, 100.1~160Wh 승인 시 최대 2개 가능. 위탁수하물 반입 엄격 금지.",
    cabinPolicyEn:
      "Terminals must be protected via original packaging, plastic pouch, or tape over contacts to prevent accidental short circuits.",
    cabinPolicyKo:
      "단락 방지를 위해 단자 보호 또는 파우치 보관이 권고되며, 좌석 틈새로 보조배터리가 빠지지 않도록 주의해야 합니다.",
    checkInTipEn:
      "If a power bank slips into a reclining lie-flat business seat mechanism, DO NOT move the seat—call a flight attendant immediately.",
    checkInTipKo:
      "기내 전동 좌석 틈새에 보조배터리가 끼었을 경우 절대 좌석을 움직이지 말고 즉시 승무원을 호출하세요.",
  },
  {
    slug: "southwest-airlines",
    iataCode: "WN",
    nameEn: "Southwest Airlines",
    nameKo: "사우스웨스트항공 (Southwest Airlines)",
    countryEn: "United States",
    countryKo: "미국",
    region: "north-america",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 20,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: false,
    inFlightUseAllowed: true,
    requiresInsulationOrPouch: false,
    summaryEn:
      "Updated 2025 US rule: ≤100 Wh carry-on allowed (up to 20 spare cells), and Southwest requires keeping power banks visible when in use—not inside closed bags in overhead bins!",
    summaryKo:
      "2025년 강화 규정: 100Wh 이하 기내 반입 가능하나, 기내에서 보조배터리 사용 시 가방이나 기내 선반 안에 넣은 채 충전하는 행위가 금지되며 눈에 보이게 두어야 합니다.",
    cabinPolicyEn:
      "Southwest became the first major US carrier in May 2025 to require power banks to remain plainly visible while in use—never charge devices inside a zipped backpack or overhead bin.",
    cabinPolicyKo:
      "사우스웨스트항공은 미국 항공사 최초로 2025년 5월부터 보조배터리 사용 시 반드시 외부로 노출해 눈에 보이는 상태에서만 사용하도록 의무화했습니다.",
    checkInTipEn:
      "Keep your power bank on your tray table or seat pocket whenever plugged in onboard Southwest.",
    checkInTipKo:
      "사우스웨스트 탑승 중 충전이 필요할 때는 백팩 속이 아닌 테이블 위 등 시야가 확보되는 곳에 두고 사용하세요.",
  },

  // --- EUROPE CARRIERS (5) ---
  {
    slug: "ryanair",
    iataCode: "FR",
    nameEn: "Ryanair",
    nameKo: "라이언에어 (Ryanair)",
    countryEn: "Ireland / EU",
    countryKo: "아일랜드 · 유럽",
    region: "europe",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 15,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: true,
    inFlightUseAllowed: true,
    requiresInsulationOrPouch: false,
    summaryEn:
      "EASA compliant: ≤100 Wh carry-on allowed (up to 15 PEDs/20 spare batteries); 100.1–160 Wh max 2 with prior approval. Never leave in gate-checked 10kg cabin bags.",
    summaryKo:
      "유럽항공안전청(EASA) 기준 100Wh 이하 기내 반입 허용, 100.1~160Wh 사전 승인 시 최대 2개 가능. 위탁 전환되는 캐리어 내 보관 절대 주의.",
    cabinPolicyEn:
      "Ryanair enforces strict small-bag sizers—if your 10kg wheelie bag is sent to the hold at the gate, you MUST remove all power banks into your under-seat personal bag.",
    cabinPolicyKo:
      "유럽 저비용항공사 특성상 탑승구에서 캐리어가 화물칸으로 내려가는 일이 잦으므로 보조배터리는 무조건 몸에 메는 작은 가방에 넣어야 합니다.",
    checkInTipEn:
      "Ryanair Boeing 737 seats have zero USB ports—a 20,000 mAh (74 Wh) bank is essential so your digital boarding pass stays alive!",
    checkInTipKo:
      "라이언에어는 좌석 충전 포트가 없고 모바일 탑승권 확인이 필수이므로 10,000~20,000mAh 보조배터리가 큰 도움이 됩니다.",
  },
  {
    slug: "easyjet",
    iataCode: "U2",
    nameEn: "easyJet",
    nameKo: "이지젯 (easyJet)",
    countryEn: "United Kingdom / EU",
    countryKo: "영국 · 유럽",
    region: "europe",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 15,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: true,
    inFlightUseAllowed: true,
    requiresInsulationOrPouch: false,
    summaryEn:
      "≤100 Wh allowed in cabin baggage; 100.1–160 Wh max 2 with easyJet approval. Smart bag lithium packs must be disconnected and carried in cabin.",
    summaryKo:
      "100Wh 이하 기내 반입 허용, 100.1~160Wh 승인 시 최대 2개 허용. 스마트 캐리어 배터리는 분리하여 기내 소지 필수.",
    cabinPolicyEn:
      "Follows UK CAA & EASA rules: individual short-circuit protection required for spare cells, strictly zero lithium power banks in hold luggage.",
    cabinPolicyKo:
      "영국 및 유럽 항공 안전 규정에 따라 모든 보조배터리는 기내 반입만 가능하며 단락 방지 조치가 권장됩니다.",
    checkInTipEn:
      "Keep your power bank accessible at UK security (London Gatwick/Luton) where high-density 27,000 mAh bricks may be visually checked for Wh print.",
    checkInTipKo:
      "런던 개트윅·루턴 등 영국 공항 보안검색은 대용량 배터리의 Wh 라벨 육안 확인이 꼼꼼하므로 꺼내기 쉬운 포켓에 넣으세요.",
  },
  {
    slug: "british-airways",
    iataCode: "BA",
    nameEn: "British Airways",
    nameKo: "영국항공 (British Airways)",
    countryEn: "United Kingdom",
    countryKo: "영국",
    region: "europe",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 4,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: true,
    inFlightUseAllowed: true,
    requiresInsulationOrPouch: false,
    summaryEn:
      "≤100 Wh up to 4 spare power banks in cabin without approval; 100.1–160 Wh max 2 pcs with BA approval. Strictly banned in checked bags.",
    summaryKo:
      "100Wh 이하 여분 보조배터리 최대 4개 무승인 기내 반입, 100.1~160Wh 사전 승인 시 최대 2개 허용.",
    cabinPolicyEn:
      "British Airways caps spare lithium-ion power banks (which BA classifies as spare batteries) at 4 units ≤100 Wh per passenger in cabin baggage.",
    cabinPolicyKo:
      "영국항공은 여분 보조배터리 반입 수량을 100Wh 이하 최대 4개로 비교적 명확히 제한하고 있으므로 다수 지참 시 개수를 확인하세요.",
    checkInTipEn:
      "Traveling with camera/drone crews through London Heathrow? Distribute spare batteries among team members so nobody exceeds BA's spare pack limit.",
    checkInTipKo:
      "히드로 공항 환승 시 배터리 개수 및 Wh 표기 확인이 엄격하므로 촬영 장비 배터리가 많다면 일행과 분산 휴대하세요.",
  },
  {
    slug: "lufthansa",
    iataCode: "LH",
    nameEn: "Lufthansa",
    nameKo: "루프트한자 (Lufthansa)",
    countryEn: "Germany",
    countryKo: "독일",
    region: "europe",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 2,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: false,
    inFlightUseAllowed: false,
    requiresInsulationOrPouch: false,
    summaryEn:
      "2025–2026 Lufthansa Group rule: Max 2 power banks per passenger (≤100 Wh without approval; 101–160 Wh requires approval). Overhead bin storage & in-flight charging prohibited!",
    summaryKo:
      "루프트한자 그룹 최신 규정: 1인당 보조배터리 최대 2개 제한(100Wh 이하 무승인, 101~160Wh 사전 승인 필수). 기내 선반 보관 및 기내 충·방전 금지!",
    cabinPolicyEn:
      "Lufthansa Group updated its cabin rules restricting passengers to a maximum of 2 power banks, banning storage in overhead compartments, and prohibiting charging devices from power banks onboard.",
    cabinPolicyKo:
      "루프트한자는 유럽 항공사 중 가장 선제적으로 보조배터리 1인 2개 제한, 기내 선반 보관 금지, 기내 사용 금지를 도입했습니다.",
    checkInTipEn:
      "Only bring up to 2 power banks when flying via Frankfurt or Munich on Lufthansa, Swiss, or Austrian Airlines.",
    checkInTipKo:
      "프랑크푸르트·뮌헨 경유 시 1인당 보조배터리를 2개 이하로 준비하고 좌석 아래 가방이나 몸에 소지하세요.",
  },
  {
    slug: "air-france",
    iataCode: "AF",
    nameEn: "Air France",
    nameKo: "에어프랑스 (Air France)",
    countryEn: "France",
    countryKo: "프랑스",
    region: "europe",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 15,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: true,
    inFlightUseAllowed: true,
    requiresInsulationOrPouch: false,
    summaryEn:
      "≤100 Wh allowed in cabin (up to 15 lithium devices/batteries combined); 100.1–160 Wh max 2 with prior Air France approval.",
    summaryKo:
      "100Wh 이하 기내 휴대 가능(리튬 기기·배터리 합산 15개 이내), 100.1~160Wh 사전 승인 시 최대 2개 허용.",
    cabinPolicyEn:
      "Air France complies with EASA/IATA rules requiring individual short-circuit protection (pouch or terminal tape) and constant supervision if used in cabin.",
    cabinPolicyKo:
      "파리 샤를드골 공항 보안검색 통과 시 100Wh 이하 라벨이 선명해야 하며 위탁수하물 반입은 엄격히 금지됩니다.",
    checkInTipEn:
      "Request approval at least 48 hours ahead via Air France customer service if carrying 101–160 Wh cinema/CPAP batteries.",
    checkInTipKo:
      "100Wh 초과 의료·촬영용 배터리 지참 시 출발 48시간 전 고객센터 사전 승인을 권장합니다.",
  },

  // --- MIDDLE EAST CARRIERS (2) ---
  {
    slug: "emirates",
    iataCode: "EK",
    nameEn: "Emirates",
    nameKo: "에미레이트항공 (Emirates)",
    countryEn: "UAE (Dubai)",
    countryKo: "아랍에미리트 (두바이)",
    region: "middle-east",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 1,
    allows100To160Wh: false,
    maxPieces100To160Wh: 0,
    checkedBaggageAllowed: false,
    overheadBinAllowed: false,
    inFlightUseAllowed: false,
    requiresInsulationOrPouch: false,
    summaryEn:
      "Strict Oct 2025+ Emirates rule: ONLY 1 power bank under 100 Wh allowed per passenger! >100 Wh banned; overhead bin storage & all in-flight power bank use strictly prohibited.",
    summaryKo:
      "2025년 10월 에미레이트 강화 규정: 1인당 100Wh 미만 보조배터리 단 1개만 반입 허용! 기내 선반 보관 및 기내 사용·충전 전면 금지.",
    cabinPolicyEn:
      "Effective October 2025, Emirates permits only ONE power bank (<100 Wh) with clear capacity markings, stored under the seat or in the seat pocket (never overhead bins), with zero in-flight charging/discharging.",
    cabinPolicyKo:
      "에미레이트항공은 기내 화재 예방을 위해 100Wh 미만 보조배터리 1개만 휴대하도록 제한하며, 기내 선반 보관과 비행 중 사용을 모두 금지하고 전 좌석 내장 충전 포트를 제공합니다.",
    checkInTipEn:
      "Transiting Dubai (DXB) on Emirates? Leave second power banks and >100 Wh bricks at home—security enforces the 1-unit <100 Wh cap!",
    checkInTipKo:
      "두바이 경유 유럽 여행 시 보조배터리를 여러 개 챙기지 말고 10,000~20,000mAh(100Wh 미만) 딱 1개만 휴대하세요!",
    featured: true,
  },
  {
    slug: "qatar-airways",
    iataCode: "QR",
    nameEn: "Qatar Airways",
    nameKo: "카타르항공 (Qatar Airways)",
    countryEn: "Qatar (Doha)",
    countryKo: "카타르 (도하)",
    region: "middle-east",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 4,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: true,
    inFlightUseAllowed: true,
    requiresInsulationOrPouch: false,
    summaryEn:
      "≤100 Wh carry-on allowed without approval; 100.1–160 Wh max 2 pcs with Qatar Airways approval. Factory Wh/mAh+V rating must be clearly printed.",
    summaryKo:
      "100Wh 이하 기내 반입 가능, 100.1~160Wh 사전 승인 시 최대 2개 허용. 도하 환승 보안검색 시 용량 표기 라벨 필수 확인.",
    cabinPolicyEn:
      "Hamad International Airport (DOH) transfer security rigorously inspects power banks for legible factory Wh markings—unmarked batteries are confiscated during transit screening.",
    cabinPolicyKo:
      "도하 하마드 국제공항 환승 검색대는 보조배터리 용량 표기를 매우 엄격히 검사하므로 글씨가 선명한 제품만 휴대하세요.",
    checkInTipEn:
      "Keep your power bank in an outer backpack pocket for quick tray inspection during Doha transit screening.",
    checkInTipKo:
      "도하 환승 시 모든 전자기기와 보조배터리를 트레이에 별도로 꺼내야 하므로 가방 바깥 포켓에 보관하면 편리합니다.",
  },

  // --- ASIA-PACIFIC & CHINA CARRIERS (9) ---
  {
    slug: "ana",
    iataCode: "NH",
    nameEn: "ANA (All Nippon Airways)",
    nameKo: "전일본공수 ANA",
    countryEn: "Japan",
    countryKo: "일본",
    region: "asia-pacific",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 15,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: false,
    inFlightUseAllowed: true,
    requiresInsulationOrPouch: false,
    summaryEn:
      "July 2025+ Japan MLIT rule: ≤100 Wh carry-on allowed, 100.1–160 Wh max 2 pcs. Overhead bin storage is BANNED across Japanese airlines—keep at your seat and supervise when charging!",
    summaryKo:
      "2025년 7월 일본 국토교통성 신규정 적용: 100Wh 이하 기내 반입 가능(100~160Wh 최대 2개), 기내 선반(오버헤드 빈) 보관 금지 및 사용 시 상시 육안 확인 필수!",
    cabinPolicyEn:
      "Following Japan MLIT's July 2025 aviation rule update, ANA prohibits storing power banks in overhead compartments; keep them on your person/seat pocket and keep them in sight if charging.",
    cabinPolicyKo:
      "일본 국토교통성 지침에 따라 2025년 7월부터 ANA·JAL 등 일본 국적기에서도 보조배터리 기내 선반 보관이 전면 금지되었으며 수시 확인 가능한 위치에서만 사용해야 합니다.",
    checkInTipEn:
      "Note that cordless hair straighteners with non-removable lithium batteries are completely banned (carry-on & checked) at Japanese airports!",
    checkInTipKo:
      "일본 공항 출국 시 배터리 일체형 무선 고데기는 기내·위탁 모두 반입 불가(압수 대상)이므로 보조배터리와 함께 꼭 유의하세요!",
    featured: true,
  },
  {
    slug: "jal",
    iataCode: "JL",
    nameEn: "JAL (Japan Airlines)",
    nameKo: "일본항공 JAL",
    countryEn: "Japan",
    countryKo: "일본",
    region: "asia-pacific",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 15,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: false,
    inFlightUseAllowed: true,
    requiresInsulationOrPouch: false,
    summaryEn:
      "≤100 Wh carry-on allowed; 100.1–160 Wh max 2 pcs. Under Japan's July 2025 rule, DO NOT store power banks in overhead bins—keep within reach and monitor continuously.",
    summaryKo:
      "100Wh 이하 기내 휴대 가능, 100.1~160Wh 최대 2개 허용. 일본 항공법 개정에 따라 기내 선반 보관 금지 및 손이 닿는 좌석 주변 보관 필수.",
    cabinPolicyEn:
      "JAL enforces Japan MLIT's cabin battery visibility rule: store power banks under your seat or in seat pockets rather than overhead luggage racks.",
    cabinPolicyKo:
      "하네다·나리타·간사이 공항 이용 시 보조배터리는 위탁수하물 및 기내 선반 보관이 모두 금지되며 좌석 주변에 두어야 합니다.",
    checkInTipEn:
      "Keep your power bank in a small crossbody bag when boarding JAL domestic and international flights.",
    checkInTipKo:
      "일본 국내선 환승 시에도 동일 규정이 적용되므로 보조배터리는 작은 보조가방에 휴대하세요.",
  },
  {
    slug: "peach-aviation",
    iataCode: "MM",
    nameEn: "Peach Aviation",
    nameKo: "피치항공 (Peach Aviation)",
    countryEn: "Japan",
    countryKo: "일본",
    region: "asia-pacific",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 15,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: false,
    inFlightUseAllowed: true,
    requiresInsulationOrPouch: false,
    summaryEn:
      "≤100 Wh carry-on allowed (counts toward Peach's strict 7.0 kg cabin weight limit!); 100.1–160 Wh max 2 pcs. Overhead bin storage prohibited.",
    summaryKo:
      "100Wh 이하 기내 반입 가능(기내 수하물 합산 7kg 무게 제한 포함 주의!), 100.1~160Wh 최대 2개. 기내 선반 보관 금지.",
    cabinPolicyEn:
      "Peach weighs all carry-on items (7.0 kg total across 2 bags). Heavy 27,000 mAh bricks (~650g) eat almost 10% of your allowance, and must stay out of overhead bins.",
    cabinPolicyKo:
      "피치항공은 기내 수하물 7.0kg 무게 측정을 매우 엄격히 하므로 무거운 대용량 제품보다 200g대 10,000mAh 슬림 보조배터리가 유리합니다.",
    checkInTipEn:
      "Opt for an ultra-light 10,000 mAh (37 Wh) carbon/slim battery on Peach to save precious carry-on grams.",
    checkInTipKo:
      "오사카·도쿄 피치항공 탑승 시 10,000mAh 경량 보조배터리를 주머니나 크로스백에 휴대하세요.",
  },
  {
    slug: "singapore-airlines",
    iataCode: "SQ",
    nameEn: "Singapore Airlines",
    nameKo: "싱가포르항공 (Singapore Airlines)",
    countryEn: "Singapore",
    countryKo: "싱가포르",
    region: "asia-pacific",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 10,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: true,
    inFlightUseAllowed: false,
    requiresInsulationOrPouch: false,
    summaryEn:
      "April 2025+ Singapore Airlines & Scoot rule: ≤100 Wh carry-on allowed (101–160 Wh requires approval), and ALL in-flight charging or use of power banks is strictly BANNED!",
    summaryKo:
      "2025년 4월 시행 규정: 100Wh 이하 기내 반입 가능(101~160Wh 승인 필요), 단 비행 중 보조배터리로 기기를 충전하거나 보조배터리를 충전하는 행위 전면 금지!",
    cabinPolicyEn:
      "Since April 1, 2025, Singapore Airlines and Scoot prohibit passengers from charging power banks via seat USB ports OR using power banks to charge phones/laptops throughout the entire flight.",
    cabinPolicyKo:
      "싱가포르항공 및 스쿠트항공은 2025년 4월부터 비행 중 보조배터리 사용 및 충전을 전면 금지했습니다. 싱가포르항공 전 좌석에 마련된 USB 포트로 휴대폰을 직접 충전하세요.",
    checkInTipEn:
      "Bring a 1m USB-C cable to plug directly into Singapore Airlines' seatback USB-A/USB-C ports.",
    checkInTipKo:
      "기내에서 보조배터리를 꺼내 쓸 수 없으므로 좌석 모니터 하단 USB 포트 연결용 케이블을 따로 챙기세요.",
    featured: true,
  },
  {
    slug: "cathay-pacific",
    iataCode: "CX",
    nameEn: "Cathay Pacific",
    nameKo: "캐세이퍼시픽 (Cathay Pacific)",
    countryEn: "Hong Kong",
    countryKo: "홍콩",
    region: "asia-pacific",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 2,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: false,
    inFlightUseAllowed: false,
    requiresInsulationOrPouch: false,
    summaryEn:
      "April 2025+ Hong Kong CAD rule: ≤100 Wh carry-on allowed, but BOTH overhead bin storage AND any in-flight power bank use/charging are strictly prohibited on Cathay & HK Express!",
    summaryKo:
      "2025년 4월 홍콩 민간항공처 규정: 기내 선반(오버헤드 빈) 보관 전면 금지 및 비행 중 보조배터리 사용·충전 전면 금지! 좌석 아래에 보관해야 합니다.",
    cabinPolicyEn:
      "Hong Kong CAD regulations ban storing power banks in overhead lockers and ban using power banks during flight on all Hong Kong carriers (Cathay Pacific, HK Express, Hong Kong Airlines).",
    cabinPolicyKo:
      "캐세이퍼시픽·홍콩익스프레스 등 홍콩 국적기 탑승 시 보조배터리를 머리 위 선반에 넣을 수 없으며 좌석 아래 개인 물품에 보관해야 하고 비행 중 사용도 불가합니다.",
    checkInTipEn:
      "Transiting Hong Kong (HKG)? Keep power banks under your seat and use seat AC/USB power instead.",
    checkInTipKo:
      "홍콩 여행 및 경유 시 한국과 거의 동일하게 선반 보관 금지·기내 사용 금지 규정이 적용된다고 기억하면 쉽습니다.",
  },
  {
    slug: "eva-air",
    iataCode: "BR",
    nameEn: "EVA Air",
    nameKo: "에바항공 (EVA Air)",
    countryEn: "Taiwan",
    countryKo: "대만",
    region: "asia-pacific",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 10,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: false,
    inFlightUseAllowed: false,
    requiresInsulationOrPouch: false,
    summaryEn:
      "March 2025+ Taiwan carrier rule: ≤100 Wh carry-on only; overhead bin storage disallowed and all in-flight use/charging of power banks & spare lithium batteries is banned!",
    summaryKo:
      "2025년 3월 대만 항공사 공통 규정: 기내 선반 보관 불가 및 비행 중 보조배터리 사용·충전 전면 금지 (중화항공·스타룩스·타이거에어 동일).",
    cabinPolicyEn:
      "EVA Air, China Airlines, and Starlux strictly forbid using or charging power banks throughout the flight and require keeping them in personal custody rather than overhead bins.",
    cabinPolicyKo:
      "에바항공·중화항공·스타룩스 등 대만 전 항공사는 비행 중 보조배터리 사용을 엄격히 금지하며 기내 좌석 AC/USB 전원 이용을 안내하고 있습니다.",
    checkInTipEn:
      "Taiwan Taoyuan Airport (TPE) strictly checks Wh printing—never pack unlabeled batteries.",
    checkInTipKo:
      "대만 타오위안·송산 공항 보안검색대는 용량 미표기 보조배터리를 예외 없이 적발하므로 라벨 표기를 꼭 확인하세요.",
  },
  {
    slug: "thai-airways",
    iataCode: "TG",
    nameEn: "Thai Airways",
    nameKo: "타이항공 (Thai Airways)",
    countryEn: "Thailand",
    countryKo: "태국",
    region: "asia-pacific",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 10,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: false,
    inFlightUseAllowed: false,
    requiresInsulationOrPouch: false,
    summaryEn:
      "March 15, 2025+ Thai Airways & CAAT rule: ≤20,000–32,000 mAh (≤100 Wh) carry-on allowed, 100–160 Wh max 2 with approval; in-flight power bank use & charging strictly prohibited!",
    summaryKo:
      "2025년 3월 15일 시행: 100Wh 이하 기내 반입 가능(100~160Wh 최대 2개 승인), 비행 중 보조배터리 사용 및 충전 전면 금지!",
    cabinPolicyEn:
      "Thai Airways prohibits using power banks in-flight; additionally, Thai airport security (Suvarnabhumi BKK / Don Mueang DMK / Phuket HKT) enforces strict mAh/Wh label inspections (≤32,000 mAh / 160 Wh max).",
    cabinPolicyKo:
      "태국 수완나품·돈므앙·푸켓 공항은 보조배터리 본체에 mAh/Wh 숫자가 적혀 있지 않으면 100% 압수하는 것으로 유명합니다! 또한 타이항공 기내에서는 보조배터리 사용이 금지됩니다.",
    checkInTipEn:
      "Thailand airports confiscate thousands of batteries with worn-off text—verify crisp factory printing before flying to Bangkok!",
    checkInTipKo:
      "태국 여행 시에는 용량 글씨가 아주 선명하게 인쇄된 보조배터리만 가져가야 귀국길 수완나품 공항에서 압수당하지 않습니다.",
  },
  {
    slug: "airasia",
    iataCode: "AK",
    nameEn: "AirAsia",
    nameKo: "에어아시아 (AirAsia)",
    countryEn: "Malaysia / ASEAN",
    countryKo: "말레이시아 · 동남아",
    region: "asia-pacific",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 5,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: false,
    inFlightUseAllowed: false,
    requiresInsulationOrPouch: false,
    summaryEn:
      "April 2025+ AirAsia rule: ≤100 Wh carry-on allowed (100–160 Wh max 2 with check-in approval); MUST stay in seat pocket or under seat—overhead bin storage & in-flight use banned!",
    summaryKo:
      "2025년 4월 에어아시아 강화 규정: 100Wh 이하 기내 반입(100~160Wh 카운터 승인 시 2개), 기내 선반 보관 금지(좌석 밑/앞주머니 보관) 및 기내 사용 금지!",
    cabinPolicyEn:
      "AirAsia requires power banks to be kept in the seat pocket or under-seat bag (never overhead compartments) and prohibits using portable batteries throughout the flight.",
    cabinPolicyKo:
      "에어아시아 전 노선에서 보조배터리의 선반 보관 및 운항 중 충전 사용이 금지되므로 쿠알라룸푸르·방콕·마닐라 탑승 전 공항에서 기기를 완충하세요.",
    checkInTipEn:
      "Remember AirAsia's 7 kg total cabin baggage limit—factor in your power bank's weight.",
    checkInTipKo:
      "에어아시아 역시 기내 수하물 7kg 합산 규정이 엄격하므로 경량 10,000~20,000mAh 제품을 권장합니다.",
  },
  {
    slug: "china-eastern",
    iataCode: "MU",
    nameEn: "China Eastern & CAAC China Rules (3C / CCC)",
    nameKo: "중국동방항공 & 중국 국내선 3C(CCC) 인증 규정",
    countryEn: "China",
    countryKo: "중국",
    region: "asia-pacific",
    isKoreanRuleApplicable: false,
    maxWhNoApproval: 100,
    maxPiecesUnder100Wh: 2,
    allows100To160Wh: true,
    maxPieces100To160Wh: 2,
    checkedBaggageAllowed: false,
    overheadBinAllowed: false,
    inFlightUseAllowed: false,
    requiresInsulationOrPouch: false,
    requiresCccMark: true,
    summaryEn:
      "CRITICAL June 28, 2025+ CAAC China Domestic Rule: Power banks WITHOUT a legible Chinese 'CCC' (3C) certification logo OR recalled models are STRICTLY BANNED on China domestic flights! ≤100 Wh max 2 pcs; Wh rating must be printed directly.",
    summaryKo:
      "초주의! 2025년 6월 28일 중국 민항국(CAAC) 규정: 중국 국내선(환승 포함) 탑승 시 'CCC(3C)' 인증 마크가 없거나 Wh 정격 표기가 없는 보조배터리는 전량 반입 금지(압수)! 기내 사용 역시 금지.",
    cabinPolicyEn:
      "China CAAC strictly enforces two unique rules: (1) On all China domestic flights (including international-to-domestic transfers in Shanghai PVG, Beijing PEK, Qingdao, Guangzhou), every power bank MUST carry an authentic 'CCC' mark and non-recalled serial; (2) Wh capacity must be printed directly on the casing (mAh alone without Voltage is rejected). In-flight use is also banned.",
    cabinPolicyKo:
      "상하이·베이징·칭다오 등에서 중국 국내선으로 환승하거나 중국 국내선을 이용할 때 한국 KC인증만 있고 중국 'CCC' 마크가 없는 보조배터리는 보안검색대에서 반입이 거절됩니다! 또한 mAh만 적혀 있고 Wh(또는 전압 V)가 안 적힌 제품도 압수되며 기내 사용은 전면 금지됩니다.",
    checkInTipEn:
      "Flying domestically within China? Buy or verify a 3C/CCC-marked ≤100 Wh power bank—CE/FCC/KC marks alone are turned away on domestic legs!",
    checkInTipKo:
      "중국 국내선 탑승 예정이라면 반드시 본체 뒷면에 'CCC' 타원형 로고와 'Wh' 숫자가 모두 인쇄된 보조배터리인지 출발 전 확인하세요!",
    featured: true,
  },
];

export function getAirlineBySlug(slug: string): AirlineRule | undefined {
  return AIRLINES.find((a) => a.slug === slug);
}
