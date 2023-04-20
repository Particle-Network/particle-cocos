export enum WalletType {
    Particle = "Particle",
    EvmPrivateKey = "EvmPrivateKey",
    SolanaPrivateKey = "SolanaPrivateKey",
    MetaMask = "MetaMask",
    Rainbow = "Rainbow",
    Trust = "Trust",
    ImToken = "ImToken",
    BitKeep = "BitKeep",
    WalletConnect = "WalletConnect",
    Phantom = "Phantom",
    Zerion = "Zerion",
    Math = "Math",
    Omni = "Omni",
    Zengo = "Zengo",
    Alpha = "Alpha",
    Bitpie = "Bitpie",
    Inch1 = "Inch1",
    TokenPocket = "TokenPocket" // iOS not support

    
}

export function getAllWalletTypes() {
    let array =  [WalletType.Particle, WalletType.MetaMask, WalletType.Rainbow, WalletType.Trust, WalletType.ImToken, WalletType.BitKeep, WalletType.WalletConnect, WalletType.Phantom, WalletType.Zerion,WalletType.Math, WalletType.Omni, WalletType.MetaMask, WalletType.Zengo,  WalletType.Alpha, WalletType.Bitpie, WalletType.Inch1, WalletType.TokenPocket ]
    return array;
}
