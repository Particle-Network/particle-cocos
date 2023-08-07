import { EventTarget } from 'cc';
import * as particleAuth from '../particleAuth';
import { sendEVMRpc } from './connection';
import type { RequestArguments } from './types';
import { notSupportMethods, signerMethods } from './types';
import { SupportAuthType } from '../Models/LoginInfo';
import { HexConverter } from '../NetService/hex-converter';
import { chains, ChainInfo } from '@particle-network/chains';

class ParticleAuthProvider {
    private events = new EventTarget();

    constructor() {
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
        if (payload.method === 'wallet_addEthereumChain') {
            return Promise.reject({
                code: -32601,
                message: 'Method not supported',
            });
        }
        if (signerMethods.includes(payload.method)) {
            if (payload.method === 'eth_chainId') {
                const chainInfo = await particleAuth.getChainInfo();
                return Promise.resolve(`0x${chainInfo.id.toString(16)}`);
            } else if (payload.method === 'eth_accounts' || payload.method === 'eth_requestAccounts') {
                const isLogin = await particleAuth.isLogin();
                if (!isLogin) {
                    const result = await particleAuth.login(undefined, undefined, [SupportAuthType.All]);
                    if (result.status == false) {
                        return Promise.reject(result.data);
                    }
                }
                const account = await particleAuth.getAddress();
                return [account];
            } else if (payload.method === 'eth_sendTransaction') {
                const txData = payload.params[0];
                if (!txData.chainId) {
                    const chainInfo = await particleAuth.getChainInfo();
                    txData.chainId = `0x${chainInfo.id.toString(16)}`;
                }

                const tx = HexConverter.jsonToHexString(txData);
                const result: any = await particleAuth.signAndSendTransaction(`0x${tx}`);
                if (result.status) {
                    return result.data;
                } else {
                    return Promise.reject(result.data);
                }
            } else if (payload.method === 'personal_sign') {
                const result: any = await particleAuth.signMessage(payload.params[0]);
                if (result.status) {
                    return result.data;
                } else {
                    return Promise.reject(result.data);
                }
            } else if (payload.method === 'wallet_switchEthereumChain') {
                const chainId = Number(payload.params[0].chainId);
                const chainInfo = chains.getEVMChainInfoById(chainId);
                if (!chainInfo) {
                    return Promise.reject({
                        code: 4201,
                        message: 'The Provider does not support the chain',
                    });
                }
                const result = await particleAuth.setChainInfo(chainInfo);
                if (result) {
                    return Promise.resolve(null);
                } else {
                    return Promise.reject({ message: 'switch chain failed' });
                }
            } else if (payload.method === 'eth_signTypedData_v3' || payload.method === 'eth_signTypedData_v4') {
                const typedData = JSON.stringify(payload.params[1]);
                const result: any = await particleAuth.signTypedData(
                    typedData,
                    payload.method === 'eth_signTypedData_v3' ? 'v3' : 'v4'
                );
                if (result.status) {
                    return result.data;
                } else {
                    return Promise.reject(result.data);
                }
            } else if (payload.method === 'eth_signTypedData' || payload.method === 'eth_signTypedData_v1') {
                const typedData = JSON.stringify(payload.params[0]);
                const result: any = await particleAuth.signTypedData(typedData, 'v1');
                if (result.status) {
                    return result.data;
                } else {
                    return Promise.reject(result.data);
                }
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

export { ParticleAuthProvider };
