/**
 * @Author: Gongxh
 * @Date: 2026-03-20
 * @Description: 射击模式周期切换组件，控制单发与散射的交替节奏
 */
import { ecs } from "../../../header";

const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("ShootCycle", { describe: "射击模式周期切换组件" })
export class ShootCycle extends ecs.Component {
    /** 单发持续时间（秒），超过后触发一次散射 */
    @ecsprop({ type: "float", defaultValue: 3, displayName: "单发持续时间(秒)" })
    public singleDuration: number = 3;

    /** 当前周期内已累计的时间（秒） */
    public elapsed: number = 0;

    public reset(): void {
        this.singleDuration = 3;
        this.elapsed = 0;
    }
}
