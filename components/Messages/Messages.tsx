import React, { useEffect, useRef } from 'react';
import Message from './Message';
import {type message } from '../../models/messages';

type Props = {
  messages: message[];
};

// Store questions and responses
export default function Querys({ messages }: Props) {
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current !== null) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className='flex flex-col max-w-screen min-h-[80vh] max-h-[80vh] overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-gray-400'
      ref={messagesRef}
    >
      {messages.map((mess) => (
        <Message
          message={mess}
          key={mess.content}
        />
      ))}
    </div>
  );
}
