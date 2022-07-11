import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = ({ variant }) => {
  return (
    <CircularProgress sx={{ mb: 3 }} variant={variant} color='secondary' />
  );
};

export default Loading;
