import { _decorator, Component, native, Node, sys } from 'cc';
import { ChainInfo } from './Models/ChainInfo';
import { Env, iOSModalPresentStyle, LoginType, SupportAuthType } from './Models/LoginInfo';
import { Language } from './Models/Language';
import * as Helper from './Helper';
import { UserInterfaceStyle } from './Models/UserInterfaceStyle';
import { EvmService } from './NetService/EvmService';
import { DappMetaData } from './Models/DappMetaData';
import { WalletType } from './Models/WalletType';
import { ParticleConnectConfig } from './Models/ConnectConfig';
const { ccclass, property } = _decorator;

@ccclass('ConnectDemo')
export class ConnectDemo extends Component {

    @property
    private publicAddress: string = '';

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

        native.jsbBridgeWrapper.addNativeEventListener("getAddressCallback", (address: string) => {
            this.getAddressCallback(address);
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

    public getAddressCallback(address: string): void {
        this.publicAddress = address;
        console.log("getAddressCallback: " + address);
    }

    public getUserInfoCallback(json: string): void {
        console.log("getUserInfoCallback: " + json);
    }


    // Call native
    Init() {
        const metadata = {
            name: 'Particle Connect',
            icon: 'https://connect.particle.network/icons/512.png',
            url: 'https://connect.particle.network',
        };

        // the rpcUrl works for WalletType EvmPrivateKey and SolanaPrivakey
        // we have default rpc url in native SDK
        const rpcUrl = { evm_url: null, solana_url: null };

        const chainInfo = EvmService.currentChainInfo;
        const obj = {
            chain_name: chainInfo.chain_name,
            chain_id: chainInfo.chain_id,
            chain_id_name: chainInfo.chain_id_name,
            env: Env.Dev,
            metadata: metadata,
            rpc_url: rpcUrl
        };

        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("particleConnectInitialize", json);
    }

    adapterConnect() {
        const walletType = WalletType.MetaMask;
        const obj = { wallet_type: walletType, config: null};
        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("adapterConnect", json);
    }

    adapterConnectParticleWithConfig() {
        const connectConfig = new ParticleConnectConfig(LoginType.Email, "", [SupportAuthType.All]);
        const walletType = WalletType.MetaMask;
        const obj = { wallet_type: walletType, config: connectConfig};
        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("adapterConnect", json);
    }

    adapterDisconnect() {
        const walletType = WalletType.MetaMask;
        const obj = { wallet_type: walletType, public_address: this.publicAddress };
        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("adapterDisconnect", json);
    }

    adapterIsConnected() {
        const walletType = WalletType.MetaMask;
        const obj = { wallet_type: walletType, public_address: this.publicAddress };
        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("adapterIsConnected", json);
    }

    adapterSignMessage() {
        const walletType = WalletType.MetaMask;
        const message = "Hello Cocos !";
        const obj = { wallet_type: walletType, public_address: this.publicAddress, message: message };
        const json = JSON.stringify(obj);
        
        native.jsbBridgeWrapper.dispatchEventToNative("adapterSignMessage", json);
    }

    async adapterSignAndSendTransaction() {
        try {
            const sender = this.publicAddress;
            const chainInfo = EvmService.currentChainInfo;
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
                    const amount = '1000000000000000';
                    transaction = await Helper.getEthereumTransacion(sender, receiver, amount);
                } else if (testCase == 2) {
                    const receiver = '0x39b2DeB155Ee6a5a23E172bE11744329e95Af6df';
                    const amount = '1000000000000000';
                    transaction = await Helper.getEthereumTransacionLegacy(sender, receiver, amount);
                } else if (testCase == 3) {
                    const receiver = '0x39b2DeB155Ee6a5a23E172bE11744329e95Af6df';
                    const amount = '1000000000000000';
                    const contractAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';
                    transaction = await Helper.getEvmTokenTransaction(sender, receiver, amount, contractAddress);
                } else {
                    const receiver = '0x39b2DeB155Ee6a5a23E172bE11744329e95Af6df';
                    const amount = '1000000000000000';
                    const contractAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';
                    transaction = await Helper.getEvmTokenTransactionLegacy(sender, receiver, amount, contractAddress);
                }
            }
            console.log(transaction);
            native.jsbBridgeWrapper.dispatchEventToNative("adapterSignAndSendTransaction", transaction);
        } catch (error) {

        }
    }

