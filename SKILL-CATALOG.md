# Skill Catalog

팀에서 사용 중인 추천 스킬 목록입니다. 각 스킬은 원본 레포에서 직접 설치합니다.

## 설치 방법

```bash
# 레포의 모든 스킬 설치
npx skills add <repo> -g --all -y

# 특정 스킬만 설치
npx skills add <repo> -g -s <skill-name> -y
```

---

## 자체 스킬 (현재 미운영, [fmcommcsa/agent-toolkit](https://github.com/fmcommcsa/agent-toolkit))

현재 자체(내부) 스킬은 제공하지 않습니다.

---

## Anthropic ([anthropics/skills](https://github.com/anthropics/skills))

```bash
npx skills add anthropics/skills -g -s <skill-name> -y
```

| 스킬                  | 설명                                               | 추천 직무      |
| --------------------- | -------------------------------------------------- | -------------- |
| doc-coauthoring       | 문서 공동 작성 워크플로(컨텍스트 수집/구조화/리뷰) | 기획           |
| docx                  | Word 문서(.docx) 생성/편집/분석                    | 기획           |
| frontend-design       | 프로덕션급 프론트엔드 UI 구현                      | 디자인, 프론트 |
| mcp-builder           | MCP 서버 빌드 가이드 (Python/TypeScript)           | 백엔드         |
| pdf                   | PDF 읽기/추출/병합/분할/OCR 등 처리                | 기획, 백엔드   |
| pptx                  | 프레젠테이션(.pptx) 생성/편집/분석                 | 기획, 디자인   |
| skill-creator         | 스킬 생성/개선/평가/트리거 최적화                  | 백엔드, 프론트 |
| web-artifacts-builder | React/Tailwind/shadcn 기반 HTML 아티팩트 빌드      | 프론트, 디자인 |
| xlsx                  | 스프레드시트(.xlsx/.xlsm/.csv/.tsv) 생성/편집/정리 | 기획, 백엔드   |

---

## OpenAI Curated ([openai/skills](https://github.com/openai/skills/tree/main/skills/.curated))

```bash
npx skills add openai/skills -g -s <skill-name> -y
```

| 스킬                   | 설명                           | 추천 직무      |
| ---------------------- | ------------------------------ | -------------- |
| gh-address-comments    | GitHub 리뷰 코멘트 반영        | 프론트, 백엔드 |
| gh-fix-ci              | CI 실패 원인 분석 및 수정      | 프론트, 백엔드 |
| screenshot             | 웹/결과물 스크린샷 캡처        | 디자인, 프론트 |
| security-ownership-map | 보안 책임/오너십 매핑          | 기획, 백엔드   |
| security-threat-model  | 위협 모델링 및 리스크 분석     | 백엔드, 기획   |
| sentry                 | Sentry 기반 에러 모니터링/분석 | 프론트, 백엔드 |
| sora                   | 영상 생성 워크플로             | 디자인, 기획   |
| speech                 | 음성 합성/처리                 | 백엔드         |
| transcribe             | 음성/영상 전사                 | 기획, 백엔드   |
| vercel-deploy          | Vercel 배포 자동화             | 프론트         |
| yeet                   | 반복 작업 자동화 보조          | 프론트, 백엔드 |

---

## 개발 패턴 ([sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills))

```bash
npx skills add sickn33/antigravity-awesome-skills -g -s <skill-name> -y
```

