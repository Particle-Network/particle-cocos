import { _decorator, Component, find, sys } from 'cc';
import { ChainInfo } from './Models/ChainInfo';
import { Env, iOSModalPresentStyle, LoginType, SupportAuthType } from './Models/LoginInfo';
import { Language } from './Models/Language';
import * as Helper from './Helper';
import { UserInterfaceStyle } from './Models/UserInterfaceStyle';
import { EvmService } from './NetService/EvmService';
import * as particleAuth from './particleAuth';
import { SecurityAccountConfig } from './Models/SecurityAccountConfig';
import { MainUIDemo } from './MainUIDemo';
import { createWeb3 } from './web3Demo';

const { ccclass, property } = _decorator;

@ccclass('AuthDemo')
export class AuthDemo extends Component {

    private web3 = createWeb3();

    @property
    private publicAddress: string = '';

    start() {
        if (sys.os == sys.OS.IOS || sys.os == sys.OS.ANDROID) {
            particleAuth.registerAllScriptEvent();
        }
    }

    selectChain() {
        MainUIDemo.getInstance().showSelectChain();
    }

    hidden() {
        this.node.active = false;
        const iconNode = find("Canvas/MainUIDemo/Icon");
        if (iconNode != null) {
            iconNode.active = true;
        }

        const authButtonNode = find("Canvas/MainUIDemo/AuthButton");
        if (authButtonNode != null) {
            authButtonNode.active = true;
        }
    }


    async web3_getAccounts() {
        try {
            const accounts = await this.web3.eth.getAccounts();
            console.log('web3.eth.getAccounts', accounts);
        } catch (error) {
            console.log('web3.eth.getAccounts', error);
        }
    };

    async web3_getBalance() {
        try {
            const accounts = await this.web3.eth.getAccounts();
            const balance = await this.web3.eth.getBalance(accounts[0]);
            console.log('web3.eth.getBalance', balance);
        } catch (error) {
            console.log('web3.eth.getBalance', error);
        }
    };

    async web3_getChainId() {
        try {
            const chainId = await this.web3.eth.getChainId();
            console.log('web3.eth.getChainId', chainId);
        } catch (error) {
            console.log('web3.eth.getChainId', error);
        }
    };

    async web3_personalSign() {
        try {
            // for persion_sign
            // don't use web3.eth.personal.sign
            const result = await this.web3.currentProvider.request({
                method: 'personal_sign',
                params: ['hello world'],
            });

            console.log('web3.eth.personal.sign', result);
        } catch (error) {
            console.log('web3.eth.personal.sign', error);
        }
    };

    async web3_signTypedData_v1() {
        try {
            const accounts = await this.web3.eth.getAccounts();
            const result = await this.web3.currentProvider.request({
                method: 'eth_signTypedData_v1',
                params: [
                    [
                        { type: 'string', name: 'Message', value: 'Hi, Alice!' },
                        { type: 'uint32', name: 'A nunmber', value: '1337' },
                    ],
                    accounts[0],
                ],
            });
            console.log('web3 eth_signTypedData_v1', result);
        } catch (error) {
            console.log('web3 eth_signTypedData_v1', error);
        }
    };

