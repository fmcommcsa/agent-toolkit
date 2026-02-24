#!/bin/bash
set -e

REPO="fmcommcsa/agent-toolkit"
BRANCH="main"
BASE_URL="https://raw.githubusercontent.com/$REPO/$BRANCH"
AGENTS_DIR="$HOME/.agents"
CLAUDE_RULES_DIR="$HOME/.claude/rules"

RULES=(
  "security.md"
)

HOOKS=(
  "auto-format.js"
  "console-log-check.js"
  "session-start.js"
  "session-end.js"
  "suggest-compact.js"
  "typescript-check.js"
)

echo "=== Agent Toolkit Setup ==="
echo ""

# Rules
echo "[1/3] Rules → ~/.agents/rules/"
mkdir -p "$AGENTS_DIR/rules"

for name in "${RULES[@]}"; do
  target="$AGENTS_DIR/rules/$name"
  if [ -f "$target" ]; then
    echo "  ⚠ $name 기존 파일을 백업합니다 → ${target}.bak"
    mv "$target" "${target}.bak"
  fi
  curl -fsSL "$BASE_URL/rules/$name" -o "$target"
  echo "  → $name 설치 완료"
done

# Hooks
echo ""
echo "[2/3] Hooks → ~/.agents/hooks/"
mkdir -p "$AGENTS_DIR/hooks"

for name in "${HOOKS[@]}"; do
  target="$AGENTS_DIR/hooks/$name"
  if [ -f "$target" ]; then
    echo "  ⚠ $name 기존 파일을 백업합니다 → ${target}.bak"
    mv "$target" "${target}.bak"
  fi
  curl -fsSL "$BASE_URL/hooks/$name" -o "$target"
  chmod +x "$target"
  echo "  → $name 설치 완료"
done

# Claude Code
echo ""
echo "[3/3] Claude Code → ~/.claude/rules/"

if [ -d "$HOME/.claude" ]; then
  mkdir -p "$CLAUDE_RULES_DIR"

  for name in "${RULES[@]}"; do
    read -r -p "  Claude rules 파일명 [$name]: " input_name
    link_name="${input_name:-$name}"

    ln -sf "$AGENTS_DIR/rules/$name" "$CLAUDE_RULES_DIR/$link_name"
    echo "  → $link_name 심볼릭 링크 생성"
  done
else
  echo "  ⏭ Claude Code 미설치 (건너뜀)"
fi

echo ""
echo "완료!"
echo ""
echo "Codex, Gemini 등 다른 도구는 각 도구의 설정에서"
echo "~/.agents/rules/ 및 ~/.agents/hooks/ 경로를 직접 참조하세요."
