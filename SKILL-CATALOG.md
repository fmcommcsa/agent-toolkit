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

## 자체 스킬

```bash
npx skills add fmcommcsa/agent-toolkit -g
```

| 스킬             | 설명                                                           |
| ---------------- | -------------------------------------------------------------- |
| markdown-fetcher | 웹 URL을 markdown.new 프록시를 통해 마크다운으로 변환하여 분석 |

---

## Azure (`microsoft/GitHub-Copilot-for-Azure`)

```bash
npx skills add microsoft/GitHub-Copilot-for-Azure -g -s <skill-name> -y
```

| 스킬                        | 설명                                                   |
| --------------------------- | ------------------------------------------------------ |
| appinsights-instrumentation | Azure Application Insights 계측 가이드                 |
| azure-ai                    | Azure AI Search, Speech, OpenAI, Document Intelligence |
| azure-aigateway             | Azure API Management을 AI Gateway로 구성               |
| azure-compliance            | Azure 보안 감사 및 컴플라이언스 평가                   |
| azure-cost-optimization     | Azure 비용 최적화 분석 및 권장사항                     |
| azure-deploy                | Azure 배포 실행 (azd up/deploy)                        |
| azure-diagnostics           | Azure Container Apps 진단 및 로그 분석                 |
| azure-kusto                 | Azure Data Explorer (Kusto) KQL 쿼리                   |
| azure-messaging             | Azure Event Hubs, Service Bus SDK 트러블슈팅           |
| azure-observability         | Azure Monitor, Application Insights, Log Analytics     |
| azure-postgres              | Azure Database for PostgreSQL 설정 및 Entra ID 인증    |
| azure-prepare               | Azure 앱 개발 준비 및 인프라 구성                      |
| azure-rbac                  | Azure RBAC 역할 할당 및 최소 권한 설정                 |
| azure-resource-lookup       | Azure 리소스 조회 및 목록                              |
| azure-resource-visualizer   | Azure 리소스 그룹 Mermaid 아키텍처 다이어그램 생성     |
| azure-storage               | Azure Blob, File, Queue, Table Storage                 |
| azure-validate              | Azure 배포 전 사전 검증                                |
| entra-app-registration      | Microsoft Entra ID 앱 등록 및 OAuth 설정               |
| microsoft-foundry           | Microsoft Foundry AI 모델 배포 및 에이전트 관리        |

---

## 개발 패턴 (`sickn33/antigravity-awesome-skills`)

```bash
npx skills add sickn33/antigravity-awesome-skills -g -s <skill-name> -y
```

| 스킬                        | 설명                                               |
| --------------------------- | -------------------------------------------------- |
| api-design-principles       | REST/GraphQL API 설계 원칙                         |
| api-security-best-practices | API 인증, 인가, 입력 검증, Rate Limiting           |
| azure-functions             | Azure Functions 개발 패턴 (Durable Functions 포함) |
| backend-architect           | 확장 가능한 백엔드 아키텍처 설계                   |
| backend-security-coder      | 백엔드 보안 코딩 및 코드 리뷰                      |
| clean-code                  | 간결하고 실용적인 코딩 표준                        |
| code-review-excellence      | 효과적인 코드 리뷰 실천법                          |
| database-architect          | 데이터베이스 설계, 기술 선택, 스키마 모델링        |
| debugging-strategies        | 체계적 디버깅 및 프로파일링 기법                   |
| docker-expert               | Docker 멀티스테이지 빌드, 이미지 최적화, 보안      |
| e2e-testing-patterns        | Playwright/Cypress E2E 테스트 패턴                 |
| error-handling-patterns     | 에러 핸들링, Result 타입, 복원력 패턴              |
| microservices-patterns      | 마이크로서비스 아키텍처 및 이벤트 기반 패턴        |
| nestjs-expert               | NestJS 모듈 아키텍처, DI, 미들웨어, 테스트         |
| sql-optimization-patterns   | SQL 쿼리 최적화, 인덱싱, EXPLAIN 분석              |
| typescript-expert           | TypeScript 타입 프로그래밍, 성능, 모노레포         |

---

## Anthropic (`anthropics/skills`)

```bash
npx skills add anthropics/skills -g -s <skill-name> -y
```

| 스킬            | 설명                                     |
| --------------- | ---------------------------------------- |
| frontend-design | 프로덕션급 프론트엔드 UI 구현            |
| mcp-builder     | MCP 서버 빌드 가이드 (Python/TypeScript) |
| webapp-testing  | Playwright 기반 웹앱 테스트              |

---

## Vercel (`vercel-labs`)

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

| 스킬                        | 레포          | 설명                                     |
| --------------------------- | ------------- | ---------------------------------------- |
| vercel-composition-patterns | agent-skills  | React 합성 패턴 (Compound Components 등) |
| vercel-react-best-practices | agent-skills  | React/Next.js 성능 최적화 가이드라인     |
| vercel-react-native-skills  | agent-skills  | React Native/Expo 모바일 앱 개발         |
| web-design-guidelines       | agent-skills  | Web Interface Guidelines 기반 UI 리뷰    |
| agent-browser               | agent-browser | AI 에이전트용 브라우저 자동화 CLI        |
| skill-creator               | agent-browser | 스킬 생성 가이드                         |
| next-best-practices         | next-skills   | Next.js 파일 규칙, RSC, 데이터 패턴      |
| find-skills                 | skills        | 스킬 검색 및 설치 도우미                 |

---

## 기타

```bash
npx skills add browser-use/browser-use -g -y
npx skills add intellectronica/agent-skills -g -s beautiful-mermaid -y
```

| 스킬              | 레포                         | 설명                                             |
| ----------------- | ---------------------------- | ------------------------------------------------ |
| browser-use       | browser-use/browser-use      | 브라우저 자동화 (폼 입력, 스크린샷, 데이터 추출) |
| beautiful-mermaid | intellectronica/agent-skills | Mermaid 다이어그램을 SVG/PNG로 렌더링            |
