/* eslint-disable react/no-children-prop */
import React from 'react';
import Image from 'next/image';
import Markdown from './Markdown';
import Generatedimage from './Generatedimage';
import { type message, role } from '../../../models/messages';

type Props = { message: message };

export default function Message({ message }: Props) {
  return (
    <div
      className={`grid grid-cols-12 max-w-screen p-2 gap-2 justify-between text-sm ${
        message.role === 'user' ? 'bg-gray-600' : 'bg-gray-700'
      } rounded-lg`}
    >
      <div className='col-span-1'>
        <Image
          className='rounded-full'
          src={`${message.role === 'user' ? '/person.jpg' : '/ai.jpg'}`}
          alt='avatar'
          width={50}
          height={50}
        />
      </div>
      <div className='flex flex-col col-span-11 pr-2'>
        {message.ai === 'DALL·E' && message.role === role.assistant ? (
          <Generatedimage url={message.content} />
        ) : (
          <Markdown message={message} />
        )}
      </div>
    </div>
  );
}
