import React, { useState, useEffect, useCallback, useRef } from 'react';

export default function AudioRecorder() {
  const [recording, setRecording] = useState<boolean>(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleDataAvailable = useCallback((event: BlobEvent) => {
    setAudioChunks((audioChunks) => [...audioChunks, event.data]);
  }, []);

  useEffect(() => {
    let recorder: MediaRecorder;
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
        (window as any).stream = stream;

        recorder.addEventListener('dataavailable', handleDataAvailable);
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });

    return () => {
      if (recorder?.state === 'recording') {
        recorder.stop();
      }
    };
  }, [handleDataAvailable]);

  const handleStartRecording = useCallback(() => {
    mediaRecorderRef.current?.start();
    setRecording(true);
  }, []);

  const handleStopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'recording') {
      try {
        mediaRecorderRef.current?.stop();
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
    }

    setRecording(false);
    setAudioChunks([]);
  }, [audioChunks]);

  return (
    <div className='flex w-full justify-center'>
      <button
        className='border p-3 rounded-lg hover:bg-slate-800'
        onClick={handleStartRecording}
      >
        {recording ? 'Recording...' : 'Start Recording'}
      </button>
      <button
        className='border p-3 rounded-lg hover:bg-slate-800'
        onClick={handleStopRecording}
      >
        Stop Recording
      </button>
      {audioUrl ? (
        <audio
          controls
          src={audioUrl}
        >
          Your browser does not support the <code>audio</code> element.
        </audio>
      ) : (
        <div>No audio detected</div>
      )}
    </div>
  );
}
