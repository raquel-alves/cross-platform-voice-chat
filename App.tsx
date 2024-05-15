import { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { startStream } from '@utils/streamAudio';

export default function App() {
  const [microphoneStatus, setMicrophoneStatus] = useState(false); // false for offline, true for online
  const [play, setPlay] = useState<Function | null>(null);
  const [stop, setStop] = useState<Function | null>(null);
  const hasPermission = play && stop;

  const toggleMicrophoneStatus = () => {
    if (!hasPermission) return;
    microphoneStatus ? stop() : play()
    setMicrophoneStatus(!microphoneStatus);
  };

  useEffect(() => {
    (async () => {
      await startStream(({ start, end }) => {
        setPlay(() => start);
        setStop(() => end);
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title={microphoneStatus ? 'Mic On' : 'Mic Off'}
        onPress={toggleMicrophoneStatus}
        disabled={!hasPermission}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
