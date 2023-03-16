import React, { useEffect, useRef } from 'react';
import Message from './Message';
import { type message } from '../../models/messages';

type Props = {
  messages: message[];
};

// Store questions and responses
export default function Querys({ messages }: Props) {
  const messagesEndRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  }, [messages]);

  return (
    <div className='flex flex-col w-full min-h-[80vh] max-h-[80vh] overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-gray-600 scrollbar-track-gray-400'>
      {messages.map((mess) => (
        <Message
          message={mess}
          key={mess.content}
        />
      ))}
      <span ref={messagesEndRef} />
    </div>
  );
}
