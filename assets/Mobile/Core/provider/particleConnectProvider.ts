import { EventTarget } from 'cc';
import * as particleConnect from '../particleConnect';
import * as particleAuth from '../particleAuth';
import { sendEVMRpc } from './connection';
import type { ParticleConnectOptions, RequestArguments } from './types';
import { notSupportMethods, signerMethods } from './types';
import { WalletType } from '../Models/WalletType';
import { HexConverter } from '../NetService/hex-converter';
import { getEVMChainInfoById } from '../Models/Chains';

class ParticleConnectProvider {
    private events = new EventTarget();

    constructor(private options: ParticleConnectOptions) {
        console.log(this.options, particleConnect);
        // this.events.setMaxListeners(100);
    }

    public on(event: string, listener: any): void {
        this.events.on(event, listener);
    }

    public once(event: string, listener: any): void {
        this.events.once(event, listener);
    }

    public off(event: string, listener: any): void {
        this.events.off(event, listener);
    }

    public removeListener(event: string, listener: any): void {
        this.events.off(event, listener);
    }

    public removeAllListeners(event: string): void {
        this.events.off(event);
    }

    public async enable(): Promise<string[]> {
        return this.request({
            method: 'eth_requestAccounts',
        });
    }

    public async request(payload: RequestArguments): Promise<any> {
        if (!payload.method || notSupportMethods.includes(payload.method)) {
            return Promise.reject({
                code: -32601,
                message: 'Method not supported',
            });
        }
        if (signerMethods.includes(payload.method)) {
            if (payload.method === 'eth_chainId') {
                const chainInfo = await particleAuth.getChainInfo();
                return Promise.resolve(`0x${chainInfo.id.toString(16)}`);
            } else if (
                payload.method === 'eth_accounts' ||
                payload.method === 'eth_requestAccounts'
            ) {
                // check is the publicAddress is connected already
                let isConnected = false;
                if (this.options.publicAddress == undefined) {
                    isConnected = false;
                } else {
                    isConnected = await particleConnect.adapterIsConnected(this.options.walletType, this.options.publicAddress);
                }
                if (!isConnected) {
                    const result = await particleConnect.adapterConnect(this.options.walletType);
                    if (result.status) {
                        return [result.data.publicAddress];
                    } else {
                        Promise.reject(result.data);
                    }
                } else {
                    return [this.options.publicAddress];
                }
            } else if (payload.method === 'eth_sendTransaction') {
                const txData = payload.params[0];
                if (!txData.chainId) {
                    const chainInfo = await particleAuth.getChainInfo();
                    txData.chainId = `0x${chainInfo.id.toString(16)}`;
                }
                const tx = HexConverter.jsonToHexString(txData);

                const publicAddress = txData.from;

                const result: any = await particleConnect.adapterSignAndSendTransaction(this.options.walletType, publicAddress, `0x${tx}`);
                if (result.status) {
                    return result.data;
                } else {
                    return Promise.reject(result.data);
                }
            } else if (payload.method === 'personal_sign') {
                const publicAddress = payload.params[1];
                const result: any = await particleConnect.adapterSignMessage(this.options.walletType, publicAddress, payload.params[0]);
                if (result.status) {
                    return result.data;
                } else {
                    return Promise.reject(result.data);
                }
            } else if (payload.method === 'wallet_switchEthereumChain' || payload.method === 'wallet_addEthereumChain') {

                const chainId = Number(payload.params[0].chainId);
                const chainInfo = getEVMChainInfoById(chainId)

                if (this.options.publicAddress == undefined) {
                    return Promise.reject({
                        code: 4900,
                        message: 'The Provider is disconnected from chain',
                    });
                }

                if (!chainInfo) {
                    return Promise.reject({
                        code: 4201,
                        message: 'The Provider does not support the chain',
                    });
                }
                const result = await particleAuth.setChainInfo(chainInfo);
                if (!result) {
                    return Promise.reject({ message: 'switch chain failed' });
                }

                if (this.options.walletType != WalletType.Particle &&
                    this.options.walletType != WalletType.Phantom &&
                    this.options.walletType != WalletType.EvmPrivateKey &&
                    this.options.walletType != WalletType.SolanaPrivateKey) {
                    var res: any;
                    if (payload.method === 'wallet_switchEthereumChain') {
                        res = await particleConnect.adapterSwitchEthereumChain(this.options.walletType, this.options.publicAddress, chainInfo)
                    } else {
                        res = await particleConnect.adapterAddEthereumChain(this.options.walletType, this.options.publicAddress, chainInfo)
                    }
                    // it must be a wallet connect wallet

                    if (res.status) {
                        return Promise.resolve(null);
                    } else {
                        return Promise.reject({ message: 'switch chain failed' });
                    }
                } else {
                    return Promise.resolve(null);
                }
            } else if (
                payload.method === 'eth_signTypedData_v4'
            ) {
                const typedData = JSON.stringify(payload.params[1]);
                const publicAddress = payload.params[0];
                const result: any = await particleConnect.adapterSignTypedData(this.options.walletType, publicAddress, typedData
                );
                if (result.status) {
                    return result.data;
                } else {
                    return Promise.reject(result.data);
                }
            } else if (
                payload.method === 'eth_signTypedData' ||
                payload.method === 'eth_signTypedData_v1' ||
                payload.method === 'eth_signTypedData_v3'
            ) {
                return Promise.reject({
                    code: 4200,
                    message: 'The Provider does not support the requested method',
                });
            } else {
                return Promise.reject({
                    code: 4200,
                    message: 'The Provider does not support the requested method',
                });
            }
        } else {
            return sendEVMRpc(payload);
        }
    }
}

export { ParticleConnectProvider };
