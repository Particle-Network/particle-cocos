import { _decorator, Component, find, Label } from 'cc';
import { ChainInfo } from '../Core/Models/ChainInfo';
import { MainUIDemo } from './MainUIDemo';
import { ToastManager } from './Toast/ToastManager';
import { ChainManager } from './ChainManager';

const { ccclass, property } = _decorator;

@ccclass('ChainInfoItem')
export class ChainInfoItem extends Component {
    private chainInfo: ChainInfo | undefined;

    @property(Label)
    public label: Label | undefined;
    start() {

    }

    update(deltaTime: number) {

    }
    setChainInfo(chainInfo: ChainInfo) {
        this.chainInfo = chainInfo;
        this.label!.string = this.chainInfo!.name + " " + this.chainInfo!.network + " " + this.chainInfo!.id;
    }

    onChainInfoItemClick() {
        const message = "onChainInfoItemClick" + this.chainInfo!.name + " " + this.chainInfo!.network + " " + this.chainInfo!.id;
        console.log(message);
        find("Canvas")?.getComponent(ToastManager)?.showToast(message);
        ChainManager.currentChainInfo = this.chainInfo!;
        MainUIDemo.getInstance().hiddenSelectChain();
    }
}

