import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const Search = ({ setData }) => {
  return (
    <TextField
      sx={{ width: '40%', mb: 10, mt: 8 }}
      color='info'
      placeholder='Search…'
      variant='outlined'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onChange={(e) => setData(e.target.value)}
    >
      <SearchIcon />
    </TextField>
  );
};

export default Search;
