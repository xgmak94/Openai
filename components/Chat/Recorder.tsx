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
    <div className='flex flex-col items-center justify-center border-2 rounded-lg p-4 w-full h-[10vh]'>
      <div className='flex items-center gap-3'>
        {recording ? (
          <button
            className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 whitespace-normal break-all border-4 border-red-900'
            onClick={handleStopRecording}
          >
            Stop Recording
          </button>
        ) : (
          <button
            className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 whitespace-normal break-all border-4 border-green-900'
            onClick={handleStartRecording}
          >
            Start Recording
          </button>
        )}
        {audioUrl ? (
          <audio
            controls
            src={audioUrl}
          />
        ) : (
          <div>{text}</div>
        )}
      </div>
      {/* <div className="flex flex-row gap-3">
        <div>{'help'}</div>
        <CopyToClipboard text={'help'}>
          <button>Copy to clipboard with button</button>
        </CopyToClipboard>
      </div> */}
    </div>
  );
}
