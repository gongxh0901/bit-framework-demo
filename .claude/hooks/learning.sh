#!/bin/bash
# Stop hook: 持续学习 — 提示 AI 检查本次交互是否有值得记录的模式
# 基于 ECC 的 Continuous Learning V1 思路，轻量实现

INPUT=$(cat)

# 从 stop_hook_active 环境变量防止递归
if [ "$LEARNING_HOOK_ACTIVE" = "1" ]; then
  exit 0
fi

# 输出提示文本，让 AI 在下次机会时检查
cat << 'PROMPT'
[持续学习检查] 回顾本次交互，如果发现以下类型的有价值模式，请写入 memory 文件：
- 错误解决方案（特别是 Cocos/FGUI/ECS 相关的）
- 用户纠正过的错误理解
- 项目特定的约定或偏好
- 有效的调试技巧
- 架构决策和原因
如果没有值得记录的内容，跳过即可。
PROMPT

exit 0
