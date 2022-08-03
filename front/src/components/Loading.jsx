import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = ({ variant }) => {
  return (
    <CircularProgress
      size={60}
      sx={{ mb: 3 }}
      variant={variant}
      color='secondary'
    />
  );
};

export default Loading;
