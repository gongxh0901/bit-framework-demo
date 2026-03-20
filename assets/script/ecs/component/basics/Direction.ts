/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 方向组件，始终为归一化单位向量
 */
import { ecs } from "../../../header";

const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("Direction", { describe: "方向组件（单位向量）" })
export class Direction extends ecs.Component {
    @ecsprop({ type: "float", defaultValue: 0 })
    public x: number = 0;

    @ecsprop({ type: "float", defaultValue: 1 })
    public y: number = 1;

    public reset(): void {
        this.x = 0;
        this.y = 1;
    }
}
