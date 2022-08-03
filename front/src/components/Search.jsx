import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

const Search = ({ setData }) => {
  return (
    <TextField
      color='info'
      placeholder='Search Bookmarks...'
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
