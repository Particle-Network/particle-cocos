//Script to add into com.cocos.game package, backup here
package com.cocos.game

import android.content.Context
import com.blankj.utilcode.util.LogUtils
import com.cocos.lib.JsbBridgeWrapper
import com.particleauth.ParticleAuthPlugin


object AuthJsbBridge {
    fun start(context: Context) {
        val jbw = JsbBridgeWrapper.getInstance()
        jbw.addScriptEventListener("initialize") { initParams: String ->
            ParticleAuthPlugin.init(context, initParams)
        }
        jbw.addScriptEventListener("login") { loginParams: String ->
            ParticleAuthPlugin.login(loginParams)
        }
        jbw.addScriptEventListener("isLogin") { isLogin: String ->
            ParticleAuthPlugin.isLogin()
        }
        jbw.addScriptEventListener("isLoginAsync") { isLogin: String ->
            ParticleAuthPlugin.isLoginAsync()
        }
        jbw.addScriptEventListener("getAddress") { isLogin: String ->
            ParticleAuthPlugin.getAddress()
        }
        jbw.addScriptEventListener("getUserInfo") { isLogin: String ->
            ParticleAuthPlugin.getUserInfo()
        }
        jbw.addScriptEventListener("logout") { arg: String ->
            ParticleAuthPlugin.logout()
        }
        jbw.addScriptEventListener("fastLogout") { arg: String ->
            ParticleAuthPlugin.fastLogout()
        }
        jbw.addScriptEventListener("signMessage") { message: String ->
            ParticleAuthPlugin.signMessage(message)
        }

        jbw.addScriptEventListener("signTransaction") { transaction: String ->
            ParticleAuthPlugin.signTransaction(transaction)
        }
        jbw.addScriptEventListener("signAllTransactions") { transactions: String ->
            ParticleAuthPlugin.signAllTransactions(transactions)
        }
        jbw.addScriptEventListener("signAndSendTransaction") { transaction: String ->
            ParticleAuthPlugin.signAndSendTransaction(transaction)
        }
        jbw.addScriptEventListener("signTypedData") { transaction: String ->
            ParticleAuthPlugin.signTypedData(transaction)
        }
        jbw.addScriptEventListener("setChainInfo") { chainInfo: String ->
            ParticleAuthPlugin.setChainInfo(chainInfo)
        }
        jbw.addScriptEventListener("setChainInfoAsync") { chainInfo: String ->
            ParticleAuthPlugin.setChainInfoAsync(chainInfo)
        }
        jbw.addScriptEventListener("getChainInfo") { arg: String ->
            ParticleAuthPlugin.getChainInfo()
        }
        jbw.addScriptEventListener("openAccountAndSecurity") { arg: String ->
            ParticleAuthPlugin.openAccountAndSecurity(context)
        }
        jbw.addScriptEventListener("setLanguage") { arg: String ->
            ParticleAuthPlugin.setLanguage(arg)
        }
        jbw.addScriptEventListener("setDisplayWallet") { arg: String ->
            ParticleAuthPlugin.setDisplayWallet(arg)
        }
        jbw.addScriptEventListener("openWebWallet") { arg: String ->
            ParticleAuthPlugin.openWebWallet()
        }
        jbw.addScriptEventListener("setUserInfo") { arg: String ->
            ParticleAuthPlugin.setUserInfo(arg)
        }
    }
}