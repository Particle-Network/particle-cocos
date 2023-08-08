export class ChainInfo {
    public name: string

    public id: number

    public network: string

    public chainType: string

    public icon: string

    public fullname: string

    public website: string

    public nativeCurrency: NativeCurrency

    public rpcUrl: string

    public blockExplorerUrl: string

    public faucetUrl?: string

    public features?: { name: string; }[]


    public constructor(name: string, id: number, network: string, chainType: string, icon: string, fullname: string, website: string, nativeCurrency: NativeCurrency, rpcUrl: string, blockExplorerUrl: string, faucetUrl?: string, features?: { name: string; }[]
    ) {
        this.name = name;
        this.id = id;
        this.network = network;
        this.chainType = chainType;
        this.icon = icon;
        this.fullname = fullname;
        this.website = website;
        this.nativeCurrency = nativeCurrency;
        this.rpcUrl = rpcUrl;
        this.blockExplorerUrl = blockExplorerUrl;
        this.faucetUrl = faucetUrl;
        this.features = features;
    }

}

export class NativeCurrency {
    public name: string
    public symbol: string
    public decimals: number

    public constructor(name: string, symbol: string, decimals: number) {
        this.name = name;
        this.symbol = symbol;
        this.decimals = decimals;
    }
}

export const Ethereum: ChainInfo = {
    id: 1,
    name: 'Ethereum',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/ethereum/native.png',
    fullname: 'Ethereum Mainnet',
    network: 'Mainnet',
    website: 'https://ethereum.org',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://ethereum.publicnode.com',
    blockExplorerUrl: 'https://etherscan.io',
    features: [{ name: 'EIP1559' }],
};

export const EthereumGoerli: ChainInfo = {
    id: 5,
    name: 'Ethereum',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/ethereum/native.png',
    fullname: 'Ethereum Goerli',
    network: 'Goerli',
    website: 'https://goerli.net/#about',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://ethereum-goerli.publicnode.com',
    faucetUrl: 'https://goerlifaucet.com',
    blockExplorerUrl: 'https://goerli.etherscan.io',
    features: [{ name: 'EIP1559' }],
};

export const Optimism: ChainInfo = {
    id: 10,
    name: 'Optimism',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/optimism/native.png',
    fullname: 'Optimism Mainnet',
    network: 'Mainnet',
    website: 'https://optimism.io',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://mainnet.optimism.io',
    blockExplorerUrl: 'https://optimistic.etherscan.io',
};

export const ThunderCoreTestnet: ChainInfo = {
    id: 18,
    name: 'ThunderCore',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/thundercore/native.png',
    fullname: 'ThunderCore Testnet',
    network: 'Testnet',
    website: 'https://thundercore.com',
    nativeCurrency: {
        name: 'ThunderCore Token',
        symbol: 'TT',
        decimals: 18,
    },
    rpcUrl: 'https://testnet-rpc.thundercore.com',
    faucetUrl: 'https://faucet-testnet.thundercore.com',
    blockExplorerUrl: 'https://explorer-testnet.thundercore.com',
};

export const Cronos: ChainInfo = {
    id: 25,
    name: 'Cronos',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/cronos/native.png',
    fullname: 'Cronos Mainnet',
    network: 'Mainnet',
    website: 'https://cronos.org',
    nativeCurrency: {
        name: 'Cronos',
        symbol: 'CRO',
        decimals: 18,
    },
    rpcUrl: 'https://evm.cronos.org',
    blockExplorerUrl: 'https://cronoscan.com',
    features: [{ name: 'EIP1559' }],
};

export const BNBChain: ChainInfo = {
    id: 56,
    name: 'BSC',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/bsc/native.png',
    fullname: 'BNB Chain',
    network: 'Mainnet',
    website: 'https://www.bnbchain.org/en',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
    },
    rpcUrl: 'https://bsc-dataseed1.binance.org',
    blockExplorerUrl: 'https://bscscan.com',
};

export const OKTCTestnet: ChainInfo = {
    id: 65,
    name: 'OKC',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/okc/native.png',
    fullname: 'OKTC Testnet',
    network: 'Testnet',
    website: 'https://www.okex.com/okexchain',
    nativeCurrency: {
        name: 'OKT',
        symbol: 'OKT',
        decimals: 18,
    },
    rpcUrl: 'https://exchaintestrpc.okex.org',
    faucetUrl: 'https://docs.oxdex.com/v/en/help/gitter',
    blockExplorerUrl: 'https://www.oklink.com/okc-test',
};

export const OKTC: ChainInfo = {
    id: 66,
    name: 'OKC',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/okc/native.png',
    fullname: 'OKTC Mainnet',
    network: 'Mainnet',
    website: 'https://www.okex.com/okc',
    nativeCurrency: {
        name: 'OKT',
        symbol: 'OKT',
        decimals: 18,
    },
    rpcUrl: 'https://exchainrpc.okex.org',
    blockExplorerUrl: 'https://www.oklink.com/okc',
};

export const ConfluxeSpaceTestnet: ChainInfo = {
    id: 71,
    name: 'ConfluxESpace',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/confluxespace/native.png',
    fullname: 'Conflux eSpace Testnet',
    network: 'Testnet',
    website: 'https://confluxnetwork.org',
    nativeCurrency: {
        name: 'CFX',
        symbol: 'CFX',
        decimals: 18,
    },
    rpcUrl: 'https://evmtestnet.confluxrpc.com',
    faucetUrl: 'https://efaucet.confluxnetwork.org',
    blockExplorerUrl: 'https://evmtestnet.confluxscan.net',
};

