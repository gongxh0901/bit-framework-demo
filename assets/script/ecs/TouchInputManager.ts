/**
 * @Author: Gongxh
 * @Date: 2026-03-18
 * @Description: 触摸输入管理器
 * 注册全局触摸事件，将屏幕滑动转换为摇杆方向写入 Input 组件
 */

import { EventTouch, Node, NodeEventType, UITransform } from "cc";

import { CORE, ecs } from "../header";
import { Input } from "./component/basics/Input";
import { ECSHelper, EStageLayer } from "./ECSHelper";

const DEAD_ZONE = 8;
const MAX_DIST = 80;

export class TouchInputManager {
    private _world: ecs.World;
    private _playerEntity: ecs.Entity;
    private _touchNode: Node;

    private _joystickOriginX: number = 0;
    private _joystickOriginY: number = 0;
    private _joystickActive: boolean = false;
    private _joystickTouchId: number = -1;

    constructor(world: ecs.World, playerEntity: ecs.Entity) {
        this._world = world;
        this._playerEntity = playerEntity;

        this._touchNode = new Node("TouchNode");
        this._touchNode.addComponent(UITransform).setContentSize(CORE.Screen.ScreenWidth, CORE.Screen.ScreenHeight);
        ECSHelper.getLayer(EStageLayer.INPUT).addChild(this._touchNode);

        this._touchNode.on(NodeEventType.TOUCH_START, this.onTouchStart, this);
        this._touchNode.on(NodeEventType.TOUCH_MOVE, this.onTouchMove, this);
        this._touchNode.on(NodeEventType.TOUCH_END, this.onTouchEnd, this);
        this._touchNode.on(NodeEventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    public dispose(): void {
        this._touchNode.off(NodeEventType.TOUCH_START, this.onTouchStart, this);
        this._touchNode.off(NodeEventType.TOUCH_MOVE, this.onTouchMove, this);
        this._touchNode.off(NodeEventType.TOUCH_END, this.onTouchEnd, this);
        this._touchNode.off(NodeEventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this._touchNode.destroy();
        this._touchNode = null;
        this._world = null;
    }

    private onTouchStart(event: EventTouch): void {
        if (this._joystickActive) {
            return;
        }
        const loc = event.getLocation();
        this._joystickTouchId = event.touch.getID();
        this._joystickOriginX = loc.x;
        this._joystickOriginY = loc.y;
        this._joystickActive = true;
    }

    private onTouchMove(event: EventTouch): void {
        if (!this._joystickActive || event.touch.getID() !== this._joystickTouchId) {
            return;
        }
        const loc = event.getLocation();
        let dx = loc.x - this._joystickOriginX;
        let dy = loc.y - this._joystickOriginY;

        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < DEAD_ZONE) {
            dx = 0;
            dy = 0;
        } else {
            const clampedDist = Math.min(dist, MAX_DIST);
            dx = (dx / dist) * (clampedDist / MAX_DIST);
            dy = (dy / dist) * (clampedDist / MAX_DIST);
        }
        this.applyInput(dx, dy);
    }

    private onTouchEnd(event: EventTouch): void {
        if (event.touch.getID() !== this._joystickTouchId) {
            return;
        }
        this._joystickActive = false;
        this._joystickTouchId = -1;
        this.applyInput(0, 0);
    }

    private applyInput(dx: number, dy: number): void {
        if (!this._world) {
            return;
        }
        const playerInput = this._world.getComponent(this._playerEntity, Input);
        if (playerInput) {
            playerInput.dx = dx;
            playerInput.dy = dy;
        }
    }
}
