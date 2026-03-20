/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 输入系统，将 Input 分量归一化后写入 Direction
 */
import { ecs } from "../../../header";
import { Direction } from "../../component/basics/Direction";
import { Input } from "../../component/basics/Input";

const { ecsystem } = ecs._ecsdecorator;

@ecsystem("InputSystem", { describe: "将 Input.dx/dy 归一化后写入 Direction" })
export class InputSystem extends ecs.System {
    protected onInit(): void {
        this.matcher.allOf(Input, Direction);
    }

    public update(_dt: number): void {
        for (const [_entity, input, dir] of this.query.iterate2(Input, Direction)) {
            const dx = input.dx;
            const dy = input.dy;
            if (dx === 0 && dy === 0) {
                dir.x = 0;
                dir.y = 0;
            } else {
                const len = Math.sqrt(dx * dx + dy * dy);
                dir.x = dx / len;
                dir.y = dy / len;
            }
        }
    }
}
