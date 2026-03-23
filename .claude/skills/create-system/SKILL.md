---
name: create-system
description: 创建符合项目规范的 ECS 系统
user-invocable: true
argument-hint: [系统名] [描述] [分类目录]
allowed-tools: Read(*), Write(*), Edit(*), Glob(*), Grep(*)
---

# 创建 ECS 系统

生成符合项目规范的 ECS 系统类。

## 参数解析
- `$ARGUMENTS[0]` = 系统名（PascalCase，如 AttackSystem）
- `$ARGUMENTS[1]` = 系统描述（如 "攻击系统"）
- `$ARGUMENTS[2]` = 分类目录（如 basics、generate、debug，默认 "basics"）

## 执行步骤

### 1. 参考现有代码风格
读取以下文件了解项目代码风格：
- `assets/script/header.ts` — import 风格
- `assets/script/ecs/system/` 下 1-2 个现有系统文件

### 2. 了解可用组件
扫描 `assets/script/ecs/component/` 下所有组件，列出可用组件供选择。

### 3. 询问 matcher 配置
询问用户系统需要查询哪些组件：
- `allOf` — 必须包含的组件
- `anyOf` — 至少包含一个的组件
- `excludeOf` — 排除的组件
- `optionalOf` — 可选组件

### 4. 生成系统代码

```typescript
import { ecs } from "相对路径/header";
import { Component1 } from "../../component/分类/Component1";
import { Component2 } from "../../component/分类/Component2";
const { ecsystem } = ecs._ecsdecorator;

@ecsystem("系统名", { describe: "描述" })
export class 系统名 extends ecs.System {
    protected onInit(): void {
        this.matcher.allOf(Component1, Component2);
    }

    public update(dt: number): void {
        const query = this.query;
        for (const [_entity, comp1, comp2] of query.iterate2(Component1, Component2)) {
            // 处理逻辑
        }
    }
}
```

### 5. 保存文件
保存到 `assets/script/ecs/system/{分类目录}/{系统名}.ts`

### 6. 自动注册系统
读取 `assets/script/ecs/ECSHelper.ts`，自动完成注册：
1. 在文件顶部 import 区域添加新系统的 import 语句
2. 在 `register()` 方法的 `addSystem` 链中插入 `new 系统名()`
3. 询问用户希望将系统插入到哪个位置（在哪个系统之前/之后），如果用户不指定则追加到链末尾（`world.initialize()` 之前）

### 注意事项
- `iterate` 方法的组件参数顺序必须与 `allOf` + `anyOf` + `optionalOf` 的声明顺序一致
- `anyOf` 和 `optionalOf` 的组件在 iterate 中可能为 null，需做空值判断
- 系统不应存储持久状态，全局数据使用单例组件
