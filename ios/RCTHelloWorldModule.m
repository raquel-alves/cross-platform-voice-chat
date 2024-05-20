//
//  RCTHelloWorldModule.m
//  crossplatformvoicechat
//
//  Created by Raquel on 18/05/24.
//

#import "RCTHelloWorldModule.h"
#import <React/RCTLog.h>

@implementation RCTHelloWorldModule
RCT_EXPORT_MODULE();
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(sendHelloWorld) {
  return @"Hello Buddy!";
};
@end
