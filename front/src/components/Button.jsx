import React from 'react';
import Button from '@mui/material/Button';

const SubmitButton = ({ fullWidth, txt, onClick, endIcon, width, margin, size, icon, color, bgcolor, height, padding, marginTop, letterSpacing, href }) => {
  return (
    <Button
      type='submit'
      variant='contained'
      fullWidth={fullWidth}
      sx={{ m: margin, textTransform: 'capitalize' ,width:width, bgcolor:bgcolor, height:height, padding:padding, marginTop: marginTop, letterSpacing: letterSpacing}}
      onClick={onClick}
      endIcon={endIcon}
      size={size}
      icon={icon}
      color= {color}
      href={href}
    >
      {txt}
    </Button>
  );
};

export default SubmitButton;
