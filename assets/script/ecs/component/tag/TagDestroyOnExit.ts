/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 出屏幕后销毁标记组件（用于子弹、敌人等需要在屏幕外销毁的实体）
 */
import { ecs } from "../../../header";

const { ecsclass } = ecs._ecsdecorator;

@ecsclass("TagDestroyOnExit", { describe: "出屏幕后销毁标记组件" })
export class TagDestroyOnExit extends ecs.Component {
    public reset(): void {
    }
}
