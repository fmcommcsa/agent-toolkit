#!/usr/bin/env node
/**
 * 컨텍스트 압축 시점 제안 Hook
 * 편집 횟수를 추적하여 압축 시점 제안
 */
const fs = require('fs');
const path = require('path');

const STATE_FILE = path.join(process.env.HOME, '.config/shared-hooks/compact-state.json');

function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    }
  } catch (e) {}
  return { editCount: 0, lastSuggestion: 0 };
}

function saveState(state) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
  } catch (e) {}
}

let data = '';
process.stdin.on('data', chunk => data += chunk);
process.stdin.on('end', () => {
  try {
    const state = loadState();
    state.editCount += 1;

    // 20회 편집마다 압축 제안
    if (state.editCount - state.lastSuggestion >= 20) {
      console.error('\n[Hook] 💡 컨텍스트 압축 권장');
      console.error(`편집 횟수: ${state.editCount}회`);
      console.error('"/compact" 명령어로 컨텍스트를 정리하세요.\n');
      state.lastSuggestion = state.editCount;
    }

    saveState(state);
  } catch (e) {
    // Silent fail
  }
  console.log(data);
});
