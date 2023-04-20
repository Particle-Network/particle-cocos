import { WalletType } from "../Models/WalletType";

export interface RequestArguments {
    method: string;
    params?: any;
    id?: number | string;
    jsonrpc?: string;
}

export interface ProviderError {
    message: string;
    code: number | string;
    data?: unknown;
}

export const notSupportMethods = [
    'eth_signTransaction',
    'eth_sign',
    'eth_sendRawTransaction',
    'wallet_watchAsset', //EIP-747
    
];

export const signerMethods = [
    'eth_requestAccounts', //EIP-1102
    'eth_accounts',
    'eth_chainId',
    'eth_sendTransaction',
    'eth_signTypedData',
    'eth_signTypedData_v1',
    'eth_signTypedData_v3',
    'eth_signTypedData_v4',
    'personal_sign',
    'wallet_switchEthereumChain', //EIP-3326
    'wallet_addEthereumChain', //EIP-3085
];

export interface ParticleOptions {
    projectId: string;
    clientKey: string;
}

export interface ConnectionOptions extends ParticleOptions {
    chainId: number;
}

export interface ParticleConnectOptions {
    // request, walletType
    walletType: WalletType;
    // This is a required parameter if already connected, 
    // This is an optional parameter if you are not already connected
    publicAddress?: string;
  }
