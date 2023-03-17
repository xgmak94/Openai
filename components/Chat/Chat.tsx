import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chatbox from './Chatbox';
import Messages from '../Messages/Messages';
import Recorder from './Recorder';
import { message } from '../../models/messages';
import { role } from '../../models/messages';

type Props = {};

export default function Chat({}: Props) {
  const [messages, setMessages] = useState<message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const queryRequest = () => {
      axios
        .post('/api/query', {
          messages: messages,
        })
        .then((resp) => {
          setMessages((prev) => [
            ...prev,
            { ...resp.data, ai: prev[prev.length - 1].ai },
          ]);
        })
        .catch((err) => console.log(err));
    };

    const imageRequest = () => {
      axios
        .post('/api/image', {
          prompt: messages[messages.length - 1].content,
        })
        .then((resp) => {
          setMessages((prev) => [
            ...prev,
            {
              content: resp.data.url,
              role: role.assistant,
              ai: prev[prev.length - 1].ai,
            },
          ]);
          console.log(resp);
        })
        .catch((err) => console.log(err));
    };

    // only make a call if last message was from user
    const prevMessage = messages[messages.length - 1];
    if (messages.length > 0 && prevMessage.role === 'user') {
      // options = ['ChatGPT', 'DALL·E'];
      if (prevMessage.ai === 'ChatGPT') {
        queryRequest();
      } else if (prevMessage.ai === 'DALL·E') {
        imageRequest();
      }
    }
  }, [messages]);

  console.log(messages);
  return (
    <div className='flex flex-col max-h-screen bg-[#343541] items-center justify-between divide-y gap-1'>
      <Messages messages={messages} />
      <Recorder />
      <Chatbox setMessages={setMessages} />
    </div>
  );
}
