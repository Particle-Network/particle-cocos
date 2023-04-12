import { _decorator, Component, native, sys } from 'cc';
import { Env, LoginType, SupportAuthType } from './Models/LoginInfo';
import * as Helper from './Helper';
import { EvmService } from './NetService/EvmService';
import { WalletType } from './Models/WalletType';
import { ParticleConnectConfig } from './Models/ConnectConfig';
import JsonRpcRequest from './NetService/NetService';
const { ccclass, property } = _decorator;

@ccclass('ConnectDemo')
export class ConnectDemo extends Component {

    @property
    private publicAddress: string = '';


    @property
    private signInWithEthereumSourceMessage: string = '';
    @property 
    private signInWithEthreumSignature: string = '';

    hidden(){
        this.node.active = false;
    }

    /**
     * This is an Ethereum mnemonic phrase for testing purposes only.
     */
    @property 
    private testMnemonic: string = "hood result social fetch pet code check yard school jealous trick lazy";

    /**
     * This is an Ethereum private key for testing purposes only.
     */
    @property
    private testPrivateKey: string = "eacd18277e3cfca6446801b7587c9d787d5ee5d93f6a38752f7d94eddadc469e";

    start() {
        this._registerAllScriptEvent();
    }

    private _registerAllScriptEvent() {

        native.jsbBridgeWrapper.addNativeEventListener("adapterConnectCallback", (json: string) => {
            this._adapterConnectCallback(json);
        });


        native.jsbBridgeWrapper.addNativeEventListener("adapterConnectParticleWithConfigCallback", (json: string) => {
            this._adapterConnectParticleWithConfigCallback(json);
        });

        native.jsbBridgeWrapper.addNativeEventListener("adapterDisconnectCallback", (json: string) => {
            this._adapterDisconnectCallback(json);
        });

        native.jsbBridgeWrapper.addNativeEventListener("adapterIsConnectedCallback", (json: string) => {
            this._adapterIsConnectedCallback(json);
        });


        native.jsbBridgeWrapper.addNativeEventListener("adapterSignMessageCallback", (signature: string) => {
            this._adapterSignMessageCallback(signature);
        });

        native.jsbBridgeWrapper.addNativeEventListener("adapterSignAndSendTransactionCallback", (signature: string) => {
            this._adapterSignAndSendTransactionCallback(signature);
        });

        native.jsbBridgeWrapper.addNativeEventListener("adapterSignTypedDataCallback", (signature: string) => {
            this._adapterSignTypedDataCallback(signature);
        });

        native.jsbBridgeWrapper.addNativeEventListener("adapterSignTransactionCallback", (signature: string) => {
            this._adapterSignTransactionCallback(signature);
        });

        native.jsbBridgeWrapper.addNativeEventListener("adapterSignAllTransactionsCallback", (signature: string) => {
            this._adapterSignAllTransactionsCallback(signature);
        });

        native.jsbBridgeWrapper.addNativeEventListener("adapterImportWalletFromPrivateKeyCallback", (json: string) => {
            this._adapterImportWalletFromPrivateKeyCallback(json);
        });

        native.jsbBridgeWrapper.addNativeEventListener("adapterImportWalletFromMnemonicCallback", (json: string) => {
            this._adapterImportWalletFromMnemonicCallback(json);
        });

        native.jsbBridgeWrapper.addNativeEventListener("adapterSignInWithEthereumCallback", (json: string) => {
            this._adapterSignInWithEthereumCallback(json);
        });

        native.jsbBridgeWrapper.addNativeEventListener("adapterVerifyCallback", (json: string) => {
            this._adapterVerifyCallback(json);
        });

        native.jsbBridgeWrapper.addNativeEventListener("adapterSwitchEthereumChainCallback", (json: string) => {
            this._adapterSwitchEthereumChainCallback(json);
        });

        native.jsbBridgeWrapper.addNativeEventListener("adapterAddEthereumChainCallback", (json: string) => {
            this._adapterAddEthereumChainCallback(json);
        });

        native.jsbBridgeWrapper.addNativeEventListener("adapterWalletReadyStateCallback", (json: string) => {
            this._adapterWalletReadyStateCallback(json);
        });

        native.jsbBridgeWrapper.addNativeEventListener("adapterWalletReadyStateCallback", (json: string) => {
            this._adapterWalletReadyStateCallback(json);
        });

    }

    // Event call back
    private _adapterConnectCallback(json: string): void {

        console.log("adapterConnectCallback: " + json);

        let result = JSON.parse(json);
        if (result.status) {
            console.log('connect success');
            const account = result.data;
            this.publicAddress = account.publicAddress;
    
        } else {
            console.log('connect failure');
            const error = result.data;
            console.log(error);
        }
    }

    private _adapterConnectParticleWithConfigCallback(json: string): void {
        console.log("adapterConnectParticleWithConfigCallback: " + json);

        let result = JSON.parse(json);
        if (result.status) {
            console.log('connect success');
            const account = result.data;
            this.publicAddress = account.publicAddress;
    
        } else {
            console.log('connect failure');
            const error = result.data;
            console.log(error);
        }
    }
    private _adapterDisconnectCallback(json: string): void {
        console.log("adapterDisconnectCallback: " + json);
    }

    private _adapterIsConnectedCallback(json: string): void {
        console.log("adapterIsConnectedCallback: " + json);
    }

