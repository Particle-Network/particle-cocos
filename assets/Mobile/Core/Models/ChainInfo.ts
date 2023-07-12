export class ChainInfo {
    public chain_name: string;
    public chain_id: number;
    public chain_id_name: string;

    public constructor(chain_name: string, chain_id: number, chain_id_name: string) {
        this.chain_name = chain_name;
        this.chain_id = chain_id;
        this.chain_id_name = chain_id_name;
    }
    public static SolanaMainnet = new ChainInfo('Solana', 101, 'Mainnet');
    public static SolanaTestnet = new ChainInfo('Solana', 102, 'Testnet');
    public static SolanaDevnet = new ChainInfo('Solana', 103, 'Devnet');

    // EVM
    public static EthereumMainnet = new ChainInfo('Ethereum', 1, 'Mainnet');
    public static EthereumGoerli = new ChainInfo('Ethereum', 5, 'Goerli');
    public static EthereumSepolia = new ChainInfo('Ethereum', 11155111, 'Sepolia');
    
    public static BSCMainnet = new ChainInfo('BSC', 56, 'Mainnet');
    public static BSCTestnet = new ChainInfo('BSC', 97, 'Testnet');
    public static PolygonMainnet = new ChainInfo('Polygon', 137, 'Mainnet');
    public static PolygonMumbai = new ChainInfo('Polygon', 80001, 'Mumbai');
    public static AvalancheMainnet = new ChainInfo('Avalanche', 43114, 'Mainnet');
    public static AvalancheTestnet = new ChainInfo('Avalanche', 43113, 'Testnet');
    public static FantomMainnet = new ChainInfo('Fantom', 250, 'Mainnet');
    public static FantomTestnet = new ChainInfo('Fantom', 4002, 'Testnet');
    public static ArbitrumOne = new ChainInfo('Arbitrum', 42161, 'One');
    public static ArbitrumNova = new ChainInfo('Arbitrum', 42170, 'Nova');
    public static ArbitrumGoerli = new ChainInfo('Arbitrum', 421613, 'Goerli');
    public static MoonbeamMainnet = new ChainInfo('Moonbeam', 1284, 'Mainnet');
    public static MoonbeamTestnet = new ChainInfo('Moonbeam', 1287, 'Testnet');
    public static MoonriverMainnet = new ChainInfo('Moonriver', 1285, 'Mainnet');
    public static MoonriverTestnet = new ChainInfo('Moonriver', 1287, 'Testnet');
    public static HecoMainnet = new ChainInfo('Heco', 128, 'Mainnet');
    public static AuroraMainnet = new ChainInfo('Aurora', 1313161554, 'Mainnet');
    public static AuroraTestnet = new ChainInfo('Aurora', 1313161555, 'Testnet');
    public static HarmonyMainnet = new ChainInfo('Harmony', 1666600000, 'Mainnet');
    public static HarmonyTestnet = new ChainInfo('Harmony', 1666700000, 'Testnet');
    public static KCCMainnet = new ChainInfo('KCC', 321, 'Mainnet');
    public static KCCTestnet = new ChainInfo('KCC', 322, 'Testnet');
    public static OptimismMainnet = new ChainInfo('Optimism', 10, 'Mainnet');
    public static OptimismGoerli = new ChainInfo('Optimism', 420, 'Goerli');
    public static PlatonMainnet = new ChainInfo('Platon', 210425, 'Mainnet');
    public static PlatonTestnet = new ChainInfo('Platon', 2206132, 'Testnet');

    public static TronMainnet = new ChainInfo('Tron', 728126428, 'Mainnet');
    public static TronShasta = new ChainInfo('Tron', 2494104990, 'Shasta');
    public static TronNile = new ChainInfo('Tron', 3448148188, 'Shasta');

    public static ThunderCoreMainnet = new ChainInfo('ThunderCore', 108, 'Mainnet');
    public static ThunderCoreTestnet = new ChainInfo('ThunderCore', 18, 'Testnet');
    public static CronosMainnet = new ChainInfo('Cronos', 25, 'Mainnet');
    public static CronosTestnet = new ChainInfo('Cronos', 338, 'Testnet');
    public static OasisEmeraldMainnet = new ChainInfo('OasisEmerald', 42262, 'Mainnet');
    public static OasisEmeraldTestnet = new ChainInfo('OasisEmerald', 42261, 'Testnet');
    public static GnosisMainnet = new ChainInfo('Gnosis', 100, 'Mainnet');
    public static GnosisTestnet = new ChainInfo('Gnosis', 10200, 'Testnet');

    public static CeloMainnet = new ChainInfo('Celo', 42220, 'Mainnet');
    public static CeloTestnet = new ChainInfo('Celo', 44787, 'Testnet');
    public static KlaytnMainnet = new ChainInfo('Klaytn', 8217, 'Mainnet');
    public static KlaytnTestnet = new ChainInfo('Klaytn', 1001, 'Testnet');
    public static ScrollTestnet = new ChainInfo('Scroll', 534353, 'Testnet');
    public static ZkSyncMainnet = new ChainInfo('ZkSync', 324, 'Mainnet');
    public static ZkSyncTestnet = new ChainInfo('ZkSync', 280, 'Testnet');
    public static MetisMainnet = new ChainInfo('Metis', 1088, 'Mainnet');
    public static MetisTestnet = new ChainInfo('Metis', 599, 'Testnet');

    public static ConfluxESpaceMainnet = new ChainInfo('ConfluxESpace', 1030, 'Mainnet');
    public static ConfluxESpaceTestnet = new ChainInfo('ConfluxESpace', 71, 'Testnet');
    public static MapoMainnet = new ChainInfo('Mapo', 22776, 'Mainnet');
    public static MapoTestnet = new ChainInfo('Mapo', 212, 'Testnet');
    public static PolygonZkEVMMainnet = new ChainInfo('PolygonZkEVM', 1101, 'Mainnet');
    public static PolygonZkEVMTestnet = new ChainInfo('PolygonZkEVM', 1442, 'Testnet');

    public static BaseTestnet = new ChainInfo('Base', 84531, 'Testnet');
    public static LineaGoerli = new ChainInfo('Linea', 59140, 'Goerli');
    public static ComboTestnet = new ChainInfo('Combo', 91715, 'Testnet');
    public static MantleTestnet = new ChainInfo('Mantle', 5001, 'Testnet');
    public static ZkMetaTestnet = new ChainInfo('ZkMeta', 12009, 'Testnet');

    public static OpBNBTestnet = new ChainInfo('OpBNB', 5611, 'Testnet');
    public static OKBCTestnet = new ChainInfo('OKBC', 195, 'Testnet');
    public static TaikoTestnet = new ChainInfo('Taiko', 167005, 'Testnet');

    
}
