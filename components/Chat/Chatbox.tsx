import React, { useState } from 'react';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { role, type message } from '../../models/messages';

type Props = {
  messages: message[];
  setMessages: React.Dispatch<React.SetStateAction<message[]>>;
};

export default function Chatbox({ messages, setMessages }: Props) {
  const [queryString, setQueryString] = useState<string>(''); // current query

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
      setMessages((prev) => {
        let arr = [...prev];
        arr.push({
          role: role.user,
          content: queryString,
        });
        return arr;
      });

      setQueryString('');
    }
  }

  return (
    <div className='flex w-full h-[10vh] mb-4 border-2 border-gray-400 rounded-lg text-white'>
      <textarea
        data-id='root'
        placeholder='What do you want to know?'
        rows={2}
        className='w-full h-full resize-none overflow-hidden bg-transparent p-3
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
