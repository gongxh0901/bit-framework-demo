/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 子弹标记组件
 */
import { ecs } from "../../../header";

const { ecsclass } = ecs._ecsdecorator;

@ecsclass("TagBullet", { describe: "子弹标记组件" })
export class TagBullet extends ecs.Component {
    public reset(): void {
    }
}
