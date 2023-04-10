import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AuthDemo')
export class AuthDemo extends Component {
    start() {
        console.log('AuthDemo start')
    }

    update(deltaTime: number) {
        
    }
}

