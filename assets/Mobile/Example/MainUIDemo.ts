import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainUIDemo')
export class MainUIDemo extends Component {


    @property(Node)
    authDemo: Node | undefined;

    @property(Node)
    connectDemo: Node | undefined;

    @property(Node)
    walletDemo: Node | undefined;

    @property(Node)
    selectChain: Node | undefined;

    @property(Node)
    selectWalletType: Node | undefined;

    public static instance: MainUIDemo;
    start() {
        MainUIDemo.instance = this!;
        this.hiddenSelectChain();
        this.hiddenSelectWalletType();
        this.hiddenAuthDemo()
        this.hiddenConnectDemo()
        this.hiddenWalletDemo()
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

    showSelectWalletType() {
        this.selectWalletType!.active = true;
    }

    hiddenSelectWalletType() {
        this.selectWalletType!.active = false;
    }

    showAuthDemo() {
        this.authDemo!.active = true;
    }

    showConnectDemo() {
        this.connectDemo!.active = true;
    }

    showWalletDemo() {
        this.walletDemo!.active = true;
    }

    hiddenAuthDemo() {
        this.authDemo!.active = false;
    }

    hiddenConnectDemo() {
        this.connectDemo!.active = false;
    }

    hiddenWalletDemo() {
        this.walletDemo!.active = false;
    }

}

