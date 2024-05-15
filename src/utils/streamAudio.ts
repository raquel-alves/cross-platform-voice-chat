import { Platform } from "react-native";
import { PermissionsAndroid } from "react-native";
// import Recording from "react-native-recording";
import RecordRTC from 'recordrtc';

const requestWebStreamingPermission = async () => {
    return await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
};

const requestNativeStreamingPermission = async () => {
    await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    // return Recording.init({
    //     bufferSize: 4096,
    //     sampleRate: 44100,
    //     bitsPerChannel: 16,
    //     channelsPerFrame: 1,
    // });
    return false;
};

export const startStream = async (callback: (args: { start: Function, end: Function }) => void) => {
    if (Platform.OS === "web") {
        const stream = await requestWebStreamingPermission();
        const audio = new RecordRTC(stream, {
            timeSlice: 5000,
            sampleRate: 44100,
            type: "audio",
            mimeType: 'audio/webm',
            ondataavailable: (blob) => {
                console.log("here's a blob ", blob);
            }
        });
        callback({
            // active: !!(stream?.active),
            start: audio.startRecording,
            end: audio.pauseRecording,
        });
    } else {
        callback({
            // active: false,
            start: () => { },
            end: () => { },
        })
        // const stream = await requestNativeStreamingPermission();
        // callback({
        //     active: stream?.active,
        //     listener: stream?.addEventListener,
        // });
    };
};
