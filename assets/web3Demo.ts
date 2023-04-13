
import { ParticleProvider } from './provider';
import Web3 from 'web3/dist/web3.min.js';

export const createWeb3 = (projectId: string, clientKey: string) => {
    const provider = new ParticleProvider({ projectId, clientKey });
    const web3 = new Web3(provider);
    return web3;
};