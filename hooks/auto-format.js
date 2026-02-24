#!/usr/bin/env node
/**
 * 자동 포맷 Hook
 * ESLint --fix 또는 Prettier로 자동 포맷팅
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

let data = '';
process.stdin.on('data', chunk => data += chunk);
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(data);
    const filePath = input.tool_input?.file_path;

    if (filePath && fs.existsSync(filePath) && /\.(ts|tsx|js|jsx)$/.test(filePath)) {
      // 프로젝트 루트 찾기
      let dir = path.dirname(filePath);
      while (dir !== path.dirname(dir) && !fs.existsSync(path.join(dir, 'package.json'))) {
        dir = path.dirname(dir);
      }

      const packageJsonPath = path.join(dir, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const hasEslint = packageJson.devDependencies?.eslint || packageJson.dependencies?.eslint;
        const hasPrettier = packageJson.devDependencies?.prettier || packageJson.dependencies?.prettier;

        try {
          if (hasEslint) {
            execFileSync('npx', ['eslint', '--fix', filePath], {
              cwd: dir,
              stdio: ['pipe', 'pipe', 'pipe']
            });
          } else if (hasPrettier) {
            execFileSync('npx', ['prettier', '--write', filePath], {
              cwd: dir,
              stdio: ['pipe', 'pipe', 'pipe']
            });
          }
        } catch (e) {
          // Format errors are not critical
        }
      }
    }
  } catch (e) {
    // Silent fail
  }
  console.log(data);
});
