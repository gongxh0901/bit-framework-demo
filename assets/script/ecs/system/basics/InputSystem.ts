/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 输入系统，将 Input 分量归一化后写入 Direction
 */
import { ecs } from "../../../header";
import { Direction } from "../../component/basics/Direction";
import { FaceDirection } from "../../component/basics/FaceDirection";
import { Input } from "../../component/basics/Input";

const { ecsystem } = ecs._ecsdecorator;

@ecsystem("InputSystem", { describe: "将 Input.dx/dy 归一化后写入 Direction，有输入时同步更新 FaceDirection" })
export class InputSystem extends ecs.System {
    protected onInit(): void {
        this.matcher.allOf(Input, Direction).optionalOf(FaceDirection);
    }

    public update(_dt: number): void {
        for (const [_entity, input, dir, face] of this.query.iterate3(Input, Direction, FaceDirection)) {
            const dx = input.dx;
            const dy = input.dy;
            if (dx === 0 && dy === 0) {
                dir.x = 0;
                dir.y = 0;
            } else {
                const len = Math.sqrt(dx * dx + dy * dy);
                const nx = dx / len;
                const ny = dy / len;
                dir.x = nx;
                dir.y = ny;
                if (face) {
                    face.x = nx;
                    face.y = ny;
                }
            }
        }
    }
}
