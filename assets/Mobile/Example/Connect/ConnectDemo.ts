import { _decorator, Component, find, sys } from 'cc';
import { Env, LoginType, SupportAuthType } from '../../Core/Models/LoginInfo';
import * as Helper from '../Auth/Helper';
import { EvmService } from '../../Core/NetService/EvmService';
import * as particleConnect from '../../Core/particleConnect';
import * as particleAuth from '../../Core/particleAuth';
import { MainUIDemo } from '../MainUIDemo';
import { createWeb3FromParticleConnect, restoreWeb3FromParticleConnect } from '../../Core/web3Demo';
import { ToastManager } from '../Toast/ToastManager';
import { ParticleInfo } from '../../Core/NetService/ParticleInfo';
import { WalletType } from '../../Core/Models/WalletType';
import { DappMetaData } from '../../Core/Models/DappMetaData';
import { ParticleConnectConfig } from '../../Core/Models/ConnectConfig';
import { Polygon, PolygonMumbai } from '@particle-network/chains';


const { ccclass, property } = _decorator;

@ccclass('ConnectDemo')
export class ConnectDemo extends Component {

    static walletType: WalletType = WalletType.MetaMask;

    @property
    private _publicAddress: string = '';
    @property
    private _signInWithEthereumSourceMessage: string = '';
    @property
    private _signInWithEthreumSignature: string = '';

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

    private newWeb3: any = createWeb3FromParticleConnect(ConnectDemo.walletType);
    private web3: any = restoreWeb3FromParticleConnect(ConnectDemo.walletType, "");


    start() {
        if (sys.os == sys.OS.IOS || sys.os == sys.OS.ANDROID) {
            particleConnect.registerAllScriptEvent();

            // Due to some methods relying on particleAuth, 
            // it is necessary to register particleAuth's Event.
            particleAuth.registerAllScriptEvent();
        }
    }

    selectChain() {
        MainUIDemo.getInstance().showSelectChain();
    }

    selectWalletType() {
        MainUIDemo.getInstance().showSelectWalletType();
    }

    particleConnectInitialize() {

        // Get your project id and client from dashboard,  
        // https://dashboard.particle.network/
        ParticleInfo.projectId = "5479798b-26a9-4943-b848-649bb104fdc3"; // your project id
        ParticleInfo.clientKey = "cUKfeOA7rnNFCxSBtXE5byLgzIhzGrE4Y7rDdY4b"; // your client key

        if (ParticleInfo.projectId == "" || ParticleInfo.clientKey == "") {
            throw new Error('You need set project info');
        }

        const chainInfo = PolygonMumbai;

        const dappMetaData = new DappMetaData('https://connect.particle.network', 'https://connect.particle.network/icons/512.png', 'Particle Connect', "Particle Connect", "75ac08814504606fc06126541ace9df6");
        particleConnect.particleConnectInitialize(chainInfo, Env.Dev, dappMetaData);

        this.newWeb3 = createWeb3FromParticleConnect(WalletType.MetaMask);
    }

    async web3_getAccounts() {
        try {
            const accounts = await this.newWeb3.eth.getAccounts();
            toastAndLog('web3.eth.getAccounts', accounts);
            this._publicAddress = accounts[0];
        } catch (error) {
            toastAndLog('web3.eth.getAccounts', error);
        }
    }

    async restoreWeb3_getAccounts() {
        try {
            this.web3 = restoreWeb3FromParticleConnect(WalletType.MetaMask, this._publicAddress);
            const accounts = await this.web3.eth.getAccounts();
            toastAndLog('web3.eth.getAccounts', accounts);
            this._publicAddress = accounts[0];
        } catch (error) {
            toastAndLog('web3.eth.getAccounts', error);
        }
    }


    async web3_getBalance() {
        try {
            const accounts = await this.web3.eth.getAccounts();
            const balance = await this.web3.eth.getBalance(accounts[0]);
            toastAndLog('web3.eth.getBalance', balance);
        } catch (error) {
            toastAndLog('web3.eth.getBalance', error);
        }

    }

    async web3_getChainId() {
        try {
            const chainId = await this.web3.eth.getChainId();
            toastAndLog('web3.eth.getChainId', chainId);
        } catch (error) {
            toastAndLog('web3.eth.getChainId', error);
        }

    }

