#!/usr/bin/env node
/**
 * console.log 경고 Hook
 * 편집된 파일에서 console.log를 감지하여 경고
 */
const fs = require('fs');

let data = '';
process.stdin.on('data', chunk => data += chunk);
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(data);
    const filePath = input.tool_input?.file_path;

    if (filePath && fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      const matches = [];

      lines.forEach((line, idx) => {
        if (/console\.log/.test(line) && !/\/\/.*console\.log/.test(line)) {
          matches.push(`  ${idx + 1}: ${line.trim()}`);
        }
      });

      if (matches.length > 0) {
        console.error('\n[Hook] ⚠️  console.log 발견:');
        console.error(`파일: ${filePath}`);
        matches.slice(0, 5).forEach(m => console.error(m));
        if (matches.length > 5) {
          console.error(`  ... 외 ${matches.length - 5}개`);
        }
        console.error('[Hook] 커밋 전 제거하세요.\n');
      }
    }
  } catch (e) {
    // Silent fail
  }
  console.log(data);
});
