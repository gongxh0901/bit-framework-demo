#!/bin/bash
# PostToolUse hook: 编辑 .ts 文件后运行 TypeScript 类型检查
# 与 eslint hook 互补：eslint 管代码风格，tsc 管类型安全

INPUT=$(cat)
FILEPATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.filePath // empty')

# 只检查 assets/script/ 下的 .ts 文件
if [ -z "$FILEPATH" ]; then
  exit 0
fi

if ! echo "$FILEPATH" | grep -q '\.ts$'; then
  exit 0
fi

if ! echo "$FILEPATH" | grep -q '/assets/script/'; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR" || exit 0

# 运行 tsc 类型检查（不生成输出文件），过滤引擎内部错误
ERRORS=$(npx tsc --noEmit 2>&1 | grep -E "error TS" | grep "assets/script/" | head -10)

if [ -n "$ERRORS" ]; then
  echo "TypeScript 类型检查发现错误："
  echo "$ERRORS"
  ERROR_COUNT=$(echo "$ERRORS" | wc -l | tr -d ' ')
  if [ "$ERROR_COUNT" -ge 10 ]; then
    echo "（仅显示前 10 条，可能还有更多）"
  fi
fi

exit 0
