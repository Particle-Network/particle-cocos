
import { ParticleProvider } from './provider';
import Web3 from 'web3/dist/web3.min.js';

export const createWeb3 = () => {
    const provider = new ParticleProvider();
    // @ts-ignore
    const web3 = new Web3(particleProvider as any | ParticleProvider);
    return web3;
};
