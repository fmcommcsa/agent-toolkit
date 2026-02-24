#!/usr/bin/env node
/**
 * 세션 종료 Hook
 * 세션 상태 저장
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const STATE_DIR = path.join(process.env.HOME, '.config/shared-hooks/sessions');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getRecentlyModifiedFiles(cwd) {
  try {
    const result = execSync('git diff --name-only HEAD 2>/dev/null || true', {
      cwd,
      encoding: 'utf8'
    });
    return result.trim().split('\n').filter(f => f.length > 0).slice(0, 10);
  } catch (e) {
    return [];
  }
}

let data = '';
process.stdin.on('data', chunk => data += chunk);
process.stdin.on('end', () => {
  try {
    const cwd = process.cwd();
    ensureDir(STATE_DIR);

    const projectHash = Buffer.from(cwd).toString('base64').replace(/[/+=]/g, '_');
    const sessionFile = path.join(STATE_DIR, `${projectHash}.json`);

    const session = {
      timestamp: Date.now(),
      cwd,
      lastFiles: getRecentlyModifiedFiles(cwd)
    };

    fs.writeFileSync(sessionFile, JSON.stringify(session, null, 2));

    console.error('\n[Hook] 💾 세션 상태 저장됨\n');
  } catch (e) {
    // Silent fail
  }
  console.log(data);
});
