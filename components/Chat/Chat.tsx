import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chatbox from './Chatbox';
import Messages from '../Messages/Messages';
import Recorder from './Recorder';
import { message, role } from '../../models/messages';

type Props = {};

export default function Chat({}: Props) {
  const [messages, setMessages] = useState<message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const prevMessage = messages[messages.length - 1];
    if (messages.length > 0 && prevMessage.role === 'user') {
      let endpoint: string;
      // options are 'ChatGPT', 'DALL·E'
      if (prevMessage.ai === 'ChatGPT') {
        endpoint = '/api/query';
      } else {
        endpoint = '/api/image';
      }
      setLoading(true);
      const loadingMessage: message = {
        content: 'Loading...',
        role: role.assistant,
        ai: 'System',
      };
      setMessages((prev) => [...prev, loadingMessage]);

      axios
        .post(endpoint, {
          messages: messages,
          prompt: prevMessage.content,
        })
        .then((resp) => {
          const newMessage: message = {
            content: resp.data.content,
            role: role.assistant,
            ai: resp.data.ai,
          };
          setMessages((prev) =>
            prev
              .filter((message) => message.content !== 'Loading...')
              .concat(newMessage)
          );
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setMessages((prev) =>
            prev.filter((message) => message.content !== 'Loading...')
          );
          setLoading(false);
        });
    }
  }, [messages]);

  return (
    <div className='flex flex-col h-[100vh] bg-gray-500 p-2'>
      <Messages messages={messages} />
      <div className='flex flex-row items-center justify-center gap-4 mt-2'>
        <Recorder />
        <Chatbox setMessages={setMessages} loading={loading}/>
      </div>
    </div>
  );
}
