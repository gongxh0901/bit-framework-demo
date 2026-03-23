/**
 * @Author: Gongxh
 * @Date: 2026-03-23
 * @Description: 键盘输入源
 * 监听 WASD / 方向键，映射为方向输出
 */

import { EventKeyboard, Input as CocosInput, input, KeyCode } from "cc";

import { IInputSource } from "./IInputSource";

export class KeyboardInputSource implements IInputSource {
    public readonly priority: number = 20;

    private _dx: number = 0;
    private _dy: number = 0;
    private _isEnabled: boolean = true;

    /** 按键按下状态 */
    private _keyState: Map<KeyCode, boolean> = new Map();

    public get isActive(): boolean {
        return this._dx !== 0 || this._dy !== 0;
    }

    public get dx(): number {
        return this._dx;
    }

    public get dy(): number {
        return this._dy;
    }

    constructor() {
        input.on(CocosInput.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(CocosInput.EventType.KEY_UP, this.onKeyUp, this);
    }

    public enable(): void {
        this._isEnabled = true;
    }

    public disable(): void {
        this._isEnabled = false;
        this._keyState.clear();
        this._dx = 0;
        this._dy = 0;
    }

    public dispose(): void {
        input.off(CocosInput.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(CocosInput.EventType.KEY_UP, this.onKeyUp, this);
        this._keyState.clear();
    }

    private onKeyDown(event: EventKeyboard): void {
        if (!this._isEnabled) {
            return;
        }
        this._keyState.set(event.keyCode, true);
        this.updateDirection();
    }

    private onKeyUp(event: EventKeyboard): void {
        this._keyState.delete(event.keyCode);
        this.updateDirection();
    }

    /** 根据当前按键状态计算方向 */
    private updateDirection(): void {
        let dx = 0;
        let dy = 0;

        if (this._keyState.has(KeyCode.KEY_A) || this._keyState.has(KeyCode.ARROW_LEFT)) {
            dx -= 1;
        }
        if (this._keyState.has(KeyCode.KEY_D) || this._keyState.has(KeyCode.ARROW_RIGHT)) {
            dx += 1;
        }
        if (this._keyState.has(KeyCode.KEY_W) || this._keyState.has(KeyCode.ARROW_UP)) {
            dy += 1;
        }
        if (this._keyState.has(KeyCode.KEY_S) || this._keyState.has(KeyCode.ARROW_DOWN)) {
            dy -= 1;
        }

        // 对角线归一化
        if (dx !== 0 && dy !== 0) {
            const inv = 1 / Math.sqrt(2);
            dx *= inv;
            dy *= inv;
        }

        this._dx = dx;
        this._dy = dy;
    }
}
