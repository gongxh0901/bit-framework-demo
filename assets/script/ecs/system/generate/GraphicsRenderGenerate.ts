/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: Graphics 渲染节点生成系统，为含 DrawType 的实体创建绘制节点并挂载 Render 组件
 */
import { Graphics, Node } from "cc";

import { ecs } from "../../../header";
import { DrawType } from "../../component/basics/DrawType";
import { EDrawShapeType } from "../../component/basics/Enums";
import { Render } from "../../component/basics/Render";
import { ECSHelper, EStageLayer } from "../../ECSHelper";

const { ecsystem } = ecs._ecsdecorator;

@ecsystem("GraphicsRenderGenerate", { describe: "为 DrawType 实体创建 Graphics 绘制节点并添加 Render 组件" })
export class GraphicsRenderGenerate extends ecs.System {
    protected onInit(): void {
        this.matcher.allOf(DrawType).excludeOf(Render);
    }

    public update(_dt: number): void {
        for (const [entity, drawType] of this.query.iterate1(DrawType)) {
            const node = new Node("RenderNode");
            const graphics = node.addComponent(Graphics);
            graphics.fillColor = drawType.color;

            const size = drawType.size;
            switch (drawType.shapeType) {
                case EDrawShapeType.CIRCLE:
                    graphics.circle(0, 0, size);
                    break;
                case EDrawShapeType.TRIANGLE:
                    // 等腰三角形：高 = size，底宽 = size * 0.6
                    graphics.moveTo(0, size / 2);
                    graphics.lineTo(size * 0.3, -size / 2);
                    graphics.lineTo(-size * 0.3, -size / 2);
                    graphics.close();
                    break;
                case EDrawShapeType.SQUARE:
                    graphics.rect(-size / 2, -size / 2, size, size);
                    break;
            }
            graphics.fill();
            node.layer = 1 << 1;
            ECSHelper.getLayer(EStageLayer.ENTITY).addChild(node);

            this.world.removeComponent(entity, DrawType);
            const render = this.world.addComponent(entity, Render);
            render.node = node;
        }
    }
}
