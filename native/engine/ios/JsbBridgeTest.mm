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
    
    return self;
}


@end