    async web3_signTypedData_v3() {
        try {
            const accounts = await this.web3.eth.getAccounts();
            const result = await this.web3.currentProvider.request({
                method: 'eth_signTypedData_v3',
                params: [
                    accounts[0],
                    {
                        types: {
                            EIP712Domain: [
                                { name: 'name', type: 'string' },
                                { name: 'version', type: 'string' },
                                { name: 'chainId', type: 'uint256' },
                                { name: 'verifyingContract', type: 'address' },
                            ],
                            Person: [
                                { name: 'name', type: 'string' },
                                { name: 'wallet', type: 'address' },
                            ],
                            Mail: [
                                { name: 'from', type: 'Person' },
                                { name: 'to', type: 'Person' },
                                { name: 'contents', type: 'string' },
                            ],
                        },
                        primaryType: 'Mail',
                        domain: {
                            name: 'Ether Mail',
                            version: '1',
                            chainId: 5,
                            verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
                        },
                        message: {
                            from: { name: 'Cow', wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826' },
                            to: { name: 'Bob', wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB' },
                            contents: 'Hello, Bob!',
                        },
                    },
                ],
            });
            console.log('web3 eth_signTypedData_v3', result);
        } catch (error) {
            console.log('web3 eth_signTypedData_v3', error);
        }
    };

    async web3_signTypedData_v4() {
        try {
            const accounts = await this.web3.eth.getAccounts();
            const result = await this.web3.currentProvider.request({
                method: 'eth_signTypedData_v4',
                params: [
                    accounts[0],
                    {
                        types: {
                            OrderComponents: [
                                { name: 'offerer', type: 'address' },
                                { name: 'zone', type: 'address' },
                                { name: 'offer', type: 'OfferItem[]' },
                                { name: 'consideration', type: 'ConsiderationItem[]' },
                                { name: 'orderType', type: 'uint8' },
                                { name: 'startTime', type: 'uint256' },
                                { name: 'endTime', type: 'uint256' },
                                { name: 'zoneHash', type: 'bytes32' },
                                { name: 'salt', type: 'uint256' },
                                { name: 'conduitKey', type: 'bytes32' },
                                { name: 'counter', type: 'uint256' },
                            ],
                            OfferItem: [
                                { name: 'itemType', type: 'uint8' },
                                { name: 'token', type: 'address' },
                                { name: 'identifierOrCriteria', type: 'uint256' },
                                { name: 'startAmount', type: 'uint256' },
                                { name: 'endAmount', type: 'uint256' },
                            ],
                            ConsiderationItem: [
                                { name: 'itemType', type: 'uint8' },
                                { name: 'token', type: 'address' },
                                { name: 'identifierOrCriteria', type: 'uint256' },
                                { name: 'startAmount', type: 'uint256' },
                                { name: 'endAmount', type: 'uint256' },
                                { name: 'recipient', type: 'address' },
                            ],
                            EIP712Domain: [
                                { name: 'name', type: 'string' },
                                { name: 'version', type: 'string' },
                                { name: 'chainId', type: 'uint256' },
                                { name: 'verifyingContract', type: 'address' },
                            ],
                        },
                        domain: {
                            name: 'Seaport',
                            version: '1.1',
                            chainId: 5,
                            verifyingContract: '0x00000000006c3852cbef3e08e8df289169ede581',
                        },
                        primaryType: 'OrderComponents',
                        message: {
                            offerer: '0x6fc702d32e6cb268f7dc68766e6b0fe94520499d',
                            zone: '0x0000000000000000000000000000000000000000',
                            offer: [
                                {
                                    itemType: '2',
                                    token: '0xd15b1210187f313ab692013a2544cb8b394e2291',
                                    identifierOrCriteria: '33',
                                    startAmount: '1',
                                    endAmount: '1',
                                },
                            ],
                            consideration: [
                                {
                                    itemType: '0',
                                    token: '0x0000000000000000000000000000000000000000',
                                    identifierOrCriteria: '0',
                                    startAmount: '9750000000000000',
                                    endAmount: '9750000000000000',
                                    recipient: '0x6fc702d32e6cb268f7dc68766e6b0fe94520499d',
                                },
                                {
                                    itemType: '0',
                                    token: '0x0000000000000000000000000000000000000000',
                                    identifierOrCriteria: '0',
                                    startAmount: '250000000000000',
                                    endAmount: '250000000000000',
                                    recipient: '0x66682e752d592cbb2f5a1b49dd1c700c9d6bfb32',
                                },
                            ],
                            orderType: '0',
                            startTime: '1669188008',
                            endTime: '115792089237316195423570985008687907853269984665640564039457584007913129639935',
                            zoneHash: '0x3000000000000000000000000000000000000000000000000000000000000000',
                            salt: '48774942683212973027050485287938321229825134327779899253702941089107382707469',
                            conduitKey: '0x0000000000000000000000000000000000000000000000000000000000000000',
                            counter: '0',
                        },
                    },
                ],
            });
            console.log('web3 eth_signTypedData_v4', result);
        } catch (error) {
            console.log('web3 eth_signTypedData_v4', error);
        }
    };

    async web3_sendTransaction() {
        try {
            const accounts = await this.web3.eth.getAccounts();
            const result = await this.web3.eth.sendTransaction({
                from: accounts[0],
                to: "0x39b2DeB155Ee6a5a23E172bE11744329e95Af6df",
                value: '1000000',
                data: '0x',
            });
            console.log('web3.eth.sendTransaction', result);
        } catch (error) {
            console.log('web3.eth.sendTransaction', error);
        }
    };

    async web3_wallet_switchEthereumChain(){
        try {
            const result = await this.web3.currentProvider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x61' }],
            });
            console.log('web3 wallet_switchEthereumChain', result);
        } catch (error) {
            console.log('web3 wallet_switchEthereumChain', error);
        }
    };


    // Call native
    init() {
        const chainInfo = EvmService.currentChainInfo;
        const env = Env.Dev;
        particleAuth.init(chainInfo, env);
    }

