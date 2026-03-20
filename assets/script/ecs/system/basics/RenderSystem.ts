/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 渲染同步系统，将 Position 同步到 Cocos Node 位置
 */
import { ecs } from "../../../header";
import { Position } from "../../component/basics/Position";
import { Render } from "../../component/basics/Render";

const { ecsystem } = ecs._ecsdecorator;

@ecsystem("RenderSystem", { describe: "将 Position 同步到 Render.node 位置" })
export class RenderSystem extends ecs.System {
    protected onInit(): void {
        this.matcher.allOf(Position, Render);
    }

    public update(_dt: number): void {
        for (const [_entity, pos, render] of this.query.iterate2(Position, Render)) {
            render.node.setPosition(pos.x, pos.y, 0);
        }
    }
}
