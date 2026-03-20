/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 边界夹住标记组件，到达屏幕边缘时夹住不超出（用于玩家）
 */
import { ecs } from "../../../header";

const { ecsclass } = ecs._ecsdecorator;

@ecsclass("TagBoundaryClamp", { describe: "边界夹住标记组件" })
export class TagBoundaryClamp extends ecs.Component {
    public reset(): void {
    }
}
