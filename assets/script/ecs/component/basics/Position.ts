/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 2D 坐标组件
 */
import { ecs } from "../../../header";

const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("Position", { describe: "2D 坐标组件" })
export class Position extends ecs.Component {
    @ecsprop({ type: "int", defaultValue: 0 })
    public x: number = 0;

    @ecsprop({ type: "int", defaultValue: 0 })
    public y: number = 0;

    public reset(): void {
        this.x = 0;
        this.y = 0;
    }
}
