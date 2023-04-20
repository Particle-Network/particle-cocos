
import { _decorator, Component, Node, resources, Prefab, instantiate, find } from 'cc';
import { getAllWalletTypes } from '../Core/Models/WalletType';
import { WalletTypeItem } from './WalletTypeItem';
const { ccclass, property } = _decorator;

@ccclass('SelectWalletType')
export class SelectWalletType extends Component {
  @property(Node)
  private chainParentNode: Node | undefined;
  start() {
    
    resources.load('Prefabs/WalletTypeItem', Prefab, (err, prefab) => {
      if (err) {
        console.log(err);
        return;
      }

      const walletTypes = getAllWalletTypes();
      console.log("walletTypes", walletTypes);
      walletTypes.forEach((walletType: any) => {
        var newNode = instantiate(prefab);
        const walletTypeItem = newNode.getComponent<WalletTypeItem>(WalletTypeItem);
        walletTypeItem?.setWalletType(walletType);
        // Add the instantiated node to the scene
        console.log("newNode", newNode);
        this.chainParentNode!.addChild(newNode);
      });
    });

  }

  update(deltaTime: number) {

  }
}

