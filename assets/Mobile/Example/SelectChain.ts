
import { _decorator, Component, Node, resources, Prefab, instantiate, find } from 'cc';
import { chains, ChainInfo } from '@particle-network/chains';
import { ChainInfoItem } from './ChainInfoItem';
const { ccclass, property } = _decorator;

@ccclass('SelectChain')
export class SelectChain extends Component {
  @property(Node)
  private chainParentNode: Node | undefined;
  start() {
    
    resources.load('Prefabs/ChainInfoItem', Prefab, (err, prefab) => {
      if (err) {
        console.log(err);
        return;
      }

      const chainInfos = chains.getAllChainInfos();
      console.log("chainInfos", chainInfos);
      chainInfos.forEach((chainInfo: any) => {
        var newNode = instantiate(prefab);
        const chainInfoItem = newNode.getComponent<ChainInfoItem>(ChainInfoItem);
        chainInfoItem?.setChainInfo(chainInfo);
        // Add the instantiated node to the scene
        console.log("newNode", newNode);
        this.chainParentNode!.addChild(newNode);
      });
    });

  }

  update(deltaTime: number) {

  }
}

