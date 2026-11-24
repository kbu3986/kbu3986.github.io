# CLAUDE.md — Unified GitHub Pages Monorepo (`kbu3986.github.io`)

작업 시작 전 루트 [AGENTS.md](./AGENTS.md)를 먼저 읽고 모든 규칙을 준수합니다. 이 저장소는 외부 허브 참조 없이 단독으로 동작하는 4개 사이트 통합 모노레포입니다.

## 핵심 규칙 요약
- **브랜치 분리 절대 엄수**: 모든 소스 수정·커밋은 `source` 브랜치에서만 수행합니다. 정적 배포 전용 `main` 브랜치를 수동 편집하지 말고 `scripts/deploy-unified.ps1`로 통합 배포합니다.
- **PUBLIC 저장소 PII·비밀정보 0건**: 실명·직장명·거주지 신상·로컬 사용자 절대경로·API 키·토큰·로컬 환경설정 파일을 절대 커밋하지 않습니다.
- **4개 사이트 경계 및 정책**: `site0-hub`(루트), `site1-wattcheck`(`/wattcheck-global`), `site2-worthmove`(`/worthmove-global`), `site3-puregram`(`/puregram-global`, **iHerb 링크 미사용**, 영양성분표 팩트·YMYL 준수)의 `basePath`와 루트 `.nojekyll`·`ads.txt`·`sitemap-index.xml` 무결성을 유지합니다.
- **병렬·자율 완결 및 실물 E2E 검증**: 다중 사이트·다중 파일 작업은 병렬/스웜 실행을 우선하며, 빌드 성공(`Exit Code 0`)만으로 종료하지 않고 실제 HTTP 200·콘솔 0에러·실데이터를 검증합니다.
- **한국어 존댓말·표준 응답 구조**: 설명 → `### 결론` → `### 다음 확인 사항`(2개) 형식과 4대 절대 안전선(공개/운영 분리, 100% 비식별, 외부 게시 사전 승인, 과금·계정 리스크 사전 승인)을 준수합니다.