    adapterSignTypedData() {
        const walletType = WalletType.Phantom;
        const typedData = "{\"types\":{\"OrderComponents\":[{\"name\":\"offerer\",\"type\":\"address\"},{\"name\":\"zone\",\"type\":\"address\"},{\"name\":\"offer\",\"type\":\"OfferItem[]\"},{\"name\":\"consideration\",\"type\":\"ConsiderationItem[]\"},{\"name\":\"orderType\",\"type\":\"uint8\"},{\"name\":\"startTime\",\"type\":\"uint256\"},{\"name\":\"endTime\",\"type\":\"uint256\"},{\"name\":\"zoneHash\",\"type\":\"bytes32\"},{\"name\":\"salt\",\"type\":\"uint256\"},{\"name\":\"conduitKey\",\"type\":\"bytes32\"},{\"name\":\"counter\",\"type\":\"uint256\"}],\"OfferItem\":[{\"name\":\"itemType\",\"type\":\"uint8\"},{\"name\":\"token\",\"type\":\"address\"},{\"name\":\"identifierOrCriteria\",\"type\":\"uint256\"},{\"name\":\"startAmount\",\"type\":\"uint256\"},{\"name\":\"endAmount\",\"type\":\"uint256\"}],\"ConsiderationItem\":[{\"name\":\"itemType\",\"type\":\"uint8\"},{\"name\":\"token\",\"type\":\"address\"},{\"name\":\"identifierOrCriteria\",\"type\":\"uint256\"},{\"name\":\"startAmount\",\"type\":\"uint256\"},{\"name\":\"endAmount\",\"type\":\"uint256\"},{\"name\":\"recipient\",\"type\":\"address\"}],\"EIP712Domain\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"version\",\"type\":\"string\"},{\"name\":\"chainId\",\"type\":\"uint256\"},{\"name\":\"verifyingContract\",\"type\":\"address\"}]},\"domain\":{\"name\":\"Seaport\",\"version\":\"1.1\",\"chainId\":5,\"verifyingContract\":\"0x00000000006c3852cbef3e08e8df289169ede581\"},\"primaryType\":\"OrderComponents\",\"message\":{\"offerer\":\"0x6fc702d32e6cb268f7dc68766e6b0fe94520499d\",\"zone\":\"0x0000000000000000000000000000000000000000\",\"offer\":[{\"itemType\":\"2\",\"token\":\"0xd15b1210187f313ab692013a2544cb8b394e2291\",\"identifierOrCriteria\":\"33\",\"startAmount\":\"1\",\"endAmount\":\"1\"}],\"consideration\":[{\"itemType\":\"0\",\"token\":\"0x0000000000000000000000000000000000000000\",\"identifierOrCriteria\":\"0\",\"startAmount\":\"9750000000000000\",\"endAmount\":\"9750000000000000\",\"recipient\":\"0x6fc702d32e6cb268f7dc68766e6b0fe94520499d\"},{\"itemType\":\"0\",\"token\":\"0x0000000000000000000000000000000000000000\",\"identifierOrCriteria\":\"0\",\"startAmount\":\"250000000000000\",\"endAmount\":\"250000000000000\",\"recipient\":\"0x66682e752d592cbb2f5a1b49dd1c700c9d6bfb32\"}],\"orderType\":\"0\",\"startTime\":\"1669188008\",\"endTime\":\"115792089237316195423570985008687907853269984665640564039457584007913129639935\",\"zoneHash\":\"0x3000000000000000000000000000000000000000000000000000000000000000\",\"salt\":\"48774942683212973027050485287938321229825134327779899253702941089107382707469\",\"conduitKey\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"counter\":\"0\"}}";

        const obj = { wallet_type: walletType, public_address: this.publicAddress, message: typedData };
        const json = JSON.stringify(obj);

        native.jsbBridgeWrapper.dispatchEventToNative("adapterSignTypedData", json);
    }

    adapterSignTransaction() {
         // only support solana, not support evm
        const walletType = WalletType.Phantom;
        const transaction = "";
        const obj = { wallet_type: walletType, public_address: this.publicAddress, transaction: transaction };
        const json = JSON.stringify(obj);

        native.jsbBridgeWrapper.dispatchEventToNative("adapterSignTransaction", json);
    }

    adapterSignAllTransactions() {
        // only support solana, not support evm
        const walletType = WalletType.Phantom;
        const transactions = ["", ""];
        const obj = { wallet_type: walletType, public_address: this.publicAddress, transactions: transactions };
        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("adapterSignAllTransactions", json);
    }


    adapterImportWalletFromPrivateKey() {
        // only support WalletType EvmPrivateKey, SolanaPriveteKey
        const walletType = WalletType.EvmPrivateKey;
        const privateKey = "";
        const obj = { wallet_type: walletType, private_key: privateKey };
        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("adapterImportWalletFromPrivateKey", json);
    }

    adapterImportWalletFromMnemonic() {
        // only support WalletType EvmPrivateKey, SolanaPriveteKey
        const walletType = WalletType.EvmPrivateKey;
        // mnemonic is a word list, split by space, example "word1 work2 ... " at least 12 words.
        const mnemonic = "";
        const obj = { wallet_type: walletType, mnemonic: mnemonic };
        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("adapterImportWalletFromMnemonic", json);
    }

    adapterExportWalletPrivateKey() {
        const walletType = WalletType.EvmPrivateKey;
        const obj = { wallet_type: walletType, public_address: this.publicAddress };
        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("adapterExportWalletPrivateKey", json);
    }

    // Sign in with ethereum
    adapterLogin() {
        const walletType = WalletType.MetaMask;
        const domain = 'login.xyz';
        const uri = 'https://login.xyz/demo#login';
        const obj = { wallet_type: walletType, public_address: this.publicAddress, domain: domain, uri: uri };
        const json = JSON.stringify(obj);

        native.jsbBridgeWrapper.dispatchEventToNative("adapterLogin", json);
    }

    adapterVerify() {
        const walletType = WalletType.MetaMask;
        const message = "";
        const signature = "";
        const obj = { wallet_type: walletType, public_address: this.publicAddress, message: message, signature: signature };
        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("adapterVerify", json);
    }

    adapterSwitchEthereumChain() {
        const walletType = WalletType.MetaMask;
        const obj = {
            wallet_type: walletType,
            public_address: this.publicAddress,
            chain_id: EvmService.currentChainInfo.chain_id;
          };
          const json = JSON.stringify(obj);

        native.jsbBridgeWrapper.dispatchEventToNative("openAccountAndSecurity", json);
    }

    adapterAddEthereumChain() {
        if (sys.OS.IOS === sys.os) {
            let style = iOSModalPresentStyle.FormSheet;
            native.jsbBridgeWrapper.dispatchEventToNative("setModalPresentStyle", style);
        }
    }

    adapterWalletReadyState() {
        if (sys.OS.IOS === sys.os) {
            let isMediumScreen = true;
            native.jsbBridgeWrapper.dispatchEventToNative("setMediumScreen", isMediumScreen ? "1" : "0");
        }
    }

    reconnectIfNeeded() {

    }
    
    update(deltaTime: number) { }
}

