# Unified GitHub Pages Monorepo (`kbu3986.github.io`) — Cross-AI Instructions (SSOT)

이 문서는 `kbu3986/kbu3986.github.io` 공개(PUBLIC) 모노레포의 단일 정본(SSOT) 지시서입니다. Claude Code, Codex, Cursor, Gemini CLI 등 모든 AI 에이전트는 외부 허브 저장소에 의존하지 않고 이 문서만으로 모든 규칙을 완결 적용합니다.

---

## 1. 모노레포 및 브랜치 아키텍처

- **`source` 브랜치 (개발·커밋 전용)**: 4개 수익화 웹앱의 모든 소스 코드, 통합 빌드·배포 스크립트, 지시서를 보관합니다. **모든 코드 수정과 커밋은 반드시 `source` 브랜치에서만 수행합니다.**
- **`main` 브랜치 (정적 배포 전용 — 수동 수정 금지)**: GitHub Pages가 실제로 서빙하는 통합 정적 빌드 산출물 전용 브랜치입니다. `main` 브랜치를 직접 편집·커밋하지 말고 반드시 `scripts/deploy-unified.ps1`로 빌드·병합 배포합니다.
- **루트 소유권 파일 보존**: `main` 루트의 `.nojekyll`, `ads.txt`, `8f4a7c2e9b1d4063a5e8f2c7b9d1046e.txt`, `robots.txt`, `sitemap.xml`, `sitemap-index.xml`이 배포 중 유실되지 않도록 유지합니다.

---

## 2. 4개 사이트 구성, 스택 및 명령어

| 디렉토리 | 서비스명 | 스택 | `basePath` | 프로덕션 URL | 주요 규모·도메인 규칙 |
|---|---|---|---|---|---|
| `site0-hub/` | Root Utility Hub | 순수 Node.js ESM(의존성 0) | `""` (루트) | `https://kbu3986.github.io/` | EN/KO 허브, 루트 `ads.txt`, 통합 `sitemap-index.xml`, `about.html`, `privacy.html`, IndexNow 키 생성 |
| `site1-wattcheck/` | WattCheck (와트체크) | Next.js 15 App Router SSG · React 19 · TS Strict · Tailwind v3 | `/wattcheck-global` | `https://kbu3986.github.io/wattcheck-global/` | 201 SSG / 194 사이트맵 URL · 30개 항공사·40종 디바이스·20종 mAh·국토부 2026 규정·결정론적 Wh 공식 |
| `site2-worthmove/` | WorthMove (이직손익판독기) | Next.js 16(`16.4.6`) SSG · React 19.3 · TS · Tailwind v4 (`@tailwindcss/turbopack`) | `/worthmove-global` | `https://kbu3986.github.io/worthmove-global/` | 336 SSG / 330 사이트맵 URL · 2026 미국/한국 세법·4대보험 실수령·통근 시급·영수증 캔버스(투자·세무 자문 표현 금지) |
| `site3-puregram/` | PureGram (순수그램) | Next.js 16(`16.4.6`) SSG · React 19.3 · TS · Tailwind v4 (`@tailwindcss/turbopack`) | `/puregram-global` | `https://kbu3986.github.io/puregram-global/` | 352 SSG / 346 사이트맵 URL · 48제품·114쌍 1:1 비교·6카테고리 · **아이허브(iHerb) 링크 미사용 정책 엄수** · 영양성분표 팩트·YMYL 안전선 |

### 수익화·검증 표준 설정
- **AdSense**: `ca-pub-8587506565277191` (루트 및 하위 앱 `ads.txt`·메타·스크립트 자동 주입)
- **Amazon Associates (`/en`)**: `kbu3986-20`
- **Coupang Partners (`/ko`)**: `AF2200875`
- **PureGram 제휴 정책**: `site3-puregram`에서는 **iHerb 링크·코드를 사용하지 않습니다**(Amazon `/en` · Coupang `/ko` · AdSense 유지).
- **Next.js 16 참고**: `site2-worthmove`, `site3-puregram`은 Next.js 16 기반이므로 API 변경사항 작업 전 해당 앱 내부 `node_modules/next/dist/docs/` 문서를 확인합니다.

### 필수 빌드·린트·배포 명령어
```powershell
# 개별 사이트 빌드 (루트에서 실행)
npm run build:hub            # site0-hub: node scripts/build.mjs -> site0-hub/out/
npm run build:wattcheck      # site1-wattcheck: prebuild + next build
npm run build:worthmove      # site2-worthmove: prebuild + next build
npm run build:puregram       # site3-puregram: prebuild + next build

# 개별 사이트 개발·린트·데이터 갱신
npm --prefix site1-wattcheck run dev          # 포트 3101
npm --prefix site1-wattcheck run lint
npm --prefix site2-worthmove run dev
npm --prefix site2-worthmove run lint
npm --prefix site3-puregram run update-prices # 무료 환율·가격 스냅샷 갱신
npm --prefix site3-puregram run lint
npm --prefix site3-puregram run start -- -p 3103

# 통합 정적 빌드 검증 (DryRun, 원격 푸시 없음)
npm run build:all

# 통합 GitHub Pages 배포 (source에서 빌드 -> dist/ 조립 -> main 푸시 + HTTP 200 검증)
powershell -ExecutionPolicy Bypass -File scripts/deploy-unified.ps1
powershell -ExecutionPolicy Bypass -File scripts/deploy-unified.ps1 -Site wattcheck
```

