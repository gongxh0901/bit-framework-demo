/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 射击弹道配置组件
 */
import { Enum } from "cc";

import { ecs } from "../../../header";
import { EShootType } from "./Enums";

const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("ShootPattern", { describe: "射击弹道配置组件" })
export class ShootPattern extends ecs.Component {
    @ecsprop({ type: "enum", format: Enum(EShootType), defaultValue: EShootType.SINGLE, displayName: "射击模式" })
    public type: EShootType = EShootType.SINGLE;

    @ecsprop({ type: "int", defaultValue: 1, displayName: "子弹数量" })
    public bulletCount: number = 1;

    @ecsprop({ type: "float", defaultValue: 0, displayName: "散射角度(度)" })
    public spreadAngle: number = 0;

    @ecsprop({ type: "float", defaultValue: 0.1, displayName: "连发间隔(秒)" })
    public burstInterval: number = 0.1;

    public reset(): void {
        this.type = EShootType.SINGLE;
        this.bulletCount = 1;
        this.spreadAngle = 0;
        this.burstInterval = 0.1;
    }
}
