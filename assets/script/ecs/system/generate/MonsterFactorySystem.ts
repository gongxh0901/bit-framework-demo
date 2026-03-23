/**
 * @Author: Gongxh
 * @Date: 2026-03-23
 * @Description: 怪物工厂系统，每2秒在随机位置生成一个敌人实体
 */
import { CORE, ecs } from "../../../header";
import { ECSHelper } from "../../ECSHelper";

const { ecsystem } = ecs._ecsdecorator;

/** 生成间隔（秒） */
const SPAWN_INTERVAL = 2;

@ecsystem("MonsterFactorySystem", { describe: "每2秒在随机位置生成一个敌人" })
export class MonsterFactorySystem extends ecs.System {
    /** 累计计时 */
    private _elapsed: number = 0;

    protected onInit(): void {
        // 纯计时生成系统，不查询任何实体
    }

    public update(dt: number): void {
        this._elapsed += dt;
        if (this._elapsed < SPAWN_INTERVAL) {
            return;
        }
        this._elapsed -= SPAWN_INTERVAL;

        // 在屏幕范围内随机生成位置
        const halfW = CORE.Screen.ScreenWidth / 2;
        const halfH = CORE.Screen.ScreenHeight / 2;
        const x = (Math.random() - 0.5) * 2 * halfW;
        const y = (Math.random() - 0.5) * 2 * halfH;

        // 随机方向（单位向量）
        const angle = Math.random() * Math.PI * 2;
        const dirX = Math.cos(angle);
        const dirY = Math.sin(angle);

        ECSHelper.world.createEntity("Enemy", {
            Position: { x, y },
            Direction: { x: dirX, y: dirY },
            Speed: { value: 80 }
        });
    }

    protected onDestroy(): void {
        this._elapsed = 0;
    }
}
