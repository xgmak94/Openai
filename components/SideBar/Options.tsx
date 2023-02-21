import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PersonIcon from '@mui/icons-material/Person';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LaunchIcon from '@mui/icons-material/Launch';
import LogoutIcon from '@mui/icons-material/Logout';

type Props = {};

// need to make darkmode light mode switching

let options = [
  {
    name: 'clear',
    text: (
      <>
        <DeleteOutlineIcon />
        Clear conversations
      </>
    ),
  },
  {
    name: 'upgrade',
    text: (
      <span className='flex w-full flex-row justify-between'>
        <span className='gold-new-button flex items-center gap-3'>
          <PersonIcon />
          Upgrade to Plus
        </span>
        <span className='rounded-md bg-yellow-200 py-0.5 px-1.5 text-xs font-medium uppercase text-gray-800'>
          NEW
        </span>
      </span>
    ),
  },
  {
    name: 'mode',
    text: (
      <>
        <LightModeIcon />
        <DarkModeIcon />
        Light mode
      </>
    ),
  },
  {
    name: 'updates',
    text: (
      <>
        <LaunchIcon />
        Updates & FAQ
      </>
    ),
  },
  {
    name: 'logout',
    text: (
      <>
        <LogoutIcon />
        Log out
      </>
    ),
  },
];

export default function Options({}: Props) {
  return (
    <>
      {options.map((opt) => (
        <a
          className='flex p-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm'
          key={opt.name}
        >
          {opt.text}
        </a>
      ))}
    </>
  );
}
