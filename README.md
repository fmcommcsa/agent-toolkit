# Agent Toolkit

팀 공용 AI 에이전트 도구 모음입니다.

## 설치

### npx skills (Claude Code, Cursor, Gemini CLI 등)

```bash
npx skills add fmcommcsa/agent-toolkit -g
```

### Claude Code 플러그인

```bash
claude install github:fmcommcsa/agent-toolkit
```

## 스킬 목록

| 스킬 | 설명 |
|------|------|
| markdown-fetcher | 웹 URL을 markdown.new 프록시를 통해 마크다운으로 변환하여 분석 |

## 구조

```
agent-toolkit/
├── skills/                    # npx skills add 용
│   └── <skill-name>/
│       └── SKILL.md
├── plugins/                   # claude install 용
│   └── <skill-name>/
│       ├── .claude-plugin/
│       │   └── plugin.json
│       └── skills/
│           └── <skill-name>/
│               └── SKILL.md
└── README.md
```
