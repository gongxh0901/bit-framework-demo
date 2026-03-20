#!/bin/bash
# PreToolUse hook: git push 前提醒检查变更

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# matcher 已限定 Bash，只需检查是否为 git push
if ! echo "$COMMAND" | grep -q 'git push'; then
  exit 0
fi

echo "Git Push 提醒：请确认以下事项"
echo "  1. 已检查变更内容（git diff）"
echo "  2. 已运行 eslint 检查"
echo "  3. 推送目标分支正确"

# exit 0 = 不阻断，只提醒
exit 0
