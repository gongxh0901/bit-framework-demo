/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: Prefab 资源 UUID 组件，初始化后由 RenderGenerate 系统删除
 */
import { ecs } from "../../../header";

const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("AssetPrefab", { describe: "Prefab 资源 UUID 组件（初始化后删除）" })
export class AssetPrefab extends ecs.Component {
    @ecsprop({ type: "prefab", defaultValue: "", displayName: "预制体" })
    public uuid: string = "";

    public reset(): void {
        this.uuid = "";
    }
}
