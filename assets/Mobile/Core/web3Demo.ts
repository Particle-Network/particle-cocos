
import { ParticleAuthProvider } from './provider/particleAuthProvider';
import { ParticleConnectProvider } from './provider/particleConnectProvider';
import Web3 from 'web3/dist/web3.min.js';

export const createWeb3FromParticleAuth = () => {
    const provider = new ParticleAuthProvider();
    // @ts-ignore
    const web3 = new Web3(provider);
    return web3;
    
};

export const createWeb3FromParticleConnect = (walletType: any) => {
    const provider = new ParticleConnectProvider({ walletType});
    // @ts-ignore
    const web3 = new Web3(provider);
    return web3;
}

export const restoreWeb3FromParticleConnect = (walletType: any, publicAddress: any) => {
    const provider = new ParticleConnectProvider({ walletType, publicAddress});
    // @ts-ignore
    const web3 = new Web3(provider);
    return web3;
}