| 스킬                          | 설명                                               | 추천 직무      |
| ----------------------------- | -------------------------------------------------- | -------------- |
| api-documentation             | OpenAPI 명세, 개발자 가이드, 코드 예제 문서화      | 기획, 백엔드   |
| api-design-principles         | REST/GraphQL API 설계 원칙                         | 백엔드, 프론트 |
| api-security-testing          | REST/GraphQL API 인증/인가/입력검증 보안 테스트    | 백엔드         |
| api-security-best-practices   | API 인증, 인가, 입력 검증, Rate Limiting           | 백엔드         |
| architecture-decision-records | ADR 기반 기술 의사결정 기록/추적                   | 기획, 백엔드   |
| auth-implementation-patterns  | JWT/OAuth2/세션/RBAC 인증·인가 구현 패턴           | 백엔드, 프론트 |
| azure-functions               | Azure Functions 개발 패턴 (Durable Functions 포함) | 백엔드         |
| clean-code                    | 간결하고 실용적인 코딩 표준                        | 프론트, 백엔드 |
| code-review-excellence        | 효과적인 코드 리뷰 실천법                          | 프론트, 백엔드 |
| database-migration            | 스키마 변경, 데이터 이행, 롤백/무중단 마이그레이션 | 백엔드         |
| debugging-strategies          | 체계적 디버깅 및 프로파일링 기법                   | 프론트, 백엔드 |
| docker-expert                 | Docker 멀티스테이지 빌드, 이미지 최적화, 보안      | 백엔드         |
| error-handling-patterns       | 에러 핸들링, Result 타입, 복원력 패턴              | 프론트, 백엔드 |
| microservices-patterns        | 마이크로서비스 아키텍처 및 이벤트 기반 패턴        | 백엔드         |
| nestjs-expert                 | NestJS 모듈 아키텍처, DI, 미들웨어, 테스트         | 백엔드         |
| sql-optimization-patterns     | SQL 쿼리 최적화, 인덱싱, EXPLAIN 분석              | 백엔드         |
| testing-patterns              | Jest 기반 단위 테스트, 팩토리/목킹/TDD 패턴        | 프론트, 백엔드 |

---

## Vercel ([vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills), [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser), [vercel-labs/next-skills](https://github.com/vercel-labs/next-skills), [vercel-labs/skills](https://github.com/vercel-labs/skills))

```bash
# agent-skills
npx skills add vercel-labs/agent-skills -g -s <skill-name> -y

# agent-browser
npx skills add vercel-labs/agent-browser -g -s <skill-name> -y

# next-skills
npx skills add vercel-labs/next-skills -g -s <skill-name> -y

# skills
npx skills add vercel-labs/skills -g -s <skill-name> -y
```

| 스킬                        | 레포          | 설명                                     | 추천 직무      |
| --------------------------- | ------------- | ---------------------------------------- | -------------- |
| vercel-composition-patterns | agent-skills  | React 합성 패턴 (Compound Components 등) | 프론트         |
| vercel-react-best-practices | agent-skills  | React/Next.js 성능 최적화 가이드라인     | 프론트         |
| vercel-react-native-skills  | agent-skills  | React Native/Expo 모바일 앱 개발         | 프론트         |
| web-design-guidelines       | agent-skills  | Web Interface Guidelines 기반 UI 리뷰    | 디자인, 프론트 |
| agent-browser               | agent-browser | AI 에이전트용 브라우저 자동화 CLI        | 프론트, 백엔드 |
| next-best-practices         | next-skills   | Next.js 파일 규칙, RSC, 데이터 패턴      | 프론트         |
| next-cache-components       | next-skills   | Next.js 16 Cache Components/PPR 최적화   | 프론트         |
| next-upgrade                | next-skills   | Next.js 버전 업그레이드 가이드/코드모드  | 프론트         |
| find-skills                 | skills        | 스킬 검색 및 설치 도우미                 | 기획, 프론트   |

---

## 기타 ([intellectronica/agent-skills](https://github.com/intellectronica/agent-skills))

```bash
npx skills add intellectronica/agent-skills -g -s beautiful-mermaid -y
```

| 스킬              | 레포                         | 설명                                  | 추천 직무    |
| ----------------- | ---------------------------- | ------------------------------------- | ------------ |
| beautiful-mermaid | intellectronica/agent-skills | Mermaid 다이어그램을 SVG/PNG로 렌더링 | 기획, 백엔드 |
