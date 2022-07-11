import React from 'react';
import TextField from '@mui/material/TextField';

const Input = ({
  label,
  onChange,
  error,
  fullWidth,
  type,
  helperText,
  color,
}) => {
  return (
    <TextField
      variant='outlined'
      label={label}
      fullWidth={fullWidth}
      required
      margin='dense'
      onChange={onChange}
      type={type}
      error={error}
      autoFocus
      helperText={helperText}
      color={color}
    ></TextField>
  );
};

export default Input;
