//
//  ParticleWalletPlugin.swift
//  ParticleWallettExample
//
//  Created by link on 2022/9/28.
//

import Foundation
import ParticleNetworkBase
import ParticleWalletGUI
import RxSwift
import SwiftyJSON

@objc(ParticleWalletPlugin)
public class ParticleWalletPlugin: NSObject {
    let bag = DisposeBag()
    
    @objc static let shared = ParticleWalletPlugin()
    
    @objc
    public func enablePay(_ enable: String) {
        ParticleWalletGUI.enablePay(enable == "1")
    }
    
    @objc
    public func getEnablePay(_ callback: @escaping CocosResponseCallbackBlock) {
        callback([ParticleWalletGUI.getEnablePay() == true ? "1" : "0"])
    }
    
    @objc
    public func navigatorWallet(_ display: String) {
        
        if display == "0" {
            PNRouter.navigatorWallet(display: .token)
        } else {
            PNRouter.navigatorWallet(display: .nft)
        }
    }
    
    @objc
    public func navigatorTokenReceive(_ json: String?) {
        PNRouter.navigatorTokenReceive(tokenReceiveConfig: TokenReceiveConfig(tokenAddress: json))
    }
    
    @objc
    public func navigatorTokenSend(_ json: String?) {
        if let json = json {
            let data = JSON(parseJSON: json)
            let tokenAddress = data["token_address"].string
            let toAddress = data["to_address"].string
            let amount = data["amount"].string
            let config = TokenSendConfig(tokenAddress: tokenAddress, toAddress: toAddress, amountString: amount)
            
            PNRouter.navigatorTokenSend(tokenSendConfig: config)
        } else {
            PNRouter.navigatorTokenSend()
        }
    }
    
    @objc
    public func navigatorTokenTransactionRecords(_ json: String?) {
        if let json = json {
            let config = TokenTransactionRecordsConfig(tokenAddress: json)
            PNRouter.navigatorTokenTransactionRecords(tokenTransactionRecordsConfig: config)
        } else {
            PNRouter.navigatorTokenTransactionRecords()
        }
    }
    
    @objc
    public func navigatorNFTSend(_ json: String) {
        let data = JSON(parseJSON: json)
        let address = data["mint"].stringValue
        let tokenId = data["token_id"].stringValue
        let toAddress = data["receiver_address"].string
        let amount = data["amount"].int
        let config = NFTSendConfig(address: address, toAddress: toAddress, tokenId: tokenId, amount: BInt(amount ?? 1))
        PNRouter.navigatorNFTSend(nftSendConfig: config)
    }
    
    @objc
    public func navigatorNFTDetails(_ json: String) {
        let data = JSON(parseJSON: json)
        let address = data["mint"].stringValue
        let tokenId = data["token_id"].stringValue
        let config = NFTDetailsConfig(address: address, tokenId: tokenId)
        PNRouter.navigatorNFTDetails(nftDetailsConfig: config)
    }
    
    @objc
    public func navigatorBuyCrypto(_ json: String?) {
        if json == nil {
            PNRouter.navigatorBuy()
        } else {
            let data = JSON(parseJSON: json!)
            let walletAddress = data["wallet_address"].string
            let networkString = data["network"].stringValue.lowercased()
            var network: OpenBuyNetwork?
            
            if networkString == "solana" {
                network = .solana
            } else if networkString == "ethereum" {
                network = .ethereum
            } else if networkString == "binancesmartchain" {
                network = .binanceSmartChain
            } else if networkString == "optimism" {
                network = .optimism
            } else if networkString == "polygon" {
                network = .polygon
            } else if networkString == "tron" {
                network = .tron
            } else if networkString == "arbitrumOne" {
                network = .arbitrumOne
            } else {
                network = nil
            }
            let fiatCoin = data["fiat_coin"].string
            let fiatAmt = data["fiat_amt"].int
            let cryptoCoin = data["crypto_coin"].string
            let fixCryptoCoin = data["fix_crypto_coin"].boolValue
            let fixFiatAmt = data["fix_fiat_amt"].boolValue
            let fixFiatCoin = data["fix_fiat_coin"].boolValue
            let theme = data["theme"].stringValue.lowercased()
            let language = self.getLanguage(from: data["language"].stringValue.lowercased())

            var buyConfig = BuyCryptoConfig()
            buyConfig.network = network
            buyConfig.walletAddress = walletAddress
            buyConfig.cryptoCoin = cryptoCoin
            buyConfig.fiatAmt = fiatAmt
            if fiatCoin != nil {
                buyConfig.fiatCoin = fiatCoin!
            }
            buyConfig.fixCryptoCoin = fixCryptoCoin
            buyConfig.fixFiatCoin = fixFiatCoin
            buyConfig.fixFiatAmt = fixFiatAmt
            buyConfig.theme = theme
            buyConfig.language = language.webString

            PNRouter.navigatorBuy(buyCryptoConfig: buyConfig)
        }
    }
    
