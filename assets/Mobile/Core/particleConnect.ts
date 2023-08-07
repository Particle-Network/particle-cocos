import { native, sys, EventTarget } from "cc";
import type { ChainInfo } from '@particle-network/chains';
import { Env } from "./Models/LoginInfo";
import { DappMetaData } from "./Models/DappMetaData";
import { RpcUrl } from "./Models/RpcUrl";
import { WalletType } from "./Models/WalletType";
import { ParticleConnectConfig } from "./Models/ConnectConfig";

const event = new EventTarget();

export function registerAllScriptEvent() {

    native.jsbBridgeWrapper.addNativeEventListener("adapterGetAccountsCallback", (json: string) => {
        _adapterGetAccountsCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("adapterConnectCallback", (json: string) => {
        _adapterConnectCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("adapterDisconnectCallback", (json: string) => {
        _adapterDisconnectCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("adapterIsConnectedCallback", (json: string) => {
        _adapterIsConnectedCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("adapterSignMessageCallback", (signature: string) => {
        _adapterSignMessageCallback(signature);
    });

    native.jsbBridgeWrapper.addNativeEventListener("adapterSignAndSendTransactionCallback", (signature: string) => {
        _adapterSignAndSendTransactionCallback(signature);
    });

    native.jsbBridgeWrapper.addNativeEventListener("adapterSignTypedDataCallback", (signature: string) => {
        _adapterSignTypedDataCallback(signature);
    });

    native.jsbBridgeWrapper.addNativeEventListener("adapterSignTransactionCallback", (signature: string) => {
        _adapterSignTransactionCallback(signature);
    });

    native.jsbBridgeWrapper.addNativeEventListener("adapterSignAllTransactionsCallback", (signature: string) => {
        _adapterSignAllTransactionsCallback(signature);
    });

    native.jsbBridgeWrapper.addNativeEventListener("adapterImportWalletFromPrivateKeyCallback", (json: string) => {
        _adapterImportWalletFromPrivateKeyCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("adapterImportWalletFromMnemonicCallback", (json: string) => {
        _adapterImportWalletFromMnemonicCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("adapterExportPrivateKeyCallback", (json: string) => {
        _adapterExportPrivateKeyCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("adapterSignInWithEthereumCallback", (json: string) => {
        _adapterSignInWithEthereumCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("adapterVerifyCallback", (json: string) => {
        _adapterVerifyCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("adapterSwitchEthereumChainCallback", (json: string) => {
        _adapterSwitchEthereumChainCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("adapterAddEthereumChainCallback", (json: string) => {
        _adapterAddEthereumChainCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("adapterReconnectIfNeededCallback", (json: string) => {
        _adapterReconnectIfNeededCallback(json);
    });

    native.jsbBridgeWrapper.addNativeEventListener("adapterWalletReadyStateCallback", (json: string) => {
        _adapterWalletReadyStateCallback(json);
    });

}

// Event call back
function _adapterGetAccountsCallback(json: string): void {
    event.emit("adapterGetAccountsCallback", json);
    console.log("adapterGetAccountsCallback: " + json);
}

function _adapterConnectCallback(json: string): void {
    event.emit("adapterConnectCallback", json);
    console.log("adapterConnectCallback: " + json);
}

function _adapterDisconnectCallback(json: string): void {
    event.emit("adapterDisconnectCallback", json);
    console.log("adapterDisconnectCallback: " + json);
}

function _adapterIsConnectedCallback(json: string): void {
    event.emit("adapterIsConnectedCallback", json);
    console.log("adapterIsConnectedCallback: " + json);
}

function _adapterSignMessageCallback(json: string): void {
    event.emit("adapterSignMessageCallback", json);
    console.log("adapterSignMessageCallback: " + json);
}

function _adapterSignAndSendTransactionCallback(json: string): void {
    event.emit("adapterSignAndSendTransactionCallback", json);
    console.log("adapterSignAndSendTransactionCallback: " + json);
}

function _adapterSignTypedDataCallback(json: string): void {
    event.emit("adapterSignTypedDataCallback", json);
    console.log("adapterSignTypedDataCallback: " + json);
}

function _adapterSignTransactionCallback(json: string): void {
    event.emit("adapterSignTransactionCallback", json);
    console.log("adapterSignTransactionCallback: " + json);
}

function _adapterSignAllTransactionsCallback(json: string): void {
    event.emit("adapterSignAllTransactionsCallback", json);
    console.log("adapterSignAllTransactionsCallback: " + json);
}

function _adapterImportWalletFromPrivateKeyCallback(json: string): void {
    event.emit("adapterImportWalletFromPrivateKeyCallback", json);
    console.log("adapterImportWalletFromPrivateKeyCallback: " + json);
}

function _adapterImportWalletFromMnemonicCallback(json: string): void {
    event.emit("adapterImportWalletFromMnemonicCallback", json);
    console.log("adapterImportWalletFromMnemonicCallback: " + json);
}

function _adapterExportPrivateKeyCallback(json: string): void {
    event.emit("adapterExportPrivateKeyCallback", json);
    console.log("adapterExportPrivateKeyCallback: " + json);
}

function _adapterSignInWithEthereumCallback(json: string): void {
    event.emit("adapterSignInWithEthereumCallback", json);
    console.log("adapterSignInWithEthereumCallback: " + json);
}

function _adapterVerifyCallback(json: string): void {
    event.emit("adapterVerifyCallback", json);
    console.log("adapterVerifyCallback: " + json);
}

function _adapterSwitchEthereumChainCallback(json: string): void {
    event.emit("adapterSwitchEthereumChainCallback", json);
    console.log("adapterSwitchEthereumChainCallback: " + json);
}

function _adapterAddEthereumChainCallback(json: string): void {
    event.emit("adapterAddEthereumChainCallback", json);
    console.log("adapterAddEthereumChainCallback: " + json);
}

function _adapterReconnectIfNeededCallback(json: string): void {
    event.emit("adapterReconnectIfNeededCallback", json);
    console.log("adapterReconnectIfNeededCallback: " + json);
}

function _adapterWalletReadyStateCallback(json: string): void {
    event.emit("adapterWalletReadyStateCallback", json);
    console.log("adapterWalletReadyStateCallback: " + json);
}



/**
 * Init Particle Connect Service
 * @param chainInfo ChainInfo
 * @param env Env
 * @param metadata Dapp meta data
 * @param rpcUrl Custom RpcUrl
 */
export function particleConnectInitialize(chainInfo: ChainInfo, env: Env, metadata: DappMetaData, rpcUrl?: RpcUrl) {
    const obj = { chain_name: chainInfo.name, chain_id: chainInfo.id, chain_id_name: chainInfo.network, env: env, metadata: metadata, rpc_url: rpcUrl };
    const json = JSON.stringify(obj);
    native.jsbBridgeWrapper.dispatchEventToNative("particleConnectInitialize", json);
}

/**
 * Set the required chains for wallet connect v2. If not set, the current chain connection will be used.
 * @param chainInfos Chain info list
 */
export function setWalletConnectV2SupportChainInfos(chainInfos: ChainInfo[]) {
    const chainInfoObjects = chainInfos.map(info => ({
        chain_name: info.name,
        chain_id_name: info.network,
        chain_id: info.id,
    }));
    const json = JSON.stringify(chainInfoObjects);

    if (sys.OS.IOS === sys.os) {
        native.jsbBridgeWrapper.dispatchEventToNative("setWalletConnectV2SupportChainInfos", json);
    } else {
        // to do
    }
}


/**
* Connect wallet
* @param walletType Wallet type
* @param config Optional, works when connect with partile
* @returns Result, account or error
*/
export async function adapterGetAccounts(walletType: WalletType): Promise<any> {
    return callEventOnce("adapterGetAccounts", walletType).then(result => {
        return JSON.parse(result);
    })
}


/**
* Connect wallet
* @param walletType Wallet type
* @param config Optional, works when connect with partile
* @returns Result, account or error
*/
export async function adapterConnect(walletType: WalletType, config?: ParticleConnectConfig): Promise<any> {
    let json = "";
    if (config != null) {
        const configObj = {
            login_type: config.loginType,
            account: config.account,
            support_auth_type_values: config.supportAuthType,
            social_login_prompt: config.socialLoginPrompt,
            authorization: config.authorization,

        };
        const obj = { wallet_type: walletType, config: configObj };
        json = JSON.stringify(obj);
    } else {
        const obj = { wallet_type: walletType };
        json = JSON.stringify(obj);
    }

    return callEventOnce("adapterConnect", json).then(result => {
        return JSON.parse(result);
    })

}

/**
* Disconnect
* @param walletType Wallet type
* @param publicAddress Public address
* @returns Result, success or error
*/
export async function adapterDisconnect(walletType: WalletType, publicAddress: string): Promise<any> {
    const obj = { wallet_type: walletType, public_address: publicAddress };
    const json = JSON.stringify(obj);

    return callEventOnce("adapterDisconnect", json).then(result => {
        return JSON.parse(result);
    })


}

/**
* Is connected 
* @param walletType Wallet type
* @param publicAddress Public address
* @returns Result, success or failure or error
*/
export async function adapterIsConnected(walletType: WalletType, publicAddress: string): Promise<any> {
    const obj = { wallet_type: walletType, public_address: publicAddress };
    const json = JSON.stringify(obj);

    return callEventOnce("adapterIsConnected", json).then(result => {
        return JSON.parse(result);
    })


}


/**
* Sign message
* @param walletType Wallet type
* @param publicAddress Public address
* @param message Message that you want user to sign
* @returns Result, signed message or error
*/
export async function adapterSignMessage(walletType: WalletType, publicAddress: string, message: string): Promise<any> {
    const obj = { wallet_type: walletType, public_address: publicAddress, message: message };
    const json = JSON.stringify(obj);

    return callEventOnce("adapterSignMessage", json).then(result => {
        return JSON.parse(result);
    })


}

/**
 * Sign transction
 * @param walletType Wallet type
 * @param publicAddress Public address
 * @param transaction Transaction that you want user to sign
 * @returns Result, signed transaction or error
 */
export async function adapterSignTransaction(walletType: WalletType, publicAddress: string, transaction: string): Promise<any> {
    const obj = { wallet_type: walletType, public_address: publicAddress, transaction: transaction };
    const json = JSON.stringify(obj);

    return callEventOnce("adapterSignTransaction", json).then(result => {
        return JSON.parse(result);
    })

}

/**
* Sign all transactions
* @param walletType Wallet type
* @param publicAddress Public address
* @param transactions Transactions that you want user to sign
* @returns Result, signed transactions or error
*/
export async function adapterSignAllTransactions(walletType: WalletType, publicAddress: string, transactions: string[]): Promise<any> {
    const obj = { wallet_type: walletType, public_address: publicAddress, transactions: transactions };
    const json = JSON.stringify(obj);

    return callEventOnce("adapterSignAllTransactions", json).then(result => {
        return JSON.parse(result);
    })


}

/**
* Sign and send transaction
* @param walletType Wallet type
* @param publicAddress Public address
* @param transaction Transaction that you want user to sign and send
* @returns Result, signature or error
*/
export async function adapterSignAndSendTransaction(walletType: WalletType, publicAddress: string, transaction: string): Promise<any> {
    const obj = { wallet_type: walletType, public_address: publicAddress, transaction: transaction };
    const json = JSON.stringify(obj);

    return callEventOnce("adapterSignAndSendTransaction", json).then(result => {
        return JSON.parse(result);
    })


}


/**
* Sign typed data
* @param walletType Wallet type
* @param publicAddress Public address 
* @param typedData Typed data that you want user to sign and send, support typed data version v4
* @returns Result, signature or error
*/
export async function adapterSignTypedData(walletType: WalletType, publicAddress: string, typedData: string): Promise<any> {
    const obj = { wallet_type: walletType, public_address: publicAddress, message: typedData };
    const json = JSON.stringify(obj);

    return callEventOnce("adapterSignTypedData", json).then(result => {
        return JSON.parse(result);
    })


}


/**
 * Sign in with Ethereum, eip4361 https://eips.ethereum.org/EIPS/eip-4361
 * @param walletType Wallet type
 * @param publicAddress Public address 
 * @param domain Domain, example "particle.network"
 * @param uri Uri, example "https://particle.network/demo#login"
 * @returns Result, source message and signature or error
 */
export async function adapterSignInWithEthereum(walletType: WalletType, publicAddress: string, domain: string, uri: string): Promise<any> {
    const obj = { wallet_type: walletType, public_address: publicAddress, domain: domain, uri: uri };
    const json = JSON.stringify(obj);
    return callEventOnce("adapterSignInWithEthereum", json).then(result => {
        return JSON.parse(result);
    })

}

/**
* Verify 
* @param walletType Wallet type
* @param publicAddress Public address 
* @param message Source message
* @param signature Signature
* @returns Result, bool or error
*/
export async function adapterVerify(walletType: WalletType, publicAddress: string, message: string, signature: string): Promise<any> {
    const obj = { wallet_type: walletType, public_address: publicAddress, message: message, signature: signature };
    const json = JSON.stringify(obj);

    return callEventOnce("adapterVerify", json).then(result => {
        return JSON.parse(result);
    })

}


/**
 * Import private key
 * @param walletType Wallet type, EvmPrivateKey or SolanaPrivateKey
 * @param privateKey Private key
 * @returns Result, account or error
 */
export async function adapterImportWalletFromPrivateKey(walletType: WalletType, privateKey: string): Promise<any> {
    if (walletType === WalletType.EvmPrivateKey || walletType === WalletType.SolanaPrivateKey) {
        const obj = { wallet_type: walletType, private_key: privateKey };
        const json = JSON.stringify(obj);

        return callEventOnce("adapterImportWalletFromPrivateKey", json).then(result => {
            return JSON.parse(result);
        })
    } else {
        return Promise.reject({ status: false, data: { message: 'this method only support wallet type evmprivatekey or solanaprivatekey' } });
    }
}


/**
 * Import mnemonic
 * @param walletType Wallet type, EvmPrivateKey or SolanaPrivateKey
 * @param mnemonic Mnemonic, example "word1 work2 ... " at least 12 words.
 * @returns Result, account or error
 */
export async function adapterImportWalletFromMnemonic(walletType: WalletType, mnemonic: string): Promise<any> {
    if (walletType === WalletType.EvmPrivateKey || walletType === WalletType.SolanaPrivateKey) {
        const obj = { wallet_type: walletType, mnemonic: mnemonic };
        const json = JSON.stringify(obj);

        return callEventOnce("adapterImportWalletFromMnemonic", json).then(result => {
            return JSON.parse(result);
        })
    } else {
        return Promise.reject({ status: false, data: { message: 'this method only support wallet type evmprivatekey or solanaprivatekey' } });
    }
}


/**
 * Export private key
 * @param walletType Wallet type, EvmPrivateKey or SolanaPrivateKey
 * @param publicAddress Public address
 * @returns Result, private key or error
 */
export async function adapterExportPrivateKey(walletType: WalletType, publicAddress: string): Promise<any> {
    if (walletType === WalletType.EvmPrivateKey || walletType === WalletType.SolanaPrivateKey) {
        const obj = { wallet_type: walletType, public_address: publicAddress };
        const json = JSON.stringify(obj);

        return callEventOnce("adapterExportPrivateKey", json).then(result => {
            return JSON.parse(result);
        })
    } else {
        return Promise.reject({ status: false, data: { message: 'this method only support wallet type evmprivatekey or solanaprivatekey' } });
    }


}


/**
 * Add ethereum chain, works with walletconnect, not support wallet type Particle, EvmPrivateKey or SolanaPrivateKey
 * @param walletType Wallet type
 * @param publicAddress Public address
 * @returns Result
 */
export async function adapterAddEthereumChain(
    walletType: WalletType,
    publicAddress: string,
    chainInfo: ChainInfo
): Promise<any> {
    const obj = {
        wallet_type: walletType,
        public_address: publicAddress,
        chain_name: chainInfo.name,
        chain_id: chainInfo.id,
        chain_id_name: chainInfo.network,
    };
    const json = JSON.stringify(obj);

    return callEventOnce("adapterAddEthereumChain", json).then(result => {
        return JSON.parse(result);
    })
}

/**
* Switch ethereum chain, works with walletconnect, not support wallet type Particle, EvmPrivateKey or SolanaPrivateKey
* @param walletType Wallet type
* @param publicAddress Public address
* @returns Result
*/
export async function adapterSwitchEthereumChain(
    walletType: WalletType,
    publicAddress: string,
    chainInfo: ChainInfo,
): Promise<any> {
    const obj = {
        wallet_type: walletType,
        public_address: publicAddress,
        chain_id: chainInfo.id,
    };
    const json = JSON.stringify(obj);

    return callEventOnce("adapterSwitchEthereumChain", json).then(result => {
        return JSON.parse(result);
    })
}

/**
 * Only support iOS
 * 
 * Reconnect wallet connect, works with walletconnect, not support wallet type Particle, EvmPrivateKey or SolanaPrivateKey
 * @param walletType Wallet type
 * @param publicAddress Public address
 * @returns Result
 */
export function adapterReconnectIfNeeded(walletType: WalletType, publicAddress: string): Promise<any> | undefined {
    if (sys.OS.IOS === sys.os) {
        const obj = { wallet_type: walletType, public_address: publicAddress };
        const json = JSON.stringify(obj);

        return callEventOnce("adapterReconnectIfNeeded", json).then(result => {
            return JSON.parse(result);
        })
    }
}

/**
 * Get adapter wallet state
 * @param walletType Wallet type
 * @returns 
 */
export function adapterWalletReadyState(walletType: WalletType): Promise<any> {
    return callEventOnce("adapterWalletReadyState", walletType).then(result => {
        return JSON.parse(result);
    })
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
