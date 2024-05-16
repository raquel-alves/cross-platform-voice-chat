import { Audio } from 'expo-av';
import Recording from 'react-native-recording';

const requestNativeStreamingPermission = async () => {
    await Audio.requestPermissionsAsync();
    const permission = await Audio.getPermissionsAsync();
    return permission.granted;
};

export const startStream = async (callback: (args: { start: Function | null, end: Function | null }) => void) => {
    const hasPermission = await requestNativeStreamingPermission();
    
    if (!hasPermission) {
        return callback({
            start: null,
            end: null,
        });
    };

    Recording.init({
        bufferSize: 4096,
        sampleRate: 44100,
        bitsPerChannel: 16,
        channelsPerFrame: 1,
    });
    
    Recording.addRecordingEventListener((data: any) => {
        // the connection with socket.io would be here
        console.log(data)
    });
    
    callback({
        start: Recording.start,
        end: Recording.stop,
    })
};
