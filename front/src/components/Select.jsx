import React from 'react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const SelectList = ({ inputLabel, array, onChange, value, error }) => {
  return (
    <FormControl required error={error} sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>{inputLabel}</InputLabel>
      <Select
        value={value}
        label={inputLabel}
        onChange={onChange}
      >
        {array.map((item, i) => (
          <MenuItem key={i} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectList;
