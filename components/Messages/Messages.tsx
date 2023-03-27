import React, { useEffect, useRef } from 'react';
import Message from './Message/Message';
import { type message } from '../../models/messages';

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
      className='flex flex-col w-full h-[80vh] overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-400 scroll-smooth gap-1 pr-4'
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
