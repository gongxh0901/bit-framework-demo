/**
 * @Author: Gongxh
 * @Date: 2026-03-18
 * @Description: ECS 小游戏窗口
 * - 打开时在 FGUI stage 组件内创建 ECS 舞台节点，初始化 ECS 世界和四叉树单例
 * - 触摸输入委托给 TouchInputManager 处理
 * - 关闭时清理触摸、销毁舞台节点和 ECS 世界
 */

import { Node } from "cc";

import { ECSHelper } from "../../ecs/ECSHelper";
import { TouchInputManager } from "../../ecs/TouchInputManager";
import { FGUI, UI } from "../../header";

const { uiclass, uiprop } = UI._uidecorator;

@uiclass("Window", "Game", "GameWindow")
export class GameWindow extends UI.Window {
    @uiprop
    private _stage: FGUI.GComponent;

    private _stageNode: Node;
    private _touchManager: TouchInputManager;

    protected onInit(): void {
        this.adapterType = UI.AdapterType.Full;
        this.type = UI.WindowType.CloseAll;
        this.bgAlpha = 0;
    }

    protected onShow(_userdata?: unknown): void {
        this.setupGame();
    }

    protected onClose(): void {
        this._touchManager?.dispose();
        this._touchManager = null;
        this._stageNode?.destroy();
        this._stageNode = null;
        ECSHelper.destroy();
    }

    // ── 游戏初始化 ─────────────────────────────────────────────

    private setupGame(): void {
        // 在 FGUI stage 组件内创建 CC Node 作为 ECS 世界舞台
        this._stageNode = new Node("ECSStage");
        this._stageNode.layer = 1 << 1;
        this._stage.node.addChild(this._stageNode);

        ECSHelper.setStageNode(this._stageNode);
        ECSHelper.register();

        // 创建四叉树单例
        // const halfW = CORE.Screen.ScreenWidth * 0.5;
        // const halfH = CORE.Screen.ScreenHeight * 0.5;
        // const qtSingleton = ECSHelper.addSingleton(QuadTree);
        // qtSingleton.quadTree = new QT.QuadTree(-halfW, -halfH, halfW * 2, halfH * 2);

        // 通过配置创建玩家实体
        const { entity } = ECSHelper.world.createEntity("Player");
        // 注册触摸输入
        this._touchManager = new TouchInputManager(ECSHelper.world, entity);
    }

    protected onUpdate(_dt: number): void {
        ECSHelper.world.update(_dt);
    }
}
