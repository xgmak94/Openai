import React from 'react';

type Props = { url: string };

export default function Generatedimage({ url }: Props) {
  return (
    <div className='w-full h-full'>
      <img
        src={url}
        alt='dalle generated'
        loading='lazy'
      />
    </div>
  );
}
