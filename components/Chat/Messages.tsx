import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import Message from './Message';

type Props = {
  messages: Mess[];
};

type Mess = {
  role: string;
  content: string;
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
      className='flex flex-col max-w-screen min-h-[90vh] max-h-[90vh] overflow-y-auto scrollbar-hide'
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
