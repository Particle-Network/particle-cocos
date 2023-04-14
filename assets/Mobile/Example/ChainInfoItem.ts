import { _decorator, Component, find, Label } from 'cc';
import { ChainInfo } from '../Core/Models/ChainInfo';
import { EvmService } from '../Core/NetService/EvmService';
import { MainUIDemo } from './MainUIDemo';
import { ToastManager } from './Toast/ToastManager';

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
        this.label!.string = this.chainInfo!.chain_name + " " + this.chainInfo!.chain_id_name;
    }

    onChainInfoItemClick() {
        console.log("onChainInfoItemClick", this.chainInfo);
        find("Canvas")?.getComponent(ToastManager)?.showToast(JSON.stringify(this.chainInfo));
        EvmService.currentChainInfo = this.chainInfo!;
        MainUIDemo.getInstance().hiddenSelectChain();
    }
}

