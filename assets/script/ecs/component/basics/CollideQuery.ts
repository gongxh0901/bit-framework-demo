/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 碰撞查询目标类型组件
 */
import { ecs } from "../../../header";
import { EEntityType } from "./EntityType";

const { ecsclass } = ecs._ecsdecorator;

@ecsclass("CollideQuery", { describe: "碰撞查询目标类型组件" })
export class CollideQuery extends ecs.Component {
    /** 需要查询碰撞的目标实体类型列表 */
    public masks: EEntityType[] = [];

    public reset(): void {
        this.masks.length = 0;
    }
}
