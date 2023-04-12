import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('WalletDemo')
export class WalletDemo extends Component {

    hidden(){
        this.node.active = false;
    }
    start() {

    }

    update(deltaTime: number) {
        
    }
}

