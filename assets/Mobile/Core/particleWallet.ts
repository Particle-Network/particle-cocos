import { native, sys, EventTarget } from "cc";
import { ChainInfo } from "./Models/ChainInfo";
import { Language } from "./Models/Language";
import { WalletDisplay } from "./Models/WalletDisplay";
import { WalletType } from "./Models/WalletType";
import { BuyCryptoConfig } from "./Models/BuyCryptoConfig";
import { FiatCoin } from "./Models/FiatCoin";

const event = new EventTarget();

export function registerAllScriptEvent() {

    native.jsbBridgeWrapper.addNativeEventListener("getEnableSwapCallback", (json: string) => {
        _getEnableSwapCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("getEnablePayCallback", (json: string) => {
        _getEnablePayCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("navigatorLoginListCallback", (json: string) => {
        _navigatorLoginListCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("switchWalletCallback", (json: string) => {
        _switchWalletCallback(json);
    });
}

// Event call back
function _getEnableSwapCallback(json: string): void {
    event.emit("getEnableSwapCallback", json);
    console.log("getEnableSwapCallback: " + json);
}

function _getEnablePayCallback(json: string): void {
    event.emit("getEnablePayCallback", json);
    console.log("getEnablePayCallback: " + json);
}

function _navigatorLoginListCallback(json: string): void {
    event.emit("navigatorLoginListCallback", json);
    console.log("navigatorLoginListCallback: " + json);
}

function _switchWalletCallback(json: string): void {
    event.emit("switchWalletCallback", json);
    console.log("switchWalletCallback: " + json);
}

/**
 * Navigator wallet page
 * @param display Wallet display
 */
export function navigatorWallet(display: WalletDisplay) {
    native.jsbBridgeWrapper.dispatchEventToNative("navigatorWallet", display.toString());
}

export function createSelectedWallet(publicAddress: string, walletType: WalletType) {
    if (sys.OS.ANDROID === sys.os) {
        const obj = { wallet_type: walletType, public_address: publicAddress };
        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("createSelectedWallet", json);
    }
}

/**
 * Navigator token receive page
 * @param tokenAddress Optional, token address
 */
export function navigatorTokenReceive(tokenAddress?: string) {
    native.jsbBridgeWrapper.dispatchEventToNative("navigatorTokenReceive", tokenAddress);
}

/**
 * Navigator token send page
 * @param tokenAddress Optional, token address
 * @param toAddress Optional, receiver address
 * @param amount Optional, amount, require the minimum unit.
 */
export function navigatorTokenSend(tokenAddress?: string, toAddress?: string, amount?: string) {
    const obj = { token_address: tokenAddress, to_address: toAddress, amount: amount };
    const json = JSON.stringify(obj);
    native.jsbBridgeWrapper.dispatchEventToNative("navigatorTokenSend", json);
}

/**
 * Navigator token transaction records page
 * @param tokenAddress Optional, token address
 */
export function navigatorTokenTransactionRecords(tokenAddress?: string) {
    native.jsbBridgeWrapper.dispatchEventToNative("navigatorTokenTransactionRecords", tokenAddress);
}

/**
 * Navigator NFT send page
 * 
 * @param mint NFT contract/mint address
 * @param tokenId NFT token id, for solana nft, pass ""
 * @param receiverAddress Optional, receiver address
 * @param amount Optional, for solana nft, pass null, for erc721 nft, it is a useless parameter, pass null, for erc1155 nft, you can pass amount string, such as "1", "100", "10000", require the minimum unit.
 */
export function navigatorNFTSend(mint: string, tokenId: string, receiverAddress?: string, amount?: string) {
    const obj = { mint: mint, receiver_address: receiverAddress, token_id: tokenId, amount: amount };
    const json = JSON.stringify(obj);
    native.jsbBridgeWrapper.dispatchEventToNative("navigatorNFTSend", json);
}

/**
 * Navigator NFT details page
 * @param mint NFT contract/mint address
 * @param tokenId NFT token id, for solana nft, pass ""
 */
export function navigatorNFTDetails(mint: string, tokenId: string) {
    const obj = { mint: mint, token_id: tokenId };
    const json = JSON.stringify(obj);
    native.jsbBridgeWrapper.dispatchEventToNative("navigatorNFTDetails", json);
}

/**
 * Navigator buy crypto page
 */
export function navigatorBuyCrypto(config?: BuyCryptoConfig) {
    if (config != null) {
        const obj = {
            wallet_address: config.walletAddres,
            network: config.network,
            crypto_coin: config.cryptoCoin,
            fiat_coin: config.fiatCoin,
            fiat_amt: config.fiatAmt,
            fix_fiat_coin: config.fixFiatCoin,
            fix_fiat_amt: config.fixFiatAmt,
            fix_crypto_coin: config.fixCryptoCoin,
            theme: config.theme,
            language: config.language
        }
        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("navigatorBuyCrypto", json);
    } else {
        native.jsbBridgeWrapper.dispatchEventToNative("navigatorBuyCrypto", "");
    }

}

/**
 * Navigator login list page
 * @returns  Result, account or eror
 */
export function navigatorLoginList(): Promise<any> {
    return callEventOnce("navigatorLoginList", "").then(result => {
        return JSON.parse(result);
    })
}

/**
 * Navigatro Swap page
 * @param fromTokenAddress Optional, from token address
 * @param toTokenAddress Optional, to token address
 * @param amount Optional, amount, decimal digits example "10000", "100", require the minimum unit.
 */
export function navigatorSwap(fromTokenAddress?: string, toTokenAddress?: string, amount?: string) {
    const obj = { from_token_address: fromTokenAddress, to_token_address: toTokenAddress, amount: amount }
    const json = JSON.stringify(obj);
    native.jsbBridgeWrapper.dispatchEventToNative("navigatorSwap", json);
}

/**
 * Show test network, default is false
 * @param isShow 
 */
export function showTestNetwork(isShow: boolean) {
    native.jsbBridgeWrapper.dispatchEventToNative("showTestNetwork", isShow ? "1" : "0");
}

/**
 * Show manage wallet page, default is true
 * @param isShow 
 */
export function showManageWallet(isShow: boolean) {
    native.jsbBridgeWrapper.dispatchEventToNative("showManageWallet", isShow ? "1" : "0");
}

/**
 * Support chainInfos
 * @param chainInfos ChainInfos
 */
export function supportChain(chainInfos: ChainInfo[]) {
    const json = JSON.stringify(chainInfos);
    native.jsbBridgeWrapper.dispatchEventToNative("supportChain", json);
}

/**
 * Enable pay feature, pay feature is default enable.
 * @param isEnable 
 */
export function enablePay(isEnable: boolean) {
    native.jsbBridgeWrapper.dispatchEventToNative("enablePay", isEnable ? "1" : "0");
}

/**
 * Get pay feature state
 * @returns Trus if enable, otherwise false
 */
export function getEnablePay() {
    return callEventOnce("getEnablePay", "");
}

/**
 * Enable swap feature, swap feature is default enable.
 * @param isEnable 
 */
export function enableSwap(isEnable: boolean) {
    native.jsbBridgeWrapper.dispatchEventToNative("enableSwap", isEnable ? "1" : "0");
}

/**
 * Get swap feature state
 * @returns Trus if enable, otherwise false
 */
export function getEnableSwap() {
    return callEventOnce("getEnableSwap", "");
}

/**
 * Switch wallet, tell GUI which wallet show when open
 * @param walletType Wallet type
 * @param publicAddress Public address
 * @returns Result
 */
export function switchWallet(walletType: string, publicAddress: string): Promise<boolean> {
    const obj = { wallet_type: walletType, public_address: publicAddress };
    const json = JSON.stringify(obj);

    return callEventOnce("switchWallet", json).then(result => {
        return JSON.parse(result);
    })
}

/**
 * Set wallet page language
 * @param language Language
 */
export function setLanguage(language: Language) {
    native.jsbBridgeWrapper.dispatchEventToNative("walletSetLanguage", language);
}

/**
 * Set wallet if support wallet connect as a wallet
 * not support for now, coming soon.
 * @param isEnable 
 */
export function supportWalletConnect(isEnable: boolean) {
    native.jsbBridgeWrapper.dispatchEventToNative("supportWalletConnect", isEnable ? "1" : "0");
}

/**
 * Set fait coin
 * @param fiatCoin FiatCoin
 */
export function setFiatCoin(fiatCoin: FiatCoin) {
    if (sys.OS.IOS === sys.os) {
        native.jsbBridgeWrapper.dispatchEventToNative("setFiatCoin", fiatCoin);
    }
}

/**
 * Set display token addresses
 * 
 * If you called this method, Wallet SDK will only show these tokens in the token addresses.
 * @param tokenAddresses TokenAddress array
 */
export function setDisplayTokenAddresses(tokenAddresses: string[]) {
    const json = JSON.stringify(tokenAddresses);
    native.jsbBridgeWrapper.dispatchEventToNative("setDisplayTokenAddresses", json);
}

/**
 * Set display NFT contract addresses
 * 
 * If you called this method, Wallet SDK will only show NFTs in the NFT contract addresses.
 * @param nftContractAddresses 
 */
export function setDisplayNFTContractAddresses(nftContractAddresses: string[]) {
    const json = JSON.stringify(nftContractAddresses);
    native.jsbBridgeWrapper.dispatchEventToNative("setDisplayNFTContractAddresses", json);
}

/**
 * Set priority token addresses
 * 
 * If you called this method, Wallet SDK will show these tokens in top part of the list.
 * @param tokenAddresses TokenAddress array
 */
export function setPriorityTokenAddresses(tokenAddresses: string[]) {
    const json = JSON.stringify(tokenAddresses);
    native.jsbBridgeWrapper.dispatchEventToNative("setPriorityTokenAddresses", json);
}

/**
 * Set priority NFT contract addresses
 * 
 * If you called this method, Wallet SDK will only show NFTs in top part of list.
 * @param nftContractAddresses 
 */
export function setPriorityNFTContractAddresses(nftContractAddresses: string[]) {
    const json = JSON.stringify(nftContractAddresses);
    native.jsbBridgeWrapper.dispatchEventToNative("setPriorityNFTContractAddresses", json);
}

/**
 * Set show language setting button in setting page
 * @param isShow default value is false
 */
export function showLanguageSetting(isShow: boolean) {
    native.jsbBridgeWrapper.dispatchEventToNative("showLanguageSetting", isShow ? "1" : "0");
}

/**
 * Set show appearance setting button in setting page
 * @param isShow default value is false
 */
export function showAppearanceSetting(isShow: boolean) {
    native.jsbBridgeWrapper.dispatchEventToNative("showAppearanceSetting", isShow ? "1" : "0");
}

/**
 * Set support add token, true will show add token button, false will hide add token button.
 * @param isShow default value is true
 */
export function setSupportAddToken(isShow: boolean) {
    native.jsbBridgeWrapper.dispatchEventToNative("setSupportAddToken", isShow ? "1" : "0");
}

function callEventOnce(eventName: string, json: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        event.off(eventName + "Callback");
        event.once(eventName + "Callback", (result: string) => {
            resolve(result);
        });
        native.jsbBridgeWrapper.dispatchEventToNative(eventName, json);
    });
}