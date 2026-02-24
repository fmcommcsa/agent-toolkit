#!/usr/bin/env node
/**
 * 세션 시작 Hook
 * 이전 세션 상태 로드 및 환경 감지
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const STATE_DIR = path.join(process.env.HOME, '.config/shared-hooks/sessions');

function detectPackageManager(cwd) {
  const checks = [
    { file: 'bun.lockb', pm: 'bun' },
    { file: 'pnpm-lock.yaml', pm: 'pnpm' },
    { file: 'yarn.lock', pm: 'yarn' },
    { file: 'package-lock.json', pm: 'npm' }
  ];

  for (const { file, pm } of checks) {
    if (fs.existsSync(path.join(cwd, file))) {
      return pm;
    }
  }
  return 'npm';
}

function loadLastSession(cwd) {
  try {
    const projectHash = Buffer.from(cwd).toString('base64').replace(/[/+=]/g, '_');
    const sessionFile = path.join(STATE_DIR, `${projectHash}.json`);

    if (fs.existsSync(sessionFile)) {
      const session = JSON.parse(fs.readFileSync(sessionFile, 'utf8'));
      const age = Date.now() - session.timestamp;
      const hours = Math.floor(age / (1000 * 60 * 60));

      if (hours < 24) {
        return session;
      }
    }
  } catch (e) {}
  return null;
}

let data = '';
process.stdin.on('data', chunk => data += chunk);
process.stdin.on('end', () => {
  try {
    const cwd = process.cwd();
    const pm = detectPackageManager(cwd);
    const lastSession = loadLastSession(cwd);

    console.error('\n[Hook] 🚀 세션 시작');
    console.error(`패키지 매니저: ${pm}`);

    if (lastSession) {
      console.error(`이전 세션: ${new Date(lastSession.timestamp).toLocaleString('ko-KR')}`);
      if (lastSession.lastFiles?.length > 0) {
        console.error(`마지막 작업 파일: ${lastSession.lastFiles.slice(0, 3).join(', ')}`);
      }
    }
    console.error('');
  } catch (e) {
    // Silent fail
  }
  console.log(data);
});
