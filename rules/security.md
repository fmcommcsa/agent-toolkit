# Security Rules

## 커밋 전 필수 체크

- [ ] 하드코딩된 비밀값 없음 (API 키, 비밀번호, 토큰)
- [ ] 환경변수 사용 (`process.env.*`)
- [ ] 모든 사용자 입력 검증됨
- [ ] SQL Injection 방지 (파라미터 쿼리, ORM 사용)
- [ ] XSS 방지 (HTML 새니타이징)
- [ ] 인증/인가 검증됨
- [ ] 에러 메시지에 민감 정보 미노출

## 금지 패턴

```typescript
// NEVER: 하드코딩된 비밀값
const apiKey = "sk-xxxxx"
const password = "admin123"

// ALWAYS: 환경변수 사용
const apiKey = process.env.API_KEY
if (!apiKey) throw new Error('API_KEY not configured')
```

## 민감 파일

커밋하지 말 것:
- `.env`, `.env.*`
- `credentials.json`
- `*.pem`, `*.key`
- `secrets.*`

## 보안 이슈 발견 시

1. 즉시 작업 중단
2. 이슈 보고
3. CRITICAL 먼저 수정
4. 노출된 비밀값 교체