    async web3_personalSign() {
        // for persion_sign
        // don't use web3.eth.personal.sign
        try {
            const accounts = await this.web3.eth.getAccounts();
            const result = await this.web3.currentProvider.request({
                method: 'personal_sign',
                params: ['hello world', accounts[0]]
            });

            toastAndLog('web3.eth.personal.sign', result);
        } catch (error) {
            toastAndLog('web3.eth.personal.sign', error);
        }

    }

    async web3_signTypedData_v4() {
        try {

            const accounts = await this.web3.eth.getAccounts();
            const result = await this.web3.currentProvider.request({
                method: 'eth_signTypedData_v4',
                params: [accounts[0], { "types": { "OrderComponents": [{ "name": "offerer", "type": "address" }, { "name": "zone", "type": "address" }, { "name": "offer", "type": "OfferItem[]" }, { "name": "consideration", "type": "ConsiderationItem[]" }, { "name": "orderType", "type": "uint8" }, { "name": "startTime", "type": "uint256" }, { "name": "endTime", "type": "uint256" }, { "name": "zoneHash", "type": "bytes32" }, { "name": "salt", "type": "uint256" }, { "name": "conduitKey", "type": "bytes32" }, { "name": "counter", "type": "uint256" }], "OfferItem": [{ "name": "itemType", "type": "uint8" }, { "name": "token", "type": "address" }, { "name": "identifierOrCriteria", "type": "uint256" }, { "name": "startAmount", "type": "uint256" }, { "name": "endAmount", "type": "uint256" }], "ConsiderationItem": [{ "name": "itemType", "type": "uint8" }, { "name": "token", "type": "address" }, { "name": "identifierOrCriteria", "type": "uint256" }, { "name": "startAmount", "type": "uint256" }, { "name": "endAmount", "type": "uint256" }, { "name": "recipient", "type": "address" }], "EIP712Domain": [{ "name": "name", "type": "string" }, { "name": "version", "type": "string" }, { "name": "chainId", "type": "uint256" }, { "name": "verifyingContract", "type": "address" }] }, "domain": { "name": "Seaport", "version": "1.1", "chainId": 5, "verifyingContract": "0x00000000006c3852cbef3e08e8df289169ede581" }, "primaryType": "OrderComponents", "message": { "offerer": "0x6fc702d32e6cb268f7dc68766e6b0fe94520499d", "zone": "0x0000000000000000000000000000000000000000", "offer": [{ "itemType": "2", "token": "0xd15b1210187f313ab692013a2544cb8b394e2291", "identifierOrCriteria": "33", "startAmount": "1", "endAmount": "1" }], "consideration": [{ "itemType": "0", "token": "0x0000000000000000000000000000000000000000", "identifierOrCriteria": "0", "startAmount": "9750000000000000", "endAmount": "9750000000000000", "recipient": "0x6fc702d32e6cb268f7dc68766e6b0fe94520499d" }, { "itemType": "0", "token": "0x0000000000000000000000000000000000000000", "identifierOrCriteria": "0", "startAmount": "250000000000000", "endAmount": "250000000000000", "recipient": "0x66682e752d592cbb2f5a1b49dd1c700c9d6bfb32" }], "orderType": "0", "startTime": "1669188008", "endTime": "115792089237316195423570985008687907853269984665640564039457584007913129639935", "zoneHash": "0x3000000000000000000000000000000000000000000000000000000000000000", "salt": "48774942683212973027050485287938321229825134327779899253702941089107382707469", "conduitKey": "0x0000000000000000000000000000000000000000000000000000000000000000", "counter": "0" } }]
            });
            toastAndLog('web3 eth_signTypedData_v4', result);
        } catch (error) {
            toastAndLog('web3 eth_signTypedData_v4', error);
        }
    }

    async web3_sendTransaction() {
        try {
            const accounts = await this.web3.eth.getAccounts();
            const result = await this.web3.eth.sendTransaction(
                {
                    from: accounts[0],
                    to: "0x39b2DeB155Ee6a5a23E172bE11744329e95Af6df",
                    value: '1000000',
                    data: '0x'
                }
            )
            toastAndLog('web3.eth.sendTransaction', JSON.stringify(result));
        } catch (error) {
            toastAndLog('web3.eth.sendTransaction', error);
        }

    }

