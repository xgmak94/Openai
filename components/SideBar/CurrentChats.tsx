import React from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

type Props = {};

let examples = [
  'convo A',
  'convo B',
  'convo C',
  'convo D',
  'convo iono',
  'one more for fun me guesses iono asdf',
];

export default function CurrentChats({}: Props) {
  return (
    <div
      className='flex-col flex-1 overflow-y-auto border-b border-white/20 -mr-2
    scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-black'
    >
      <div className='flex flex-col gap-2 w-full text-gray-100 text-sm'>
        {examples.map((ex) => (
          <div
            className='flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer'
            key={ex}
          >
            <ChatBubbleOutlineIcon />
            <div className='flex-1 text-ellipsis min-h-5 max-h-5 overflow-hidden break-all relative'>
              {ex}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
