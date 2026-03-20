#!/bin/bash
# PostToolUse hook: 检查修改的 .ts 文件中是否包含 console.log

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

# 检查文件是否存在
if [ ! -f "$FILEPATH" ]; then
  exit 0
fi

# 查找 console.log（排除注释行：grep -n 带行号前缀，用 // 在内容中匹配）
MATCHES=$(grep -n 'console\.log' "$FILEPATH" | grep -v '//.*console\.log' | head -5)

if [ -n "$MATCHES" ]; then
  echo "警告：文件中存在 console.log，发布前请清理："
  echo "$MATCHES"
fi

exit 0
