#!/usr/bin/env node
/**
 * TypeScript 타입 체크 Hook
 * 편집 후 해당 파일의 타입 에러 표시
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

let data = '';
process.stdin.on('data', chunk => data += chunk);
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(data);
    const filePath = input.tool_input?.file_path;

    if (filePath && fs.existsSync(filePath) && /\.(ts|tsx)$/.test(filePath)) {
      // tsconfig.json 찾기
      let dir = path.dirname(filePath);
      while (dir !== path.dirname(dir) && !fs.existsSync(path.join(dir, 'tsconfig.json'))) {
        dir = path.dirname(dir);
      }

      if (fs.existsSync(path.join(dir, 'tsconfig.json'))) {
        try {
          execSync('npx tsc --noEmit --pretty false 2>&1', {
            cwd: dir,
            encoding: 'utf8',
            stdio: ['pipe', 'pipe', 'pipe']
          });
        } catch (e) {
          const output = e.stdout || '';
          const lines = output.split('\n')
            .filter(l => l.includes(path.basename(filePath)))
            .slice(0, 8);

          if (lines.length > 0) {
            console.error('\n[Hook] ⚠️  TypeScript 에러:');
            lines.forEach(l => console.error(`  ${l}`));
            console.error('');
          }
        }
      }
    }
  } catch (e) {
    // Silent fail
  }
  console.log(data);
});