    async web3_wallet_switchEthereumChain() {
        try {
            const chainId = PolygonMumbai.id;
            const result = await this.web3.currentProvider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: "0x" + chainId.toString(16) }]
            })
            toastAndLog('web3 wallet_switchEthereumChain', result);
        } catch (error) {
            toastAndLog('web3 wallet_switchEthereumChain', error);
        }

    }

    async web3_wallet_addEthereumChain() {
        try {
            const chainId = PolygonMumbai.id;
            const result = await this.web3.currentProvider.request({
                method: 'wallet_addEthereumChain',
                params: [{ chainId: "0x" + chainId.toString(16) }]
            })
            toastAndLog('web3 wallet_addEthereumChain', result);
        } catch (error) {
            toastAndLog('web3 wallet_addEthereumChain', error);
        }

    }



    async adapterConnect() {
        const walletType = ConnectDemo.walletType;
        const result = await particleConnect.adapterConnect(walletType);

        if (result.status) {
            const account = result.data;
            this._publicAddress = account.publicAddress;
            toastAndLog(account);
        } else {
            const error = result.data;
            toastAndLog(error);
        }
    }

    async adapterConnectParticleWithConfig() {
        const walletType = ConnectDemo.walletType;
        const connectConfig = new ParticleConnectConfig(LoginType.Email, "", [SupportAuthType.All]);

        const result = await particleConnect.adapterConnect(walletType, connectConfig);

        if (result.status) {
            const account = result.data;
            this._publicAddress = account.publicAddress;
            toastAndLog(account);
        } else {
            const error = result.data;
            toastAndLog(error);
        }

    }

    async adapterGetAccounts() {
        const walletType = ConnectDemo.walletType;
        const result = await particleConnect.adapterGetAccounts(walletType);

        if (result.status) {
            const data = result.data;
            toastAndLog(data);
        } else {
            const error = result.data;
            toastAndLog(error);
        }
    }

    async adapterDisconnect() {
        const walletType = ConnectDemo.walletType;
        const publicAddress = this._publicAddress;

        const result = await particleConnect.adapterDisconnect(walletType, publicAddress);
        if (result.status) {
            const data = result.data;
            toastAndLog(data);
        } else {
            const error = result.data;
            toastAndLog(error);
        }
    }

    async adapterIsConnected() {
        const walletType = ConnectDemo.walletType;
        const publicAddress = this._publicAddress;

        const result = await particleConnect.adapterIsConnected(walletType, publicAddress);
        if (result.status) {
            const data = result.data;
            toastAndLog(data);
        } else {
            const error = result.data;
            toastAndLog(error);
        }

    }

    async adapterSignMessage() {
        const walletType = ConnectDemo.walletType;
        const publicAddress = this._publicAddress;
        const message = 'Hello world!';

        const result = await particleConnect.adapterSignMessage(walletType, publicAddress, message);
        if (result.status) {
            const data = result.data;
            toastAndLog(data);
        } else {
            const error = result.data;
            toastAndLog(error);
        }
    }

    async adapterSignAndSendTransaction() {
        try {
            const walletType = ConnectDemo.walletType;
            const sender = this._publicAddress;
            const chainInfo = await particleAuth.getChainInfo();
            let transaction = '';
            // There are four test cases
            // Before test, make sure your public address have some native token for fee.
            // 1. send evm native in Ethereum goerli, the transacion is type 0x2, for blockchains support EIP1559
            // 2. send evm native in BSC testnet, the transacion is type 0x0, for blockchians don't supoort EIP1559
            // 3. send evm token in Ethereum goerli, the transacion is type 0x2, for blockchains support EIP1559
            // 4. send evm token in BSC testnet, the transacion is type 0x0, for blockchians don't supoort EIP1559
            let testCase = 1;

            if (chainInfo.name.toLowerCase() == 'solana') {
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
            toastAndLog(transaction);
            const result = await particleConnect.adapterSignAndSendTransaction(walletType, sender, transaction);
            if (result.status) {
                const signature = result.data;
                toastAndLog(signature);
            } else {
                const error = result.data;
                toastAndLog(error);
            }

        } catch (error) {

        }
    }

    async adapterSignTypedData() {
        const walletType = ConnectDemo.walletType;
        const publicAddress = this._publicAddress;
        const typedData = "{\"types\":{\"OrderComponents\":[{\"name\":\"offerer\",\"type\":\"address\"},{\"name\":\"zone\",\"type\":\"address\"},{\"name\":\"offer\",\"type\":\"OfferItem[]\"},{\"name\":\"consideration\",\"type\":\"ConsiderationItem[]\"},{\"name\":\"orderType\",\"type\":\"uint8\"},{\"name\":\"startTime\",\"type\":\"uint256\"},{\"name\":\"endTime\",\"type\":\"uint256\"},{\"name\":\"zoneHash\",\"type\":\"bytes32\"},{\"name\":\"salt\",\"type\":\"uint256\"},{\"name\":\"conduitKey\",\"type\":\"bytes32\"},{\"name\":\"counter\",\"type\":\"uint256\"}],\"OfferItem\":[{\"name\":\"itemType\",\"type\":\"uint8\"},{\"name\":\"token\",\"type\":\"address\"},{\"name\":\"identifierOrCriteria\",\"type\":\"uint256\"},{\"name\":\"startAmount\",\"type\":\"uint256\"},{\"name\":\"endAmount\",\"type\":\"uint256\"}],\"ConsiderationItem\":[{\"name\":\"itemType\",\"type\":\"uint8\"},{\"name\":\"token\",\"type\":\"address\"},{\"name\":\"identifierOrCriteria\",\"type\":\"uint256\"},{\"name\":\"startAmount\",\"type\":\"uint256\"},{\"name\":\"endAmount\",\"type\":\"uint256\"},{\"name\":\"recipient\",\"type\":\"address\"}],\"EIP712Domain\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"version\",\"type\":\"string\"},{\"name\":\"chainId\",\"type\":\"uint256\"},{\"name\":\"verifyingContract\",\"type\":\"address\"}]},\"domain\":{\"name\":\"Seaport\",\"version\":\"1.1\",\"chainId\":5,\"verifyingContract\":\"0x00000000006c3852cbef3e08e8df289169ede581\"},\"primaryType\":\"OrderComponents\",\"message\":{\"offerer\":\"0x6fc702d32e6cb268f7dc68766e6b0fe94520499d\",\"zone\":\"0x0000000000000000000000000000000000000000\",\"offer\":[{\"itemType\":\"2\",\"token\":\"0xd15b1210187f313ab692013a2544cb8b394e2291\",\"identifierOrCriteria\":\"33\",\"startAmount\":\"1\",\"endAmount\":\"1\"}],\"consideration\":[{\"itemType\":\"0\",\"token\":\"0x0000000000000000000000000000000000000000\",\"identifierOrCriteria\":\"0\",\"startAmount\":\"9750000000000000\",\"endAmount\":\"9750000000000000\",\"recipient\":\"0x6fc702d32e6cb268f7dc68766e6b0fe94520499d\"},{\"itemType\":\"0\",\"token\":\"0x0000000000000000000000000000000000000000\",\"identifierOrCriteria\":\"0\",\"startAmount\":\"250000000000000\",\"endAmount\":\"250000000000000\",\"recipient\":\"0x66682e752d592cbb2f5a1b49dd1c700c9d6bfb32\"}],\"orderType\":\"0\",\"startTime\":\"1669188008\",\"endTime\":\"115792089237316195423570985008687907853269984665640564039457584007913129639935\",\"zoneHash\":\"0x3000000000000000000000000000000000000000000000000000000000000000\",\"salt\":\"48774942683212973027050485287938321229825134327779899253702941089107382707469\",\"conduitKey\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"counter\":\"0\"}}";


        const result = await particleConnect.adapterSignTypedData(walletType, publicAddress, typedData);
        if (result.status) {
            const data = result.data;
            toastAndLog(data);
        } else {
            const error = result.data;
            toastAndLog(error);
        }
    }

    async adapterSignTransaction() {
        // only support solana, not support evm
        const walletType = ConnectDemo.walletType;
        const publicAddress = this._publicAddress;
        const transaction = "";

        const result = await particleConnect.adapterSignTransaction(walletType, publicAddress, transaction)
        if (result.status) {
            const data = result.data;
            toastAndLog(data);
        } else {
            const error = result.data;
            toastAndLog(error);
        }
    }

    async adapterSignAllTransactions() {
        // only support solana, not support evm
        const walletType = ConnectDemo.walletType;
        const publicAddress = this._publicAddress;

        const transactions = ["", ""];

        const result = await particleConnect.adapterSignAllTransactions(walletType, publicAddress, transactions)
        if (result.status) {
            const data = result.data;
            toastAndLog(data);
        } else {
            const error = result.data;
            toastAndLog(error);
        }

    }


    async adapterImportWalletFromPrivateKey() {
        // only support WalletType EvmPrivateKey, SolanaPriveteKey
        const walletType = ConnectDemo.walletType;
        const privateKey = this.testPrivateKey;

        const result = await particleConnect.adapterImportWalletFromPrivateKey(walletType, privateKey);
        if (result.status) {
            const account = result.data;
            this._publicAddress = account.publicAddress;
            toastAndLog(account);
        } else {
            const error = result.data;
            toastAndLog(error);
        }
    }

    async adapterImportWalletFromMnemonic() {
        // only support WalletType EvmPrivateKey, SolanaPriveteKey
        const walletType = ConnectDemo.walletType;
        // mnemonic is a word list, split by space, example "word1 work2 ... " at least 12 words.
        const mnemonic = this.testMnemonic;

        const result = await particleConnect.adapterImportWalletFromMnemonic(walletType, mnemonic);
        if (result.status) {
            const account = result.data;
            this._publicAddress = account.publicAddress;
            toastAndLog(account);
        } else {
            const error = result.data;
            toastAndLog(error);
        }
    }

    async adapterExportWalletPrivateKey() {
        const walletType = ConnectDemo.walletType;
        const publicAddress = this._publicAddress;

        const result = await particleConnect.adapterExportPrivateKey(walletType, publicAddress);
        if (result.status) {
            const data = result.data;
            toastAndLog(data);
        } else {
            const error = result.data;
            toastAndLog(error);
        }

    }

    // Sign in with ethereum, eip4361 https://eips.ethereum.org/EIPS/eip-4361
    async adapterSignInWithEthereum() {
        const walletType = ConnectDemo.walletType;
        const publicAddress = this._publicAddress;
        const domain = 'login.xyz';
        const uri = 'https://login.xyz/demo#login';

        const result = await particleConnect.adapterSignInWithEthereum(walletType, publicAddress, domain, uri);
        if (result.status) {
            const data = result.data;
            toastAndLog(data);
        } else {
            const error = result.data;
            toastAndLog(error);
        }
    }

    async adapterVerify() {
        if (this._signInWithEthereumSourceMessage == undefined || this._signInWithEthreumSignature == undefined) {
            toastAndLog('signInWithEthereum message or signature is underfined');
            return;
        }

        const walletType = ConnectDemo.walletType;
        const publicAddress = this._publicAddress;
        const message = this._signInWithEthereumSourceMessage;
        const signature = this._signInWithEthreumSignature;

        const result = await particleConnect.adapterVerify(walletType, publicAddress, message, signature)
        if (result.status) {
            const data = result.data;
            toastAndLog(data);
        } else {
            const error = result.data;
            toastAndLog(error);
        }
    }

    async adapterSwitchEthereumChain() {
        const walletType = ConnectDemo.walletType;
        const publicAddress = "";
        const chainInfo = PolygonMumbai;

        const result = await particleConnect.adapterSwitchEthereumChain(walletType, publicAddress, chainInfo);
        if (result.status) {
            const data = result.data;
            toastAndLog(data);
        } else {
            const error = result.data;
            toastAndLog(error);
        }
    }

    async adapterAddEthereumChain() {
        const walletType = ConnectDemo.walletType;
        const publicAddress = "";
        const chainInfo = PolygonMumbai;

        const result = await particleConnect.adapterAddEthereumChain(walletType, publicAddress, chainInfo);
        if (result.status) {
            const data = result.data;
            toastAndLog(data);
        } else {
            const error = result.data;
            toastAndLog(error);
        }

    }

    async adapterWalletReadyState() {
        const walletType = ConnectDemo.walletType;
        const result = await particleConnect.adapterWalletReadyState(walletType);
        if (result.status) {
            const state = result.data;
            toastAndLog(state);
        } else {
            const error = result.data;
            toastAndLog(error);
        }
    }

    reconnectIfNeeded() {
        const walletType = ConnectDemo.walletType;
        const publicAddress = "";
        particleConnect.adapterReconnectIfNeeded(walletType, publicAddress);
    }

    update(deltaTime: number) { }

}

function toastAndLog(message?: any, ...optionalParams: any[]) {
    console.log(message, ...optionalParams);

    let total: string = "";
    if (isObject(message)) {
        total += JSON.stringify(message);
    } else {
        total += message;
    }
    if (optionalParams.length != 0) {
        total += JSON.stringify(optionalParams);
    }

    find("Canvas")?.getComponent(ToastManager)?.showToast(total);
}

function isObject(value: any): boolean {
    return value !== null && typeof value === 'object';
}

