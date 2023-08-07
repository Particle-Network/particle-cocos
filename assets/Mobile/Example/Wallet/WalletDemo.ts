import { _decorator, Component, find, sys } from 'cc';
import * as particleWallet from '../../Core/particleWallet';
import { ToastManager } from '../Toast/ToastManager';
import { WalletType } from '../../Core/Models/WalletType';
import { BuyCryptoConfig, OpenBuyNetwork } from '../../Core/Models/BuyCryptoConfig';
import { Language } from '../../Core/Models/Language';
import { WalletDisplay } from '../../Core/Models/WalletDisplay';
import { BNBChain, Ethereum, Polygon } from '@particle-network/chains';


const { ccclass } = _decorator;

@ccclass('WalletDemo')
export class WalletDemo extends Component {

    start() {
        if (sys.os == sys.OS.IOS || sys.os == sys.OS.ANDROID) {
            particleWallet.registerAllScriptEvent();
        }
    }

    navigatorWallet() {
        const display = WalletDisplay.Token;
        particleWallet.navigatorWallet(display);
    }

    navigatorTokenReceive() {
        const tokenAddress = undefined;
        particleWallet.navigatorTokenReceive(tokenAddress);
    }

    navigatorTokenSend() {
        const tokenAddress = undefined;
        const toAddress = undefined;
        const amount = undefined;
        particleWallet.navigatorTokenSend(tokenAddress, toAddress, amount);
    }

    navigatorTokenTransactionRecords() {
        const tokenAddress = undefined;
        particleWallet.navigatorTokenTransactionRecords(tokenAddress);

    }

    navigatorNFTSend() {
        const mint = "";
        const receiverAddress = undefined;
        const tokenId = "";
        const amount = "1";
        particleWallet.navigatorNFTSend(mint, tokenId, receiverAddress, amount);
    }

    navigatorNFTDetails() {
        const mint = "";
        const tokenId = "";
        particleWallet.navigatorNFTDetails(mint, tokenId);
    }

    navigatorBuyCrypto() {
        // support no parameters
        // particleWallet.navigatorBuyCrypto();

        // also support pass public address, crypto symbol and so on.
        const config = new BuyCryptoConfig(undefined, "BNB", "USD", 1000, OpenBuyNetwork.BinanceSmartChain);
        // these are other parameters, they are optional.
        config.fixFiatCoin = true;
        config.fixCryptoCoin = true;
        config.fixFiatAmt = true;
        config.theme = "dark";
        config.language = Language.JA;
        particleWallet.navigatorBuyCrypto(config);
    }

    async navigatorLoginList() {
        const result = await particleWallet.navigatorLoginList();
        toastAndLog('navigatorLoginList', result)
    }

    navigatorSwap() {
        const fromTokenAddress = undefined;
        const toTokenAddress = undefined;
        const amount = undefined;
        particleWallet.navigatorSwap(fromTokenAddress, toTokenAddress, amount);
    }

    setShowTestNetwork() {
        const isShow = true;
        particleWallet.setShowTestNetwork(isShow);
    }

    setShowManageWallet() {
        const isShow = false;
        particleWallet.setShowManageWallet(isShow);
    }

    setSupportChain() {
        const chainInfos = [Ethereum, BNBChain, Polygon];
        particleWallet.setSupportChain(chainInfos);
    }

    setPayDisabled() {
        const disabled = true;
        particleWallet.setPayDisabled(disabled);
    }

    async getPayDisabled() {
        const result = await particleWallet.getPayDisabled();
        toastAndLog(result);
    }

    setSwapDisabled() {
        const disabled = true;
        particleWallet.setSwapDisabled(disabled);
    }

    async getSwapDisabled() {
        const result = await particleWallet.getSwapDisabled();
        toastAndLog(result);
    }

    async switchWallet() {
        const walletType = WalletType.MetaMask;
        const publicAddress = "";

        const result = await particleWallet.switchWallet(walletType, publicAddress);
        toastAndLog(result);

    }

    setSupportWalleConnect() {
        particleWallet.setSupportWalletConnect(false);
    }


    setDisplayTokenAddresses() {
        const tokenAddresses = ["", ""];
        particleWallet.setDisplayTokenAddresses(tokenAddresses);
    }

    setDisplayNFTContractAddresses() {
        const nftContractAddresses = ["", ""];
        particleWallet.setDisplayNFTContractAddresses(nftContractAddresses);
    }

    setPriorityTokenAddresses() {
        const tokenAddresses = ["", ""];
        particleWallet.setPriorityTokenAddresses(tokenAddresses);
    }

    setPriorityNFTContractAddresses() {
        const nftContractAddresses = ["", ""];
        particleWallet.setPriorityNFTContractAddresses(nftContractAddresses);
    }

    setShowLanguageSetting() {
        particleWallet.setShowLanguageSetting(false);
    }

    setShowAppearanceSetting() {
        particleWallet.setShowAppearanceSetting(false);
    }

    setSupportAddToken() {
        particleWallet.setSupportAddToken(false);
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

