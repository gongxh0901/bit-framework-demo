/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 碰撞形状位置同步系统，将 Position 同步到四叉树形状
 */
import { ecs } from "../../../header";
import { Position } from "../../component/basics/Position";
import { QTShape } from "../../component/basics/QTShape";

const { ecsystem } = ecs._ecsdecorator;

@ecsystem("ShapeUpdateSystem", { describe: "将 Position 同步到 QTShape 碰撞形状位置" })
export class ShapeUpdateSystem extends ecs.System {
    protected onInit(): void {
        this.matcher.allOf(Position, QTShape);
    }

    public update(_dt: number): void {
        for (const [_entity, pos, qtshape] of this.query.iterate2(Position, QTShape)) {
            qtshape.shape?.setPosition(pos.x + qtshape.offsetX, pos.y + qtshape.offsetY);
        }
    }
}
