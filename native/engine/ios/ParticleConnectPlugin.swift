//
//  ParticleConnect.swift
//
//  Created by link on 2022/9/28.
//

import Foundation
import ParticleConnect
import ParticleNetworkBase
#if canImport(ConnectEVMAdapter)
import ConnectEVMAdapter
#endif

#if canImport(ConnectSolanaAdapter)
import ConnectSolanaAdapter
#endif

#if canImport(ConnectPhantomAdapter)
import ConnectPhantomAdapter
#endif

#if canImport(ConnectWalletConnectAdapter)
import ConnectWalletConnectAdapter
#endif
import ConnectCommon
import ParticleAuthService
import RxSwift
import SwiftyJSON

@objc(ParticleConnectSchemeManager)
public class ParticleConnectSchemeManager: NSObject {
    @objc static func handleUrl(_ url: URL) -> Bool {
        return ParticleConnect.handleUrl(url)
    }
}

@objc(ParticleConnectPlugin)
class ParticleConnectPlugin: NSObject {
    let bag = DisposeBag()
    
    @objc static let shared = ParticleConnectPlugin()
    
    @objc
    public func initialize(_ json: String) {
        let data = JSON(parseJSON: json)
        let chainName = data["chain_name"].stringValue.lowercased()
        let chainId = data["chain_id"].intValue
        guard let chainInfo = ParticleNetwork.searchChainInfo(by: chainId) else {
            return print("initialize error, can't find right chain for \(chainName), chainId \(chainId)")
        }
        let env = data["env"].stringValue.lowercased()
        var devEnv: ParticleNetwork.DevEnvironment = .production
        
        if env == "dev" {
            devEnv = .debug
        } else if env == "staging" {
            devEnv = .staging
        } else if env == "production" {
            devEnv = .production
        }
        
        let dAppName = data["metadata"]["name"].stringValue
        let dAppIconString = data["metadata"]["icon"].stringValue
        let dAppUrlString = data["metadata"]["url"].stringValue
        let dAppDescription = data["metadata"]["description"].stringValue
        let walletConnectProjectId = data["metadata"]["walletConnectProjectId"].stringValue
        let dAppIconUrl = URL(string: dAppIconString) != nil ? URL(string: dAppIconString)! : URL(string: "https://connect.particle.network/icons/512.png")!
        
        let dAppUrl = URL(string: dAppUrlString) != nil ? URL(string: dAppUrlString)! : URL(string: "https://connect.particle.network")!
        
        let dAppData = DAppMetaData(name: dAppName, icon: dAppIconUrl, url: dAppUrl, description: dAppDescription)
        
        var adapters: [ConnectAdapter] = [ParticleConnectAdapter()]
#if canImport(ConnectEVMAdapter)
        let evmRpcUrl = data["rpc_url"]["evm_url"].stringValue
        if evmRpcUrl.isEmpty {
            adapters.append(EVMConnectAdapter())
        } else {
            adapters.append(EVMConnectAdapter(rpcUrl: evmRpcUrl))
        }
#endif
        
#if canImport(ConnectSolanaAdapter)
        let solanaRpcUrl = data["rpc_url"]["sol_url"].stringValue
        if solanaRpcUrl.isEmpty {
            adapters.append(SolanaConnectAdapter())
        } else {
            adapters.append(SolanaConnectAdapter(rpcUrl: solanaRpcUrl))
        }
#endif
        
#if canImport(ConnectPhantomAdapter)
        adapters.append(PhantomConnectAdapter())
#endif
        
#if canImport(ConnectWalletConnectAdapter)
        adapters.append(MetaMaskConnectAdapter())
        adapters.append(RainbowConnectAdapter())
        adapters.append(BitkeepConnectAdapter())
        adapters.append(ImtokenConnectAdapter())
        adapters.append(WalletConnectAdapter())
        adapters.append(TrustConnectAdapter())
        
        let moreAdapterClasses: [WalletConnectAdapter.Type] =
            [ZerionConnectAdapter.self,
             MathConnectAdapter.self,
             OmniConnectAdapter.self,
             Inch1ConnectAdapter.self,
             ZengoConnectAdapter.self,
             AlphaConnectAdapter.self,
             BitpieConnectAdapter.self]

        adapters.append(contentsOf: moreAdapterClasses.map {
            $0.init()
        })
#endif
        
        ParticleConnect.initialize(env: devEnv, chainInfo: chainInfo, dAppData: dAppData) {
            adapters
        }
        
        ParticleConnect.setWalletConnectV2ProjectId(walletConnectProjectId)
    }
    
