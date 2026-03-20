/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 英雄标记组件
 */
import { ecs } from "../../../header";

const { ecsclass } = ecs._ecsdecorator;

@ecsclass("TagHero", { describe: "英雄标记组件" })
export class TagHero extends ecs.Component {
    public reset(): void {
    }
}
