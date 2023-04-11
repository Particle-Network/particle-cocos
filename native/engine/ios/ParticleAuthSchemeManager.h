//
//  ParticleAuthPlugin.h
//  ParticleCocosDemo-mobile
//
//  Created by link on 10/04/2023.
//

#import <Foundation/Foundation.h>
NS_ASSUME_NONNULL_BEGIN

/**
 * The type of a block that is capable of sending a response to a bridged
 * operation. Use this for returning callback methods to JS.
 */
typedef void (^RCTResponseSenderBlock)(NSArray *response);


@interface ParticleAuthSchemeManager : NSObject

+ (BOOL) handleUrl:(NSURL *)url;
@end

NS_ASSUME_NONNULL_END
