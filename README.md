# Agent Toolkit

팀 공용 AI 에이전트 도구 모음입니다.

## 에이전트 지침 생성 프롬프트 사용법

프로젝트 지침 문서를 만들 때는 아래 프롬프트를 먼저 읽게 한 뒤, 분석/생성을 수행하도록 지시하세요.

- 프롬프트 파일: [docs/prompts/create-agent-guide-document.md](./docs/prompts/create-agent-guide-document.md)

권장 지시문(복붙용):

```text
docs/prompts/create-agent-guide-document.md 내용을 작업 규칙으로 먼저 읽고, 1~4단계를 순서대로 수행해. 추측 금지, 근거 파일 경로 필수, [확인 필요] 분리, 최종 출력 포맷 준수.
```

생성 결과물(파일):

```text
AGENTS.md
CLAUDE.md

docs/{agent|agents}/workflow.md
docs/{agent|agents}/architecture.md
docs/{agent|agents}/coding-standards.md
docs/{agent|agents}/testing.md
docs/{agent|agents}/api-interface.md
docs/{agent|agents}/data-domain.md
docs/{agent|agents}/security.md
docs/{agent|agents}/deployment-verification.md
docs/{agent|agents}/operations-runbook.md
docs/{agent|agents}/sync-governance.md
```

참고:

- `AGENTS.md`, `CLAUDE.md`는 항상 생성됩니다.
- 모듈 문서는 프로젝트 분석 근거가 있는 항목만 생성됩니다.
- `CLAUDE.md`는 `@AGENTS.md`를 연결하는 진입 파일이며, 실제 기본 지침은 `AGENTS.md`입니다.

## 스킬 목록

이 레포는 현재 내부(자체) 스킬을 운영하지 않습니다.
스킬 관리는 외부 스킬만 대상으로 하며, 기준 문서는 [SKILL-CATALOG.md](./SKILL-CATALOG.md)입니다.
스킬 설치/업데이트는 카탈로그의 레포별 명령을 사용하세요.

## 구조

```text
agent-toolkit/
├── docs/
│   └── prompts/
│       └── create-agent-guide-document.md
├── hooks/
│   ├── auto-format.js
│   ├── console-log-check.js
│   ├── session-start.js
│   ├── session-end.js
│   ├── suggest-compact.js
│   └── typescript-check.js
├── rules/
│   └── security.md
├── skills/             # 현재 비어 있음
│   └── <skill-name>/
│       └── SKILL.md
├── setup.sh
├── SKILL-CATALOG.md
└── README.md
```

---

## Rules & Hooks 설치

공유 규칙(`rules/`)과 Hook 스크립트(`hooks/`)를 로컬에 심볼릭 링크로 연결합니다.

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/fmcommcsa/agent-toolkit/main/setup.sh)
```

실행하면:

1. `~/.agents/rules/`에 규칙 파일 심볼릭 링크
2. `~/.agents/hooks/`에 Hook 스크립트 심볼릭 링크
3. Claude Code 설치 시 `~/.claude/rules/`에도 연결 (파일명 변경 가능)

### 도구별 Hooks 연결 방법

setup.sh는 `~/.agents/hooks/`까지만 설치합니다. 각 도구에서 사용하려면 아래 설정을 추가하세요.

**Claude Code** (`~/.claude/settings.json`):

```json
{
  "hooks": {
    "SessionStart": [{ "command": "node ~/.agents/hooks/session-start.js" }],
    "SessionEnd": [{ "command": "node ~/.agents/hooks/session-end.js" }],
    "PreToolUse": [
      {
        "command": "node ~/.agents/hooks/suggest-compact.js",
        "matcher": "Edit|Write"
      }
    ],
    "PostToolUse": [
      { "command": "node ~/.agents/hooks/auto-format.js", "matcher": "Edit" },
      {
        "command": "node ~/.agents/hooks/typescript-check.js",
        "matcher": "Edit"
      },
      {
        "command": "node ~/.agents/hooks/console-log-check.js",
        "matcher": "Edit"
      }
    ]
  }
}
```

**Codex** (`~/.codex/config.toml`):

```toml
[hooks]
session_start = "node ~/.agents/hooks/session-start.js"
session_end = "node ~/.agents/hooks/session-end.js"
after_edit = "node ~/.agents/hooks/auto-format.js"
```

**Gemini CLI** (`~/.gemini/settings.json`):

```json
{
  "hooks": {
    "SessionStart": [{ "command": "node ~/.agents/hooks/session-start.js" }],
    "SessionEnd": [{ "command": "node ~/.agents/hooks/session-end.js" }],
    "BeforeTool": [{ "command": "node ~/.agents/hooks/suggest-compact.js" }],
    "AfterTool": [
      { "command": "node ~/.agents/hooks/auto-format.js" },
      { "command": "node ~/.agents/hooks/typescript-check.js" },
      { "command": "node ~/.agents/hooks/console-log-check.js" }
    ]
  }
}
```

### Hooks 목록

| 스크립트             | 트리거                  | 기능                                    |
| -------------------- | ----------------------- | --------------------------------------- |
| session-start.js     | SessionStart            | 패키지 매니저 감지, 이전 세션 상태 로드 |
| session-end.js       | SessionEnd              | 세션 상태 저장 (작업 파일 목록 등)      |
| suggest-compact.js   | BeforeTool (Edit/Write) | 편집 20회마다 컨텍스트 압축 제안        |
| auto-format.js       | AfterTool (Edit)        | ESLint/Prettier 자동 포맷 (JS/TS)       |
| typescript-check.js  | AfterTool (Edit)        | TS 파일 편집 후 타입 체크               |
| console-log-check.js | AfterTool (Edit)        | console.log 감지 및 경고                |
