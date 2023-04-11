import { _decorator, Component, native, Node, sys } from 'cc';
import { ChainInfo } from './Models/ChainInfo';
import { iOSModalPresentStyle, LoginType, SupportAuthType } from './Models/LoginInfo';
import { Language } from './Models/Language';
import * as Helper from './Helper';
import { UserInterfaceStyle } from './Models/UserInterfaceStyle';
const { ccclass, property } = _decorator;

@ccclass('AuthDemo')
export class AuthDemo extends Component {

    @property
    private publicAddress: string = '';

    @property
    private chainInfo: ChainInfo = ChainInfo.EthereumGoerli;


    start() {
        this.registerAllScriptEvent();
    }

    public registerAllScriptEvent() {

        native.jsbBridgeWrapper.addNativeEventListener("loginCallback", (json: string) => {
            this.loginCallback(json);
        });


        native.jsbBridgeWrapper.addNativeEventListener("logoutCallback", (json: string) => {
            this.logoutCallback(json);
        });

        native.jsbBridgeWrapper.addNativeEventListener("fastLogoutCallback", (json: string) => {
            this.fastLogoutCallback(json);
        });

        native.jsbBridgeWrapper.addNativeEventListener("setChainInfoCallback", (json: string) => {
            this.setChainInfoCallback(json);
        });

        native.jsbBridgeWrapper.addNativeEventListener("setChainInfoAsyncCallback", (json: string) => {
            this.setChainInfoAsyncCallback(json);
        });

        native.jsbBridgeWrapper.addNativeEventListener("signMessageCallback", (signature: string) => {
            this.signMessageCallback(signature);
        });

        native.jsbBridgeWrapper.addNativeEventListener("signTypedDataCallback", (signature: string) => {
            this.signTypedDataCallback(signature);
        });

        native.jsbBridgeWrapper.addNativeEventListener("signAndSendTransactionCallback", (signature: string) => {
            this.signAndSendTransactionCallback(signature);
        });

        native.jsbBridgeWrapper.addNativeEventListener("signTransactionCallback", (signature: string) => {
            this.signTransactionCallback(signature);
        });

        native.jsbBridgeWrapper.addNativeEventListener("signAllTransactionsCallback", (signature: string) => {
            this.signAllTransactionsCallback(signature);
        });

        native.jsbBridgeWrapper.addNativeEventListener("getChainInfoCallback", (json: string) => {
            this.getChainInfoCallback(json);
        });

        native.jsbBridgeWrapper.addNativeEventListener("isLoginCallback", (json: string) => {
            this.isLoginCallback(json);
        });

        native.jsbBridgeWrapper.addNativeEventListener("isLoginAsyncCallback", (json: string) => {
            this.isLoginAsyncCallback(json);
        });

        native.jsbBridgeWrapper.addNativeEventListener("getAddressCallback", (json: string) => {
            this.getAddressCallback(json);
        });

        native.jsbBridgeWrapper.addNativeEventListener("getUserInfoCallback", (json: string) => {
            this.getUserInfoCallback(json);
        });

    }

    // Event call back
    public loginCallback(json: string): void {
        console.log("loginCallback: " + json);
    }
    public logoutCallback(json: string): void {
        console.log("logoutCallback: " + json);
    }
    public fastLogoutCallback(json: string): void {
        console.log("fastLogoutCallback: " + json);
    }

    public setChainInfoCallback(json: string): void {
        console.log("setChainInfoCallback: " + json);
    }

    public setChainInfoAsyncCallback(json: string): void {
        console.log("setChainInfoAsyncCallback: " + json);
    }

    public signMessageCallback(signature: string): void {
        console.log("signMessageCallback: " + signature);
    }

    public signTypedDataCallback(signature: string): void {
        console.log("signTypedDataCallback: " + signature);
    }

    public signAndSendTransactionCallback(signature: string): void {
        console.log("signAndSendTransactionCallback: " + signature);
    }
    public signTransactionCallback(signature: string): void {
        console.log("signTransactionCallback: " + signature);
    }
    public signAllTransactionsCallback(signature: string): void {
        console.log("signAllTransactionsCallback: " + signature);
    }
    public getChainInfoCallback(json: string): void {
        console.log("getChainInfoCallback: " + json);
    }

    public isLoginCallback(json: string): void {
        console.log("isLoginCallback: " + json);
    }

    public isLoginAsyncCallback(json: string): void {
        console.log("isLoginAsyncCallback: " + json);
    }

    public getAddressCallback(json: string): void {
        console.log("getAddressCallback: " + json);
    }

    public getUserInfoCallback(json: string): void {
        console.log("getUserInfoCallback: " + json);
    }


