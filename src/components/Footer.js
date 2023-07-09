import React from 'react';
import { Stack, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Stack
      direction="row"
      backgroundColor="#0e0b16"
      bottom="0"
      left="0"
      position="fixed"
      width="100%"
      justifyContent="space-around"
      borderTop="solid 3px #e7dfdd"
      sx={{
        gap: { sm: '122px', xs: '44px' },
        padding: '20px',
      }}
    >
      <Typography fontWeight="bold" color="#e7dfdd" flexShrink={0}>
        Made by TNBM
      </Typography>
    </Stack>
  );
};

export default Footer;
