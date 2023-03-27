import React, { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';

export default function CodeCopyBtn({ children }: any) {
  const [copy, setCopy] = useState<boolean>(false);

  function handleClick(e: any) {
    navigator.clipboard.writeText(children[0].props.children[0]);

    setCopy((prev) => !prev);
  }

  return (
    <div className='flex flex-row-reverse gap-2'>
      <Tooltip title={copy ? 'Copied!' : 'Copy code'}>
        <ContentCopyIcon
          onClick={handleClick}
          className='cursor-pointer'
        />
      </Tooltip>
      <div>{copy ? 'Copied!' : 'Copy code'}</div>
    </div>
  );
}
