import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, Container, Box } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

const Search = ({ setData }) => {
  return (
    <Container maxWidth = 'sm'>
      <Box sx={{alignItems: 'center'}}>
      <TextField
        sx={{ width: '100%', mb: 10, mt: 8, justifyContent: 'center' }}
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
      </Box>
    </Container>
  );
};

export default Search;
