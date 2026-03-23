/**
 * @Author: Gongxh
 * @Date: 2026-03-23
 * @Description: 触摸摇杆输入源
 * 将屏幕滑动转换为摇杆方向输出
 */

import { EventTouch, Node, NodeEventType, UITransform } from "cc";

import { CORE } from "../../header";
import { ECSHelper, EStageLayer } from "../ECSHelper";
import { IInputSource } from "./IInputSource";

const DEAD_ZONE = 8;
const MAX_DIST = 80;

export class TouchInputSource implements IInputSource {
    public readonly priority: number = 10;

    private _dx: number = 0;
    private _dy: number = 0;
    private _isActive: boolean = false;

    private _touchNode: Node;
    private _joystickOriginX: number = 0;
    private _joystickOriginY: number = 0;
    private _joystickTouchId: number = -1;
    private _isEnabled: boolean = true;

    public get isActive(): boolean {
        return this._isActive;
    }

    public get dx(): number {
        return this._dx;
    }

    public get dy(): number {
        return this._dy;
    }

    constructor() {
        this._touchNode = new Node("TouchNode");
        this._touchNode.addComponent(UITransform).setContentSize(CORE.Screen.ScreenWidth, CORE.Screen.ScreenHeight);
        ECSHelper.getLayer(EStageLayer.INPUT).addChild(this._touchNode);

        this._touchNode.on(NodeEventType.TOUCH_START, this.onTouchStart, this);
        this._touchNode.on(NodeEventType.TOUCH_MOVE, this.onTouchMove, this);
        this._touchNode.on(NodeEventType.TOUCH_END, this.onTouchEnd, this);
        this._touchNode.on(NodeEventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    public enable(): void {
        this._isEnabled = true;
    }

    public disable(): void {
        this._isEnabled = false;
        this.resetState();
    }

    public dispose(): void {
        if (!this._touchNode) {
            return;
        }
        this._touchNode.off(NodeEventType.TOUCH_START, this.onTouchStart, this);
        this._touchNode.off(NodeEventType.TOUCH_MOVE, this.onTouchMove, this);
        this._touchNode.off(NodeEventType.TOUCH_END, this.onTouchEnd, this);
        this._touchNode.off(NodeEventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this._touchNode.destroy();
        this._touchNode = null;
    }

    private onTouchStart(event: EventTouch): void {
        if (!this._isEnabled || this._isActive) {
            return;
        }
        const loc = event.getLocation();
        this._joystickTouchId = event.touch.getID();
        this._joystickOriginX = loc.x;
        this._joystickOriginY = loc.y;
        this._isActive = true;
    }

    private onTouchMove(event: EventTouch): void {
        if (!this._isEnabled || !this._isActive || event.touch.getID() !== this._joystickTouchId) {
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

        this._dx = dx;
        this._dy = dy;
    }

    private onTouchEnd(event: EventTouch): void {
        if (event.touch.getID() !== this._joystickTouchId) {
            return;
        }
        this.resetState();
    }

    private resetState(): void {
        this._isActive = false;
        this._joystickTouchId = -1;
        this._dx = 0;
        this._dy = 0;
    }
}
