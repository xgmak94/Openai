import { TextField } from '@mui/material';
import React from 'react';

import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

type Props = {
  queryString: string;
  setQueryString: React.Dispatch<React.SetStateAction<string>>;
  getQueryResponse: Function;
};

export default function Chatbox({
  queryString,
  setQueryString,
  getQueryResponse,
}: Props) {
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setQueryString(e.target.value);
  }

  function handleEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.altKey === false && e.key === 'Enter') {
      e.preventDefault();
      getResponse();
    }
  }

  function getResponse() {
    // check query is not empty
    if (queryString) {
      getQueryResponse();
    }
  }

  return (
    <div className='flex w-full border-2 border-gray-400 rounded-lg text-white'>
      <textarea
        data-id='root'
        placeholder='What do you want to know?'
        rows={2}
        className='w-full resize-none overflow-hidden bg-transparent h-[60px] p-3
        text-white'
        onChange={handleChange}
        onKeyDown={handleEnter}
        value={queryString as string}
      />
      <div
        className='flex w-[5vw] items-center justify-center border-l-2 cursor-pointer hover:bg-gray-200 hover:opacity-50'
        onClick={getResponse}
      >
        <SendOutlinedIcon className='text-black' />
      </div>
    </div>
  );
}