export const BNBChainTestnet: ChainInfo = {
    id: 97,
    name: 'BSC',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/bsc/native.png',
    fullname: 'BNB Chain Testnet',
    network: 'Testnet',
    website: 'https://www.bnbchain.org/en',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
    },
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    faucetUrl: 'https://testnet.bnbchain.org/faucet-smart',
    blockExplorerUrl: 'https://testnet.bscscan.com',
};

export const Gnosis: ChainInfo = {
    id: 100,
    name: 'Gnosis',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/gnosis/native.png',
    fullname: 'Gnosis Mainnet',
    network: 'Mainnet',
    website: 'https://docs.gnosischain.com',
    nativeCurrency: {
        name: 'Gnosis',
        symbol: 'XDAI',
        decimals: 18,
    },
    rpcUrl: 'https://rpc.ankr.com/gnosis',
    blockExplorerUrl: 'https://gnosisscan.io',
    features: [{ name: 'EIP1559' }],
};

export const Solana: ChainInfo = {
    id: 101,
    name: 'Solana',
    chainType: 'solana',
    icon: 'https://static.particle.network/token-list/solana/native.png',
    fullname: 'Solana Mainnet',
    network: 'Mainnet',
    website: 'https://solana.com',
    nativeCurrency: {
        name: 'SOL',
        symbol: 'SOL',
        decimals: 9,
    },
    rpcUrl: 'https://api.mainnet-beta.solana.com',
    blockExplorerUrl: 'https://solscan.io',
};

export const SolanaTestnet: ChainInfo = {
    id: 102,
    name: 'Solana',
    chainType: 'solana',
    icon: 'https://static.particle.network/token-list/solana/native.png',
    fullname: 'Solana Testnet',
    network: 'Testnet',
    website: 'https://solana.com',
    nativeCurrency: {
        name: 'SOL',
        symbol: 'SOL',
        decimals: 9,
    },
    rpcUrl: 'https://api.testnet.solana.com',
    faucetUrl: 'https://solfaucet.com',
    blockExplorerUrl: 'https://solscan.io',
};

export const SolanaDevnet: ChainInfo = {
    id: 103,
    name: 'Solana',
    chainType: 'solana',
    icon: 'https://static.particle.network/token-list/solana/native.png',
    fullname: 'Solana Devnet',
    network: 'Devnet',
    website: 'https://solana.com',
    nativeCurrency: {
        name: 'SOL',
        symbol: 'SOL',
        decimals: 9,
    },
    rpcUrl: 'https://api.devnet.solana.com',
    faucetUrl: 'https://solfaucet.com',
    blockExplorerUrl: 'https://solscan.io',
};

export const ThunderCore: ChainInfo = {
    id: 108,
    name: 'ThunderCore',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/thundercore/native.png',
    fullname: 'ThunderCore Mainnet',
    network: 'Mainnet',
    website: 'https://thundercore.com',
    nativeCurrency: {
        name: 'ThunderCore Token',
        symbol: 'TT',
        decimals: 18,
    },
    rpcUrl: 'https://mainnet-rpc.thundercore.com',
    blockExplorerUrl: 'https://viewblock.io/thundercore',
};

export const Heco: ChainInfo = {
    id: 128,
    name: 'Heco',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/heco/native.png',
    fullname: 'Heco Mainnet',
    network: 'Mainnet',
    website: 'https://www.hecochain.com',
    nativeCurrency: {
        name: 'HT',
        symbol: 'HT',
        decimals: 18,
    },
    rpcUrl: 'https://http-mainnet.hecochain.com',
    blockExplorerUrl: 'https://hecoinfo.com',
    features: [{ name: 'EIP1559' }],
};

export const Polygon: ChainInfo = {
    id: 137,
    name: 'Polygon',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/polygon/native.png',
    fullname: 'Polygon Mainnet',
    network: 'Mainnet',
    website: 'https://polygon.technology',
    nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
    },
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorerUrl: 'https://polygonscan.com',
    features: [{ name: 'EIP1559' }],
};

export const OKBCTestnet: ChainInfo = {
    id: 195,
    name: 'OKBC',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/okc/native.png',
    fullname: 'OKBC Testnet',
    network: 'Testnet',
    website: 'https://www.okx.com/okbc/docs/dev/quick-start/introduction/introduction-to-okbchain',
    nativeCurrency: {
        name: 'OKB',
        symbol: 'OKB',
        decimals: 18,
    },
    rpcUrl: 'https://okbtestrpc.okbchain.org',
    faucetUrl: 'https://www.okx.com/cn/okbc/faucet',
    blockExplorerUrl: 'https://www.oklink.com/cn/okbc-test',
};

export const MAPProtocolTestnet: ChainInfo = {
    id: 212,
    name: 'MAPProtocol',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/mapprotocol/native.png',
    fullname: 'MAP Protocol Testnet',
    network: 'Testnet',
    website: 'https://maplabs.io',
    nativeCurrency: {
        name: 'MAPO',
        symbol: 'MAPO',
        decimals: 18,
    },
    rpcUrl: 'https://testnet-rpc.maplabs.io',
    faucetUrl: 'https://faucet.mapprotocol.io',
    blockExplorerUrl: 'https://testnet.mapscan.io',
    features: [{ name: 'EIP1559' }],
};

