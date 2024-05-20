//
//  RCTMicrophoneModule.m
//  crossplatformvoicechat
//
//  Created by Raquel on 19/05/24.
//

#import "RCTMicrophoneModule.h"

@implementation RCTMicrophoneModule

AVAudioRecorder * audioRecorder;

- (instancetype)init {
  NSError *error;
  
  // Crie o URL do arquivo de saída
  NSURL *outputFileURL = [NSURL fileURLWithPath:@"/path/to/output.caf"];

  // Defina as configurações de gravação
  NSDictionary *recordSettings = @{
      AVEncoderAudioQualityKey: @(AVAudioQualityMin),
      AVEncoderBitRateKey: @(16),
      AVNumberOfChannelsKey: @(2),
      AVSampleRateKey: @(44100)
  };
  
  audioRecorder = [[AVAudioRecorder alloc] initWithURL:outputFileURL settings:recordSettings error:&error];
  
  return self;
}

RCT_EXPORT_MODULE();
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isRecording) {
  int isRecording = audioRecorder.isRecording != YES ? 0 : 1;
  NSNumber *number = [NSNumber numberWithInt:isRecording];
  return number;
}
RCT_EXPORT_METHOD(start) {
  [audioRecorder record];
}
RCT_EXPORT_METHOD(stop) {
  [audioRecorder pause];
}
@end
