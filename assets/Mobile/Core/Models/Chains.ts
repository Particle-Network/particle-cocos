import { ChainInfo } from "./ChainInfo";

export function isChainSupportEIP1559(chain: ChainInfo): boolean {

    return chain?.features?.some((it) => it.name === 'EIP1559') ?? false;
}

export function getEVMChainInfoById(id: number): ChainInfo | undefined {
    return Object.values(ChainInfo).find((it) => it.chainType === 'evm' && it.id === id);
}


export function getAllChainInfos(compareFn?: (a: ChainInfo, b: ChainInfo) => number): ChainInfo[] {
    const chains = Object.values(ChainInfo);
    if (compareFn) {
        return chains.sort(compareFn);
    }
    const sortKeys = [
        'Solana',
        'Ethereum',
        'BSC',
        'opBNB',
        'Polygon',
        'Avalanche',
        'Moonbeam',
        'Moonriver',
        'Heco',
        'Fantom',
        'Arbitrum',
        'Harmony',
        'Aurora',
        'Optimism',
        'KCC',
        'PlatON',
    ];
    chains.sort((a, b) => {
        if (sortKeys.includes(a.name) && sortKeys.includes(b.name)) {
            if (a.name === b.name) {
                if (a.network === 'Mainnet') {
                    return -1;
                } else if (b.network === 'Mainnet') {
                    return 1;
                }
                return 0;
            } else if (sortKeys.indexOf(a.name) > sortKeys.indexOf(b.name)) {
                return 1;
            }
            return -1;
        } else if (sortKeys.includes(a.name)) {
            return -1;
        } else if (sortKeys.includes(b.name)) {
            return 1;
        } else if (a.name === b.name) {
            if (a.network === 'Mainnet') {
                return -1;
            } else if (b.network === 'Mainnet') {
                return 1;
            }
            return a.fullname.localeCompare(b.fullname);
        } else {
            return a.name.localeCompare(b.name);
        }
    });
    return chains;
}
