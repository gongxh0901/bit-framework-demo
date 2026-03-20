/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 统一缩放组件，默认 1
 */
import { ecs } from "../../../header";

const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("Scale", { describe: "统一缩放组件" })
export class Scale extends ecs.Component {
    @ecsprop({ type: "float", defaultValue: 1, displayName: "缩放" })
    public value: number = 1;

    public reset(): void {
        this.value = 1;
    }
}