export const Fantom: ChainInfo = {
    id: 250,
    name: 'Fantom',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/fantom/native.png',
    fullname: 'Fantom Mainnet',
    network: 'Mainnet',
    website: 'https://fantom.foundation',
    nativeCurrency: {
        name: 'FTM',
        symbol: 'FTM',
        decimals: 18,
    },
    rpcUrl: 'https://rpc.ftm.tools',
    blockExplorerUrl: 'https://ftmscan.com',
};

export const zkSyncEraTestnet: ChainInfo = {
    id: 280,
    name: 'zkSync',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/zksync/native.png',
    fullname: 'zkSync Era Testnet',
    network: 'Testnet',
    website: 'https://era.zksync.io/docs',
    nativeCurrency: {
        name: 'zkSync',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://zksync2-testnet.zksync.dev',
    faucetUrl: 'https://portal.zksync.io/faucet',
    blockExplorerUrl: 'https://goerli.explorer.zksync.io',
    features: [{ name: 'EIP1559' }],
};

export const KCC: ChainInfo = {
    id: 321,
    name: 'KCC',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/kcc/native.png',
    fullname: 'KCC Mainnet',
    network: 'Mainnet',
    website: 'https://kcc.io',
    nativeCurrency: {
        name: 'KCS',
        symbol: 'KCS',
        decimals: 18,
    },
    rpcUrl: 'https://rpc-mainnet.kcc.network',
    blockExplorerUrl: 'https://explorer.kcc.io/en',
};

export const KCCTestnet: ChainInfo = {
    id: 322,
    name: 'KCC',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/kcc/native.png',
    fullname: 'KCC Testnet',
    network: 'Testnet',
    website: 'https://scan-testnet.kcc.network',
    nativeCurrency: {
        name: 'KCS',
        symbol: 'KCS',
        decimals: 18,
    },
    rpcUrl: 'https://rpc-testnet.kcc.network',
    faucetUrl: 'https://faucet-testnet.kcc.network',
    blockExplorerUrl: 'https://scan-testnet.kcc.network',
};

export const zkSyncEra: ChainInfo = {
    id: 324,
    name: 'zkSync',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/zksync/native.png',
    fullname: 'zkSync Era',
    network: 'Mainnet',
    website: 'https://zksync.io',
    nativeCurrency: {
        name: 'zkSync',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://zksync2-mainnet.zksync.io',
    blockExplorerUrl: 'https://explorer.zksync.io',
    features: [{ name: 'EIP1559' }],
};

export const CronosTestnet: ChainInfo = {
    id: 338,
    name: 'Cronos',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/cronos/native.png',
    fullname: 'Cronos Testnet',
    network: 'Testnet',
    website: 'https://cronos.org',
    nativeCurrency: {
        name: 'Cronos',
        symbol: 'CRO',
        decimals: 18,
    },
    rpcUrl: 'https://evm-t3.cronos.org',
    faucetUrl: 'https://cronos.org/faucet',
    blockExplorerUrl: 'https://testnet.cronoscan.com',
    features: [{ name: 'EIP1559' }],
};

export const OptimismGoerli: ChainInfo = {
    id: 420,
    name: 'Optimism',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/optimism/native.png',
    fullname: 'Optimism Goerli',
    network: 'Testnet',
    website: 'https://optimism.io',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://goerli.optimism.io',
    faucetUrl: 'https://faucet.triangleplatform.com/optimism/goerli',
    blockExplorerUrl: 'https://goerli-optimism.etherscan.io',
};

export const PGN: ChainInfo = {
    id: 424,
    name: 'PGN',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/pgn/native.png',
    fullname: 'PGN Mainnet',
    network: 'Mainnet',
    website: 'https://publicgoods.network',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://sepolia.publicgoods.network',
    blockExplorerUrl: 'https://explorer.publicgoods.network',
    features: [{ name: 'EIP1559' }],
};

export const MetisGoerli: ChainInfo = {
    id: 599,
    name: 'Metis',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/metis/native.png',
    fullname: 'Metis Goerli',
    network: 'Goerli',
    website: 'https://www.metis.io',
    nativeCurrency: {
        name: 'Metis',
        symbol: 'METIS',
        decimals: 18,
    },
    rpcUrl: 'https://goerli.gateway.metisdevops.link',
    faucetUrl: 'https://goerli.faucet.metisdevops.link',
    blockExplorerUrl: 'https://goerli.explorer.metisdevops.link',
};

export const ZoraGoerli: ChainInfo = {
    id: 999,
    name: 'Zora',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/zora/native.png',
    fullname: 'Zora Goerli',
    network: 'Goerli',
    website: 'https://testnet.wanscan.org',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://testnet.rpc.zora.energy',
    blockExplorerUrl: 'https://testnet.explorer.zora.energy',
    features: [{ name: 'EIP1559' }],
};

export const KlaytnTestnet: ChainInfo = {
    id: 1001,
    name: 'Klaytn',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/klaytn/native.png',
    fullname: 'Klaytn Testnet',
    network: 'Testnet',
    website: 'https://www.klaytn.com',
    nativeCurrency: {
        name: 'Klaytn',
        symbol: 'KLAY',
        decimals: 18,
    },
    rpcUrl: 'https://api.baobab.klaytn.net:8651',
    faucetUrl: 'https://baobab.wallet.klaytn.foundation/faucet',
    blockExplorerUrl: 'https://baobab.scope.klaytn.com',
};

export const ConfluxeSpace: ChainInfo = {
    id: 1030,
    name: 'ConfluxESpace',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/confluxespace/native.png',
    fullname: 'Conflux eSpace',
    network: 'Mainnet',
    website: 'https://confluxnetwork.org',
    nativeCurrency: {
        name: 'CFX',
        symbol: 'CFX',
        decimals: 18,
    },
    rpcUrl: 'https://evm.confluxrpc.com',
    blockExplorerUrl: 'https://evm.confluxscan.net',
};

export const Metis: ChainInfo = {
    id: 1088,
    name: 'Metis',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/metis/native.png',
    fullname: 'Metis Mainnet',
    network: 'Mainnet',
    website: 'https://www.metis.io',
    nativeCurrency: {
        name: 'Metis',
        symbol: 'METIS',
        decimals: 18,
    },
    rpcUrl: 'https://andromeda.metis.io/?owner=1088',
    blockExplorerUrl: 'https://andromeda-explorer.metis.io',
};

export const PolygonzkEVM: ChainInfo = {
    id: 1101,
    name: 'PolygonZkEVM',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/polygonzkevm/native.png',
    fullname: 'Polygon zkEVM',
    network: 'Mainnet',
    website: 'https://polygon.technology/polygon-zkevm',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://zkevm-rpc.com',
    blockExplorerUrl: 'https://zkevm.polygonscan.com',
};

export const Moonbeam: ChainInfo = {
    id: 1284,
    name: 'Moonbeam',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/moonbeam/native.png',
    fullname: 'Moonbeam Mainnet',
    network: 'Mainnet',
    website: 'https://moonbeam.network/networks/moonbeam',
    nativeCurrency: {
        name: 'GLMR',
        symbol: 'GLMR',
        decimals: 18,
    },
    rpcUrl: 'https://rpc.api.moonbeam.network',
    blockExplorerUrl: 'https://moonbeam.moonscan.io',
    features: [{ name: 'EIP1559' }],
};

export const Moonriver: ChainInfo = {
    id: 1285,
    name: 'Moonriver',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/moonriver/native.png',
    fullname: 'Moonriver Mainnet',
    network: 'Mainnet',
    website: 'https://moonbeam.network/networks/moonriver',
    nativeCurrency: {
        name: 'MOVR',
        symbol: 'MOVR',
        decimals: 18,
    },
    rpcUrl: 'https://rpc.api.moonriver.moonbeam.network',
    blockExplorerUrl: 'https://moonriver.moonscan.io',
    features: [{ name: 'EIP1559' }],
};

export const MoonbeamTestnet: ChainInfo = {
    id: 1287,
    name: 'Moonbeam',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/moonbeam/native.png',
    fullname: 'Moonbeam Testnet',
    network: 'Testnet',
    website: 'https://docs.moonbeam.network/networks/testnet',
    nativeCurrency: {
        name: 'Dev',
        symbol: 'DEV',
        decimals: 18,
    },
    rpcUrl: 'https://rpc.api.moonbase.moonbeam.network',
    faucetUrl: 'https://apps.moonbeam.network/moonbase-alpha/faucet',
    blockExplorerUrl: 'https://moonbase.moonscan.io',
    features: [{ name: 'EIP1559' }],
};

export const PolygonzkEVMTestnet: ChainInfo = {
    id: 1442,
    name: 'PolygonZkEVM',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/polygonzkevm/native.png',
    fullname: 'Polygon zkEVM Testnet',
    network: 'Testnet',
    website: 'https://polygon.technology/solutions/polygon-zkevm',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://rpc.public.zkevm-test.net',
    faucetUrl: 'https://public.zkevm-test.net',
    blockExplorerUrl: 'https://testnet-zkevm.polygonscan.com',
};

export const FantomTestnet: ChainInfo = {
    id: 4002,
    name: 'Fantom',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/fantom/native.png',
    fullname: 'Fantom Testnet',
    network: 'Testnet',
    website: 'https://docs.fantom.foundation/quick-start/short-guide#fantom-testnet',
    nativeCurrency: {
        name: 'FTM',
        symbol: 'FTM',
        decimals: 18,
    },
    rpcUrl: 'https://rpc.testnet.fantom.network',
    faucetUrl: 'https://faucet.fantom.network',
    blockExplorerUrl: 'https://testnet.ftmscan.com',
};

export const Mantle: ChainInfo = {
    id: 5000,
    name: 'Mantle',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/mantle/native.png',
    fullname: 'Mantle Mainnet',
    network: 'Mainnet',
    website: 'https://mantle.xyz',
    nativeCurrency: {
        name: 'MNT',
        symbol: 'MNT',
        decimals: 18,
    },
    rpcUrl: 'https://rpc.mantle.xyz',
    blockExplorerUrl: 'https://explorer.mantle.xyz',
};

export const MantleTestnet: ChainInfo = {
    id: 5001,
    name: 'Mantle',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/mantle/native.png',
    fullname: 'Mantle Testnet',
    network: 'Testnet',
    website: 'https://mantle.xyz',
    nativeCurrency: {
        name: 'MNT',
        symbol: 'MNT',
        decimals: 18,
    },
    rpcUrl: 'https://rpc.testnet.mantle.xyz',
    faucetUrl: 'https://faucet.testnet.mantle.xyz',
    blockExplorerUrl: 'https://explorer.testnet.mantle.xyz',
};

export const opBNBTestnet: ChainInfo = {
    id: 5611,
    name: 'opBNB',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/bsc/native.png',
    fullname: 'opBNB Testnet',
    network: 'Testnet',
    website: 'https://opbnb.bnbchain.org',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
    },
    rpcUrl: 'https://opbnb-testnet-rpc.bnbchain.org',
    blockExplorerUrl: 'https://opbnbscan.com',
    features: [{ name: 'EIP1559' }],
};

export const Klaytn: ChainInfo = {
    id: 8217,
    name: 'Klaytn',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/klaytn/native.png',
    fullname: 'Klaytn Mainnet',
    network: 'Mainnet',
    website: 'https://www.klaytn.com',
    nativeCurrency: {
        name: 'Klaytn',
        symbol: 'KLAY',
        decimals: 18,
    },
    rpcUrl: 'https://cypress.fandom.finance/archive',
    blockExplorerUrl: 'https://scope.klaytn.com',
};

export const Base: ChainInfo = {
    id: 8453,
    name: 'Base',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/base/native.png',
    fullname: 'Base Mainnet',
    network: 'Mainnet',
    website: 'https://base.org',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://developer-access-mainnet.base.org',
    blockExplorerUrl: 'https://basescan.org',
    features: [{ name: 'EIP1559' }],
};

export const GnosisTestnet: ChainInfo = {
    id: 10200,
    name: 'Gnosis',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/gnosis/native.png',
    fullname: 'Gnosis Testnet',
    network: 'Testnet',
    website: 'https://docs.gnosischain.com',
    nativeCurrency: {
        name: 'Gnosis',
        symbol: 'XDAI',
        decimals: 18,
    },
    rpcUrl: 'https://optimism.gnosischain.com',
    faucetUrl: 'https://gnosisfaucet.com',
    blockExplorerUrl: 'https://blockscout.com/gnosis/chiado',
    features: [{ name: 'EIP1559' }],
};

export const zkMetaTestnet: ChainInfo = {
    id: 12009,
    name: 'zkMeta',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/zkmeta/native.png',
    fullname: 'zkMeta Testnet',
    network: 'Testnet',
    website: 'https://satoshichain.net',
    nativeCurrency: {
        name: 'IDE',
        symbol: 'IDE',
        decimals: 18,
    },
    rpcUrl: 'https://pre-alpha-zkrollup-rpc.opside.network/era7',
    blockExplorerUrl: 'https://era7.zkevm.opside.info',
};

export const ReadONTestnet: ChainInfo = {
    id: 12015,
    name: 'ReadON',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/readon/native.png',
    fullname: 'ReadON Testnet',
    network: 'Testnet',
    website: 'https://opside.network',
    nativeCurrency: {
        name: 'READ',
        symbol: 'READ',
        decimals: 18,
    },
    rpcUrl: 'https://pre-alpha-zkrollup-rpc.opside.network/readon-content-test-chain',
    blockExplorerUrl: 'https://readon-content-test-chain.zkevm.opside.info',
};

export const MAPProtocol: ChainInfo = {
    id: 22776,
    name: 'MAPProtocol',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/mapprotocol/native.png',
    fullname: 'MAP Protocol',
    network: 'Mainnet',
    website: 'https://maplabs.io',
    nativeCurrency: {
        name: 'MAPO',
        symbol: 'MAPO',
        decimals: 18,
    },
    rpcUrl: 'https://rpc.maplabs.io',
    blockExplorerUrl: 'https://mapscan.io',
    features: [{ name: 'EIP1559' }],
};

export const ArbitrumOne: ChainInfo = {
    id: 42161,
    name: 'Arbitrum',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/arbitrum/native.png',
    fullname: 'Arbitrum One',
    network: 'Mainnet',
    website: 'https://arbitrum.io',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorerUrl: 'https://arbiscan.io',
    features: [{ name: 'EIP1559' }],
};

export const ArbitrumNova: ChainInfo = {
    id: 42170,
    name: 'Arbitrum',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/arbitrum/native.png',
    fullname: 'Arbitrum Nova',
    network: 'Mainnet',
    website: 'https://arbitrum.io',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://nova.arbitrum.io/rpc',
    blockExplorerUrl: 'https://nova.arbiscan.io',
    features: [{ name: 'EIP1559' }],
};

export const Celo: ChainInfo = {
    id: 42220,
    name: 'Celo',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/celo/native.png',
    fullname: 'Celo Mainnet',
    network: 'Mainnet',
    website: 'https://docs.celo.org',
    nativeCurrency: {
        name: 'Celo',
        symbol: 'CELO',
        decimals: 18,
    },
    rpcUrl: 'https://rpc.ankr.com/celo',
    blockExplorerUrl: 'https://explorer.celo.org/mainnet',
};

export const OasisEmeraldTestnet: ChainInfo = {
    id: 42261,
    name: 'OasisEmerald',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/oasisemerald/native.png',
    fullname: 'OasisEmerald Testnet',
    network: 'Testnet',
    website: 'https://docs.oasis.io/dapp/emerald',
    nativeCurrency: {
        name: 'OasisEmerald',
        symbol: 'ROSE',
        decimals: 18,
    },
    rpcUrl: 'https://testnet.emerald.oasis.dev',
    faucetUrl: 'https://faucet.testnet.oasis.dev',
    blockExplorerUrl: 'https://testnet.explorer.emerald.oasis.dev',
};

export const OasisEmerald: ChainInfo = {
    id: 42262,
    name: 'OasisEmerald',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/oasisemerald/native.png',
    fullname: 'OasisEmerald Mainnet',
    network: 'Mainnet',
    website: 'https://docs.oasis.io/dapp/emerald',
    nativeCurrency: {
        name: 'OasisEmerald',
        symbol: 'ROSE',
        decimals: 18,
    },
    rpcUrl: 'https://emerald.oasis.dev',
    blockExplorerUrl: 'https://explorer.emerald.oasis.dev',
};

export const AvalancheTestnet: ChainInfo = {
    id: 43113,
    name: 'Avalanche',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/avalanche/native.png',
    fullname: 'Avalanche Testnet',
    network: 'Testnet',
    website: 'https://cchain.explorer.avax-test.network',
    nativeCurrency: {
        name: 'AVAX',
        symbol: 'AVAX',
        decimals: 18,
    },
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    faucetUrl: 'https://faucet.avax.network',
    blockExplorerUrl: 'https://testnet.snowtrace.io',
    features: [{ name: 'EIP1559' }],
};

export const Avalanche: ChainInfo = {
    id: 43114,
    name: 'Avalanche',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/avalanche/native.png',
    fullname: 'Avalanche Mainnet',
    network: 'Mainnet',
    website: 'https://www.avax.network',
    nativeCurrency: {
        name: 'AVAX',
        symbol: 'AVAX',
        decimals: 18,
    },
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    blockExplorerUrl: 'https://snowtrace.io',
    features: [{ name: 'EIP1559' }],
};

export const CeloTestnet: ChainInfo = {
    id: 44787,
    name: 'Celo',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/celo/native.png',
    fullname: 'Celo Testnet',
    network: 'Testnet',
    website: 'https://docs.celo.org',
    nativeCurrency: {
        name: 'Celo',
        symbol: 'CELO',
        decimals: 18,
    },
    rpcUrl: 'https://alfajores-forno.celo-testnet.org',
    faucetUrl: ' https://celo.org/developers/faucet',
    blockExplorerUrl: 'https://explorer.celo.org/alfajores',
};

export const PGNSepolia: ChainInfo = {
    id: 58008,
    name: 'PGN',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/pgn/native.png',
    fullname: 'PGN Sepolia',
    network: 'Sepolia',
    website: 'https://publicgoods.network',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://sepolia.publicgoods.network',
    blockExplorerUrl: 'https://explorer.sepolia.publicgoods.network',
    features: [{ name: 'EIP1559' }],
};

export const LineaGoerli: ChainInfo = {
    id: 59140,
    name: 'Linea',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/linea/native.png',
    fullname: 'Linea Goerli',
    network: 'Goerli',
    website: 'https://linea.build',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://rpc.goerli.linea.build',
    faucetUrl: 'https://faucet.goerli.linea.build',
    blockExplorerUrl: 'https://goerli.lineascan.build',
    features: [{ name: 'EIP1559' }],
};

export const Linea: ChainInfo = {
    id: 59144,
    name: 'Linea',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/linea/native.png',
    fullname: 'Linea Mainnet',
    network: 'Mainnet',
    website: 'https://linea.build',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://linea-mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    blockExplorerUrl: 'https://explorer.linea.build',
    features: [{ name: 'EIP1559' }],
};

export const PolygonMumbai: ChainInfo = {
    id: 80001,
    name: 'Polygon',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/polygon/native.png',
    fullname: 'Polygon Mumbai',
    network: 'Mumbai',
    website: 'https://polygon.technology',
    nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
    },
    rpcUrl: 'https://matic-mumbai.chainstacklabs.com',
    faucetUrl: 'https://faucet.polygon.technology',
    blockExplorerUrl: 'https://mumbai.polygonscan.com',
    features: [{ name: 'EIP1559' }],
};

