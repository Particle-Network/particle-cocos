import { native, sys, EventTarget } from "cc";
import type { ChainInfo } from '@particle-network/chains';
import { chains } from '@particle-network/chains';

import { WalletDisplay } from "./Models/WalletDisplay";
import { WalletType } from "./Models/WalletType";
import { BuyCryptoConfig } from "./Models/BuyCryptoConfig";


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
    // todo
}

/**
 * Navigator login list page
 * @returns  Result, account or eror
 */
export async function navigatorLoginList(): Promise<any> {
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
export function setShowTestNetwork(isShow: boolean) {
    native.jsbBridgeWrapper.dispatchEventToNative("setShowTestNetwork", isShow ? "1" : "0");
    // todo
}

/**
 * Show manage wallet page, default is true
 * @param isShow 
 */
export function setShowManageWallet(isShow: boolean) {
    native.jsbBridgeWrapper.dispatchEventToNative("setShowManageWallet", isShow ? "1" : "0");
    // todo
}

/**
 * Support chainInfos
 * @param chainInfos ChainInfos
 */
export function setSupportChain(chainInfos: ChainInfo[]) {
    const chainInfoObjects = chainInfos.map(info => ({
        chain_name: info.name,
        chain_id_name: info.network,
        chain_id: info.id,
    }));
    const json = JSON.stringify(chainInfoObjects);
    native.jsbBridgeWrapper.dispatchEventToNative("setSupportChain", json);
    // todo
}

/**
 * Set pay disabled, default value is false.
 * @param isEnable 
 */
export function setPayDisabled(disabled: boolean) {
    native.jsbBridgeWrapper.dispatchEventToNative("setPayDisabled", disabled ? "1" : "0");
    // todo
}

/**
 * Get pay disabled
 * @returns Trus if enable, otherwise false
 */
export function getPayDisabled() {
    return callEventOnce("getPayDisabled", "");
    // todo
}

/**
 * Set swap disabled, default value is false.
 * @param isEnable 
 */
export function setSwapDisabled(disabled: boolean) {
    native.jsbBridgeWrapper.dispatchEventToNative("setSwapDisabled", disabled ? "1" : "0");
    // todo
}

/**
 * Get swap disabled
 * @returns Trus if enable, otherwise false
 */
export function getSwapDisabled() {
    return callEventOnce("getSwapDisabled", "");
    // todo
}

/**
 * Switch wallet, tell GUI which wallet show when open
 * @param walletType Wallet type
 * @param publicAddress Public address
 * @returns Result
 */
export async function switchWallet(walletType: string, publicAddress: string): Promise<boolean> {
    const obj = { wallet_type: walletType, public_address: publicAddress };
    const json = JSON.stringify(obj);

    const result = await callEventOnce("switchWallet", json);
    return JSON.parse(result);
}

/**
 * Set wallet if support wallet connect as a wallet
 * not support for now, coming soon.
 * @param isEnable 
 */
export function setSupportWalletConnect(isEnable: boolean) {
    native.jsbBridgeWrapper.dispatchEventToNative("setSupportWalletConnect", isEnable ? "1" : "0");
    // todo
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
export function setShowLanguageSetting(isShow: boolean) {
    native.jsbBridgeWrapper.dispatchEventToNative("setShowLanguageSetting", isShow ? "1" : "0");
    // todo
}

/**
 * Set show appearance setting button in setting page
 * @param isShow default value is false
 */
export function setShowAppearanceSetting(isShow: boolean) {
    native.jsbBridgeWrapper.dispatchEventToNative("setShowAppearanceSetting", isShow ? "1" : "0");
    // todo
}

/**
 * Set support add token, true will show add token button, false will hide add token button.
 * @param isShow default value is true
 */
export function setSupportAddToken(isShow: boolean) {
    native.jsbBridgeWrapper.dispatchEventToNative("setSupportAddToken", isShow ? "1" : "0");
    // todo
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