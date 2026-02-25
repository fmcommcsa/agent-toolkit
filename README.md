# Agent Toolkit

팀 공용 AI 에이전트 도구 모음입니다.

## 스킬 목록

자체 스킬:

| 스킬                 | 설명                                                               |
| -------------------- | ------------------------------------------------------------------ |
| ~~markdown-fetcher~~ | ~~웹 URL을 markdown.new 프록시를 통해 마크다운으로 변환하여 분석~~ |

추천 외부 스킬 전체 목록은 [SKILL-CATALOG.md](./SKILL-CATALOG.md)를 참고하세요.

## 구조

```text
agent-toolkit/
├── hooks/
│   ├── auto-format.js
│   ├── console-log-check.js
│   ├── session-start.js
│   ├── session-end.js
│   ├── suggest-compact.js
│   └── typescript-check.js
├── rules/
│   └── security.md
├── skills/
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
