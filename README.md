# Agent Toolkit

팀 공용 AI 에이전트 도구 모음입니다.

## 설치

```bash
claude install github:fmcommcsa/agent-toolkit
```

## 플러그인 목록

| 플러그인 | 설명 |
|---------|------|
| [markdown-fetcher](plugins/markdown-fetcher) | 웹 URL을 markdown.new 프록시를 통해 마크다운으로 변환하여 분석 |

## 구조

```
plugins/
└── <plugin-name>/
    ├── .claude-plugin/
    │   └── plugin.json
    └── skills/
        └── <skill-name>/
            └── SKILL.md
```
