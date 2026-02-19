# Agent Toolkit

팀 공용 AI 에이전트 도구 모음입니다.

## 설치

### 전체 설치

```bash
npx skills add fmcommcsa/agent-toolkit -g
```

### 개별 스킬 설치

```bash
npx skills add fmcommcsa/agent-toolkit -g -s <skill-name>
```

```bash
# 예시
npx skills add fmcommcsa/agent-toolkit -g -s markdown-fetcher
```

Claude Code, Cursor, Gemini CLI, OpenCode, Kiro CLI 등 주요 에이전트 도구에 자동 연결됩니다.

## 스킬 목록

| 스킬 | 설명 |
|------|------|
| markdown-fetcher | 웹 URL을 markdown.new 프록시를 통해 마크다운으로 변환하여 분석 |

## 구조

```
agent-toolkit/
├── skills/
│   └── <skill-name>/
│       └── SKILL.md
└── README.md
```
