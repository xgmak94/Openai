import React, { useEffect, useState } from 'react';
import Chatbox from './Chatbox';
import Messages from './Messages';

import axios from 'axios';

type Props = {};

type Message = {
  role: string;
  content: string;
};

enum Role {
  user = 'user',
  assistant = 'assistant',
  system = 'system',
}

export default function Chat({}: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [queryString, setQueryString] = useState<string>(''); // current query

  function getQueryResponse() {
    // api call
    // add to allQueries
    // set queryString to empty
    // get response from API

    setMessages((prev) => {
      let arr = [...prev];
      arr.push({
        role: 'user',
        content: queryString,
      });
      return arr;
    });

    setQueryString('');
  }

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
    <div className='flex flex-col h-screen w-full bg-[#343541] items-center justify-between'>
      <Messages messages={messages} />
      <Chatbox
        queryString={queryString}
        setQueryString={setQueryString}
        getQueryResponse={getQueryResponse}
      />
    </div>
  );
}
