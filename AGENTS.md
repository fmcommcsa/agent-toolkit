# AGENTS.md

이 문서는 `agent-toolkit` 레포에서 작업하는 에이전트 공통 지침입니다.

## 1) 기본 원칙

- 변경은 최소 단위로 수행하고, 의도를 명확히 남긴다.
- 기존 구조/관례를 우선 존중한다.
- 불확실하면 추측 대신 확인한다.
- 보안 이슈 징후가 있으면 즉시 작업을 멈추고 보고한다.
- **Language**: 모든 출력은 **한국어**로 합니다.

## 2) Security Rules

### 커밋 전 필수 체크

- [ ] 하드코딩된 비밀값 없음 (API 키, 비밀번호, 토큰)
- [ ] 환경변수 사용 (`process.env.*`)
- [ ] 모든 사용자 입력 검증됨
- [ ] SQL Injection 방지 (파라미터 쿼리, ORM 사용)
- [ ] XSS 방지 (HTML 새니타이징)
- [ ] 인증/인가 검증됨
- [ ] 에러 메시지에 민감 정보 미노출

### 금지 패턴

```typescript
// NEVER: 하드코딩된 비밀값
const apiKey = "sk-xxxxx";
const password = "admin123";

// ALWAYS: 환경변수 사용
const apiKey = process.env.API_KEY;
if (!apiKey) throw new Error("API_KEY not configured");
```

### 민감 파일

커밋하지 말 것:

- `.env`, `.env.*`
- `credentials.json`
- `*.pem`, `*.key`
- `secrets.*`

### 보안 이슈 발견 시

1. 즉시 작업 중단
2. 이슈 보고
3. CRITICAL 먼저 수정
4. 노출된 비밀값 교체

## 3) Skills 운영 규칙

- **외부 스킬**은 [`SKILL-CATALOG.md`](./SKILL-CATALOG.md)로 관리한다.
- **내부 스킬**은 레포 내 `skills/` 폴더로 관리하며, 현재는 미운영 상태(추후 운영 예정)다.
- 스킬 설치/업데이트 명령은 카탈로그 문서의 레포별 명령을 따른다.
- 특정 스킬 요청이 있으면 카탈로그에 등록된 이름을 우선 사용한다.
- 카탈로그 누락 항목이 확인되면 먼저 `SKILL-CATALOG.md`를 갱신한다.

## 4) 레포 구조 참고

- 설치/설정: [`README.md`](./README.md)
- 보안 규칙 원본: [`rules/security.md`](./rules/security.md)
- 스킬 목록: [`SKILL-CATALOG.md`](./SKILL-CATALOG.md)
