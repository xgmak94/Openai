import React, { useState } from 'react';
import Chatbox from './Chatbox';
import Querys from './Querys';
import Examples from './Examples';

type Props = {};

export default function Chat({}: Props) {
  const [queries, setQueries] = useState([]); // hold previous queries

  return (
    <div className='flex flex-col w-[80vw] min-h-screen max-h-screen bg-slate-500 text-black items-center justify-between'>
      {queries.length === 0 ? <Examples /> : <Querys />}
      <Chatbox />
    </div>
  );
}
