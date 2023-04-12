import { _decorator, Component, Node } from 'cc';
import { AuthDemo } from './AuthDemo';
const { ccclass, property } = _decorator;

@ccclass('MainUIDemo')
export class MainUIDemo extends Component {

    @property({ type: Node })
    private authDemo = null;

    @property({ type: Node })
    private connectDemo = null;

    @property({ type: Node })
    private walletDemo = null;

    start() {
        console.log("MainUIDemo start");
        this.authDemo.active = false;
   
    }

    update(deltaTime: number) {
        
    }
    showAuthDemo(){
        this.authDemo.active = true;
    }
}

