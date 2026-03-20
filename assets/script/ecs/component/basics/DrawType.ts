/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: Graphics 绘制配置组件
 */
import { Color, Enum } from "cc";

import { ecs } from "../../../header";

/** 绘制形状类型 */
export enum EDrawShapeType {
    /** 圆形 */
    CIRCLE = 0,
    /** 尖三角（等腰锐角，宽 = size * 0.6） */
    TRIANGLE = 1,
    /** 方形 */
    SQUARE = 2
}

const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("DrawType", { describe: "Graphics 绘制配置组件" })
export class DrawType extends ecs.Component {
    @ecsprop({ type: "enum", format: Enum(EDrawShapeType), defaultValue: EDrawShapeType.CIRCLE, displayName: "形状类型" })
    public shapeType: EDrawShapeType = EDrawShapeType.CIRCLE;

    @ecsprop({ type: "float", defaultValue: 15, displayName: "尺寸" })
    public size: number = 15;

    @ecsprop({ type: "color", defaultValue: new Color(255, 255, 255, 255), displayName: "颜色" })
    public color: Color = new Color(255, 255, 255, 255);

    public reset(): void {
        this.shapeType = EDrawShapeType.CIRCLE;
        this.size = 15;
        this.color.set(255, 255, 255, 255);
    }
}