    // Call native
    Init() {
        const obj = {
            chain_name: this.chainInfo.chain_name,
            chain_id: this.chainInfo.chain_id,
            chain_id_name: this.chainInfo.chain_id_name,
            env: "debug",
        };

        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("initialize", json);
    }

    login() {
        const obj = {
            login_type: LoginType.Email,
            account: "",
            support_auth_type_values: [SupportAuthType.All],
            login_form_mode: false,
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

   async signAndSendTransaction() {
        const sender = this.publicAddress;
        const chainInfo = this.chainInfo;
        let transaction = '';
        // There are four test cases
        // Before test, make sure your public address have some native token for fee.
        // 1. send evm native in Ethereum goerli, the transacion is type 0x2, for blockchains support EIP1559
        // 2. send evm native in BSC testnet, the transacion is type 0x0, for blockchians don't supoort EIP1559
        // 3. send evm token in Ethereum goerli, the transacion is type 0x2, for blockchains support EIP1559
        // 4. send evm token in BSC testnet, the transacion is type 0x0, for blockchians don't supoort EIP1559
        let testCase = 1;

        if (chainInfo.chain_name.toLowerCase() == 'solana') {
            transaction = await Helper.getSolanaTransaction(sender, '9LR6zGAFB3UJcLg9tWBQJxEJCbZh2UTnSU14RBxsK1ZN', 1000);
        } else {
            if (testCase == 1) {
                const receiver = '0x39b2DeB155Ee6a5a23E172bE11744329e95Af6df';
                const amount = '100000000';
                transaction = await Helper.getEthereumTransacion(sender, receiver, amount);
            } else if (testCase == 2) {
                const receiver = '0x39b2DeB155Ee6a5a23E172bE11744329e95Af6df';
                const amount = '100000000';
                transaction = await Helper.getEthereumTransacionLegacy(sender, receiver, amount);
            } else if (testCase == 3) {
                const receiver = '0x39b2DeB155Ee6a5a23E172bE11744329e95Af6df';
                const amount = '100000000';
                const contractAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';
                transaction = await Helper.getEvmTokenTransaction(sender, receiver, amount, contractAddress);
            } else {
                const receiver = '0x39b2DeB155Ee6a5a23E172bE11744329e95Af6df';
                const amount = '100000000';
                const contractAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';
                transaction = await Helper.getEvmTokenTransactionLegacy(sender, receiver, amount, contractAddress);
            }
        }
        console.log(transaction);
        native.jsbBridgeWrapper.dispatchEventToNative("signAndSendTransaction", transaction);
    }

    signTypedData() {
        const typedData = "{\"types\":{\"OrderComponents\":[{\"name\":\"offerer\",\"type\":\"address\"},{\"name\":\"zone\",\"type\":\"address\"},{\"name\":\"offer\",\"type\":\"OfferItem[]\"},{\"name\":\"consideration\",\"type\":\"ConsiderationItem[]\"},{\"name\":\"orderType\",\"type\":\"uint8\"},{\"name\":\"startTime\",\"type\":\"uint256\"},{\"name\":\"endTime\",\"type\":\"uint256\"},{\"name\":\"zoneHash\",\"type\":\"bytes32\"},{\"name\":\"salt\",\"type\":\"uint256\"},{\"name\":\"conduitKey\",\"type\":\"bytes32\"},{\"name\":\"counter\",\"type\":\"uint256\"}],\"OfferItem\":[{\"name\":\"itemType\",\"type\":\"uint8\"},{\"name\":\"token\",\"type\":\"address\"},{\"name\":\"identifierOrCriteria\",\"type\":\"uint256\"},{\"name\":\"startAmount\",\"type\":\"uint256\"},{\"name\":\"endAmount\",\"type\":\"uint256\"}],\"ConsiderationItem\":[{\"name\":\"itemType\",\"type\":\"uint8\"},{\"name\":\"token\",\"type\":\"address\"},{\"name\":\"identifierOrCriteria\",\"type\":\"uint256\"},{\"name\":\"startAmount\",\"type\":\"uint256\"},{\"name\":\"endAmount\",\"type\":\"uint256\"},{\"name\":\"recipient\",\"type\":\"address\"}],\"EIP712Domain\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"version\",\"type\":\"string\"},{\"name\":\"chainId\",\"type\":\"uint256\"},{\"name\":\"verifyingContract\",\"type\":\"address\"}]},\"domain\":{\"name\":\"Seaport\",\"version\":\"1.1\",\"chainId\":5,\"verifyingContract\":\"0x00000000006c3852cbef3e08e8df289169ede581\"},\"primaryType\":\"OrderComponents\",\"message\":{\"offerer\":\"0x6fc702d32e6cb268f7dc68766e6b0fe94520499d\",\"zone\":\"0x0000000000000000000000000000000000000000\",\"offer\":[{\"itemType\":\"2\",\"token\":\"0xd15b1210187f313ab692013a2544cb8b394e2291\",\"identifierOrCriteria\":\"33\",\"startAmount\":\"1\",\"endAmount\":\"1\"}],\"consideration\":[{\"itemType\":\"0\",\"token\":\"0x0000000000000000000000000000000000000000\",\"identifierOrCriteria\":\"0\",\"startAmount\":\"9750000000000000\",\"endAmount\":\"9750000000000000\",\"recipient\":\"0x6fc702d32e6cb268f7dc68766e6b0fe94520499d\"},{\"itemType\":\"0\",\"token\":\"0x0000000000000000000000000000000000000000\",\"identifierOrCriteria\":\"0\",\"startAmount\":\"250000000000000\",\"endAmount\":\"250000000000000\",\"recipient\":\"0x66682e752d592cbb2f5a1b49dd1c700c9d6bfb32\"}],\"orderType\":\"0\",\"startTime\":\"1669188008\",\"endTime\":\"115792089237316195423570985008687907853269984665640564039457584007913129639935\",\"zoneHash\":\"0x3000000000000000000000000000000000000000000000000000000000000000\",\"salt\":\"48774942683212973027050485287938321229825134327779899253702941089107382707469\",\"conduitKey\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"counter\":\"0\"}}";
        const version = "v4";
        const obj = { message: typedData, version: version };
        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("signTypedData", json);
    }

    signTransaction() {
        // only support solana, not support evm
        const transaction = "";
        native.jsbBridgeWrapper.dispatchEventToNative("signTransaction", transaction);
    }

    signAllTransactions() {
        // only support solana, not support evm
        const transactions = ["", ""];
        const json = JSON.stringify(transactions);
        native.jsbBridgeWrapper.dispatchEventToNative("signAllTransactions", json);
    }

    setChaininfo() {
        const chainInfo = ChainInfo.EthereumGoerli;

        const obj = {
            chain_name: chainInfo.chain_name,
            chain_id: chainInfo.chain_id,
            chain_id_name: chainInfo.chain_id_name,
        };
        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("setChainInfo", json);
    }

    setChainInfoAsync() {
        const chainInfo = ChainInfo.PolygonMumbai;

        const obj = {
            chain_name: chainInfo.chain_name,
            chain_id: chainInfo.chain_id,
            chain_id_name: chainInfo.chain_id_name,
        };
        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("setChainInfoAsync", json);
    }

    setUserInfo() {
        const userInfoJsonString = "";
        native.jsbBridgeWrapper.dispatchEventToNative("setUserInfo", userInfoJsonString);
    }

    getChainInfo() {
        native.jsbBridgeWrapper.dispatchEventToNative("getChainInfo", "");
    }

    isLogin() {
        native.jsbBridgeWrapper.dispatchEventToNative("isLogin", "");
    }

    isLoginAsync() {
        native.jsbBridgeWrapper.dispatchEventToNative("isLoginAsync", "");
    }

    getAddress() {
        native.jsbBridgeWrapper.dispatchEventToNative("getAddress", "");
    }

    getUserInfo() {
        native.jsbBridgeWrapper.dispatchEventToNative("getUserInfo", "");
    }

    openAccountAndSecurity() {
        native.jsbBridgeWrapper.dispatchEventToNative("openAccountAndSecurity", "");
    }

    setModalPresentStyle() {
        if (sys.OS.IOS === sys.os) {
            let style = iOSModalPresentStyle.FormSheet;
            native.jsbBridgeWrapper.dispatchEventToNative("setModalPresentStyle", style);
        }
    }

    setMediumScreen() {
        if (sys.OS.IOS === sys.os) {
            let isMediumScreen = true;
            native.jsbBridgeWrapper.dispatchEventToNative("setMediumScreen", isMediumScreen ? "1" : "0");
        }
    }

    setLanguage() {
        const language = Language.JA;
        native.jsbBridgeWrapper.dispatchEventToNative("setLanguage", language);
    }

    setDisplayWallet() {
        let isDisplayWallet = true;
        native.jsbBridgeWrapper.dispatchEventToNative("setDisplayWallet", isDisplayWallet ? "1" : "0");
    }

    setInterfaceStyle() {
        let style = UserInterfaceStyle.Light;
        native.jsbBridgeWrapper.dispatchEventToNative("setInterfaceStyle", style);
    }

    openWebWallet() {
        native.jsbBridgeWrapper.dispatchEventToNative("openWebWallet", "");
    }

    setSecurityAccountConfig() {
        const obj = {
            prompt_setting_when_sign: 1,
            prompt_master_password_setting_when_login: 2,
        };
        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("setSecurityAccountConfig", json);
    }

    update(deltaTime: number) { }
}

