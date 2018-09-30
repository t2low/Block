import Ball from "./Ball";
import Block from "./Block";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
    @property(cc.Node)
    paddle: cc.Node = null;

    @property(cc.Prefab)
    prefab: cc.Prefab = null;

    @property(cc.Label)
    label: cc.Label = null;

    @property(Ball)
    ball: Ball = null;

    start() {
        this.node.on('mousemove', this.onMouseMove, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.ball.node.on('drop', this.onDrop, this);
        this.node.on('child-removed', this.onChildRemoved, this);

        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                let block = cc.instantiate(this.prefab);
                block.parent = this.node;
                block.x = (x - 2) * 105;
                block.y = y * 45;
            }
        }
    }

    onTouchMove(event: cc.Event.EventTouch) {
        this.paddle.x = event.getLocationX() - this.node.x;
    }

    onMouseMove(event: cc.Event.EventMouse) {
        this.paddle.x = event.getLocationX() - this.node.x;
    }

    onDrop() {
        this.label.node.active = true;
        this.label.node.zIndex = 1;
    }

    onChildRemoved() {
        let blocks = this.node.getComponentsInChildren(Block);

        if (blocks.length == 0) {
            this.label.node.active = true;
            this.label.node.zIndex = 1;
            this.label.string = 'ゲームクリア！';
            this.ball.node.active = false;
        }
    }
}
