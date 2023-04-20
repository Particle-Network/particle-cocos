#include <iostream>
#include <string>
#include "JsbBridgeTest.h"
#import <Foundation/Foundation.h>
#import "cocos/platform/apple/JsbBridgeWrapper.h"
#import "ParticleCocosDemo_mobile-Swift.h"


@implementation JsbBridgeTest{
    
}

-(id)init{
    self = [super init];
    
    [self setupAuthBirdge];
    [self setupConnectBirdge];
    [self setupWalletBirdge];
    
    return self;
}


- (void) setupAuthBirdge {
    JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
    
    OnScriptEventListener initialize = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] initialize:arg];
    };
    
    OnScriptEventListener login = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] login:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"loginCallback" arg:response[0]];
        }];
        
    };
    
    OnScriptEventListener logout = ^void(NSString* arg){
        
        [[ParticleAuthPlugin shared] logout:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"logoutCallback" arg:response[0]];
        }];
        
    };
    
    OnScriptEventListener fastLogout = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] fastLogout:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"fastLogoutCallback" arg:response[0]];
        }];
        
    };
    OnScriptEventListener isLogin = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] isLogin:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"isLoginCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener isLoginAsync = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] isLoginAsync:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"isLoginAsyncCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener getAddress = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] getAddress:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"getAddressCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener getUserInfo = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] getUserInfo:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"getUserInfoCallback" arg:response[0]];
        }];
    };
    
    
    OnScriptEventListener signMessage = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] signMessage:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"signMessageCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener signTypedData = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] signTypedData:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"signTypedDataCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener signAndSendTransaction = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] signAndSendTransaction:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"signAndSendTransactionCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener signTransaction = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] signTransaction:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"signTransactionCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener signAllTransactions = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] signAllTransactions:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"signAllTransactionsCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener setChainInfo = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] setChainInfo:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"setChainInfoCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener setChainInfoAsync = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] setChainInfoAsync:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"setChainInfoAsyncCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener setUserInfo = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] setUserInfo:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"setUserInfoCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener setLanguage = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] setLanguage:arg];
    };
    
    OnScriptEventListener setDisplayWallet = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] setDisplayWallet:arg];
    };
    
    OnScriptEventListener openWebWallet = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] openWebWallet];
    };
    
    OnScriptEventListener setSecurityAccountConfig = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] setSecurityAccountConfig:arg];
    };
    
    OnScriptEventListener openAccountAndSecurity = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] openAccountAndSecurityWithCallback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"openAccountAndSecurityCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener setMediumScreen = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] setMediumScreen:arg];
    };
    
    OnScriptEventListener setModalPresentStyle = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] setModalPresentStyle:arg];
    };
    
    OnScriptEventListener setInterfaceStyle = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] setInterfaceStyle:arg];
    };
    
    OnScriptEventListener getChainInfo = ^void(NSString* arg){
        [[ParticleAuthPlugin shared] getChainInfo:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"getChainInfoCallback" arg:response[0]];
        }];
    };
    
    
    [m addScriptEventListener:@"initialize" listener:initialize];
    [m addScriptEventListener:@"login" listener:login];
    [m addScriptEventListener:@"logout" listener:logout];
    [m addScriptEventListener:@"isLogin" listener:isLogin];
    [m addScriptEventListener:@"isLoginAsync" listener:isLoginAsync];
    [m addScriptEventListener:@"fastLogout" listener:fastLogout];
    [m addScriptEventListener:@"getAddress" listener:getAddress];
    [m addScriptEventListener:@"getUserInfo" listener:getUserInfo];
    [m addScriptEventListener:@"signMessage" listener:signMessage];
    [m addScriptEventListener:@"signTypedData" listener:signTypedData];
    [m addScriptEventListener:@"signAndSendTransaction" listener:signAndSendTransaction];
    [m addScriptEventListener:@"signTransaction" listener:signTransaction];
    [m addScriptEventListener:@"signAllTransactions" listener:signAllTransactions];
    [m addScriptEventListener:@"setChainInfo" listener:setChainInfo];
    [m addScriptEventListener:@"setChainInfoAsync" listener:setChainInfoAsync];
    [m addScriptEventListener:@"getChainInfo" listener:getChainInfo];
    [m addScriptEventListener:@"setUserInfo" listener:setUserInfo];
    
    [m addScriptEventListener:@"setLanguage" listener:setLanguage];
    [m addScriptEventListener:@"setModalPresentStyle" listener:setModalPresentStyle];
    [m addScriptEventListener:@"setMediumScreen" listener:setMediumScreen];
    [m addScriptEventListener:@"openWebWallet" listener:openWebWallet];
    [m addScriptEventListener:@"openAccountAndSecurity" listener:openAccountAndSecurity];
    [m addScriptEventListener:@"setSecurityAccountConfig" listener:setSecurityAccountConfig];
    [m addScriptEventListener:@"setDisplayWallet" listener:setDisplayWallet];
    [m addScriptEventListener:@"setInterfaceStyle" listener:setInterfaceStyle];
}

