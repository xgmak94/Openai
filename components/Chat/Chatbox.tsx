import { TextField } from '@mui/material';
import React from 'react';

type Props = {};

// Typing area for
export default function Chatbox({}: Props) {
  return (
    <div className='flex w-full m-3'>
      <TextField
        className='w-full border-black border-2'
        variant='filled'
        multiline
        minRows={1}
        maxRows={4}
      />
      <div className='flex w-[5vw] bg-white items-center justify-center cursor-pointer'>
        <svg
          stroke='currentColor'
          fill='none'
          strokeWidth='2'
          viewBox='0 0 24 24'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='h-6 w-6 p-1 rounded-lg hover:bg-gray-300'
          height='1em'
          width='1em'
          xmlns='http://www.w3.org/2000/svg'
        >
          <line
            x1='22'
            y1='2'
            x2='11'
            y2='13'
          ></line>
          <polygon points='22 2 15 22 11 13 2 9 22 2'></polygon>
        </svg>
      </div>
    </div>
  );
}
