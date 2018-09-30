const { ccclass, property } = cc._decorator;

@ccclass
export default class Ball extends cc.Component {
    speed = cc.v2(5, 5);

    start() {
        cc.director.getCollisionManager().enabled = true;
    }

    update(dt) {
        this.node.position = this.node.position.add(this.speed);
    }

    onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        switch (other.tag) {
            case 0:
                this.speed.x = this.speed.x * -1;
                break;
            case 1:
                this.speed.y = this.speed.y * -1;
                break;
            case 99:
                this.speed = cc.v2(0, 0);
                this.node.emit('drop');
                break;
        }
    }
}
