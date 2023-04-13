
import { _decorator, Component, Node, resources, Prefab, instantiate } from 'cc';
import { ChainInfo } from '../Core/Models/ChainInfo';
import { ChainInfoItem } from './ChainInfoItem';
const { ccclass, property } = _decorator;

@ccclass('SelectChain')
export class SelectChain extends Component {
  @property(Node)
  private chainParentNode: Node | undefined;
  start() {
    // cc.loader.loadRes("Prefabs/ChainInfoItem", function (err, prefab) {
    //     var newNode = cc.instantiate(prefab);
    //     this.node.addChild(newNode);
    // });
    resources.load('Prefabs/ChainInfoItem', Prefab, (err, prefab) => {
      if (err) {
        console.log(err);
        return;
      }

      const chainInfos = ChainInfo.getAllChainInfos()
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

