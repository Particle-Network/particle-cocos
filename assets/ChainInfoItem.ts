import { _decorator, Component, Node } from 'cc';
import { ChainInfo } from './Models/ChainInfo';
import { Label } from 'cc';
import { EvmService } from './NetService/EvmService';
import { MainUIDemo } from './MainUIDemo';
const { ccclass, property } = _decorator;

@ccclass('ChainInfoItem')
export class ChainInfoItem extends Component {
    private chainInfo : ChainInfo | undefined;

    @property (Label) 
    public label : Label | undefined;
    start() {

    }

    update(deltaTime: number) {
        
    }
    setChainInfo(chainInfo : ChainInfo){
        this.chainInfo = chainInfo;
        this.label!.string = this.chainInfo!.chain_name+ " " +this.chainInfo!.chain_id_name;
    }

    onChainInfoItemClick(){
        console.log("onChainInfoItemClick",this.chainInfo);
        EvmService.currentChainInfo = this.chainInfo!;
        MainUIDemo.getInstance().hiddenSelectChain();
    }
}

