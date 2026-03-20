/**
 * @Author: Gongxh
 * @Date: 2026-03-20
 * @Description: 朝向组件，记录最近一次有效方向，松手时保持不变
 */
import { ecs } from "../../../header";

const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("FaceDirection", { describe: "朝向组件（最近一次有效方向）" })
export class FaceDirection extends ecs.Component {
    @ecsprop({ type: "float", defaultValue: 0 })
    public x: number = 0;

    @ecsprop({ type: "float", defaultValue: 1 })
    public y: number = 1;

    public reset(): void {
        this.x = 0;
        this.y = 1;
    }
}
