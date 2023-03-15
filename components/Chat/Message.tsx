/* eslint-disable react/no-children-prop */
import React from 'react';
import ReactMarkdown from 'react-markdown';

type Props = { message: Mess };

type Mess = {
  role: string;
  content: string;
};

export default function Message({ message }: Props) {
  return (
    <div className='w-screen'>
      <div
        className={`p-3 ${
          message.role === 'user' ? 'bg-[#343541]' : 'bg-[#444654]'
        }`}
      >
        <ReactMarkdown children={message.content} />
      </div>
    </div>
  );
}
