/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 敌人标记组件
 */
import { ecs } from "../../../header";

const { ecsclass } = ecs._ecsdecorator;

@ecsclass("TagEnemy", { describe: "敌人标记组件" })
export class TagEnemy extends ecs.Component {
    public reset(): void {
    }
}
