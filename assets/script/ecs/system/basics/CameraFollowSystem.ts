/**
 * @Author: Gongxh
 * @Date: 2026-03-23
 * @Description: 摄像机跟随系统，平滑跟随英雄位置
 */

import { ecs } from "../../../header";
import { Position } from "../../component/basics/Position";
import { TagHero } from "../../component/tag/TagHero";
import { ECSHelper } from "../../ECSHelper";

const { ecsystem } = ecs._ecsdecorator;

/** 平滑跟随的响应时间，值越大跟随越慢 */
const RESPONSE_TIME = 0.1;

@ecsystem("CameraFollowSystem", { describe: "摄像机平滑跟随英雄位置" })
export class CameraFollowSystem extends ecs.System {
    protected onInit(): void {
        this.matcher.allOf(TagHero, Position);
    }

    public update(dt: number): void {
        const cameraNode = ECSHelper.cameraNode;
        if (!cameraNode) {
            return;
        }

        for (const [_entity, _tag, pos] of this.query.iterate2(TagHero, Position)) {
            const cameraPos = cameraNode.position;
            const x = Math.smooth(cameraPos.x, pos.x, dt, RESPONSE_TIME);
            const y = Math.smooth(cameraPos.y, pos.y, dt, RESPONSE_TIME);
            cameraNode.setPosition(x, y, cameraPos.z);
        }
    }
}
