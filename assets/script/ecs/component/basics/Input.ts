/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 输入方向组件，挂上即可接收输入
 */
import { ecs } from "../../../header";

const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("Input", { describe: "输入方向组件" })
export class Input extends ecs.Component {
    @ecsprop({ type: "float", defaultValue: 0, displayName: "X轴输入" })
    public dx: number = 0;

    @ecsprop({ type: "float", defaultValue: 0, displayName: "Y轴输入" })
    public dy: number = 0;

    public reset(): void {
        this.dx = 0;
        this.dy = 0;
    }
}