    @objc
    public func navigatorSwap(_ json: String?) {
        if let json = json {
            let data = JSON(parseJSON: json)
            let fromTokenAddress = data["from_token_address"].string
            let toTokenAddress = data["to_token_address"].string
            let amount = data["amount"].string
            let config = SwapConfig(fromTokenAddress: fromTokenAddress, toTokenAddress: toTokenAddress, fromTokenAmountString: amount)
            
            PNRouter.navigatorSwap(swapConfig: config)
        } else {
            PNRouter.navigatorSwap()
        }
    }
    
    @objc
    public func showTestNetwork(_ isShow: String) {
        ParticleWalletGUI.showTestNetwork(isShow == "1")
    }
    
    @objc
    public func showManageWallet(_ isShow: String) {
        ParticleWalletGUI.showManageWallet(isShow == "1")
    }
    
    @objc
    public func supportChain(_ json: String) {
        let chains = JSON(parseJSON: json).arrayValue.map {
            $0["chain_id"].intValue
        }.compactMap {
            ParticleNetwork.searchChainInfo(by: $0)?.chain
        }
        ParticleWalletGUI.supportChain(chains)
    }
    
    @objc
    public func enableSwap(_ enable: String) {
        ParticleWalletGUI.enableSwap(enable == "1")
    }
    
    @objc
    public func getEnableSwap(_ callback: @escaping CocosResponseCallbackBlock) {
        callback([ParticleWalletGUI.getEnableSwap() == true ? "1" : "0"])
    }
    
    @objc
    public func navigatorLoginList(_ callback: @escaping CocosResponseCallbackBlock) {
        PNRouter.navigatorLoginList().subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            case .success(let (walletType, account)):
                guard let account = account else { return }
                
                let loginListModel = CocosLoginListModel(walletType: walletType.stringValue, account: account)
                let statusModel = CocosStatusModel(status: true, data: loginListModel)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func switchWallet(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let walletTypeString = data["wallet_type"].stringValue
        let publicAddress = data["public_address"].stringValue
        
        if let walletType = map2WalletType(from: walletTypeString) {
            let result = ParticleWalletGUI.switchWallet(walletType: walletType, publicAddress: publicAddress)
            
            let statusModel = CocosStatusModel(status: true, data: result == true ? "success" : "failed")
            
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
        } else {
            print("walletType \(walletTypeString) is not existed")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not existed", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
        }
    }
    
    @objc
    public func setLanguage(_ json: String) {
        let language = self.getLanguage(from: json)
        ParticleWalletGUI.setLanguage(language)
    }
    
    private func getLanguage(from json: String) -> Language {
        /*
         en,
         zh_hans,
         zh_hant,
         ja,
         ko
         */
        var language: Language = .en
        if json.lowercased() == "en" {
            language = .en
        } else if json.lowercased() == "zh_hans" {
            language = .zh_Hans
        } else if json.lowercased() == "zh_hant" {
            language = .zh_Hant
        } else if json.lowercased() == "ja" {
            language = .ja
        } else if json.lowercased() == "ko" {
            language = .ko
        }
        return language
    }
    
    @objc
    public func supportWalletConnect(_ enable: String) {
        ParticleWalletGUI.supportWalletConnect(enable == "1")
    }
    
    @objc
    public func setDisplayTokenAddresses(_ json: String) {
        let data = JSON(parseJSON: json)
        let tokenAddresses = data.arrayValue.map {
            $0.stringValue
        }
        ParticleWalletGUI.setDisplayTokenAddresses(tokenAddresses)
    }
    
    @objc
    public func setDisplayNFTContractAddresses(_ json: String) {
        let data = JSON(parseJSON: json)
        let nftContractAddresses = data.arrayValue.map {
            $0.stringValue
        }
        ParticleWalletGUI.setDisplayNFTContractAddresses(nftContractAddresses)
    }

    @objc
    public func setPriorityTokenAddresses(_ json: String) {
        let data = JSON(parseJSON: json)
        let tokenAddresses = data.arrayValue.map {
            $0.stringValue
        }
        ParticleWalletGUI.setPriorityTokenAddresses(tokenAddresses)
    }
    
    @objc
    public func setPriorityNFTContractAddresses(_ json: String) {
        let data = JSON(parseJSON: json)
        let nftContractAddresses = data.arrayValue.map {
            $0.stringValue
        }
        ParticleWalletGUI.setPriorityNFTContractAddresses(nftContractAddresses)
    }
    
    @objc
    public func showLanguageSetting(_ isShow: String) {
        ParticleWalletGUI.showLanguageSetting(isShow == "1")
    }
    
    @objc
    public func showAppearanceSetting(_ isShow: String) {
        ParticleWalletGUI.showAppearanceSetting(isShow == "1")
    }
    
    @objc
    public func setSupportAddToken(_ isShow: String) {
        ParticleWalletGUI.setSupportAddToken(isShow == "1")
    }
    
    @objc
    public func setFiatCoin(_ json: String) {
        /*
         USD,
         CNY,
         JPY,
         HKD,
         INR,
         KRW
         */
        ParticleNetwork.setFiatCoin(.init(rawValue: json) ?? .usd)
    }
    
}
