---
name: markdown-fetcher
description: "웹 URL 분석 요청 시 markdown.new를 사용해 마크다운 콘텐츠를 가져오는 스킬. URL이 포함되고 확인/요약/분석 의도가 명확할 때만 트리거."
---

# Markdown Fetcher

## Overview

웹 URL을 `markdown.new` 프록시를 통해 마크다운으로 변환해 읽고, 사용자 요청(확인/요약/분석)에 맞게 응답한다.

## Trigger Rules

다음 조건을 **모두** 만족할 때만 사용한다.

1. 사용자 메시지에 유효한 URL(`http://` 또는 `https://`)이 포함됨
2. 링크 내용을 확인/요약/분석하려는 의도가 명확함

단순 링크 공유, 인사, 맥락 없는 문장에는 자동 적용하지 않는다.

## Safety Rules (필수)

URL fetch 전에 아래를 반드시 확인한다.

1. 스킴 제한: `http`, `https`만 허용
2. 내부망/로컬 주소 차단: `localhost`, `127.0.0.1`, `0.0.0.0`, 사설 IP 대역, 메타데이터 엔드포인트 등
3. 민감 정보 포함 URL 차단: 토큰/세션값이 노출된 링크는 사용자 확인 없이 fetch 금지

## Workflow

### 1. URL 추출 및 정규화

- 메시지에서 URL을 추출한다.
- 불필요한 후행 문장부호(`,`, `.`, `)`, `]` 등)를 제거한다.

### 2. markdown.new URL 생성

기본 변환 형태:

```
원본: https://example.com/some-article?x=1&y=2
변환: https://markdown.new/https://example.com/some-article?x=1&y=2
```

원본 URL에 쿼리가 있을 때 옵션 충돌이 발생할 수 있으므로, 옵션이 필요하면 URL 인코딩 또는 도구가 권장하는 안전한 결합 방식을 사용한다.

### 3. WebFetch 호출

- WebFetch의 `prompt`에는 사용자의 원래 의도를 반영한다.
- 여러 URL이 있으면 병렬 호출하되, 실패한 URL은 개별 실패로 처리한다.

### 4. 실패 처리 / 폴백

- 1차 실패 시 1회 재시도
- 계속 실패하면 원인(접근 차단/타임아웃/파싱 실패)을 요약해 사용자에게 전달
- 다중 URL일 때는 성공한 링크부터 응답하고, 실패 링크는 별도 명시

## Options

필요한 경우에만 옵션을 사용한다.

| 파라미터 | 용도 | 예시 |
|---|---|---|
| `method=browser` | JS 렌더링이 필요한 SPA 사이트 | `...?method=browser` |
| `retain_images=true` | 이미지 URL 유지가 필요할 때 | `...?retain_images=true` |

## Examples

**사용자**: "이 글 확인해줘 https://blog.example.com/post-123"

→ `WebFetch(url: "https://markdown.new/https://blog.example.com/post-123", prompt: "이 글의 핵심 내용을 확인하고 요약해줘")`

**사용자**: "https://docs.example.com/api 이 API 문서 요약해줘"

→ `WebFetch(url: "https://markdown.new/https://docs.example.com/api", prompt: "이 API 문서의 주요 엔드포인트와 사용법을 요약해줘")`
