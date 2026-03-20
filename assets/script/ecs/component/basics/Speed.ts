/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 移动速度组件
 */
import { ecs } from "../../../header";

const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("Speed", { describe: "移动速度组件" })
export class Speed extends ecs.Component {
    @ecsprop({ type: "float", defaultValue: 0, displayName: "速度" })
    public value: number = 0;

    public reset(): void {
        this.value = 0;
    }
}
