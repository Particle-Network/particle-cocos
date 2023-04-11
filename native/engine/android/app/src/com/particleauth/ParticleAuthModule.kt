package com.particleauth

import android.content.Context
import android.text.TextUtils
import com.blankj.utilcode.util.GsonUtils
import com.blankj.utilcode.util.LogUtils
import com.cocos.lib.JsbBridgeWrapper
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.particle.base.ChainInfo
import com.particle.base.Env
import com.particle.base.LanguageEnum
import com.particle.base.ParticleNetwork
import com.particle.network.ParticleNetworkAuth.fastLogout
import com.particle.network.ParticleNetworkAuth.getAddress
import com.particle.network.ParticleNetworkAuth.getUserInfo
import com.particle.network.ParticleNetworkAuth.isLogin
import com.particle.network.ParticleNetworkAuth.isLoginAsync
import com.particle.network.ParticleNetworkAuth.login
import com.particle.network.ParticleNetworkAuth.logout
import com.particle.network.ParticleNetworkAuth.openAccountAndSecurity
import com.particle.network.ParticleNetworkAuth.openWebWallet
import com.particle.network.ParticleNetworkAuth.setChainInfo
import com.particle.network.ParticleNetworkAuth.setDisplayWallet
import com.particle.network.ParticleNetworkAuth.setSecurityAccountConfig
import com.particle.network.ParticleNetworkAuth.setUserInfo
import com.particle.network.ParticleNetworkAuth.signAllTransactions
import com.particle.network.ParticleNetworkAuth.signAndSendTransaction
import com.particle.network.ParticleNetworkAuth.signMessage
import com.particle.network.ParticleNetworkAuth.signTransaction
import com.particle.network.ParticleNetworkAuth.signTypedData
import com.particle.network.SignTypedDataVersion
import com.particle.network.service.*
import com.particle.network.service.model.*
import com.particleauth.model.*
import com.particleauth.utils.ChainUtils
import com.particleauth.utils.EncodeUtils
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.json.JSONObject
import kotlin.coroutines.CoroutineContext


object ParticleAuthPlugin {

    fun init(context: Context, initParams: String) {
        LogUtils.d("ParticleAuthPlugin init", initParams)
        val initData = GsonUtils.fromJson(initParams, InitData::class.java)
        val chainInfo = ChainUtils.getChainInfo(initData.chainName, initData.chainIdName)
        val env = try {
            Env.valueOf(initData.env.uppercase())
        } catch (e: Exception) {
            Env.PRODUCTION
        }
        ParticleNetwork.init(
            context, env, chainInfo
        )
    }


    fun getChainInfo() {
        val chainInfo: ChainInfo = ParticleNetwork.chainInfo
        val map: MutableMap<String, Any> = HashMap()
        map["chain_name"] = chainInfo.chainName.name
        map["chain_id_name"] = chainInfo.chainId.toString()
        map["chain_id"] = chainInfo.chainId.value()
        val result = Gson().toJson(map)
        LogUtils.d("BridgeBase getChainInfo", result)
        JsbBridgeWrapper.getInstance().dispatchEventToScript("getChainInfoCallback", result)
    }


    fun setChainInfo(chainParams: String) {
        LogUtils.d("setChainName", chainParams)
        val chainData: ChainData = GsonUtils.fromJson(
            chainParams, ChainData::class.java
        )
        try {
            val chainInfo = ChainUtils.getChainInfo(chainData.chainName, chainData.chainIdName)
            if (!ParticleNetwork.isLogin()) {
                ParticleNetwork.setChainInfo(chainInfo)
                JsbBridgeWrapper.getInstance().dispatchEventToScript("setChainInfoCallback", "1")

            } else {
                val wallet = if (chainInfo.chain == "evm") {
                    ParticleNetwork.getUserInfo()?.getWallet(UserInfo.WalletChain.evm);
                } else {
                    ParticleNetwork.getUserInfo()?.getWallet(UserInfo.WalletChain.solana);
                }
                if (wallet == null) {
                    JsbBridgeWrapper.getInstance().dispatchEventToScript("setChainInfoCallback", "0")
                    return
                }
                if (TextUtils.isEmpty(wallet.publicAddress)) {
                    JsbBridgeWrapper.getInstance().dispatchEventToScript("setChainInfoCallback", "0")
                    return
                }
                ParticleNetwork.setChainInfo(chainInfo)
                JsbBridgeWrapper.getInstance().dispatchEventToScript("setChainInfoCallback", "1")
            }
        } catch (e: Exception) {
            LogUtils.e("setChainName", e.message)
            JsbBridgeWrapper.getInstance().dispatchEventToScript("setChainInfoCallback", "0")
        }
    }

