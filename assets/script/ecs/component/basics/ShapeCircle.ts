/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 圆形碰撞体配置组件，由 ShapeGenerate 系统处理后删除
 */
import { Enum } from "cc";

import { ecs } from "../../../header";
import { EEntityType } from "./EntityType";

const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("ShapeCircle", { describe: "圆形碰撞体配置组件（初始化后删除）" })
export class ShapeCircle extends ecs.Component {
    @ecsprop({ type: "float", defaultValue: 0, displayName: "半径" })
    public radius: number = 0;

    @ecsprop({ type: "enum", format: Enum(EEntityType), defaultValue: EEntityType.NONE, displayName: "实体类型" })
    public tag: EEntityType = EEntityType.NONE;

    @ecsprop({ type: "float", defaultValue: 0, displayName: "X偏移" })
    public offsetX: number = 0;

    @ecsprop({ type: "float", defaultValue: 0, displayName: "Y偏移" })
    public offsetY: number = 0;

    public reset(): void {
        this.radius = 0;
        this.tag = EEntityType.NONE;
        this.offsetX = 0;
        this.offsetY = 0;
    }
}