---

## 3. 공통 Cross-AI 협업·응답·실행 원칙

### 소통·응답 구조
- **언어 및 어조**: 항상 자연스러운 한국어 존댓말을 사용합니다.
- **표준 구조**: 기본 응답은 **설명 → `### 결론` → `### 다음 확인 사항`(2개)** 순서로 작성합니다(단순 질의나 최종 종결 답변에서는 다음 확인 사항 생략 가능).
- **가독성 규격**: `###`/`####` 소제목, 1단락 1–2문장, 한 줄 불릿(`**키워드** – 요약`), 3개 이상 항목 비교 시 마크다운 표, 모든 URL·파일 경로는 클릭 가능한 마크다운 링크로 작성합니다. 한국어 기울임체·취소선·과도한 느낌표 남발을 피합니다.
- **불필요한 질문·권유 금지**: AI가 직접 처리할 작업의 사전 허락 질문, 수동 복붙 떠넘기기, 커뮤니티 홍보 권유, 사용자가 무시한 제안의 반복을 금지합니다.

### 직설 판정·자율 완결·병렬 우선
- **직설 판정 및 오류 인정**: 수치와 근거에 기반해 Go / Pivot / Kill을 분명하게 판정하며, 오류 발생 시 변명 없이 1줄로 인정하고 즉시 수정합니다.
- **자율 E2E 완결**: 구현·빌드·테스트·임시 프로세스 정리까지 CLI·API·브라우저 자동화로 끝까지 처리합니다(로그인·패스키·CAPTCHA·결제·권한 승인처럼 사용자 개입이 필수인 단계만 최소 요청).
- **병렬·스웜 실행 우선**: 다중 파일 수정, 조사·크롤링, 4개 사이트 동시 감사·구현 같은 복합 작업은 순차 처리 대신 **병렬 에이전트·스웜·서브태스크 실행을 최우선**으로 채택합니다.

### 실물 E2E 검증·팩트·기술적 SEO
- **실물 E2E 검증 의무**: 빌드 성공이나 `Exit Code 0`만으로 완료 보고하지 않습니다. 실제 실행 결과, 라이브 URL HTTP 200 응답, 브라우저 콘솔 0에러, 계산기·비교표·`ads.txt`·`sitemap.xml` 실데이터 정합성을 확인한 뒤 완료 보고합니다.
- **팩트 기반 데이터**: 공식 규정·세법·영양성분표 등 검증된 원본 데이터와 결정론적 계산식만 사용하며, 근거 없는 AI 추측 수치·허위 스펙·미사여구를 작성하지 않습니다.
- **순수 기술적 SEO**: 커뮤니티 스팸·수동 바이럴 대신 사이트맵, `hreflang`, 구조화 데이터(JSON-LD), 캐노니컬, 페이지 속도, 크롤링 품질 같은 기술적 SEO에만 집중합니다.

---

## 4. 4대 절대 안전선

1. **공개 웹·운영 도구 분리 및 PUBLIC 저장소 비밀·개인정보 0바이트**
   - 방문자용 정적 페이지에 관리 버튼·업로드 도우미·디버그 경로·로컬 경로를 절대 노출하지 않습니다.
   - 이 저장소는 **PUBLIC**이므로 실명, 직장·소속명, 거주지 신상, 로컬 사용자 절대경로, API 키, 인증 토큰, 자격증명, 암호화 키 파일, 로컬 비밀 환경파일을 단 1바이트도 커밋하지 않습니다.
2. **100% 비식별 유지**
   - 코드·주석·문서·커밋 메시지·HTML 메타 어디에도 개인 신상이나 직장을 유추할 수 있는 식별 정보를 남기지 않습니다.
3. **자체 저장소 배포 vs 외부 게시 사전 승인**
   - 본인 소유의 이 저장소 빌드·정적 배포는 자율 수행하되, 외부 커뮤니티·SNS·포럼 등 제3자 플랫폼 신규 게시는 반드시 사전 승인을 받습니다.
4. **실금전·과금·본계정 리스크 사전 승인**
   - 유료 API 과금 발생, 결제·실거래, AdSense·제휴 메인 계정 정책 위반 위험이 있는 변경은 반드시 사전 확인 후 실행합니다.
