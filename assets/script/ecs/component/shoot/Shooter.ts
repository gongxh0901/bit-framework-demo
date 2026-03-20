/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 射击计时组件，ShooterSystem 驱动
 */
import { ecs } from "../../../header";

const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("Shooter", { describe: "射击计时组件" })
export class Shooter extends ecs.Component {
    @ecsprop({ type: "float", defaultValue: 0.3, displayName: "射击间隔(秒)" })
    public cooldown: number = 0.3;

    @ecsprop({ type: "float", defaultValue: 0, displayName: "当前冷却计时" })
    public elapsed: number = 0;

    public reset(): void {
        this.cooldown = 0.3;
        this.elapsed = 0;
    }
}
