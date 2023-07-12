//
//  Model.swift
//
//  Created by link on 2022/9/23.
//

import ConnectCommon
import Foundation
import ParticleConnect
import ParticleNetworkBase

public extension NSObject {
    internal func ResponseFromError(_ error: Error) -> CocosResponseError {
        if let responseError = error as? ParticleNetwork.ResponseError {
            return CocosResponseError(code: responseError.code, message: responseError.message ?? "", data: responseError.data)
        } else {
            return CocosResponseError(code: nil, message: String(describing: error), data: nil)
        }
    }

    func map2WalletType(from string: String) -> WalletType? {
        let str = string.lowercased()
        var walletType: WalletType?
        if str == "particle" {
            walletType = .particle
        } else if str == "evmprivatekey" {
            walletType = .evmPrivateKey
        } else if str == "solanaprivatekey" {
            walletType = .solanaPrivateKey
        } else if str == "metamask" {
            walletType = .metaMask
        } else if str == "rainbow" {
            walletType = .rainbow
        } else if str == "trust" {
            walletType = .trust
        } else if str == "imtoken" {
            walletType = .imtoken
        } else if str == "bitkeep" {
            walletType = .bitkeep
        } else if str == "walletconnect" {
            walletType = .walletConnect
        } else if str == "phantom" {
            walletType = .phantom
        } else if str == "zerion" {
            walletType = .zerion
        } else if str == "math" {
            walletType = .math
        } else if str == "omni" {
            walletType = .omni
        } else if str == "zengo" {
            walletType = .zengo
        } else if str == "alpha" {
            walletType = .alpha
        } else if str == "bitpie" {
            walletType = .bitpie
        } else if str == "inch1" {
            walletType = .inch1
        } else {
            walletType = nil
        }

        return walletType
    }

    func map2ConnectAdapter(from walletType: WalletType) -> ConnectAdapter? {
        let adapters = ParticleConnect.getAllAdapters().filter {
            $0.walletType == walletType
        }
        let adapter = adapters.first
        return adapter
    }
}

public struct CocosResponseError: Codable {
    let code: Int?
    let message: String?
    let data: String?
}

public struct CocosStatusModel<T: Codable>: Codable {
    let status: Bool
    let data: T
}

public struct CocosConnectLoginResult: Codable {
    let message: String
    let signature: String
}

public struct CocosLoginListModel: Codable {
    let walletType: String
    let account: Account
}
