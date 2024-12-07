import React from 'react';
import { SvgIcon } from '@mui/material';

const SkoniFoxLogo = (props) => (
  <SvgIcon {...props} viewBox="0 0 512 512">
    <defs>
      <linearGradient id="foxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="30%" stopColor="#00ff95" />
        <stop offset="90%" stopColor="#ff00ff" />
      </linearGradient>
    </defs>
    <path
      d="M256 64c-106 0-192 86-192 192s86 192 192 192 192-86 192-192S362 64 256 64zm0 32c88.4 0 160 71.6 160 160s-71.6 160-160 160S96 344.4 96 256 167.6 96 256 96zm0 32c-70.7 0-128 57.3-128 128s57.3 128 128 128 128-57.3 128-128-57.3-128-128-128zm0 32c53 0 96 43 96 96s-43 96-96 96-96-43-96-96 43-96 96-96z"
      fill="url(#foxGradient)"
      fillRule="evenodd"
      clipRule="evenodd"
    />
    <path
      d="M256 128c-70.7 0-128 57.3-128 128s57.3 128 128 128 128-57.3 128-128-57.3-128-128-128zm0 32c53 0 96 43 96 96s-43 96-96 96-96-43-96-96 43-96 96-96z"
      fill="currentColor"
      opacity="0.2"
    />
    <path
      d="M384 256c0 70.7-57.3 128-128 128s-128-57.3-128-128 57.3-128 128-128 128 57.3 128 128zm-32 0c0 53-43 96-96 96s-96-43-96-96 43-96 96-96 96 43 96 96z"
      fill="currentColor"
      opacity="0.1"
    />
  </SvgIcon>
);

export default SkoniFoxLogo;
