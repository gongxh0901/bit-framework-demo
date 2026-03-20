/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 血量组件
 */
import { ecs } from "../../../header";

const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("Health", { describe: "血量组件" })
export class Health extends ecs.Component {
    @ecsprop({ type: "int", defaultValue: 100, displayName: "当前血量" })
    public hp: number = 100;

    @ecsprop({ type: "int", defaultValue: 100, displayName: "最大血量" })
    public maxHp: number = 100;

    public reset(): void {
        this.hp = 100;
        this.maxHp = 100;
    }
}
