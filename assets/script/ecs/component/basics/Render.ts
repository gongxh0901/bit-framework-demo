/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 渲染节点组件，持有对应 Cocos 节点引用
 */
import { Node } from "cc";

import { ecs } from "../../../header";

const { ecsclass } = ecs._ecsdecorator;

@ecsclass("Render", { describe: "渲染节点组件" })
export class Render extends ecs.Component {
    public node: Node = null;

    public reset(): void {
        this.node = null;
    }
}
