import { _decorator, Component, native, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AuthDemo')
export class AuthDemo extends Component {
    start() {
        this.registerAllScriptEvent();
    }

    public registerAllScriptEvent() {

        native.jsbBridgeWrapper.addNativeEventListener("loginCallback", (json: string) => {
            this.loginCallback(json);
        });
        native.jsbBridgeWrapper.addNativeEventListener("fastLogoutCallback", (json: string) => {
            this.fastLogoutCallback(json);
        });
        native.jsbBridgeWrapper.addNativeEventListener("signMessageCallback", (signature: string) => {
            this.signMessageCallback(signature);
        });
        native.jsbBridgeWrapper.addNativeEventListener("signTypedDataCallback",  (signature: string) => {
            this.signTypedDataCallback(signature);
        });
        native.jsbBridgeWrapper.addNativeEventListener("signAndSendTransactionCallback",  (signature: string) => {
            this.signAndSendTransactionCallback(signature);
        });
    }

    //Methods to apply
    public loginCallback(json: string): void {
        console.log("loginCallback: " + json);
    }
    public fastLogoutCallback(json: string): void {
        console.log("fastLogoutCallback: " + json);
    }
    public signMessageCallback(signature: string): void {
        console.log("signMessageCallback: " + signature);
    }
    public signTypedDataCallback(signature: string): void {
        console.log("signMessageCallback: " + signature);
    }
    public signAndSendTransactionCallback(signature: string): void {
        console.log("signAndSendTransactionCallback: " + signature);
    }

    Init() {
        const obj = {
            chain_name: "Ethereum",
            chain_id: 5,
            chain_id_name: "Goerli",
            env: "debug",
        };
        const json = JSON.stringify(obj);

        native.jsbBridgeWrapper.dispatchEventToNative("initialize", json);
    }

    login() {
        const obj = {
            login_type: "email",
            account: "",
            support_auth_type_values: ["all"],
            login_form_mode: true,
        };
        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("login", json);
    }

    logout() {
        native.jsbBridgeWrapper.dispatchEventToNative("logout", "");
    }

    fastLogout() {
        native.jsbBridgeWrapper.dispatchEventToNative("fastLogout", "");
    }

    signMessage() {
        const message = "Hello Cocos !";
        native.jsbBridgeWrapper.dispatchEventToNative("signMessage", message);
    }

    update(deltaTime: number) { }
}

