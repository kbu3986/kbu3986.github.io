# CLAUDE.md — Root Utility Hub (`site0-hub`)

작업 시작 전 루트 [AGENTS.md](./AGENTS.md)를 먼저 읽고 모든 규칙을 준수합니다.

## 핵심 절대 안전선 (요약)
- **`source` 브랜치 전용 커밋**: 소스 변경은 반드시 `source` 브랜치에만 커밋·푸시하며, 정적 배포 전용 `main` 브랜치를 수동으로 건드리지 않습니다.
- **`.env*` 및 비밀정보 0건**: AdSense/GSC/Naver 값은 `.env.production.local`로만 주입하며 `.env*`·API 키·로컬 절대경로·개인 신상정보를 절대 커밋 금지.
- **실물 산출물 검증**: `npm run build` 후 `out/` 내 `index.html`, `ads.txt`, `sitemap-index.xml` 정합성 확인 필수.
- **공개 웹 분리**: 허브 페이지에 운영 도구·디버그 경로 노출 금지.
