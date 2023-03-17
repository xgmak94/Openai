import React from 'react';

type Props = { url: string };

export default function Generatedimage({ url }: Props) {
  return (
    <div>
      <img
        src={url}
        alt='dalle generated'
        loading='lazy'
      />
    </div>
  );
}
