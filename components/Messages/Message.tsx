/* eslint-disable react/no-children-prop */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { type message } from '../../models/messages';

type Props = { message: message };

export default function Message({ message }: Props) {
  return (
    <div
      className={`flex w-screen p-3 ${
        message.role === 'user' ? 'bg-[#343541]' : 'bg-[#444654]'
      }`}
    >
      <Image
        className='h-8 w-8'
        src={`${message.role === 'user' ? '/person.jpg' : '/ai.jpg'}`}
        alt='avatar'
        width={50}
        height={50}
      />
      <div className='p-3'>
        <ReactMarkdown children={message.content} />
      </div>
    </div>
  );
}
