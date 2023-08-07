//
//  ParticleAuthPlugin.swift
//
//  Created by link on 2022/9/28.
//

import Base58_swift
import Foundation
import ParticleAuthService
import ParticleNetworkBase
import RxSwift
import SwiftyJSON

public typealias CocosResponseCallbackBlock = ([String]) -> Void

@objc(ParticleAuthSchemeManager)
public class ParticleAuthSchemeManager: NSObject {
    @objc static func handleUrl(_ url: URL) -> Bool {
        return ParticleAuthService.handleUrl(url)
    }
}

@objc(ParticleAuthPlugin)
public class ParticleAuthPlugin: NSObject {
    let bag = DisposeBag()
    
    @objc static let shared = ParticleAuthPlugin()
    
    @objc
    public func initialize(_ json: String) {
        let data = JSON(parseJSON: json)
        let name = data["chain_name"].stringValue.lowercased()
        let chainId = data["chain_id"].intValue
        guard let chainInfo = ParticleNetwork.searchChainInfo(by: chainId) else {
            return print("initialize error, can't find right chain for \(name), chainId \(chainId)")
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
        
        let config = ParticleNetworkConfiguration(chainInfo: chainInfo, devEnv: devEnv)
        ParticleNetwork.initialize(config: config)
    }
    
    @objc
    public func setChainInfo(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let chainId = data["chain_id"].intValue
        guard let chainInfo = ParticleNetwork.searchChainInfo(by: chainId) else {
            callback(["0"])
            return
        }
        ParticleNetwork.setChainInfo(chainInfo)
        callback(["1"])
    }
    
    @objc
    public func setChainInfoAsync(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let chainId = data["chain_id"].intValue
        guard let chainInfo = ParticleNetwork.searchChainInfo(by: chainId) else {
            callback(["0"])
            return
        }
        if !ParticleAuthService.isLogin() {
            ParticleNetwork.setChainInfo(chainInfo)
            callback(["1"])
            return
        }
        
        ParticleAuthService.switchChain(chainInfo).subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback(["1"])
            case .success(let userInfo):
                guard let userInfo = userInfo else { return }
                let statusModel = CocosStatusModel(status: true, data: userInfo)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback(["1"])
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func getChainInfo(_ callback: @escaping CocosResponseCallbackBlock) {
        let chainInfo = ParticleNetwork.getChainInfo()
        
        let jsonString = ["chain_name": chainInfo.name, "chain_id": chainInfo.chainId, "chain_id_name": chainInfo.network].jsonString() ?? ""
        
        callback([jsonString])
    }
    
    @objc
    public func login(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let type = data["login_type"].stringValue.lowercased()
        let account = data["account"].string
        let supportAuthType = data["support_auth_type_values"].arrayValue
        
        let socialLoginPromptString = data["social_login_prompt"].stringValue.lowercased()
        let socialLoginPrompt: SocialLoginPrompt? = SocialLoginPrompt(rawValue: socialLoginPromptString)
        
        let message: String? = data["authorization"]["message"].string
        let isUnique: Bool = data["authorization"]["uniq"].bool ?? false
        
        var loginAuthorization: LoginAuthorization?
        
        if message != nil {
            loginAuthorization = .init(message: message!, isUnique: isUnique)
        }
        
        let loginType = LoginType(rawValue: type) ?? .email
        var supportAuthTypeArray: [SupportAuthType] = []
        
        let array = supportAuthType.map {
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
        
        var acc = account
        if acc != nil, acc!.isEmpty {
            acc = nil
        }
        
        ParticleAuthService.login(type: loginType, account: acc, supportAuthType: supportAuthTypeArray, socialLoginPrompt: socialLoginPrompt, authorization: loginAuthorization).subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            case .success(let userInfo):
                guard let userInfo = userInfo else { return }
                let userInfoJsonString = userInfo.jsonStringFullSnake()
                let newUserInfo = JSON(parseJSON: userInfoJsonString)
                let statusModel = CocosStatusModel(status: true, data: newUserInfo)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func logout(_ callback: @escaping CocosResponseCallbackBlock) {
        ParticleAuthService.logout().subscribe { [weak self] result in
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
    public func fastLogout(_ callback: @escaping CocosResponseCallbackBlock) {
        ParticleAuthService.fastLogout().subscribe { [weak self] result in
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
    public func isLogin(_ callback: CocosResponseCallbackBlock) {
        callback([ParticleAuthService.isLogin() == true ? "1" : "0"])
    }
    
    @objc
    public func isLoginAsync(_ callback: @escaping CocosResponseCallbackBlock) {
        ParticleAuthService.isLoginAsync().subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            case .success(let userInfo):
                let statusModel = CocosStatusModel(status: true, data: userInfo)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func signMessage(_ message: String, callback: @escaping CocosResponseCallbackBlock) {
        var serializedMessage = ""
        switch ParticleNetwork.getChainInfo().chain {
        case .solana:
            serializedMessage = Base58.encode(message.data(using: .utf8)!)
        default:
            serializedMessage = "0x" + message.data(using: .utf8)!.map { String(format: "%02x", $0) }.joined()
        }
        
        ParticleAuthService.signMessage(serializedMessage).subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            case .success(let signedMessage):
                let statusModel = CocosStatusModel(status: true, data: signedMessage)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func signTransaction(_ transaction: String, callback: @escaping CocosResponseCallbackBlock) {
        ParticleAuthService.signTransaction(transaction).subscribe { [weak self] result in
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
    public func signAllTransactions(_ transactions: String, callback: @escaping CocosResponseCallbackBlock) {
        let transactions = JSON(parseJSON: transactions).arrayValue.map { $0.stringValue }
        ParticleAuthService.signAllTransactions(transactions).subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            case .success(let signedMessage):
                let statusModel = CocosStatusModel(status: true, data: signedMessage)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func signAndSendTransaction(_ message: String, callback: @escaping CocosResponseCallbackBlock) {
        ParticleAuthService.signAndSendTransaction(message).subscribe { [weak self] result in
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
    public func signTypedData(_ json: String, callback: @escaping CocosResponseCallbackBlock) {
        let data = JSON(parseJSON: json)
        let message = data["message"].stringValue
        let version = data["version"].stringValue.lowercased()
        
        let hexString = "0x" + message.data(using: .utf8)!.map { String(format: "%02x", $0) }.joined()
       
        ParticleAuthService.signTypedData(hexString, version: EVMSignTypedDataVersion(rawValue: version) ?? .v1).subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            case .success(let signedMessage):
                let statusModel = CocosStatusModel(status: true, data: signedMessage)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func getAddress(_ callback: CocosResponseCallbackBlock) {
        callback([ParticleAuthService.getAddress()])
    }
    
    @objc
    public func getUserInfo(_ callback: CocosResponseCallbackBlock) {
        guard let userInfo = ParticleAuthService.getUserInfo() else {
            callback([""])
            return
        }
        let userInfoJsonString = userInfo.jsonStringFullSnake()
        let newUserInfo = JSON(parseJSON: userInfoJsonString)
        
        let data = try! JSONEncoder().encode(newUserInfo)
        
        let json = String(data: data, encoding: .utf8)
        callback([json ?? ""])
    }
    
    @objc
    public func setModalPresentStyle(_ style: String) {
        if style == "fullScreen" {
            ParticleAuthService.setModalPresentStyle(.fullScreen)
        } else {
            ParticleAuthService.setModalPresentStyle(.formSheet)
        }
    }
    
    @objc
    public func setAppearance(_ json: String) {
        /**
         SYSTEM,
         LIGHT,
         DARK,
         */
        if json.lowercased() == "system" {
            ParticleNetwork.setAppearance(UIUserInterfaceStyle.unspecified)
        } else if json.lowercased() == "light" {
            ParticleNetwork.setAppearance(UIUserInterfaceStyle.light)
        } else if json.lowercased() == "dark" {
            ParticleNetwork.setAppearance(UIUserInterfaceStyle.dark)
        }
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
    
    @objc
    public func setLanguage(_ json: String) {
        /*
         en,
         zh_hans,
         zh_hant,
         ja,
         ko
         */
        if json.lowercased() == "en" {
            ParticleNetwork.setLanguage(.en)
        } else if json.lowercased() == "zh_hans" {
            ParticleNetwork.setLanguage(.zh_Hans)
        } else if json.lowercased() == "zh_hant" {
            ParticleNetwork.setLanguage(.zh_Hant)
        } else if json.lowercased() == "ja" {
            ParticleNetwork.setLanguage(.ja)
        } else if json.lowercased() == "ko" {
            ParticleNetwork.setLanguage(.ko)
        }
    }
    
    @objc
    public func setWebAuthConfig(_ json: String) {
        let data = JSON(parseJSON: json)
        let isDisplayWallet = data["display_wallet"].boolValue
        let appearance = data["appearance"].stringValue.lowercased()
                
        var style: UIUserInterfaceStyle = .unspecified
        if appearance == "system" {
            style = UIUserInterfaceStyle.unspecified
        } else if appearance == "light" {
            style = UIUserInterfaceStyle.light
        } else if appearance == "dark" {
            style = UIUserInterfaceStyle.dark
        }
        
        ParticleAuthService.setWebAuthConfig(options: .init(isDisplayWallet: isDisplayWallet, appearance: style))
    }
    
    @objc
    public func setMediumScreen(_ isMediumScreen: String) {
        if #available(iOS 15.0, *) {
            ParticleAuthService.setMediumScreen(isMediumScreen == "1")
        } else {
            // Fallback on earlier versions
        }
    }
    
    @objc func openAccountAndSecurity(callback: @escaping CocosResponseCallbackBlock) {
        ParticleAuthService.openAccountAndSecurity().subscribe { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                let response = self.ResponseFromError(error)
                let statusModel = CocosStatusModel(status: false, data: response)
                let data = try! JSONEncoder().encode(statusModel)
                guard let json = String(data: data, encoding: .utf8) else { return }
                callback([json])
//                ParticleAuthEvent.emitter.sendEvent(withName: "securityFailedCallBack", body: [json])
            case .success():
                break
            }
        }.disposed(by: bag)
    }
    
    @objc
    public func openWebWallet(_ json: String?) {
        ParticleAuthService.openWebWallet(styleJsonString: json)
    }
    
    @objc
    public func setSecurityAccountConfig(_ json: String) {
        let data = JSON(parseJSON: json)
        let promptSettingWhenSign = data["prompt_setting_when_sign"].intValue
        let promptMasterPasswordSettingWhenLogin = data["prompt_master_password_setting_when_login"].intValue
        ParticleNetwork.setSecurityAccountConfig(config: .init(promptSettingWhenSign: promptSettingWhenSign, promptMasterPasswordSettingWhenLogin: promptMasterPasswordSettingWhenLogin))
    }
}

public extension Dictionary {
    /// - Parameter prettify: set true to prettify string (default is false).
    /// - Returns: optional JSON String (if applicable).
    func jsonString(prettify: Bool = false) -> String? {
        guard JSONSerialization.isValidJSONObject(self) else { return nil }
        let options = (prettify == true) ? JSONSerialization.WritingOptions.prettyPrinted : JSONSerialization.WritingOptions()
        guard let jsonData = try? JSONSerialization.data(withJSONObject: self, options: options) else { return nil }
        return String(data: jsonData, encoding: .utf8)
    }
}
