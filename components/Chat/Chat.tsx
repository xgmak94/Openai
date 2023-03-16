import React, { useEffect, useState } from 'react';
import Chatbox from './Chatbox';
import Messages from '../Messages/Messages';
import Recorder from './Recorder';
import {type message } from '../../models/messages';

import axios from 'axios';

type Props = {};

enum Role {
  user = 'user',
  assistant = 'assistant',
  system = 'system',
}

export default function Chat({}: Props) {
  const [messages, setMessages] = useState<message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    // only make a call if last message was from user
    if (messages.length > 0 && messages[messages.length - 1].role === 'user') {
      axios
        .post('/api/query', {
          messages: messages,
        })
        .then((resp) => {
          setMessages((prev) => [...prev, resp.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [messages]);

  return (
    <div className='flex flex-col h-screen w-full bg-[#343541] items-center justify-between divide-y gap-1'>
      <Messages messages={messages} />
      <Recorder />
      <Chatbox
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
}