    /**
     * {
     * "loginType": "phone",
     * "account": "",
     * "supportAuthTypeValues": ["GOOGLE"]
     * }
     */
    fun login(loginParams: String) {
        LogUtils.d("login", loginParams)
        val loginData = GsonUtils.fromJson(loginParams, LoginData::class.java)
        val account = if (TextUtils.isEmpty(loginData.account)) {
            ""
        } else {
            loginData.account
        }
        val loginFormMode = loginData.loginFormMode
        var supportAuthType = SupportAuthType.NONE.value
        val isAll = loginData.supportAuthTypeValues.find { it.equals("All", true) }
        if (isAll != null) {
            supportAuthType = SupportAuthType.ALL.value
        }
        for (i in 0 until loginData.supportAuthTypeValues.size) {
            try {
                val supportType = loginData.supportAuthTypeValues[i].uppercase()
                val authType = SupportAuthType.valueOf(supportType)
                supportAuthType = supportAuthType or authType.value
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
        ParticleNetwork.login(LoginType.valueOf(loginData.loginType.uppercase()),
            account,
            supportAuthType,
            loginFormMode,
            null,
            object : WebServiceCallback<LoginOutput> {
                override fun success(output: LoginOutput) {
                    JsbBridgeWrapper.getInstance().dispatchEventToScript("loginCallback", ReactCallBack.success(output).toGson())
                }

                override fun failure(errMsg: WebServiceError) {
                    JsbBridgeWrapper.getInstance().dispatchEventToScript("loginCallback", ReactCallBack.failed(errMsg).toGson())
                }
            })
    }


    fun logout() {
        LogUtils.d("logout")
        ParticleNetwork.logout(object : WebServiceCallback<WebOutput> {
            override fun failure(errMsg: WebServiceError) {
                JsbBridgeWrapper.getInstance().dispatchEventToScript("logoutCallback", ReactCallBack.failed(errMsg).toGson())
            }

            override fun success(output: WebOutput) {
                JsbBridgeWrapper.getInstance().dispatchEventToScript("logoutCallback", ReactCallBack.success(output).toGson())
            }
        })
    }


    fun fastLogout() {
        LogUtils.d("fastLogout")
        if (!ParticleNetwork.isLogin()) {
            JsbBridgeWrapper.getInstance().dispatchEventToScript("fastLogoutCallback", ReactCallBack.success("success").toGson())
            return
        }
        ParticleNetwork.fastLogout(object : FastLogoutCallBack {

            override fun failure() {
                JsbBridgeWrapper.getInstance().dispatchEventToScript("fastLogoutCallback", ReactCallBack.failed("failed").toGson())
            }

            override fun success() {
                JsbBridgeWrapper.getInstance().dispatchEventToScript("fastLogoutCallback", ReactCallBack.success("success").toGson())
            }
        })
    }


    fun signMessage(message: String) {
        ParticleNetwork.signMessage(EncodeUtils.encode(message), object : WebServiceCallback<SignOutput> {

            override fun failure(errMsg: WebServiceError) {
                JsbBridgeWrapper.getInstance().dispatchEventToScript("signMessageCallback", ReactCallBack.failed(errMsg).toGson())
            }

            override fun success(output: SignOutput) {
                JsbBridgeWrapper.getInstance().dispatchEventToScript("signMessageCallback", ReactCallBack.success(output.signature).toGson())
            }
        })
    }


    fun signTransaction(transaction: String) {
        LogUtils.d("signTransaction", transaction)
        ParticleNetwork.signTransaction(transaction, object : WebServiceCallback<SignOutput> {

            override fun failure(errMsg: WebServiceError) {
                JsbBridgeWrapper.getInstance().dispatchEventToScript("signTransactionCallback", ReactCallBack.failed(errMsg).toGson())
            }

            override fun success(output: SignOutput) {
                JsbBridgeWrapper.getInstance().dispatchEventToScript("signTransactionCallback", ReactCallBack.success(output.signature).toGson())
            }
        })
    }


    fun signAllTransactions(transactions: String) {
        LogUtils.d("signAllTransactions", transactions)
        val trans = GsonUtils.fromJson<List<String>>(
            transactions, object : TypeToken<List<String>>() {}.type
        )
        ParticleNetwork.signAllTransactions(trans, object : WebServiceCallback<SignOutput> {
            override fun failure(errMsg: WebServiceError) {
                JsbBridgeWrapper.getInstance().dispatchEventToScript("signAllTransactionsCallback", ReactCallBack.failed(errMsg).toGson())
            }

            override fun success(output: SignOutput) {
                JsbBridgeWrapper.getInstance().dispatchEventToScript("signAllTransactionsCallback", ReactCallBack.success(output.signature).toGson())
            }
        })
    }


    fun signAndSendTransaction(transaction: String) {
        LogUtils.d("signAndSendTransaction", transaction)
        ParticleNetwork.signAndSendTransaction(transaction, object : WebServiceCallback<SignOutput> {

            override fun failure(errMsg: WebServiceError) {
                JsbBridgeWrapper.getInstance().dispatchEventToScript("signAndSendTransactionCallback", ReactCallBack.failed(errMsg).toGson())
            }

            override fun success(output: SignOutput) {
                JsbBridgeWrapper.getInstance()
                    .dispatchEventToScript("signAndSendTransactionCallback", ReactCallBack.success(output.signature).toGson())
            }
        })
    }


    fun signTypedData(json: String) {
        LogUtils.d("SignTypedData", json)
        val signTypedData = GsonUtils.fromJson(
            json, SignTypedData::class.java
        )
        ParticleNetwork.signTypedData(EncodeUtils.encode(signTypedData.message),
            SignTypedDataVersion.valueOf(signTypedData.version.uppercase()),
            object : WebServiceCallback<SignOutput> {
                override fun failure(errMsg: WebServiceError) {
                    JsbBridgeWrapper.getInstance().dispatchEventToScript("signTypedDataCallback", ReactCallBack.failed(errMsg).toGson())
                }

                override fun success(output: SignOutput) {
                    JsbBridgeWrapper.getInstance().dispatchEventToScript("signTypedDataCallback", ReactCallBack.success(output.signature).toGson())
                }
            })
    }

    /**
     * {
     * "chain_name": "",
     * "chain_id": ""
     * }
     */

    fun setChainInfoAsync(chainParams: String) {
        LogUtils.d("setChainName", chainParams)
        val chainData = GsonUtils.fromJson(
            chainParams, ChainData::class.java
        )

        val chainInfo = ChainUtils.getChainInfo(chainData.chainName, chainData.chainIdName)
        ParticleNetwork.setChainInfo(chainInfo, object : ChainChangeCallBack {
            override fun success() {
                JsbBridgeWrapper.getInstance().dispatchEventToScript("setChainInfoAsyncCallback", "1")
            }

            override fun failure() {
                JsbBridgeWrapper.getInstance().dispatchEventToScript("setChainInfoAsyncCallback", "0")
            }
        })
    }


    fun isLogin() {
        val isUserLogin = ParticleNetwork.isLogin()
        LogUtils.d("isLogin", isUserLogin)
        JsbBridgeWrapper.getInstance().dispatchEventToScript("isLoginCallback", if (isUserLogin) "1" else "0")
    }

    fun isLoginAsync() {
        CoroutineScope(Dispatchers.IO).launch {
            val userInfo = ParticleNetwork.isLoginAsync()
            val json =  ReactCallBack.success(userInfo).toGson()
            LogUtils.d("isLoginAsync", json)
            JsbBridgeWrapper.getInstance().dispatchEventToScript("isLoginAsyncCallback", json)
        }
    }


    fun getAddress() {
        val address = ParticleNetwork.getAddress()
        JsbBridgeWrapper.getInstance().dispatchEventToScript("getAddressCallback", address)
    }


    fun getUserInfo() {
        val userInfo = ParticleNetwork.getUserInfo()
        JsbBridgeWrapper.getInstance().dispatchEventToScript("getUserInfoCallback", GsonUtils.toJson(userInfo))
    }


    fun setDisplayWallet(status: String) {
        val isDisplayWallet = status == "1"
        ParticleNetwork.setDisplayWallet(isDisplayWallet)
    }


    fun openWebWallet() {
        ParticleNetwork.openWebWallet()
    }


    fun openAccountAndSecurity(context: Context) {
        ParticleNetwork.openAccountAndSecurity(object : WebServiceCallback<WebOutput> {
            override fun failure(errMsg: WebServiceError) {
                JsbBridgeWrapper.getInstance().dispatchEventToScript("openAccountAndSecurityCallBack", ReactCallBack.failed(errMsg).toGson())
            }

            override fun success(output: WebOutput) {
            }
        })


    }


    fun setUserInfo(json: String) {
        val isSuccess = ParticleNetwork.setUserInfo(json)
        JsbBridgeWrapper.getInstance().dispatchEventToScript("setUserInfoCallBack", if (isSuccess) "1" else "0")
    }


    fun setSecurityAccountConfig(configJson: String) {
        LogUtils.d("setSecurityAccountConfig", configJson)
        try {
            val jobj = JSONObject(configJson)
            val promptSettingWhenSign = jobj.getInt("prompt_setting_when_sign")
            val promptMasterPasswordSettingWhenLogin = jobj.getInt("prompt_master_password_setting_when_login")
            val config = SecurityAccountConfig(
                promptSettingWhenSign, promptMasterPasswordSettingWhenLogin
            )
            ParticleNetwork.setSecurityAccountConfig(config)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }


    fun setLanguage(language: String) {
        if (language.isEmpty()) {
            return
        }
        if (language.equals("zh_hans")) {
            ParticleNetwork.setAppliedLanguage(LanguageEnum.ZH_CN)
        } else if (language.equals("zh_hant")) {
            ParticleNetwork.setAppliedLanguage(LanguageEnum.ZH_TW)
        } else if (language.equals("ja")) {
            ParticleNetwork.setAppliedLanguage(LanguageEnum.JA)
        } else if (language.equals("ko")) {
            ParticleNetwork.setAppliedLanguage(LanguageEnum.KO)
        } else {
            ParticleNetwork.setAppliedLanguage(LanguageEnum.EN)
        }
    }

}
