import { native, sys } from "cc";
import { EventEmitter } from 'eventemitter3';
import { ChainInfo } from "./Models/ChainInfo";
import { Env, LoginType, SupportAuthType, iOSModalPresentStyle } from "./Models/LoginInfo";
import { Language } from "./Models/Language";
import { UserInterfaceStyle } from "./Models/UserInterfaceStyle";
import { SecurityAccountConfig } from "./Models/SecurityAccountConfig";

    const ee = new EventEmitter();

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
        ee.emit("loginCallback", json);
        console.log("loginCallback: " + json);
    }
    function _logoutCallback(json: string): void {
        ee.emit("logoutCallback", json);
        console.log("logoutCallback: " + json);
    }
    function _fastLogoutCallback(json: string): void {
        ee.emit("fastLogoutCallback", json);
        console.log("fastLogoutCallback: " + json);
    }

    function _setChainInfoCallback(json: string): void {
        ee.emit("setChainInfoCallback", json);
        console.log("setChainInfoCallback: " + json);
    }

    function _setChainInfoAsyncCallback(json: string): void {
        ee.emit("setChainInfoAsyncCallback", json);
        console.log("setChainInfoAsyncCallback: " + json);
    }

    function _signMessageCallback(json: string): void {
        ee.emit("signMessageCallback", json);
        console.log("signMessageCallback: " + json);
    }

    function _signTypedDataCallback(json: string): void {
        ee.emit("signTypedDataCallback", json);
        console.log("signTypedDataCallback: " + json);
    }

    function _signAndSendTransactionCallback(json: string): void {
        ee.emit("signAndSendTransactionCallback", json);
        console.log("signAndSendTransactionCallback: " + json);
    }
    function _signTransactionCallback(json: string): void {
        ee.emit("signTransactionCallback", json);
        console.log("signTransactionCallback: " + json);
    }
    function _signAllTransactionsCallback(json: string): void {
        ee.emit("signAllTransactionsCallback", json);
        console.log("signAllTransactionsCallback: " + json);
    }
    function _getChainInfoCallback(json: string): void {
        ee.emit("getChainInfoCallback", json);
        console.log("getChainInfoCallback: " + json);
    }

    function _isLoginCallback(json: string): void {
        ee.emit("isLoginCallback", json);
        console.log("isLoginCallback: " + json);
    }

    function _isLoginAsyncCallback(json: string): void {
        ee.emit("isLoginAsyncCallback", json);
        console.log("isLoginAsyncCallback: " + json);
    }

    function _getAddressCallback(json: string): void {
        ee.emit("getAddressCallback", json);
        console.log("getAddressCallback: " + json);
    }

    function _getUserInfoCallback(json: string): void {
        ee.emit("getUserInfoCallback", json);
        console.log("getUserInfoCallback: " + json);
    }
    function _setUserInfoCallback(json: string): void {
        ee.emit("setUserInfoCallback", json);
        console.log("setUserInfoCallback: " + json);
    }

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

    export function login(type?: LoginType, account?: string, supportAuthTypes: SupportAuthType[] = [SupportAuthType.All], loginFormMode: boolean = false): Promise<any> {
        const obj = {
            login_type: type,
            account: account,
            support_auth_type_values: supportAuthTypes,
            login_form_mode: loginFormMode,
        };
        const json = JSON.stringify(obj);
        
        return new Promise((resolve, reject) => {
            ee.removeAllListeners("loginCallback");
            ee.once("loginCallback", (result: string) => {
                 resolve(JSON.parse(result));
            });
            native.jsbBridgeWrapper.dispatchEventToNative("login", json);
        });
        
    }

    export function logout() : Promise<any> {
        return new Promise((resolve, reject) => {
            ee.removeAllListeners("logoutCallback");
            ee.once("logoutCallback", (result: string) => {
                 resolve(JSON.parse(result));
            });
            native.jsbBridgeWrapper.dispatchEventToNative("logout", "");
        });
    }

    export function fastLogout() : Promise<any> {
        return new Promise((resolve, reject) => {
            ee.removeAllListeners("fastLogoutCallback");
            ee.once("fastLogoutCallback", (result: string) => {
                 resolve(JSON.parse(result));
            });
            native.jsbBridgeWrapper.dispatchEventToNative("fastLogout", "");
        });
    }

    export function signMessage(message: string) : Promise<any> {
        return new Promise((resolve, reject) => {
            ee.removeAllListeners("signMessageCallback");
            ee.once("signMessageCallback", (result: string) => {
                 resolve(JSON.parse(result));
            });
            native.jsbBridgeWrapper.dispatchEventToNative("signMessage", "");
        });
    }

    export function signAndSendTransaction(transaction: string)  : Promise<any> {
        return new Promise((resolve, reject) => {
            ee.removeAllListeners("signAndSendTransactionCallback");
            ee.once("signAndSendTransactionCallback", (result: string) => {
                 resolve(JSON.parse(result));
            });
            native.jsbBridgeWrapper.dispatchEventToNative("signAndSendTransaction", transaction);
        });
        
    }

    export function signTypedData(typedData: string, version: string) : Promise<any> {
        const obj = { message: typedData, version: version };
        const json = JSON.stringify(obj);
       
        return new Promise((resolve, reject) => {
            ee.removeAllListeners("signTypedDataCallback");
            ee.once("signTypedDataCallback", (result: string) => {
                 resolve(JSON.parse(result));
            });
            native.jsbBridgeWrapper.dispatchEventToNative("signTypedData", json);
        });
    }

    /**
     * Only support solana, not support evm.
     * @param transaction 
     */
    export function signTransaction(transaction: string)  : Promise<any>{
        return new Promise((resolve, reject) => {
            ee.removeAllListeners("signTransactionCallback");
            ee.once("signTransactionCallback", (result: string) => {
                 resolve(JSON.parse(result));
            });
            native.jsbBridgeWrapper.dispatchEventToNative("signTransaction", transaction);
        });
    }

    /**
     * Only support solana, not support evm.
     * @param transactions 
     */
    export function signAllTransactions(transactions: string[]): Promise<any> {
        const json = JSON.stringify(transactions);
       
        return new Promise((resolve, reject) => {
            ee.removeAllListeners("signAllTransactionsCallback");
            ee.once("signAllTransactionsCallback", (result: string) => {
                 resolve(JSON.parse(result));
            });
            native.jsbBridgeWrapper.dispatchEventToNative("signAllTransactions", json);
        });
    }

    export function setChainInfo(chainInfo: ChainInfo): Promise<any>{
        const obj = {
            chain_name: chainInfo.chain_name,
            chain_id: chainInfo.chain_id,
            chain_id_name: chainInfo.chain_id_name,
        };
        const json = JSON.stringify(obj);

        return new Promise((resolve, reject) => {
            ee.removeAllListeners("setChainInfoCallback");
            ee.once("setChainInfoCallback", (result: string) => {
                 resolve(JSON.parse(result));
            });
            native.jsbBridgeWrapper.dispatchEventToNative("setChainInfo", json);
        });
    }

    export function setChainInfoAsync(chainInfo: ChainInfo) : Promise<any>{
        const obj = {
            chain_name: chainInfo.chain_name,
            chain_id: chainInfo.chain_id,
            chain_id_name: chainInfo.chain_id_name,
        };
        const json = JSON.stringify(obj);
        

        return new Promise((resolve, reject) => {
            ee.removeAllListeners("setChainInfoAsyncCallback");
            ee.once("setChainInfoAsyncCallback", (result: string) => {
                 resolve(JSON.parse(result));
            });
            native.jsbBridgeWrapper.dispatchEventToNative("setChainInfoAsync", json);
        });

    }

    export function setUserInfo(jsonString: string) : Promise<any>{

        return new Promise((resolve, reject) => {
            ee.removeAllListeners("setUserInfoCallback");
            ee.once("setUserInfoCallback", (result: string) => {
                 resolve(JSON.parse(result));
            });
            native.jsbBridgeWrapper.dispatchEventToNative("setUserInfo", jsonString);
        });
    }

    export function getChainInfo() : Promise<ChainInfo>{

        return new Promise((resolve, reject) => {
            ee.removeAllListeners("getChainInfoCallback");
            ee.once("getChainInfoCallback", (result: string) => {
                 resolve(JSON.parse(result) as ChainInfo);
            });
            native.jsbBridgeWrapper.dispatchEventToNative("getChainInfo", "");
        });
    }

    export function isLogin(): Promise<boolean> {

        return new Promise((resolve, reject) => {
            ee.removeAllListeners("isLoginCallback");
            ee.once("isLoginCallback", (result: string) => {
                 resolve(result == "1");
            });
            native.jsbBridgeWrapper.dispatchEventToNative("isLogin", "");
        });
    }

    export function isLoginAsync(): Promise<any> {
        return new Promise((resolve, reject) => {
            ee.removeAllListeners("isLoginAsyncCallback");
            ee.once("isLoginAsyncCallback", (result: string) => {
                 resolve(JSON.parse(result));
            });
            native.jsbBridgeWrapper.dispatchEventToNative("isLoginAsync", "");
        });
    }

    export function getAddress(): Promise<string> {
        return new Promise((resolve, reject) => {
            ee.removeAllListeners("getAddressCallback");
            ee.once("getAddressCallback", (result: string) => {
                 resolve(result);
            });
            native.jsbBridgeWrapper.dispatchEventToNative("getAddress", "");
        });
    }

    export function getUserInfo() : Promise<any>{
        return new Promise((resolve, reject) => {
            ee.removeAllListeners("getUserInfoCallback");
            ee.once("getUserInfoCallback", (result: string) => {
                 resolve(JSON.parse(result));
            });
            native.jsbBridgeWrapper.dispatchEventToNative("getUserInfo", "");
        });
    }

    export function openAccountAndSecurity() : Promise<any> {
        return new Promise((resolve, reject) => {
            ee.removeAllListeners("openAccountAndSecurityCallback");
            ee.once("openAccountAndSecurityCallback", (result: string) => {
                 resolve(JSON.parse(result));
            });
            native.jsbBridgeWrapper.dispatchEventToNative("openAccountAndSecurity", "");
        });
        
    }

    export function setModalPresentStyle(style: iOSModalPresentStyle) {
        if (sys.OS.IOS === sys.os) {
            native.jsbBridgeWrapper.dispatchEventToNative("setModalPresentStyle", style);
        }
    }

    export function setMediumScreen(isMediumScreen: boolean) {

        if (sys.OS.IOS === sys.os) {
            native.jsbBridgeWrapper.dispatchEventToNative("setMediumScreen", isMediumScreen ? "1" : "0");
        }
    }

    export function setLanguage(language: Language) {
        native.jsbBridgeWrapper.dispatchEventToNative("setLanguage", language);
    }

    export function setDisplayWallet(isDisplayWallet: boolean) {
        native.jsbBridgeWrapper.dispatchEventToNative("setDisplayWallet", isDisplayWallet ? "1" : "0");
    }

    export function setInterfaceStyle(style: UserInterfaceStyle) {
        native.jsbBridgeWrapper.dispatchEventToNative("setInterfaceStyle", style);
    }

    export function openWebWallet() {
        native.jsbBridgeWrapper.dispatchEventToNative("openWebWallet", "");
    }

    export function setSecurityAccountConfig(config: SecurityAccountConfig) {
        const obj = {
            prompt_setting_when_sign: config.promptSettingWhenSign,
            prompt_master_password_setting_when_login: config.promptMasterPasswordSettingWhenLogin,
        };
        const json = JSON.stringify(obj);
        native.jsbBridgeWrapper.dispatchEventToNative("setSecurityAccountConfig", json);
    }

