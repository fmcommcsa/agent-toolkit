#!/usr/bin/env bash
set -euo pipefail

AGENT="claude-code"

add_skill() {
  local repo="$1"
  local skill="$2"
  npx -y skills add "$repo" -g -a "$AGENT" -s "$skill" -y
}

remove_skill() {
  local skill="$1"
  npx -y skills remove -g -s "$skill" -y >/dev/null 2>&1 || true
}

echo "[1/4] 카탈로그에 있는 스킬만 제거 (다른 스킬 보존)"

echo "[2/4] 큐레이팅 스킬 재설치 (global + claude link)"

# Anthropic
for s in \
  doc-coauthoring docx frontend-design mcp-builder pdf pptx skill-creator web-artifacts-builder xlsx
do
  remove_skill "$s"
  add_skill anthropics/skills "$s"
done

# OpenAI Curated
for s in \
  gh-address-comments gh-fix-ci screenshot security-ownership-map security-threat-model \
  sentry sora speech transcribe vercel-deploy yeet
do
  remove_skill "$s"
  add_skill openai/skills "$s"
done

# 개발 패턴
for s in \
  api-documentation api-design-principles api-security-testing api-security-best-practices \
  architecture-decision-records auth-implementation-patterns azure-functions clean-code \
  code-review-excellence database-migration \
  debugging-strategies docker-expert error-handling-patterns microservices-patterns nestjs-expert \
  sql-optimization-patterns testing-patterns
do
  remove_skill "$s"
  add_skill sickn33/antigravity-awesome-skills "$s"
done

# Vercel
for s in vercel-composition-patterns vercel-react-best-practices vercel-react-native-skills web-design-guidelines
do
  remove_skill "$s"
  add_skill vercel-labs/agent-skills "$s"
done
remove_skill agent-browser
add_skill vercel-labs/agent-browser agent-browser
for s in next-best-practices next-cache-components next-upgrade
do
  remove_skill "$s"
  add_skill vercel-labs/next-skills "$s"
done
remove_skill find-skills
add_skill vercel-labs/skills find-skills

# 기타
remove_skill beautiful-mermaid
add_skill intellectronica/agent-skills beautiful-mermaid

echo "[3/4] 설치 결과 확인"
npx -y skills ls -g -a "$AGENT"

echo "[4/4] 완료"