    private _adapterSignMessageCallback(signature: string): void {
        console.log("adapterSignMessageCallback: " + signature);
    }

    private _adapterSignAndSendTransactionCallback(signature: string): void {
        console.log("adapterSignAndSendTransactionCallback: " + signature);
    }

    private _adapterSignTypedDataCallback(signature: string): void {
        console.log("adapterSignTypedDataCallback: " + signature);
    }
    private _adapterSignTransactionCallback(signature: string): void {
        console.log("adapterSignTransactionCallback: " + signature);
    }

    private _adapterSignAllTransactionsCallback(signature: string): void {
        console.log("adapterSignAllTransactionsCallback: " + signature);
    }

    private _adapterImportWalletFromPrivateKeyCallback(json: string): void {
        console.log("adapterImportWalletFromPrivateKeyCallback: " + json);
    }

    private _adapterImportWalletFromMnemonicCallback(json: string): void {
        console.log("adapterImportWalletFromMnemonicCallback: " + json);
    }

    private _adapterSignInWithEthereumCallback(json: string): void {
        console.log("adapterSignInWithEthereumCallback: " + json);
        let result = JSON.parse(json);
        if (result.status) {
            const message = result.data.message;
            this.signInWithEthereumSourceMessage = message;
            const signature = result.data.signature;
            this.signInWithEthreumSignature = signature;
            console.log('signInWithEthreum message:', message);
            console.log('signInWithEthreum signature:', signature);
        } else {
            const error = result.data;
            console.log(error);
        }
    }

    private _adapterVerifyCallback(json: string): void {
        console.log("adapterVerifyCallback: " + json);

        let result = JSON.parse(json);
        if (result.status) {
            const flag = result.data;
            console.log(flag);
        } else {
            const error = result.data;
            console.log(error);
        }

        
    }

    private _adapterSwitchEthereumChainCallback(json: string): void {
        console.log("adapterSwitchEthereumChainCallback: " + json);
    }

    private _adapterAddEthereumChainCallback(json: string): void {
        console.log("adapterAddEthereumChainCallback: " + json);
    }

    private _adapterWalletReadyStateCallback(json: string): void {
        console.log("adapterWalletReadyStateCallback: " + json);
    }


    // Call native
    particleConnectInitialize() {
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

    adapterGetAccounts() {
        const walletType = WalletType.MetaMask;
        native.jsbBridgeWrapper.dispatchEventToNative("adapterGetAccounts", walletType);
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
        const privateKey = this.testPrivateKey;
        const obj = { wallet_type: walletType, private_key: privateKey };
        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("adapterImportWalletFromPrivateKey", json);
    }

    adapterImportWalletFromMnemonic() {
        // only support WalletType EvmPrivateKey, SolanaPriveteKey
        const walletType = WalletType.EvmPrivateKey;
        // mnemonic is a word list, split by space, example "word1 work2 ... " at least 12 words.
        const mnemonic = this.testMnemonic;
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

    // Sign in with ethereum, eip4361 https://eips.ethereum.org/EIPS/eip-4361
    adapterSignInWithEthereum() {
        const walletType = WalletType.MetaMask;
        const domain = 'login.xyz';
        const uri = 'https://login.xyz/demo#login';
        const obj = { wallet_type: walletType, public_address: this.publicAddress, domain: domain, uri: uri };
        const json = JSON.stringify(obj);

        native.jsbBridgeWrapper.dispatchEventToNative("adapterLogin", json);
    }

    adapterVerify() {
        if (this.signInWithEthereumSourceMessage == undefined || this.signInWithEthreumSignature == undefined) {
            console.log('signInWithEthereum message or signature is underfined');
            return;
        }

        const walletType = WalletType.MetaMask;
        const message = this.signInWithEthereumSourceMessage;
        const signature = this.signInWithEthreumSignature;

        const obj = { wallet_type: walletType, public_address: this.publicAddress, message: message, signature: signature };
        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("adapterVerify", json);
    }

    adapterSwitchEthereumChain() {
        const walletType = WalletType.MetaMask;
        const obj = {
            wallet_type: walletType,
            public_address: this.publicAddress,
            chain_id: EvmService.currentChainInfo.chain_id
          };
        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("adapterSwitchEthereumChain", json);
    }

    adapterAddEthereumChain() {
        const walletType = WalletType.MetaMask;
        const chainInfo = EvmService.currentChainInfo;
        const obj = {
            wallet_type: walletType,
            public_address: this.publicAddress,
            chain_name: chainInfo.chain_name,
            chain_id: chainInfo.chain_id,
            chain_id_name: chainInfo.chain_id_name,
          };
          const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("adapterAddEthereumChain", json);
    }

    adapterWalletReadyState() {
        const walletType = WalletType.MetaMask;
        native.jsbBridgeWrapper.dispatchEventToNative("adapterWalletReadyState", walletType);
    }

    reconnectIfNeeded() {
        if (sys.OS.IOS === sys.os) {
            const walletType = WalletType.MetaMask;
            const obj = { wallet_type: walletType, public_address: this.publicAddress };
            const json = JSON.stringify(obj);
        
            native.jsbBridgeWrapper.dispatchEventToNative("reconnectIfNeeded",json);
          } 
    }
    
    update(deltaTime: number) { }
}