    @objc
    public func getAccounts(_ json: String, callback: CocosResponseCallbackBlock) {
        let walletTypeString = json
        guard let walletType = map2WalletType(from: walletTypeString) else {
            print("walletType \(walletTypeString) is not existed")
//            rejecter("", "walletType \(walletTypeString) is not existed", nil)
            callback([])
            return
        }
        
        guard let adapter = map2ConnectAdapter(from: walletType) else {
            print("adapter for \(walletTypeString) is not init")
            callback([])
            return
        }
        
        let accounts = adapter.getAccounts()
        let statusModel = CocosStatusModel(status: true, data: accounts)
        let data = try! JSONEncoder().encode(statusModel)
        let json = String(data: data, encoding: .utf8) ?? ""
        callback([json])
    }
    
    @objc
    public func connect(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let walletTypeString = data["wallet_type"].stringValue
        
        var connectConfig: ParticleConnectConfig?
        
        let configJson = data["config"]
        let loginType = LoginType(rawValue: configJson["login_type"].stringValue.lowercased()) ?? .email
        var supportAuthTypeArray: [SupportAuthType] = []
            
        let array = configJson["support_auth_type_values"].arrayValue.map {
            $0.stringValue.lowercased()
        }
        if array.contains("all") {
            supportAuthTypeArray = [.all]
        } else {
            array.forEach {
                if $0 == "email" {
                    supportAuthTypeArray.append(.email)
                } else if $0 == "phone" {
                    supportAuthTypeArray.append(.phone)
                } else if $0 == "apple" {
                    supportAuthTypeArray.append(.apple)
                } else if $0 == "google" {
                    supportAuthTypeArray.append(.google)
                } else if $0 == "facebook" {
                    supportAuthTypeArray.append(.facebook)
                } else if $0 == "github" {
                    supportAuthTypeArray.append(.github)
                } else if $0 == "twitch" {
                    supportAuthTypeArray.append(.twitch)
                } else if $0 == "microsoft" {
                    supportAuthTypeArray.append(.microsoft)
                } else if $0 == "linkedin" {
                    supportAuthTypeArray.append(.linkedin)
                } else if $0 == "discord" {
                    supportAuthTypeArray.append(.discord)
                } else if $0 == "twitter" {
                    supportAuthTypeArray.append(.twitter)
                }
            }
        }
            
        var account = configJson["account"].string
            
        if account != nil, account!.isEmpty {
            account = nil
        }
            
        let loginFormMode = configJson["login_form_mode"].boolValue
        connectConfig = ParticleConnectConfig(loginType: loginType, supportAuthType: supportAuthTypeArray, loginFormMode: loginFormMode, phoneOrEmailAccount: account)
        
        guard let walletType = map2WalletType(from: walletTypeString) else {
            print("walletType \(walletTypeString) is not existed")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not existed", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        guard let adapter = map2ConnectAdapter(from: walletType) else {
            print("adapter for \(walletTypeString) is not init")
            let response = CocosResponseError(code: nil, message: "adapter for \(walletTypeString) is not init", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        guard let vc = UIViewController.topMost else {
            return
        }
        
        var observable: Single<Account?>
        if walletType == .walletConnect {
            observable = (adapter as! WalletConnectAdapter).connectWithQrCode(from: vc)
        } else if walletType == .particle {
            observable = adapter.connect(connectConfig)
        } else {
            observable = adapter.connect(ConnectConfig.none)
        }
        
        observable.subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            case .success(let account):
                guard let account = account else { return }
                let statusModel = CocosStatusModel(status: true, data: account)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func disconnect(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let walletTypeString = data["wallet_type"].stringValue
        let publicAddress = data["public_address"].stringValue
        
        guard let walletType = map2WalletType(from: walletTypeString) else {
            print("walletType \(walletTypeString) is not existed ")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not existed", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        guard let adapter = map2ConnectAdapter(from: walletType) else {
            print("adapter for \(walletTypeString) is not init")
            let response = CocosResponseError(code: nil, message: "adapter for \(walletTypeString) is not init", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        adapter.disconnect(publicAddress: publicAddress).subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            case .success(let success):
                let statusModel = CocosStatusModel(status: true, data: success)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func setWalletConnectV2SupportChainInfos(_ json: String) {
        let chainInfos = JSON(parseJSON: json).arrayValue.map {
            $0["chain_id"].intValue
        }.compactMap {
            ParticleNetwork.searchChainInfo(by: $0)
        }
        ParticleConnect.setWalletConnectV2SupportChainInfos(chainInfos)
    }
    
    @objc
    public func isConnected(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let walletTypeString = data["wallet_type"].stringValue
        let publicAddress = data["public_address"].stringValue
        
        guard let walletType = map2WalletType(from: walletTypeString) else {
            print("walletType \(walletTypeString) is not existed ")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not existed", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        guard let adapter = map2ConnectAdapter(from: walletType) else {
            print("adapter for \(walletTypeString) is not init")
            let response = CocosResponseError(code: nil, message: "adapter for \(walletTypeString) is not init", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        let result = adapter.isConnected(publicAddress: publicAddress) == true ? "1" : "0"
        let statusModel = CocosStatusModel(status: false, data: result)
        let model = try! JSONEncoder().encode(statusModel)
        guard let json = String(data: model, encoding: .utf8) else { return }
        
        callback([json])
    }
    
    @objc
    public func signAndSendTransaction(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let walletTypeString = data["wallet_type"].stringValue
        let publicAddress = data["public_address"].stringValue.toChecksumAddress()
        let transaction = data["transaction"].stringValue
        
        guard let walletType = map2WalletType(from: walletTypeString) else {
            print("walletType \(walletTypeString) is not existed ")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not existed", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        guard let adapter = map2ConnectAdapter(from: walletType) else {
            print("adapter for \(walletTypeString) is not init")
            let response = CocosResponseError(code: nil, message: "adapter for \(walletTypeString) is not init", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        adapter.signAndSendTransaction(publicAddress: publicAddress, transaction: transaction).subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            case .success(let signature):
                let statusModel = CocosStatusModel(status: true, data: signature)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func signTransaction(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let walletTypeString = data["wallet_type"].stringValue
        let publicAddress = data["public_address"].stringValue
        let transaction = data["transaction"].stringValue
        
        guard let walletType = map2WalletType(from: walletTypeString) else {
            print("walletType \(walletTypeString) is not existed ")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not existed", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        guard let adapter = map2ConnectAdapter(from: walletType) else {
            print("adapter for \(walletTypeString) is not init")
            let response = CocosResponseError(code: nil, message: "adapter for \(walletTypeString) is not init", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        adapter.signTransaction(publicAddress: publicAddress, transaction: transaction).subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            case .success(let signed):
                let statusModel = CocosStatusModel(status: true, data: signed)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func signAllTransactions(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let walletTypeString = data["wallet_type"].stringValue
        let publicAddress = data["public_address"].stringValue
        let transactions = data["transactions"].arrayValue.map {
            $0.stringValue
        }
        
        guard let walletType = map2WalletType(from: walletTypeString) else {
            print("walletType \(walletTypeString) is not existed ")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not existed", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        guard let adapter = map2ConnectAdapter(from: walletType) else {
            print("adapter for \(walletTypeString) is not init")
            let response = CocosResponseError(code: nil, message: "adapter for \(walletTypeString) is not init", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        adapter.signAllTransactions(publicAddress: publicAddress, transactions: transactions).subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            case .success(let signed):
                let statusModel = CocosStatusModel(status: true, data: signed)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func signMessage(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let walletTypeString = data["wallet_type"].stringValue
        let publicAddress = data["public_address"].stringValue
        let message = data["message"].stringValue
        
        guard let walletType = map2WalletType(from: walletTypeString) else {
            print("walletType \(walletTypeString) is not existed ")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not existed", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        guard let adapter = map2ConnectAdapter(from: walletType) else {
            print("adapter for \(walletTypeString) is not init")
            let response = CocosResponseError(code: nil, message: "adapter for \(walletTypeString) is not init", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        adapter.signMessage(publicAddress: publicAddress, message: message).subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            case .success(let signed):
                let statusModel = CocosStatusModel(status: true, data: signed)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func signTypedData(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let walletTypeString = data["wallet_type"].stringValue
        let publicAddress = data["public_address"].stringValue
        let message = data["message"].stringValue
        
        guard let walletType = map2WalletType(from: walletTypeString) else {
            print("walletType \(walletTypeString) is not existed ")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not existed", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        guard let adapter = map2ConnectAdapter(from: walletType) else {
            print("adapter for \(walletTypeString) is not init")
            let response = CocosResponseError(code: nil, message: "adapter for \(walletTypeString) is not init", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        adapter.signTypedData(publicAddress: publicAddress, data: message).subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            case .success(let signed):
                let statusModel = CocosStatusModel(status: true, data: signed)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func importPrivateKey(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let walletTypeString = data["wallet_type"].stringValue
        let privateKey = data["private_key"].stringValue
        
        guard let walletType = map2WalletType(from: walletTypeString) else {
            print("walletType \(walletTypeString) is not existed ")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not existed", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        guard let adapter = map2ConnectAdapter(from: walletType) else {
            print("adapter for \(walletTypeString) is not init")
            let response = CocosResponseError(code: nil, message: "adapter for \(walletTypeString) is not init", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        guard walletType == WalletType.evmPrivateKey || walletType == WalletType.solanaPrivateKey else {
            print("walletType \(walletTypeString) is not support import from private key")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not support import from private key", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            
            return
        }
        
        (adapter as! LocalAdapter).importWalletFromPrivateKey(privateKey).subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            case .success(let account):
                guard let account = account else { return }
                let statusModel = CocosStatusModel(status: true, data: account)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func importMnemonic(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let walletTypeString = data["wallet_type"].stringValue
        let mnemonic = data["mnemonic"].stringValue
        
        guard let walletType = map2WalletType(from: walletTypeString) else {
            print("walletType \(walletTypeString) is not existed ")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not existed", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        guard let adapter = map2ConnectAdapter(from: walletType) else {
            print("adapter for \(walletTypeString) is not init")
            let response = CocosResponseError(code: nil, message: "adapter for \(walletTypeString) is not init", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        guard walletType == WalletType.evmPrivateKey || walletType == WalletType.solanaPrivateKey else {
            print("walletType \(walletTypeString) is not support import from private key")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not support import from private key", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            
            return
        }
        
        (adapter as! LocalAdapter).importWalletFromMnemonic(mnemonic).subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            case .success(let account):
                guard let account = account else { return }
                let statusModel = CocosStatusModel(status: true, data: account)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func exportPrivateKey(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let walletTypeString = data["wallet_type"].stringValue
        let publicAddress = data["public_address"].stringValue
        
        guard let walletType = map2WalletType(from: walletTypeString) else {
            print("walletType \(walletTypeString) is not existed ")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not existed", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        guard let adapter = map2ConnectAdapter(from: walletType) else {
            print("adapter for \(walletTypeString) is not init")
            let response = CocosResponseError(code: nil, message: "adapter for \(walletTypeString) is not init", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        guard walletType == WalletType.evmPrivateKey || walletType == WalletType.solanaPrivateKey else {
            print("walletType \(walletTypeString) is not support import from private key")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not support import from private key", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            
            return
        }
        
        (adapter as! LocalAdapter).exportWalletPrivateKey(publicAddress: publicAddress).subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            case .success(let privateKey):
                let statusModel = CocosStatusModel(status: true, data: privateKey)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func login(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let walletTypeString = data["wallet_type"].stringValue
        let publicAddress = data["public_address"].stringValue
        let domain = data["domain"].stringValue
        let address = publicAddress
        guard let uri = URL(string: data["uri"].stringValue) else { return }
        
        guard let walletType = map2WalletType(from: walletTypeString) else {
            print("walletType \(walletTypeString) is not existed ")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not existed", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        guard let adapter = map2ConnectAdapter(from: walletType) else {
            print("adapter for \(walletTypeString) is not init")
            let response = CocosResponseError(code: nil, message: "adapter for \(walletTypeString) is not init", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        let siwe = try! SiweMessage(domain: domain, address: address, uri: uri)
        
        adapter.login(config: siwe, publicAddress: publicAddress).subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            case .success(let (sourceMessage, signedMessage)):
                let result = CocosConnectLoginResult(message: sourceMessage, signature: signedMessage)
                let statusModel = CocosStatusModel(status: true, data: result)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func verify(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let walletTypeString = data["wallet_type"].stringValue
        let message = data["message"].stringValue
        var signature = data["signature"].stringValue
        
        if ConnectManager.getChainType() == .solana {
            signature = Base58.encode(Data(base64Encoded: signature)!)
        }
        
        guard let walletType = map2WalletType(from: walletTypeString) else {
            print("walletType \(walletTypeString) is not existed ")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not existed", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        guard let adapter = map2ConnectAdapter(from: walletType) else {
            print("adapter for \(walletTypeString) is not init")
            let response = CocosResponseError(code: nil, message: "adapter for \(walletTypeString) is not init", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        let siwe = try! SiweMessage(message)
        
        adapter.verify(message: siwe, against: signature).subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            case .success(let flag):
                let statusModel = CocosStatusModel(status: true, data: flag)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func addEthereumChain(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let walletTypeString = data["wallet_type"].stringValue
        let publicAddress = data["public_address"].stringValue
        let chainId = data["chain_id"].intValue
        
        guard let walletType = map2WalletType(from: walletTypeString) else {
            print("walletType \(walletTypeString) is not existed ")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not existed", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        guard let adapter = map2ConnectAdapter(from: walletType) else {
            print("adapter for \(walletTypeString) is not init")
            let response = CocosResponseError(code: nil, message: "adapter for \(walletTypeString) is not init", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        adapter.addEthereumChain(publicAddress: publicAddress, chainId: chainId, chainName: nil, nativeCurrency: nil, rpcUrl: nil, blockExplorerUrl: nil).subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            case .success(let flag):
                let statusModel = CocosStatusModel(status: true, data: flag)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func switchEthereumChain(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let walletTypeString = data["wallet_type"].stringValue
        let publicAddress = data["public_address"].stringValue
        let chainId = data["chain_id"].intValue
        
        guard let walletType = map2WalletType(from: walletTypeString) else {
            print("walletType \(walletTypeString) is not existed ")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not existed", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        guard let adapter = map2ConnectAdapter(from: walletType) else {
            print("adapter for \(walletTypeString) is not init")
            let response = CocosResponseError(code: nil, message: "adapter for \(walletTypeString) is not init", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        adapter.switchEthereumChain(publicAddress: publicAddress, chainId: chainId).subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            case .success(let flag):
                let statusModel = CocosStatusModel(status: true, data: flag)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            }
        }.disposed(by: bag)
    }
    
    @objc public func reconnectIfNeeded(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let walletTypeString = data["wallet_type"].stringValue
        let publicAddress = data["public_address"].stringValue
        
        guard let walletType = map2WalletType(from: walletTypeString) else {
            print("walletType \(walletTypeString) is not existed ")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not existed", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        guard let adapter = map2ConnectAdapter(from: walletType) else {
            print("adapter for \(walletTypeString) is not init")
            let response = CocosResponseError(code: nil, message: "adapter for \(walletTypeString) is not init", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        (adapter as? WalletConnectAdapter)?.reconnectIfNeeded(publicAddress: publicAddress)
        let nullStr: String? = nil
        let statusModel = CocosStatusModel(status: true, data: nullStr)
        let nullData = try! JSONEncoder().encode(statusModel)
        guard let json = String(data: nullData, encoding: .utf8) else { return }
        callback([json])
    }
    
    @objc public func walletReadyState(_ json: String, callback: CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let walletTypeString = data["wallet_type"].stringValue

        guard let walletType = map2WalletType(from: walletTypeString) else {
            print("walletType \(walletTypeString) is not existed ")
            let response = CocosResponseError(code: nil, message: "walletType \(walletTypeString) is not existed", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }
        
        guard let adapter = map2ConnectAdapter(from: walletType) else {
            print("adapter for \(walletTypeString) is not init ")
            let response = CocosResponseError(code: nil, message: "adapter for \(walletTypeString) is not init", data: nil)
            let statusModel = CocosStatusModel(status: false, data: response)
            let data = try! JSONEncoder().encode(statusModel)
            guard let json = String(data: data, encoding: .utf8) else { return }
            callback([json])
            return
        }

        var str: String
        switch adapter.readyState {
        case .installed:
            str = "installed"
        case .notDetected:
            str = "notDetected"
        case .loadable:
            str = "loadable"
        case .unsupported:
            str = "unsupported"
        case .undetectable:
            str = "undetectable"
        @unknown default:
            str = "undetectable"
        }
        let statusModel = CocosStatusModel(status: true, data: str)
        let nullData = try! JSONEncoder().encode(statusModel)
        guard let json = String(data: nullData, encoding: .utf8) else { return }
        
        callback([json])
    }
}
