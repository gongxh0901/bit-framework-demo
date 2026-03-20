/**
 * @Author: Gongxh
 * @Date: 2026-03-20
 * @Description: 射击系统，根据 Shooter 冷却计时和 ShootPattern 弹道配置自动创建子弹实体
 */
import { ecs } from "../../../header";
import { Direction } from "../../component/basics/Direction";
import { EShootType } from "../../component/basics/Enums";
import { Position } from "../../component/basics/Position";
import { Shooter } from "../../component/basics/Shooter";
import { ShootPattern } from "../../component/basics/ShootPattern";

const { ecsystem } = ecs._ecsdecorator;
const DEG_TO_RAD = Math.PI / 180;

@ecsystem("ShooterSystem", { describe: "根据 Shooter 冷却计时和 ShootPattern 配置自动创建子弹" })
export class ShooterSystem extends ecs.System {
    protected onInit(): void {
        this.matcher.allOf(Shooter, ShootPattern, Direction, Position);
    }

    public update(dt: number): void {
        for (const [_entity, shooter, pattern, dir, pos] of this.query.iterate4(Shooter, ShootPattern, Direction, Position)) {
            shooter.elapsed += dt;
            if (shooter.elapsed < shooter.cooldown) {
                continue;
            }
            shooter.elapsed = 0;

            this.shoot(pattern, dir, pos);
        }
    }

    /** 根据弹道配置发射子弹 */
    private shoot(pattern: ShootPattern, dir: Direction, pos: Position): void {
        const count = pattern.bulletCount;
        const spread = pattern.spreadAngle;

        switch (pattern.type) {
            case EShootType.SINGLE:
                this.spawnBullet(pos, dir.x, dir.y);
                break;
            case EShootType.SCATTER:
                this.spawnScatter(pos, dir, count, spread);
                break;
            default:
                this.spawnBullet(pos, dir.x, dir.y);
                break;
        }
    }

    /** 散射：将 count 颗子弹均匀分布在 spreadAngle 夹角内 */
    private spawnScatter(pos: Position, dir: Direction, count: number, spreadAngle: number): void {
        // 单颗子弹时退化为单发
        if (count <= 1) {
            this.spawnBullet(pos, dir.x, dir.y);
            return;
        }

        const halfSpread = spreadAngle * 0.5;
        const step = spreadAngle / (count - 1);

        for (let i = 0; i < count; i++) {
            const offsetDeg = -halfSpread + step * i;
            const offsetRad = offsetDeg * DEG_TO_RAD;
            const cos = Math.cos(offsetRad);
            const sin = Math.sin(offsetRad);
            // 2D 旋转矩阵：x' = x*cos - y*sin, y' = x*sin + y*cos
            const bx = dir.x * cos - dir.y * sin;
            const by = dir.x * sin + dir.y * cos;
            this.spawnBullet(pos, bx, by);
        }
    }

    /** 创建一颗子弹实体并设置位置和方向 */
    private spawnBullet(pos: Position, dirX: number, dirY: number): void {
        const world = this.world;
        world.createEntity("Bullet", {
            Position: {
                x: pos.x,
                y: pos.y
            },
            Direction: {
                x: dirX,
                y: dirY
            }
        });

        // const bulletPos = world.getComponent(entity, Position);
        // bulletPos.x = pos.x;
        // bulletPos.y = pos.y;

        // const bulletDir = world.getComponent(entity, Direction);
        // bulletDir.x = dirX;
        // bulletDir.y = dirY;
    }
}
