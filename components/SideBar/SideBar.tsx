import React from 'react';
import AddIcon from '@mui/icons-material/Add';

import CurrentChats from './CurrentChats';
import Options from './Options';

type Props = {};

export default function SideBar({}: Props) {
  return (
    <div className='flex flex-col w-[20vw] h-screen bg-[#202123] text-white items-center justify-start'>
      <nav className='flex h-full flex-1 flex-col space-y-1 p-2'>
        <a className='flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20'>
          <AddIcon />
          New chat
        </a>
        <CurrentChats />
        <Options />
      </nav>
    </div>
  );
}