    async login() {
        const type = LoginType.Phone;
        const supportAuthType = [SupportAuthType.Email, SupportAuthType.Google, SupportAuthType.Apple, SupportAuthType.Discord];
        const result = await particleAuth.login(type, '', supportAuthType, undefined);
        if (result.status) {
            const userInfo = result.data;
            console.log(userInfo);
        } else {
            const error = result.data;
            console.log(error);
        }

    }

    async logout() {
        const result = await particleAuth.logout();
        if (result.status) {
            console.log(result.data);
        } else {
            const error = result.data;
            console.log(error);
        }
    }

    async fastLogout() {
        const result = await particleAuth.fastLogout();
        if (result.status) {
            console.log(result.data);
        } else {
            const error = result.data;
            console.log(error);
        }

    }

    async signMessage() {
        const message = 'Hello world!';
        const result = await particleAuth.signMessage(message);
        if (result.status) {
            const signedMessage = result.data;
            console.log(signedMessage);
        } else {
            const error = result.data;
            console.log(error);
        }
    }

    async signAndSendTransaction() {
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
            const result = await particleAuth.signAndSendTransaction(transaction);
            if (result.status) {
                const signature = result.data;
                console.log(signature);
            } else {
                const error = result.data;
                console.log(error);
            }
        } catch (error) {

        }
    }

    async signTypedData() {
        const typedData = "{\"types\":{\"OrderComponents\":[{\"name\":\"offerer\",\"type\":\"address\"},{\"name\":\"zone\",\"type\":\"address\"},{\"name\":\"offer\",\"type\":\"OfferItem[]\"},{\"name\":\"consideration\",\"type\":\"ConsiderationItem[]\"},{\"name\":\"orderType\",\"type\":\"uint8\"},{\"name\":\"startTime\",\"type\":\"uint256\"},{\"name\":\"endTime\",\"type\":\"uint256\"},{\"name\":\"zoneHash\",\"type\":\"bytes32\"},{\"name\":\"salt\",\"type\":\"uint256\"},{\"name\":\"conduitKey\",\"type\":\"bytes32\"},{\"name\":\"counter\",\"type\":\"uint256\"}],\"OfferItem\":[{\"name\":\"itemType\",\"type\":\"uint8\"},{\"name\":\"token\",\"type\":\"address\"},{\"name\":\"identifierOrCriteria\",\"type\":\"uint256\"},{\"name\":\"startAmount\",\"type\":\"uint256\"},{\"name\":\"endAmount\",\"type\":\"uint256\"}],\"ConsiderationItem\":[{\"name\":\"itemType\",\"type\":\"uint8\"},{\"name\":\"token\",\"type\":\"address\"},{\"name\":\"identifierOrCriteria\",\"type\":\"uint256\"},{\"name\":\"startAmount\",\"type\":\"uint256\"},{\"name\":\"endAmount\",\"type\":\"uint256\"},{\"name\":\"recipient\",\"type\":\"address\"}],\"EIP712Domain\":[{\"name\":\"name\",\"type\":\"string\"},{\"name\":\"version\",\"type\":\"string\"},{\"name\":\"chainId\",\"type\":\"uint256\"},{\"name\":\"verifyingContract\",\"type\":\"address\"}]},\"domain\":{\"name\":\"Seaport\",\"version\":\"1.1\",\"chainId\":5,\"verifyingContract\":\"0x00000000006c3852cbef3e08e8df289169ede581\"},\"primaryType\":\"OrderComponents\",\"message\":{\"offerer\":\"0x6fc702d32e6cb268f7dc68766e6b0fe94520499d\",\"zone\":\"0x0000000000000000000000000000000000000000\",\"offer\":[{\"itemType\":\"2\",\"token\":\"0xd15b1210187f313ab692013a2544cb8b394e2291\",\"identifierOrCriteria\":\"33\",\"startAmount\":\"1\",\"endAmount\":\"1\"}],\"consideration\":[{\"itemType\":\"0\",\"token\":\"0x0000000000000000000000000000000000000000\",\"identifierOrCriteria\":\"0\",\"startAmount\":\"9750000000000000\",\"endAmount\":\"9750000000000000\",\"recipient\":\"0x6fc702d32e6cb268f7dc68766e6b0fe94520499d\"},{\"itemType\":\"0\",\"token\":\"0x0000000000000000000000000000000000000000\",\"identifierOrCriteria\":\"0\",\"startAmount\":\"250000000000000\",\"endAmount\":\"250000000000000\",\"recipient\":\"0x66682e752d592cbb2f5a1b49dd1c700c9d6bfb32\"}],\"orderType\":\"0\",\"startTime\":\"1669188008\",\"endTime\":\"115792089237316195423570985008687907853269984665640564039457584007913129639935\",\"zoneHash\":\"0x3000000000000000000000000000000000000000000000000000000000000000\",\"salt\":\"48774942683212973027050485287938321229825134327779899253702941089107382707469\",\"conduitKey\":\"0x0000000000000000000000000000000000000000000000000000000000000000\",\"counter\":\"0\"}}";
        const version = "v4";
        const result = await particleAuth.signTypedData(typedData, version);
        if (result.status) {
            const signature = result.data;
            console.log(signature);
        } else {
            const error = result.data;
            console.log(error);
        }
    }

    async signTransaction() {
        // only support solana, not support evm
        const chainInfo = await particleAuth.getChainInfo();
        if (chainInfo.chain_name.toLowerCase() != 'solana') {
            console.log('signTransaction only supports solana');
            return;
        }
        const sender = await particleAuth.getAddress();
        const to = "";
        const amount = 1000;
        console.log('sender: ', sender);
        const transaction = await Helper.getSolanaTransaction(sender, to, amount);
        console.log('transaction:', transaction);
        const result = await particleAuth.signTransaction(transaction);
        if (result.status) {
            const signedTransaction = result.data;
            console.log(signedTransaction);
        } else {
            const error = result.data;
            console.log(error);
        }
    }

    async signAllTransactions() {
        // only support solana, not support evm
        const chainInfo = await particleAuth.getChainInfo();
        if (chainInfo.chain_name.toLowerCase() != 'solana') {
            console.log('signAllTransactions only supports solana');
            return;
        }
        const sender = await particleAuth.getAddress();
        const to = "";
        const amount = 1000;
        const mintAddress = "";
        const transaction1 = await Helper.getSolanaTransaction(sender, to, amount);
        const transaction2 = await Helper.getSplTokenTransaction(sender, to, amount, mintAddress);
        const transactions = [transaction1, transaction2];
        const result = await particleAuth.signAllTransactions(transactions);
        if (result.status) {
            const signedTransactions = result.data;
            console.log(signedTransactions);
        } else {
            const error = result.data;
            console.log(error);
        }
    }

    async setChaininfo() {
        const chainInfo = EvmService.currentChainInfo;
        const result = await particleAuth.setChainInfo(chainInfo);
        console.log(result);
    }

    async setChainInfoAsync() {
        const chainInfo = EvmService.currentChainInfo;
        const result = await particleAuth.setChainInfoAsync(chainInfo);
        console.log(result);
    }

    async setUserInfo() {
        const json = '';
        const result = await particleAuth.setUserInfo(json);
        console.log(result);
    }

    async getChainInfo() {
        const result = await particleAuth.getChainInfo();
        console.log(result);
    }

    async isLogin() {
        const result = await particleAuth.isLogin();

    }

    async isLoginAsync() {
        const result = await particleAuth.isLoginAsync();
        if (result.status) {
            const userInfo = result.data;
            console.log(userInfo);
        } else {
            const error = result.data;
            console.log(error);
        }
    }

    async getAddress() {
        const result = await particleAuth.getAddress();
        console.log(result);
    }

    async getUserInfo() {
        const result = await particleAuth.getUserInfo();
        console.log(result);
    }

    async openAccountAndSecurity() {
        const result = await particleAuth.openAccountAndSecurity();
        if (result.status) {
            console.log(result.data);
        } else {
            const error = result.data;
            console.log(error);
        }
    }

    setModalPresentStyle() {
        const style = iOSModalPresentStyle.FormSheet;
        particleAuth.setModalPresentStyle(style);
    }

    setMediumScreen() {
        const isMediumScreen = true;
        particleAuth.setMediumScreen(isMediumScreen);
    }

    setLanguage() {
        const language = Language.JA;
        particleAuth.setLanguage(language);
    }

    setDisplayWallet() {
        let isDisplayWallet = true;
        particleAuth.setDisplayWallet(isDisplayWallet);
    }

    setInterfaceStyle() {
        let style = UserInterfaceStyle.Light;
        particleAuth.setInterfaceStyle(style);
    }

    openWebWallet() {
        particleAuth.openWebWallet();
    }

    setSecurityAccountConfig() {
        const config = new SecurityAccountConfig(1, 2);
        particleAuth.setSecurityAccountConfig(config);
    }

    update(deltaTime: number) { }
}

