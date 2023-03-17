import React, { useState, useEffect, useCallback, useRef } from 'react';

import axios from 'axios';

export default function AudioRecorder() {
  const [recording, setRecording] = useState<boolean>(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [text, setText] = useState<string>('No audio detected');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleDataAvailable = useCallback((event: BlobEvent) => {
    setAudioChunks((audioChunks) => [...audioChunks, event.data]);
  }, []);

  const handleStartRecording = useCallback(() => {
    mediaRecorderRef.current?.start();
    setRecording(true);
  }, []);

  const handleStopRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'recording') {
      try {
        mediaRecorderRef.current?.stop();
        if (audioChunks.length > 0) {
          console.log('inside');
          const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);

          const formData = new FormData();
          formData.append('file', audioBlob, 'recording.wav');

          axios.post('/api/whisper', formData).then((resp) => {
            console.log(resp.data);
          });
        } else {
          setText('Please try again');
        }
      } catch (error) {
        console.error('Error stopping recording:', error);
      }
    }

    setRecording(false);
    setAudioChunks([]);
  }, [audioChunks]);

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

  return (
    <>
      <div className='flex w-full max-h-[10vh] min-h-[10vh] justify-center p-1 gap-3 items-center'>
        {recording ? (
          <button
            className='border p-3 rounded-lg hover:bg-slate-800'
            onClick={handleStopRecording}
          >
            Stop Recording
          </button>
        ) : (
          <button
            className='border p-3 rounded-lg hover:bg-slate-800'
            onClick={handleStartRecording}
          >
            {recording ? 'Recording...' : 'Start Recording'}
          </button>
        )}
        {audioUrl ? (
          <audio
            controls
            src={audioUrl}
          >
            Your browser does not support the <code>audio</code> element.
          </audio>
        ) : (
          <div>{text}</div>
        )}
      </div>
    </>
  );
}
