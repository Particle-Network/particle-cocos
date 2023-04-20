import { native, sys, EventTarget } from "cc";
import { ChainInfo } from "./Models/ChainInfo";
import { Env, LoginType, SupportAuthType, iOSModalPresentStyle } from "./Models/LoginInfo";
import { Language } from "./Models/Language";
import { UserInterfaceStyle } from "./Models/UserInterfaceStyle";
import { SecurityAccountConfig } from "./Models/SecurityAccountConfig";

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
        chain_name: chainInfo.chain_name,
        chain_id: chainInfo.chain_id,
        chain_id_name: chainInfo.chain_id_name,
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
 * @param loginFormMode Controls whether show light UI in web, default is false.
 * @returns Result, userinfo or error
 */
export function login(type?: LoginType, account?: string, supportAuthTypes: SupportAuthType[] = [SupportAuthType.All], loginFormMode: boolean = false): Promise<any> {
    const obj = {
        login_type: type,
        account: account,
        support_auth_type_values: supportAuthTypes,
        login_form_mode: loginFormMode,
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
        chain_name: chainInfo.chain_name,
        chain_id: chainInfo.chain_id,
        chain_id_name: chainInfo.chain_id_name,
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
        chain_name: chainInfo.chain_name,
        chain_id: chainInfo.chain_id,
        chain_id_name: chainInfo.chain_id_name,
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

export function setUserInfo(jsonString: string): Promise<any> {

    return new Promise((resolve, reject) => {
        event.off("setUserInfoCallback");
        event.once("setUserInfoCallback", (result: string) => {
            resolve(JSON.parse(result));
        });
        native.jsbBridgeWrapper.dispatchEventToNative("setUserInfo", jsonString);
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
 * Set if display wallet in web page.
 * @param isDisplay
 */
export function setDisplayWallet(isDisplayWallet: boolean) {
    native.jsbBridgeWrapper.dispatchEventToNative("setDisplayWallet", isDisplayWallet ? "1" : "0");
}

/**
 * Set user interface style
 * @param style 
 */
export function setInterfaceStyle(style: UserInterfaceStyle) {
    native.jsbBridgeWrapper.dispatchEventToNative("setInterfaceStyle", style);
}

/**
 * Open web wallet
 */
export function openWebWallet() {
    native.jsbBridgeWrapper.dispatchEventToNative("openWebWallet", "");
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

