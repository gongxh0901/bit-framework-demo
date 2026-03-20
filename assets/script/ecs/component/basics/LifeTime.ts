/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 存活倒计时组件，duration 归零时销毁实体
 */
import { ecs } from "../../../header";

const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("LifeTime", { describe: "存活倒计时组件（秒）" })
export class LifeTime extends ecs.Component {
    @ecsprop({ type: "float", defaultValue: 1, displayName: "存活时长(秒)" })
    public duration: number = 1;

    public reset(): void {
        this.duration = 1;
    }
}