export const BaseGoerli: ChainInfo = {
    id: 84531,
    name: 'Base',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/base/native.png',
    fullname: 'Base Goerli',
    network: 'Goerli',
    website: 'https://base.org',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://base-goerli.public.blastapi.io',
    faucetUrl: 'https://bridge.base.org/deposit',
    blockExplorerUrl: 'https://goerli.basescan.org',
    features: [{ name: 'EIP1559' }],
};

export const ComboTestnet: ChainInfo = {
    id: 91715,
    name: 'Combo',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/combo/native.png',
    fullname: 'Combo Testnet',
    network: 'Testnet',
    website: 'https://docs.combonetwork.io',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
    },
    rpcUrl: 'https://test-rpc.combonetwork.io',
    blockExplorerUrl: 'https://combotrace-testnet.nodereal.io',
};

export const TaikoTestnet: ChainInfo = {
    id: 167005,
    name: 'Taiko',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/taiko/native.png',
    fullname: 'Taiko Testnet',
    network: 'Testnet',
    website: 'https://taiko.xyz',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://rpc.test.taiko.xyz',
    faucetUrl: 'https://bridge.test.taiko.xyz',
    blockExplorerUrl: 'https://explorer.test.taiko.xyz',
    features: [{ name: 'EIP1559' }],
};

