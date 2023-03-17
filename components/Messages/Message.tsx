/* eslint-disable react/no-children-prop */
import React from 'react';
import Image from 'next/image';
import Markdown from './Markdown';
import Generatedimage from './Generatedimage';
import { type message, role } from '../../models/messages';

type Props = { message: message };

export default function Message({ message }: Props) {
  return (
    <div
      className={`flex max-w-screen p-2 gap-2 ${
        message.role === 'user' ? 'bg-[#444654]' : 'bg-[#343541]'
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
        {message.ai === 'DALL·E' && message.role === role.assistant ? (
          <Generatedimage url={message.content} />
        ) : (
          <Markdown message={message} />
        )}
      </div>
    </div>
  );
}
