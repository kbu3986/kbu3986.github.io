# Root Utility Hub (`site0-hub`) — Cross-AI Project Instructions (SSOT)

이 문서는 루트 유틸리티 허브 저장소(`site0-hub`)의 단일 정본 지시서입니다. Claude Code, Codex, Cursor, Gemini CLI 등 모든 AI 에이전트는 작업 전 이 규칙을 따릅니다.

## 1. 프로젝트 개요 및 스택
- **목표**: GitHub Pages User Root 도메인의 EN/KO 통합 디렉토리 허브, 루트 `ads.txt`, 통합 `sitemap-index.xml`, 검색엔진 소유권 메타 검증 페이지(`privacy.html`, `about.html` 포함)를 생성합니다.
- **기술 스택**: 외부 런타임 의존성 0개의 순수 Node.js ESM 정적 빌더(`scripts/build.mjs` → `out/`).

## 2. 필수 명령어 및 브랜치 전략
```bash
npm run build   # scripts/build.mjs 실행 (.env.production.local 반영해 out/ 정적 산출물 생성)
```
- **브랜치 분리 절대 엄수**: GitHub Pages User Root 저장소 특성상 **소스 코드는 반드시 `source` 브랜치에만 커밋·푸시**합니다.
- **`main` 브랜치 수동 수정 금지**: `main` 브랜치는 프로덕션 정적 빌드(`out/`) 전용 배포 브랜치이므로 상위 배포 스크립트(`deploy-ops/redeploy-all.ps1 -Site hub`) 외 수동 커밋·푸시를 금지합니다.

## 3. 도메인 필수 규칙
1. **환경 변수 기반 설정 주입** – AdSense(`NEXT_PUBLIC_ADSENSE_ID`), GSC(`NEXT_PUBLIC_GSC_VERIFICATION`), Naver(`NEXT_PUBLIC_NAVER_VERIFICATION`) 값은 빌드 시 `.env.production.local`에서 읽어 주입합니다. `.env*` 파일은 절대 커밋하지 않습니다.
2. **루트 SEO 자산 무결성** – 빌드 산출물에 `index.html`, `ko/index.html`, `about.html`, `privacy.html`, `ads.txt`, `robots.txt`, `sitemap.xml`, `sitemap-index.xml`이 깨진 링크 없이 생성되는지 확인합니다.
3. **하위 사이트 링크 일관성** – 확정된 하위 사이트 슬러그·브랜드명·URL을 임의로 변경하지 않습니다.

## 4. 공통 AI 협업·출력·실물 검증 원칙
- **소통·형식** – 한국어 존댓말을 사용하며 **설명 → `### 결론` → `### 다음 확인 사항`(2개)** 구조, 1단락 1–2문장, 클릭 가능한 마크다운 링크를 유지합니다.
- **실물 E2E 검증** – `npm run build` 성공만으로 완료 보고하지 않고 생성된 `out/` HTML·`ads.txt`·`sitemap-index.xml` 내용과 프로덕션 HTTP 200 응답을 확인합니다.
- **직설 판정·무홍보 SEO** – 오류는 1줄 인정 후 즉시 수정하며, 수동 홍보 대신 기술적 SEO·사이트맵·색인 품질에 집중합니다.

## 5. 절대 안전선
- **공개 웹·운영 도구 분리**: 방문자용 허브 HTML에 관리 버튼·업로드 도우미·디버그 경로·로컬 경로를 절대 노출하지 않습니다.
- **PUBLIC 비식별·비밀정보 0건**: API 키·토큰·`.env*`·실명·직장명·로컬 절대경로를 커밋하지 않습니다.
- **외부 게시 및 계정 보호**: 외부 커뮤니티 신규 게시 및 광고/제휴 계정 약관 리스크는 반드시 사전 확인합니다.
