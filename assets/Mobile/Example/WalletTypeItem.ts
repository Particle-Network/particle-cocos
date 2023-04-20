import { _decorator, Component, find, Label } from 'cc';
import { EvmService } from '../Core/NetService/EvmService';
import { MainUIDemo } from './MainUIDemo';
import { ToastManager } from './Toast/ToastManager';
import { WalletType } from '../Core/Models/WalletType';
import { ConnectDemo } from './Connect/ConnectDemo';

const { ccclass, property } = _decorator;

@ccclass('WalletTypeItem')
export class WalletTypeItem extends Component {
    private walletType: WalletType | undefined;

    @property(Label)
    public label: Label | undefined;
    start() {

    }

    update(deltaTime: number) {

    }

    setWalletType(walletType: WalletType) {
        this.walletType = walletType;
        this.label!.string = this.walletType;
    }

    onWalletTypetemClick() {
        console.log("onWalletTypeItemClick", this.walletType);
        find("Canvas")?.getComponent(ToastManager)?.showToast(JSON.stringify(this.walletType));
        ConnectDemo.walletType = this.walletType!;
        MainUIDemo.getInstance().hiddenSelectWalletType();
    }
}

