#!/bin/bash
# PostToolUse hook: 编辑 .ts 文件后自动运行 eslint --fix

INPUT=$(cat)
FILEPATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# 只处理 assets/script/ 下的 .ts 文件
if [ -z "$FILEPATH" ]; then
  exit 0
fi

if ! echo "$FILEPATH" | grep -q '\.ts$'; then
  exit 0
fi

if ! echo "$FILEPATH" | grep -q '/assets/script/'; then
  exit 0
fi

if [ ! -f "$FILEPATH" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR" || exit 0
npx eslint --fix "$FILEPATH" 2>/dev/null || true

exit 0
