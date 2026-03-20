/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 生命周期系统，duration 归零时销毁实体
 */
import { ecs } from "../../../header";
import { LifeTime } from "../../component/basics/LifeTime";

const { ecsystem } = ecs._ecsdecorator;

@ecsystem("LifeTimeSystem", { describe: "倒计时归零后销毁实体" })
export class LifeTimeSystem extends ecs.System {
    protected onInit(): void {
        this.matcher.allOf(LifeTime);
    }

    public update(dt: number): void {
        for (const [entity, lifetime] of this.query.iterate1(LifeTime)) {
            lifetime.duration -= dt;
            if (lifetime.duration <= 0) {
                this.world.removeEntity(entity);
            }
        }
    }
}
