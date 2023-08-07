import { native, sys, EventTarget } from "cc";
import { Env, LoginAuthorization, LoginType, SocialLoginPrompt, SupportAuthType, iOSModalPresentStyle } from "./Models/LoginInfo";
import { Language } from "./Models/Language";
import { Appearance } from "./Models/Appearance";
import { SecurityAccountConfig } from "./Models/SecurityAccountConfig";
import { FiatCoin } from "./Models/FiatCoin";
import { ChainInfo } from "./Models/ChainInfo";

const event = new EventTarget();

export function registerAllScriptEvent() {

    native.jsbBridgeWrapper.addNativeEventListener("loginCallback", (json: string) => {
        _loginCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("logoutCallback", (json: string) => {
        _logoutCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("fastLogoutCallback", (json: string) => {
        _fastLogoutCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("setChainInfoCallback", (json: string) => {
        _setChainInfoCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("setChainInfoAsyncCallback", (json: string) => {
        _setChainInfoAsyncCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("signMessageCallback", (signature: string) => {
        _signMessageCallback(signature);
    });

    native.jsbBridgeWrapper.addNativeEventListener("signTypedDataCallback", (signature: string) => {
        _signTypedDataCallback(signature);
    });

    native.jsbBridgeWrapper.addNativeEventListener("signAndSendTransactionCallback", (signature: string) => {
        _signAndSendTransactionCallback(signature);
    });

    native.jsbBridgeWrapper.addNativeEventListener("signTransactionCallback", (signature: string) => {
        _signTransactionCallback(signature);
    });

    native.jsbBridgeWrapper.addNativeEventListener("signAllTransactionsCallback", (signature: string) => {
        _signAllTransactionsCallback(signature);
    });

    native.jsbBridgeWrapper.addNativeEventListener("getChainInfoCallback", (json: string) => {
        _getChainInfoCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("isLoginCallback", (json: string) => {
        _isLoginCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("isLoginAsyncCallback", (json: string) => {
        _isLoginAsyncCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("getAddressCallback", (address: string) => {
        _getAddressCallback(address);
    });

    native.jsbBridgeWrapper.addNativeEventListener("getUserInfoCallback", (json: string) => {
        _getUserInfoCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("setUserInfoCallback", (status: string) => {
        _setUserInfoCallback(status);
    });

}

// Event call back
function _loginCallback(json: string): void {
    event.emit("loginCallback", json);
    console.log("loginCallback: " + json);
}

function _logoutCallback(json: string): void {
    event.emit("logoutCallback", json);
    console.log("logoutCallback: " + json);
}

function _fastLogoutCallback(json: string): void {
    event.emit("fastLogoutCallback", json);
    console.log("fastLogoutCallback: " + json);
}

function _setChainInfoCallback(json: string): void {
    event.emit("setChainInfoCallback", json);
    console.log("setChainInfoCallback: " + json);
}

function _setChainInfoAsyncCallback(json: string): void {
    event.emit("setChainInfoAsyncCallback", json);
    console.log("setChainInfoAsyncCallback: " + json);
}

function _signMessageCallback(json: string): void {
    event.emit("signMessageCallback", json);
    console.log("signMessageCallback: " + json);
}

function _signTypedDataCallback(json: string): void {
    event.emit("signTypedDataCallback", json);
    console.log("signTypedDataCallback: " + json);
}

function _signAndSendTransactionCallback(json: string): void {
    event.emit("signAndSendTransactionCallback", json);
    console.log("signAndSendTransactionCallback: " + json);
}
function _signTransactionCallback(json: string): void {
    event.emit("signTransactionCallback", json);
    console.log("signTransactionCallback: " + json);
}
function _signAllTransactionsCallback(json: string): void {
    event.emit("signAllTransactionsCallback", json);
    console.log("signAllTransactionsCallback: " + json);
}
function _getChainInfoCallback(json: string): void {
    event.emit("getChainInfoCallback", json);
    console.log("getChainInfoCallback: " + json);
}

function _isLoginCallback(json: string): void {
    event.emit("isLoginCallback", json);
    console.log("isLoginCallback: " + json);
}

function _isLoginAsyncCallback(json: string): void {
    event.emit("isLoginAsyncCallback", json);
    console.log("isLoginAsyncCallback: " + json);
}

function _getAddressCallback(json: string): void {
    event.emit("getAddressCallback", json);
    console.log("getAddressCallback: " + json);
}

function _getUserInfoCallback(json: string): void {
    event.emit("getUserInfoCallback", json);
    console.log("getUserInfoCallback: " + json);
}
function _setUserInfoCallback(json: string): void {
    event.emit("setUserInfoCallback", json);
    console.log("setUserInfoCallback: " + json);
}


/**
 * Init Particle Auth SDK
 * @param chainInfo ChainInfo
 * @param env Env
 */
export function init(chainInfo: ChainInfo, env: Env) {

    const obj = {
        chain_name: chainInfo.name,
        chain_id: chainInfo.id,
        chain_id_name: chainInfo.network,
        env: env,
    };
    const json = JSON.stringify(obj);
    native.jsbBridgeWrapper.dispatchEventToNative("initialize", json);

}

/**
 * Login Particle Auth Service
 * @param type Login type, support phone, email, json web token, google, apple and more.
 * @param account When login type is email, phone or jwt, you could pass email address, phone number or jwt.
 * @param supportAuthType Controls whether third-party login buttons are displayed. default will show all third-party login buttons.
 * @param socialLoginPrompt Social login prompt, optional.
 * @param authorization message:evm->hex sign message . solana is base58, uniq:unique sign,only support evm
 * @returns Result, userinfo or error
 */
export function login(type?: LoginType, account?: string, supportAuthTypes: SupportAuthType[] = [SupportAuthType.All], socialLoginPrompt?: SocialLoginPrompt,
    authorization?: LoginAuthorization): Promise<any> {
    const obj = {
        login_type: type,
        account: account,
        support_auth_type_values: supportAuthTypes,
        social_login_prompt: socialLoginPrompt,
        authorization: authorization,
    };
    const json = JSON.stringify(obj);

    return new Promise((resolve, reject) => {
        event.off("loginCallback");
        event.once("loginCallback", (result: string) => {
            resolve(JSON.parse(result));
        });
        native.jsbBridgeWrapper.dispatchEventToNative("login", json);
    });

}

/**
 * Logout
 * @returns Result, success or error
 */
export function logout(): Promise<any> {
    return new Promise((resolve, reject) => {
        event.off("logoutCallback");
        event.once("logoutCallback", (result: string) => {
            resolve(JSON.parse(result));
        });
        native.jsbBridgeWrapper.dispatchEventToNative("logout", "");
    });
}

/**
 * Fast logout, silently
 * @returns Result, success or error
 */
export function fastLogout(): Promise<any> {
    return new Promise((resolve, reject) => {
        event.off("fastLogoutCallback");
        event.once("fastLogoutCallback", (result: string) => {
            resolve(JSON.parse(result));
        });
        native.jsbBridgeWrapper.dispatchEventToNative("fastLogout", "");
    });
}

/**
 * Sign message
 * @param message Message that you want user to sign.
 * @returns Result, signed message or error
 */
export function signMessage(message: string): Promise<any> {
    return new Promise((resolve, reject) => {
        event.off("signMessageCallback");
        event.once("signMessageCallback", (result: string) => {
            resolve(JSON.parse(result));
        });
        native.jsbBridgeWrapper.dispatchEventToNative("signMessage", message);
    });
}

/**
 * Sign and send transaction
 * @param transaction Transaction that you want user to sign and send
 * @returns Result, signature or error
 */
export function signAndSendTransaction(transaction: string): Promise<any> {
    return new Promise((resolve, reject) => {
        event.off("signAndSendTransactionCallback");
        event.once("signAndSendTransactionCallback", (result: string) => {
            resolve(JSON.parse(result));
        });
        native.jsbBridgeWrapper.dispatchEventToNative("signAndSendTransaction", transaction);
    });

}

/**
 * Sign typed data, only evm chain support sign typed data!
 * @param typedData TypedData string
 * @param version TypedData version, support v1, v3, v4
 * @returns Result, signature or error
 */
export function signTypedData(typedData: string, version: string): Promise<any> {
    const obj = { message: typedData, version: version };
    const json = JSON.stringify(obj);

    return new Promise((resolve, reject) => {
        event.off("signTypedDataCallback");
        event.once("signTypedDataCallback", (result: string) => {
            resolve(JSON.parse(result));
        });
        native.jsbBridgeWrapper.dispatchEventToNative("signTypedData", json);
    });
}

/**
 * Sign transaction, only solana chain support!
 * @param transaction Transaction that you want user to sign.
 * @returns Result, signed transaction or error
 */
export function signTransaction(transaction: string): Promise<any> {
    return new Promise((resolve, reject) => {
        event.off("signTransactionCallback");
        event.once("signTransactionCallback", (result: string) => {
            resolve(JSON.parse(result));
        });
        native.jsbBridgeWrapper.dispatchEventToNative("signTransaction", transaction);
    });
}

/**
 * Sign all transactions, only solana chain support!
 * @param transactions Transactions that you want user to sign
 * @returns Result, signed transactions or error
 */
export function signAllTransactions(transactions: string[]): Promise<any> {
    const json = JSON.stringify(transactions);

    return new Promise((resolve, reject) => {
        event.off("signAllTransactionsCallback");
        event.once("signAllTransactionsCallback", (result: string) => {
            resolve(JSON.parse(result));
        });
        native.jsbBridgeWrapper.dispatchEventToNative("signAllTransactions", json);
    });
}

/**
 * Set chainInfo
 * @param chainInfo ChainInfo
 * @returns Result
 */
export function setChainInfo(chainInfo: ChainInfo): Promise<any> {
    const obj = {
        chain_name: chainInfo.name,
        chain_id: chainInfo.id,
        chain_id_name: chainInfo.network,
    };
    const json = JSON.stringify(obj);

    return new Promise((resolve, reject) => {
        event.off("setChainInfoCallback");
        event.once("setChainInfoCallback", (result: string) => {
            resolve(JSON.parse(result));
        });
        native.jsbBridgeWrapper.dispatchEventToNative("setChainInfo", json);
    });
}

/**
 * Set chainInfo async, because ParticleAuthService support both solana and evm, if switch to solana from evm, Auth Service will create a evm address if the user doesn't has a evm address.
 * @param chainInfo
 * @returns Result
 */
export function setChainInfoAsync(chainInfo: ChainInfo): Promise<any> {
    const obj = {
        chain_name: chainInfo.name,
        chain_id: chainInfo.id,
        chain_id_name: chainInfo.network,
    };
    const json = JSON.stringify(obj);


    return new Promise((resolve, reject) => {
        event.off("setChainInfoAsyncCallback");
        event.once("setChainInfoAsyncCallback", (result: string) => {
            resolve(JSON.parse(result));
        });
        native.jsbBridgeWrapper.dispatchEventToNative("setChainInfoAsync", json);
    });

}

/**
 * Get chainInfo
 * @returns ChainInfo
 */
export function getChainInfo(): Promise<ChainInfo> {

    return new Promise((resolve, reject) => {
        event.off("getChainInfoCallback");
        event.once("getChainInfoCallback", (result: string) => {
            resolve(JSON.parse(result) as ChainInfo);
        });
        native.jsbBridgeWrapper.dispatchEventToNative("getChainInfo", "");
    });
}

/**
 * Get chainId
 * @returns ChainId
 */
export async function getChainId(): Promise<number> {
    let chainInfo = await getChainInfo();
    return chainInfo.id;
}

/**
 * Is user logged in
 * @returns Result, if user is login return true, otherwise retrun false
 */
export function isLogin(): Promise<boolean> {

    return new Promise((resolve, reject) => {
        event.off("isLoginCallback");
        event.once("isLoginCallback", (result: string) => {
            resolve(result == "1");
        });
        native.jsbBridgeWrapper.dispatchEventToNative("isLogin", "");
    });
}

/**
 * Check is user login is valid from server
 * @returns Result, if user is valid, return userinfo, otherwise return error
 */
export function isLoginAsync(): Promise<any> {
    return new Promise((resolve, reject) => {
        event.off("isLoginAsyncCallback");
        event.once("isLoginAsyncCallback", (result: string) => {
            resolve(JSON.parse(result));
        });
        native.jsbBridgeWrapper.dispatchEventToNative("isLoginAsync", "");
    });
}

/**
 * Get public address
 * @returns Public address
 */
export function getAddress(): Promise<string> {
    return new Promise((resolve, reject) => {
        event.off("getAddressCallback");
        event.once("getAddressCallback", (result: string) => {
            resolve(result);
        });
        native.jsbBridgeWrapper.dispatchEventToNative("getAddress", "");
    });
}

/**
 * Get user info
 * @returns User info
 */
export function getUserInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
        event.off("getUserInfoCallback");
        event.once("getUserInfoCallback", (result: string) => {
            resolve(JSON.parse(result));
        });
        native.jsbBridgeWrapper.dispatchEventToNative("getUserInfo", "");
    });
}

/**
 * Open account and security page
 * use DeviceEventEmitter.addListener('securityFailedCallBack', this.securityFailedCallBack) get securityFailedCallBack
 */
export function openAccountAndSecurity(): Promise<any> {
    return new Promise((resolve, reject) => {
        event.off("openAccountAndSecurityCallback");
        event.once("openAccountAndSecurityCallback", (result: string) => {
            resolve(JSON.parse(result));
        });
        native.jsbBridgeWrapper.dispatchEventToNative("openAccountAndSecurity", "");
    });

}

/**
 * Set modal present style, only support iOS
 * @param style Modal present style
 */
export function setModalPresentStyle(style: iOSModalPresentStyle) {
    if (sys.OS.IOS === sys.os) {
        native.jsbBridgeWrapper.dispatchEventToNative("setModalPresentStyle", style);
    }
}

/**
 * Set medium screen, only support iOS 15.0 or later
 *
 * if you want a medium screen when present safari web view, call this method with true.
 * and don't call setModalPresentStyle with fullScreen.
 * @param isMediumScreen Is medium screen
 */
export function setMediumScreen(isMediumScreventn: boolean) {
    if (sys.OS.IOS === sys.os) {
        native.jsbBridgeWrapper.dispatchEventToNative("setMediumScreen", isMediumScreventn ? "1" : "0");
    }
}

/**
 * Set language
 * @param language Language
 */
export function setLanguage(language: Language) {
    native.jsbBridgeWrapper.dispatchEventToNative("setLanguage", language);
}

/**
 * Set fiat coin
 * @param fiatCoin FiatCoin
 */
export function setFiatCoin(fiatCoin: FiatCoin) {
    if (sys.OS.IOS === sys.os) {
        native.jsbBridgeWrapper.dispatchEventToNative("setFiatCoin", fiatCoin);
    }
}

/**
 * Set web auth config
 * @param displayWallet
 * @param appearance
 */
export function setWebAuthConfig(displayWallet: boolean, appearance: Appearance) {
    const obj = {
        display_wallet: displayWallet,
        appearance: appearance,
    };
    const json = JSON.stringify(obj);
    if (sys.OS.IOS === sys.os) {
        native.jsbBridgeWrapper.dispatchEventToNative("setWebAuthConfig", json);
    } else [
        // todo
    ]
    
}

/**
 * Set user interface style
 * @param style 
 */
export function setAppearance(style: Appearance) {
    native.jsbBridgeWrapper.dispatchEventToNative("setAppearance", style);
    // todo
}

/**
 * Open web wallet
 */
export function openWebWallet(webStyle?: string) {
    var json = webStyle ?? "";
    native.jsbBridgeWrapper.dispatchEventToNative("openWebWallet", json);
}

/**
 * Set security account config
 * @param config 
 */
export function setSecurityAccountConfig(config: SecurityAccountConfig) {
    const obj = {
        prompt_setting_when_sign: config.promptSettingWhenSign,
        prompt_master_password_setting_when_login: config.promptMasterPasswordSettingWhenLogin,
    };
    const json = JSON.stringify(obj);
    native.jsbBridgeWrapper.dispatchEventToNative("setSecurityAccountConfig", json);
}

