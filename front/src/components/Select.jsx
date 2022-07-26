import React from 'react';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const SelectList = ({ inputLabel, array, onChange, value, error }) => {
  return (
    <FormControl   color="info"
    error={error} sx={{ minWidth: 150, ml: 2 }}>
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
