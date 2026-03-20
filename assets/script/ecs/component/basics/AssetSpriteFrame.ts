/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: SpriteFrame 资源 UUID 组件，初始化后删除
 */
import { ecs } from "../../../header";

const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("AssetSpriteFrame", { describe: "SpriteFrame 资源 UUID 组件（初始化后删除）" })
export class AssetSpriteFrame extends ecs.Component {
    @ecsprop({ type: "spriteframe", defaultValue: "", displayName: "精灵帧" })
    public uuid: string = "";

    public reset(): void {
        this.uuid = "";
    }
}
