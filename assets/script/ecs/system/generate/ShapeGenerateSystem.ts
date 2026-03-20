/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 碰撞形状生成系统，将 ShapeCircle/ShapeBox 配置组件转换为 QTShape，处理后删除配置组件
 */
import { ecs, QT } from "../../../header";
import { Position } from "../../component/basics/Position";
import { QTShape } from "../../component/basics/QTShape";
import { ShapeBox } from "../../component/basics/ShapeBox";
import { ShapeCircle } from "../../component/basics/ShapeCircle";
import { ECSHelper } from "../../ECSHelper";

const { ecsystem } = ecs._ecsdecorator;

@ecsystem("ShapeGenerateSystem", { describe: "将 ShapeCircle/ShapeBox 初始化为 QTShape 并插入四叉树，处理后删除配置组件" })
export class ShapeGenerateSystem extends ecs.System {
    protected onInit(): void {
        this.matcher.excludeOf(QTShape).anyOf(ShapeCircle, ShapeBox);
    }

    public update(_dt: number): void {
        // 使用副本迭代，避免缓冲操作影响原数组
        for (const entity of [...this.query.entitys]) {
            const pos = this.world.getComponent(entity, Position);
            const initX = pos ? pos.x : 0;
            const initY = pos ? pos.y : 0;

            if (this.world.hasComponent(entity, ShapeCircle)) {
                const circle = this.world.getComponent(entity, ShapeCircle);
                const shape = QT.createCircle(circle.radius, 1 << circle.tag);
                shape.setPosition(initX + circle.offsetX, initY + circle.offsetY);
                const qtshape = this.world.addComponent(entity, QTShape);
                qtshape.shape = shape;
                qtshape.offsetX = circle.offsetX;
                qtshape.offsetY = circle.offsetY;
                ECSHelper.quadTree.insert(shape);
                this.world.removeComponent(entity, ShapeCircle);
            } else if (this.world.hasComponent(entity, ShapeBox)) {
                const box = this.world.getComponent(entity, ShapeBox);
                const shape = QT.createBox(0, 0, box.width, box.height, 1 << box.tag);
                shape.setPosition(initX + box.offsetX, initY + box.offsetY);
                const qtshapeBox = this.world.addComponent(entity, QTShape);
                qtshapeBox.shape = shape;
                qtshapeBox.offsetX = box.offsetX;
                qtshapeBox.offsetY = box.offsetY;
                ECSHelper.quadTree.insert(shape);
                this.world.removeComponent(entity, ShapeBox);
            }
        }
    }
}
