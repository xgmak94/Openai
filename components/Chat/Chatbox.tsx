import React, { useState } from 'react';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { role, message } from '../../models/messages';

type Props = {
  setMessages: React.Dispatch<React.SetStateAction<message[]>>;
};

export default function Chatbox({ setMessages }: Props) {
  const [queryString, setQueryString] = useState<string>(''); // current query
  const [option, setOption] = useState<string>('ChatGPT'); // selected option
  const options = ['ChatGPT', 'DALL·E'];

  // Sets the query string when user is typing
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQueryString(e.target.value);
  };

  // Handles when the user presses enter inside of the chatbox
  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.altKey === false && e.key === 'Enter') {
      e.preventDefault();
      addQuery();
    }
  };

  const addQuery = () => {
    // check query is not empty
    if (queryString) {
      setMessages((prev) => {
        let arr: message[] = [...prev];
        arr.push({
          role: role.user,
          content: queryString,
          ai: option,
        });
        return arr;
      });

      setQueryString('');
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value);
  };

  return (
    <div className='flex w-full rounded-lg text-white'>
      <select
        value={option}
        onChange={handleOptionChange}
      >
        {options.map((option) => (
          <option
            value={option}
            key={option}
          >
            {option}
          </option>
        ))}
      </select>
      <textarea
        data-id='root'
        placeholder='What do you want to know?'
        rows={2}
        className='w-full resize-none overflow-hidden bg-transparent p-3
        text-white'
        onChange={handleChange}
        onKeyDown={handleEnter}
        value={queryString as string}
      />
      <div
        className='flex w-[5vw] items-center justify-center border-l-2 cursor-pointer hover:bg-gray-200 hover:opacity-50'
        onClick={addQuery}
      >
        <SendOutlinedIcon className='text-black' />
      </div>
    </div>
  );
}
