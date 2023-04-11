//
//  ParticleAuthPlugin.m
//  ParticleCocosDemo-mobile
//
//  Created by link on 10/04/2023.
//

#import "ParticleAuthSchemeManager.h"
@import ParticleAuthService;

@implementation ParticleAuthSchemeManager

+ (BOOL)handleUrl: (NSURL *)url {
    return [ParticleAuthService handleUrl:url];
}

@end
