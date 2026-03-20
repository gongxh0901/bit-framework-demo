/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 移动系统，根据 Direction 和 Speed 更新 Position
 */
import { ecs } from "../../../header";
import { Direction } from "../../component/basics/Direction";
import { Position } from "../../component/basics/Position";
import { Speed } from "../../component/basics/Speed";

const { ecsystem } = ecs._ecsdecorator;

@ecsystem("MoveSystem", { describe: "根据 Direction 和 Speed 每帧更新 Position" })
export class MoveSystem extends ecs.System {
    protected onInit(): void {
        this.matcher.allOf(Position, Direction, Speed);
    }

    public update(dt: number): void {
        for (const [_entity, pos, dir, speed] of this.query.iterate3(Position, Direction, Speed)) {
            pos.x += dir.x * speed.value * dt;
            pos.y += dir.y * speed.value * dt;
        }
    }
}
