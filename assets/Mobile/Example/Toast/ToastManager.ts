import { _decorator, Component, Node, Prefab, instantiate, Label, Tween, UITransform, UIOpacityComponent, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ToastManager')
export class ToastManager extends Component {
    @property(Prefab)
    toastPrefab: Prefab | null = null;

    @property
    duration: number = 1;

    private setToastPosition(toast: Node) {
        const canvasSize = this.node.getComponent(UITransform)!.contentSize;
        toast.setPosition(0, canvasSize.height * 0.35);
    }

    showToast(message: string) {
        if (!this.toastPrefab) {
            console.error('Toast Prefab is not assigned in the ToastManager component');
            return;
        }

        let toast = instantiate(this.toastPrefab);
        this.node.addChild(toast);
        toast.getComponentInChildren(Label)!.string = message;

        this.setToastPosition(toast);
        let fadeIn = new Tween(toast.getComponent(UIOpacity)!).to(0.3, { opacity : 255 });
        let fadeOut = new Tween(toast.getComponent(UIOpacity)!).to(0.3, { opacity: 0 });

        fadeIn
            .delay(this.duration)
            .then(fadeOut)
            .call(() => {
                toast.destroy();
            })
            .start();
    }
}