- (void) setupConnectBirdge {
    JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
    
    OnScriptEventListener particleConnectInitialize = ^void(NSString* arg){
        [[ParticleConnectPlugin shared] initialize:arg];
    };
    
    OnScriptEventListener adapterGetAccounts = ^void(NSString* arg){
        [[ParticleConnectPlugin shared] getAccounts:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"adapterGetAccountsCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener adapterConnect = ^void(NSString* arg){
        [[ParticleConnectPlugin shared] connect:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"adapterConnectCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener adapterDisconnect = ^void(NSString* arg){
        [[ParticleConnectPlugin shared] disconnect:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"adapterDisconnectCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener adapterIsConnected = ^void(NSString* arg){
        [[ParticleConnectPlugin shared] isConnected:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"adapterIsConnectedCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener adapterSignMessage = ^void(NSString* arg){
        [[ParticleConnectPlugin shared] signMessage:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"adapterSignMessageCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener adapterSignTransaction = ^void(NSString* arg){
        [[ParticleConnectPlugin shared] signTransaction:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"adapterSignTransactionCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener adapterSignAllTransactions = ^void(NSString* arg){
        [[ParticleConnectPlugin shared] signAllTransactions:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"adapterSignAllTransactionsCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener adapterSignAndSendTransaction = ^void(NSString* arg){
        [[ParticleConnectPlugin shared] signAndSendTransaction:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"adapterSignAndSendTransactionCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener adapterSignTypedData = ^void(NSString* arg){
        [[ParticleConnectPlugin shared] signTypedData:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"adapterSignTypedDataCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener adapterSignInWithEthereum = ^void(NSString* arg){
        [[ParticleConnectPlugin shared] login:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"adapterSignInWithEthereumCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener adapterVerify = ^void(NSString* arg){
        [[ParticleConnectPlugin shared] verify:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"adapterVerifyCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener adapterImportWalletFromPrivateKey = ^void(NSString* arg){
        [[ParticleConnectPlugin shared] importPrivateKey:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"adapterImportWalletFromPrivateKeyCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener adapterImportWalletFromMnemonic = ^void(NSString* arg){
        [[ParticleConnectPlugin shared] importMnemonic:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"adapterImportWalletFromMnemonicCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener adapterExportPrivateKey = ^void(NSString* arg){
        [[ParticleConnectPlugin shared] exportPrivateKey:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"adapterExportPrivateKeyCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener adapterAddEthereumChain = ^void(NSString* arg){
        [[ParticleConnectPlugin shared] addEthereumChain:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"adapterAddEthereumChainCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener adapterSwitchEthereumChain = ^void(NSString* arg){
        [[ParticleConnectPlugin shared] switchEthereumChain:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"adapterSwitchEthereumChainCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener adapterReconnectIfNeeded = ^void(NSString* arg){
        
        [[ParticleConnectPlugin shared] reconnectIfNeeded:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"adapterReconnectIfNeededCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener adapterWalletReadyState = ^void(NSString* arg){
        
        [[ParticleConnectPlugin shared] walletReadyState:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"adapterWalletReadyStateCallback" arg:response[0]];
        }];
    };
    
   

    
    [m addScriptEventListener:@"particleConnectInitialize" listener:particleConnectInitialize];
    [m addScriptEventListener:@"adapterGetAccounts" listener:adapterGetAccounts];
    [m addScriptEventListener:@"adapterConnect" listener:adapterConnect];
    [m addScriptEventListener:@"adapterDisconnect" listener:adapterDisconnect];
    [m addScriptEventListener:@"adapterIsConnected" listener:adapterIsConnected];
    [m addScriptEventListener:@"adapterSignMessage" listener:adapterSignMessage];
    [m addScriptEventListener:@"adapterSignTransaction" listener:adapterSignTransaction];
    [m addScriptEventListener:@"adapterSignAllTransactions" listener:adapterSignAllTransactions];
    [m addScriptEventListener:@"adapterSignAndSendTransaction" listener:adapterSignAndSendTransaction];
    [m addScriptEventListener:@"adapterSignTypedData" listener:adapterSignTypedData];
    [m addScriptEventListener:@"adapterSignInWithEthereum" listener:adapterSignInWithEthereum];
    [m addScriptEventListener:@"adapterVerify" listener:adapterVerify];
    [m addScriptEventListener:@"adapterImportWalletFromPrivateKey" listener:adapterImportWalletFromPrivateKey];
    [m addScriptEventListener:@"adapterImportWalletFromMnemonic" listener:adapterImportWalletFromMnemonic];
    [m addScriptEventListener:@"adapterExportPrivateKey" listener:adapterExportPrivateKey];
    [m addScriptEventListener:@"adapterAddEthereumChain" listener:adapterAddEthereumChain];
    [m addScriptEventListener:@"adapterSwitchEthereumChain" listener:adapterSwitchEthereumChain];
    
    [m addScriptEventListener:@"adapterReconnectIfNeeded" listener:adapterReconnectIfNeeded];
    [m addScriptEventListener:@"adapterWalletReadyState" listener:adapterWalletReadyState];
    
}

- (void) setupWalletBirdge {
    JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
    
    OnScriptEventListener navigatorWallet = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] navigatorWallet:arg];
    };
    
    OnScriptEventListener navigatorTokenReceive = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] navigatorTokenReceive:arg];
    };
    
    OnScriptEventListener navigatorTokenSend = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] navigatorTokenSend:arg];
    };
    
    OnScriptEventListener navigatorTokenTransactionRecords = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] navigatorTokenTransactionRecords:arg];
    };
    
    OnScriptEventListener navigatorNFTSend = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] navigatorNFTSend:arg];
    };
    
    OnScriptEventListener navigatorNFTDetails = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] navigatorNFTDetails:arg];
    };
    
    OnScriptEventListener navigatorBuyCrypto = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] navigatorBuyCrypto:arg];
    };
    
    OnScriptEventListener navigatorLoginList = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] navigatorLoginList:^(NSArray<NSString *> * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"navigatorLoginListCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener navigatorSwap = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] navigatorSwap:arg];
    };
    
    
    OnScriptEventListener showTestNetwork = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] showTestNetwork:arg];
    };
    
    OnScriptEventListener showManageWallet = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] showManageWallet:arg];
    };
    
    OnScriptEventListener supportChain = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] supportChain:arg];
    };
    
    OnScriptEventListener enableSwap = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] enableSwap:arg];
    };
    
    OnScriptEventListener getEnableSwap = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] getEnableSwap:^(NSArray<NSString *> * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"getEnableSwapCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener enablePay = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] enablePay:arg];
    };
    
    OnScriptEventListener getEnablePay = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] getEnablePay:^(NSArray<NSString *> * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"getEnablePayCallback" arg:response[0]];
        }];
    };
    
    OnScriptEventListener switchWallet = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] switchWallet:arg callback:^(NSArray * _Nonnull response) {
            JsbBridgeWrapper* m = [JsbBridgeWrapper sharedInstance];
            [m dispatchEventToScript:@"switchWalletCallback" arg:response[0]];
        }];
    };
    
    
    OnScriptEventListener walletSetLanguage = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] setLanguage:arg];
    };
    
    
    OnScriptEventListener supportWalletConnect = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] supportWalletConnect:arg];
    };
    
    OnScriptEventListener setFiatCoin = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] setFiatCoin:arg];
    };
    
    OnScriptEventListener setDisplayTokenAddresses = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] setDisplayTokenAddresses:arg];
    };
    
    OnScriptEventListener setDisplayNFTContractAddresses = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] setDisplayNFTContractAddresses:arg];
    };
    
    OnScriptEventListener setPriorityTokenAddresses = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] setPriorityTokenAddresses:arg];
    };
    
    OnScriptEventListener setPriorityNFTContractAddresses = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] setPriorityNFTContractAddresses:arg];
    };
    
    OnScriptEventListener showLanguageSetting = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] showLanguageSetting:arg];
    };
    
    OnScriptEventListener showAppearanceSetting = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] showAppearanceSetting:arg];
    };
    
    OnScriptEventListener setSupportAddToken = ^void(NSString* arg){
        [[ParticleWalletPlugin shared] setSupportAddToken:arg];
    };
    
    [m addScriptEventListener:@"navigatorWallet" listener:navigatorWallet];
    [m addScriptEventListener:@"navigatorTokenReceive" listener:navigatorTokenReceive];
    [m addScriptEventListener:@"navigatorTokenSend" listener:navigatorTokenSend];
    [m addScriptEventListener:@"navigatorTokenTransactionRecords" listener:navigatorTokenTransactionRecords];
    [m addScriptEventListener:@"navigatorNFTSend" listener:navigatorNFTSend];
    [m addScriptEventListener:@"navigatorNFTDetails" listener:navigatorNFTDetails];
    [m addScriptEventListener:@"navigatorBuyCrypto" listener:navigatorBuyCrypto];
    [m addScriptEventListener:@"navigatorLoginList" listener:navigatorLoginList];
    
    [m addScriptEventListener:@"navigatorSwap" listener:navigatorSwap];
    
    [m addScriptEventListener:@"showTestNetwork" listener:showTestNetwork];
    
    [m addScriptEventListener:@"showManageWallet" listener:showManageWallet];
    [m addScriptEventListener:@"supportChain" listener:supportChain];
    [m addScriptEventListener:@"enableSwap" listener:enableSwap];
    [m addScriptEventListener:@"getEnableSwap" listener:getEnableSwap];
    [m addScriptEventListener:@"enablePay" listener:enablePay];
    [m addScriptEventListener:@"getEnablePay" listener:getEnablePay];
    [m addScriptEventListener:@"switchWallet" listener:switchWallet];
    [m addScriptEventListener:@"walletSetLanguage" listener:walletSetLanguage];
    [m addScriptEventListener:@"supportWalletConnect" listener:supportWalletConnect];
    [m addScriptEventListener:@"setFiatCoin" listener:setFiatCoin];
    [m addScriptEventListener:@"setDisplayTokenAddresses" listener:setDisplayTokenAddresses];
    [m addScriptEventListener:@"setDisplayNFTContractAddresses" listener:setDisplayNFTContractAddresses];
    [m addScriptEventListener:@"setPriorityTokenAddresses" listener:setPriorityTokenAddresses];
    [m addScriptEventListener:@"setPriorityNFTContractAddresses" listener:setPriorityNFTContractAddresses];
    [m addScriptEventListener:@"showLanguageSetting" listener:showLanguageSetting];
    [m addScriptEventListener:@"showAppearanceSetting" listener:showAppearanceSetting];
    
    [m addScriptEventListener:@"setSupportAddToken" listener:setSupportAddToken];
}
@end

