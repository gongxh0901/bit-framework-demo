/**
 * @Author: Gongxh
 * @Date: 2026-03-19
 * @Description: 射击模式枚举 / 绘制形状类型枚举
 */

/** 射击模式 */
export enum EShootType {
    /** 单发 */
    SINGLE = 0,
    /** 散射 */
    SCATTER = 1,
    /** 连发 */
    BURST = 2,
    /** 三连发 */
    TRIPLE = 3
}

/** 绘制形状类型 */
export enum EDrawShapeType {
    /** 圆形 */
    CIRCLE = 0,
    /** 尖三角（等腰锐角，宽 = size * 0.6） */
    TRIANGLE = 1,
    /** 方形 */
    SQUARE = 2
}
