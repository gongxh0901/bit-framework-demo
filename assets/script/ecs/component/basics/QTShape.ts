/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 四叉树碰撞形状组件
 */
import { ecs, QT } from "../../../header";

const { ecsclass } = ecs._ecsdecorator;

@ecsclass("QTShape", { describe: "四叉树碰撞形状组件" })
export class QTShape extends ecs.Component {
    public shape: QT.IShape = null;

    /** 形状相对 Position 的 X 偏移 */
    public offsetX: number = 0;

    /** 形状相对 Position 的 Y 偏移 */
    public offsetY: number = 0;

    public reset(): void {
        if (this.shape) {
            this.shape.destroy();
        }
        this.shape = null;
        this.offsetX = 0;
        this.offsetY = 0;
    }
}
