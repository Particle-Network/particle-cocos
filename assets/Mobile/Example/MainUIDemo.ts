import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainUIDemo')
export class MainUIDemo extends Component {


    @property(Node)
    authDemo: Node | undefined;

    @property(Node)
    selectChain: Node | undefined;

    public static instance: MainUIDemo;
    start() {
        MainUIDemo.instance = this!;
        this.hiddenSelectChain();
        this.hiddenAuthDemo();
    }
    static getInstance() {
        return this.instance;
    }

    update(deltaTime: number) {

    }

    hidden() {
        this.node.active = false;
    }

    show() {
        this.node.active = true;
    }
    showSelectChain() {
        this.selectChain!.active = true;
    }
    hiddenSelectChain() {
        this.selectChain!.active = false;
    }
    showAuthDemo() {
        this.authDemo!.active = true;
    }
    hiddenAuthDemo() {
        this.authDemo!.active = false;
    }
}

