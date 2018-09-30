const { ccclass, property } = cc._decorator;

@ccclass
export default class Block extends cc.Component {
    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        switch (other.tag) {
            case 100:
                this.node.destroy();
                break;
        }
    }
}