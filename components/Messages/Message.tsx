/* eslint-disable react/no-children-prop */
import React from 'react';
import Image from 'next/image';
import Markdown from './Markdown';
import { type message } from '../../models/messages';

type Props = { message: message };

export default function Message({ message }: Props) {
  return (
    <div
      className={`flex max-w-screen p-2 gap-2 ${
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
      <div className='flex flex-col'>
        <Markdown message={message} />
      </div>
    </div>
  );
}
