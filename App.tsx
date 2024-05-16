import { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { startStream } from '@utils/stream';
import Layout from '@components/Layout';

export default function App() {
  const [microphoneStatus, setMicrophoneStatus] = useState(false); // false for offline, true for online
  const [play, setPlay] = useState<Function | null>(null);
  const [stop, setStop] = useState<Function | null>(null);
  const canStreamAudio = play && stop;

  const toggleMicrophoneStatus = () => {
    if (!canStreamAudio) return;
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
    <Layout>
      <Button
        title={microphoneStatus ? 'Mic On' : 'Mic Off'}
        onPress={toggleMicrophoneStatus}
        disabled={!canStreamAudio}
      />
    </Layout>
  );
};

