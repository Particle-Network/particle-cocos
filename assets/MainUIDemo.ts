import { _decorator, Button, CCObject, Component, Node, Sprite, UIOpacity } from 'cc';
import { AuthDemo } from './AuthDemo';
const { ccclass, property } = _decorator;

@ccclass('MainUIDemo')
export class MainUIDemo extends Component {

    @property (Sprite) 
    public icon : Sprite | undefined;

    @property (Button) 
    private authButton : Button | undefined;

    @property (Node)
    private authDemo : Node | undefined;

    start() {
        console.log("MainUIDemo start");

    }

    update(deltaTime: number) {
        
    }

    showAuthDemo(){
        console.log('show auth demo');
        this.authDemo!.active = true;
        this.icon!.node.active = false;
        this.authButton!.node.active = false;

    }
}

