import RecordRTC from 'recordrtc';

const requestWebStreamingPermission = async () => {
    return await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
};

export const startStream = async (callback: (args: { start: Function | null, end: Function | null }) => void) => {
    const stream = await requestWebStreamingPermission();
    const audio = new RecordRTC(stream, {
        timeSlice: 5000,
        sampleRate: 44100,
        type: "audio",
        mimeType: 'audio/webm',
        ondataavailable: (blob) => {
            // the connection with socket.io would be here
            console.log("here's a blob ", blob);
        }
    });
    callback({
        // active: !!(stream?.active),
        start: audio.startRecording,
        end: audio.pauseRecording,
    });
};