export const PlatON: ChainInfo = {
    id: 210425,
    name: 'PlatON',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/platon/native.png',
    fullname: 'PlatON Mainnet',
    network: 'Mainnet',
    website: 'https://www.platon.network',
    nativeCurrency: {
        name: 'LAT',
        symbol: 'LAT',
        decimals: 18,
    },
    rpcUrl: 'https://openapi2.platon.network/rpc',
    blockExplorerUrl: 'https://scan.platon.network',
};

export const ArbitrumGoerli: ChainInfo = {
    id: 421613,
    name: 'Arbitrum',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/arbitrum/native.png',
    fullname: 'Arbitrum Goerli',
    network: 'Goerli',
    website: 'https://arbitrum.io',
    nativeCurrency: {
        name: 'Arbitrum Gorli Ether',
        symbol: 'AGOR',
        decimals: 18,
    },
    rpcUrl: 'https://goerli-rollup.arbitrum.io/rpc',
    faucetUrl: 'https://faucet.triangleplatform.com/arbitrum/goerli',
    blockExplorerUrl: 'https://goerli.arbiscan.io',
    features: [{ name: 'EIP1559' }],
};

export const ScrollAlphaTestnet: ChainInfo = {
    id: 534353,
    name: 'Scroll',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/scroll/native.png',
    fullname: 'Scroll Alpha Testnet',
    network: 'Testnet',
    website: 'https://scroll.io',
    nativeCurrency: {
        name: 'Scroll',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://alpha-rpc.scroll.io/l2',
    blockExplorerUrl: 'https://blockscout.scroll.io',
};

export const PlatONTestnet: ChainInfo = {
    id: 2206132,
    name: 'PlatON',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/platon/native.png',
    fullname: 'PlatON Testnet',
    network: 'Testnet',
    website: 'https://www.platon.network',
    nativeCurrency: {
        name: 'LAT',
        symbol: 'LAT',
        decimals: 18,
    },
    rpcUrl: 'https://devnetopenapi2.platon.network/rpc',
    faucetUrl: 'https://devnet2faucet.platon.network/faucet',
    blockExplorerUrl: 'https://devnet2scan.platon.network',
};

export const MantaTestnet: ChainInfo = {
    id: 3441005,
    name: 'Manta',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/manta/native.png',
    fullname: 'Manta Testnet',
    network: 'Testnet',
    website: 'https://manta.network',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://manta-testnet.calderachain.xyz/http',
    faucetUrl: 'https://pacific-info.manta.network',
    blockExplorerUrl: 'https://pacific-explorer.manta.network',
    features: [{ name: 'EIP1559' }],
};

export const Zora: ChainInfo = {
    id: 7777777,
    name: 'Zora',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/zora/native.png',
    fullname: 'Zora Mainnet',
    network: 'Mainnet',
    website: 'https://zora.energy',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://rpc.zora.energy',
    blockExplorerUrl: 'https://explorer.zora.energy',
    features: [{ name: 'EIP1559' }],
};

export const EthereumSepolia: ChainInfo = {
    id: 11155111,
    name: 'Ethereum',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/ethereum/native.png',
    fullname: 'Ethereum Sepolia',
    network: 'Sepolia',
    website: 'https://sepolia.otterscan.io',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://eth-sepolia.g.alchemy.com/v2/demo',
    faucetUrl: 'https://faucet.quicknode.com/drip',
    blockExplorerUrl: 'https://sepolia.etherscan.io',
    features: [{ name: 'EIP1559' }],
};

export const Tron: ChainInfo = {
    id: 728126428,
    name: 'Tron',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/tron/native.png',
    fullname: 'Tron Mainnet',
    network: 'Mainnet',
    website: 'https://tron.network',
    nativeCurrency: {
        name: 'TRX',
        symbol: 'TRX',
        decimals: 6,
    },
    rpcUrl: 'https://api.trongrid.io',
    blockExplorerUrl: 'https://tronscan.io',
};

export const Aurora: ChainInfo = {
    id: 1313161554,
    name: 'Aurora',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/aurora/native.png',
    fullname: 'Aurora Mainnet',
    network: 'Mainnet',
    website: 'https://aurora.dev',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://mainnet.aurora.dev',
    blockExplorerUrl: 'https://explorer.aurora.dev',
};

export const AuroraTestnet: ChainInfo = {
    id: 1313161555,
    name: 'Aurora',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/aurora/native.png',
    fullname: 'Aurora Testnet',
    network: 'Testnet',
    website: 'https://aurora.dev',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrl: 'https://testnet.aurora.dev',
    faucetUrl: 'https://aurora.dev/faucet',
    blockExplorerUrl: 'https://explorer.testnet.aurora.dev',
};

export const SKALENebula: ChainInfo = {
    id: 1482601649,
    name: 'Nebula',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/nebula/native.png',
    fullname: 'SKALE Nebula',
    network: 'Mainnet',
    website: 'https://mainnet.skalenodes.com',
    nativeCurrency: {
        name: 'sFUEL',
        symbol: 'sFUEL',
        decimals: 18,
    },
    rpcUrl: 'https://mainnet.skalenodes.com/v1/green-giddy-denebola',
    blockExplorerUrl: 'https://green-giddy-denebola.explorer.mainnet.skalenodes.com',
};

export const Harmony: ChainInfo = {
    id: 1666600000,
    name: 'Harmony',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/harmony/native.png',
    fullname: 'Harmony Mainnet',
    network: 'Mainnet',
    website: 'https://www.harmony.one',
    nativeCurrency: {
        name: 'ONE',
        symbol: 'ONE',
        decimals: 18,
    },
    rpcUrl: 'https://api.harmony.one',
    blockExplorerUrl: 'https://explorer.harmony.one',
};

export const HarmonyTestnet: ChainInfo = {
    id: 1666700000,
    name: 'Harmony',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/harmony/native.png',
    fullname: 'Harmony Testnet',
    network: 'Testnet',
    website: 'https://www.harmony.one',
    nativeCurrency: {
        name: 'ONE',
        symbol: 'ONE',
        decimals: 18,
    },
    rpcUrl: 'https://api.s0.b.hmny.io',
    faucetUrl: 'https://faucet.pops.one',
    blockExplorerUrl: 'https://explorer.pops.one',
};

export const TronShasta: ChainInfo = {
    id: 2494104990,
    name: 'Tron',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/tron/native.png',
    fullname: 'Tron Shasta',
    network: 'Shasta',
    website: 'https://www.trongrid.io/shasta',
    nativeCurrency: {
        name: 'TRX',
        symbol: 'TRX',
        decimals: 6,
    },
    rpcUrl: 'https://api.shasta.trongrid.io',
    blockExplorerUrl: 'https://shasta.tronscan.org',
};

export const TronNile: ChainInfo = {
    id: 3448148188,
    name: 'Tron',
    chainType: 'evm',
    icon: 'https://static.particle.network/token-list/tron/native.png',
    fullname: 'Tron Nile',
    network: 'Nile',
    website: 'https://nileex.io',
    nativeCurrency: {
        name: 'TRX',
        symbol: 'TRX',
        decimals: 6,
    },
    rpcUrl: 'https://nile.trongrid.io',
    faucetUrl: 'https://nileex.io/join/getJoinPage',
    blockExplorerUrl: 'https://nile.tronscan.org',
};

export const ParticleChains: {
    [key: string]: ChainInfo;
} = {
    'ethereum-1': Ethereum,
    'ethereum-5': EthereumGoerli,
    'optimism-10': Optimism,
    'thundercore-18': ThunderCoreTestnet,
    'cronos-25': Cronos,
    'bsc-56': BNBChain,
    'okc-65': OKTCTestnet,
    'okc-66': OKTC,
    'confluxespace-71': ConfluxeSpaceTestnet,
    'bsc-97': BNBChainTestnet,
    'gnosis-100': Gnosis,
    'solana-101': Solana,
    'solana-102': SolanaTestnet,
    'solana-103': SolanaDevnet,
    'thundercore-108': ThunderCore,
    'heco-128': Heco,
    'polygon-137': Polygon,
    'okbc-195': OKBCTestnet,
    'mapprotocol-212': MAPProtocolTestnet,
    'fantom-250': Fantom,
    'zksync-280': zkSyncEraTestnet,
    'kcc-321': KCC,
    'kcc-322': KCCTestnet,
    'zksync-324': zkSyncEra,
    'cronos-338': CronosTestnet,
    'optimism-420': OptimismGoerli,
    'pgn-424': PGN,
    'metis-599': MetisGoerli,
    'zora-999': ZoraGoerli,
    'klaytn-1001': KlaytnTestnet,
    'confluxespace-1030': ConfluxeSpace,
    'metis-1088': Metis,
    'polygonzkevm-1101': PolygonzkEVM,
    'moonbeam-1284': Moonbeam,
    'moonriver-1285': Moonriver,
    'moonbeam-1287': MoonbeamTestnet,
    'polygonzkevm-1442': PolygonzkEVMTestnet,
    'fantom-4002': FantomTestnet,
    'mantle-5000': Mantle,
    'mantle-5001': MantleTestnet,
    'opbnb-5611': opBNBTestnet,
    'klaytn-8217': Klaytn,
    'base-8453': Base,
    'gnosis-10200': GnosisTestnet,
    'zkmeta-12009': zkMetaTestnet,
    'readon-12015': ReadONTestnet,
    'mapprotocol-22776': MAPProtocol,
    'arbitrum-42161': ArbitrumOne,
    'arbitrum-42170': ArbitrumNova,
    'celo-42220': Celo,
    'oasisemerald-42261': OasisEmeraldTestnet,
    'oasisemerald-42262': OasisEmerald,
    'avalanche-43113': AvalancheTestnet,
    'avalanche-43114': Avalanche,
    'celo-44787': CeloTestnet,
    'pgn-58008': PGNSepolia,
    'linea-59140': LineaGoerli,
    'linea-59144': Linea,
    'polygon-80001': PolygonMumbai,
    'base-84531': BaseGoerli,
    'combo-91715': ComboTestnet,
    'taiko-167005': TaikoTestnet,
    'platon-210425': PlatON,
    'arbitrum-421613': ArbitrumGoerli,
    'scroll-534353': ScrollAlphaTestnet,
    'platon-2206132': PlatONTestnet,
    'manta-3441005': MantaTestnet,
    'zora-7777777': Zora,
    'ethereum-11155111': EthereumSepolia,
    'tron-728126428': Tron,
    'aurora-1313161554': Aurora,
    'aurora-1313161555': AuroraTestnet,
    'nebula-1482601649': SKALENebula,
    'harmony-1666600000': Harmony,
    'harmony-1666700000': HarmonyTestnet,
    'tron-2494104990': TronShasta,
    'tron-3448148188': TronNile,
};
// template code end