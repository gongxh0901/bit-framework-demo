/**
 * @Author: Gongxh
 * @Date: 2026-03-23
 * @Description: 输入源接口，所有输入方式（触摸、键盘、手柄等）均实现此接口
 */

export interface IInputSource {
    /** 优先级，数值越大越优先 */
    readonly priority: number;

    /** 当前是否有有效输入 */
    readonly isActive: boolean;

    /** X轴输入 [-1, 1] */
    readonly dx: number;

    /** Y轴输入 [-1, 1] */
    readonly dy: number;

    /** 启用输入源 */
    enable(): void;

    /** 禁用输入源 */
    disable(): void;

    /** 销毁，释放所有资源和事件监听 */
    dispose(): void;
}
