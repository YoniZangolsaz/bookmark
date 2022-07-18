import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Box,
  Stack,
  Chip,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const FormDialog = ({ open, close, addBookmark }) => {
  const [page, setPage] = useState({ title: '', url: '', tags: [] });
  const [error, setError] = useState({ title: false, url: false });
  const [tag, setTag] = useState('');

  const handlePageChange = (e, key) => {
    e.preventDefault();
    setPage({ ...page, [key]: e.target.value });
    setError({ ...error, [key]: false });
  };

  const addPage = (e) => {
    e.preventDefault();
    setError({ title: false, url: false });

    error.title = !page.title;
    error.url = !page.url;

    if (error.title || error.url) {
      setError({ ...error });
    } else {
      addBookmark(page);
      close();
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={close}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          <Typography sx={{ color: '#26a69a' }} variant='h5'>
            Add page
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Bookmark Title'
            fullWidth
            variant='outlined'
            error={error.title}
            onChange={(e) => handlePageChange(e, 'title')}
          />
          <TextField
            margin='dense'
            label='Bookmark Url'
            fullWidth
            variant='outlined'
            error={error.url}
            onChange={(e) => handlePageChange(e, 'url')}
          />
          <FormControl fullWidth margin='dense' variant='outlined'>
            <InputLabel>Add Tags</InputLabel>
            <OutlinedInput
              sx={{ padding: 0 }}
              value={tag}
              onChange={(e) => {
                e.preventDefault();
                setTag(e.target.value);
              }}
              endAdornment={
                <InputAdornment>
                  <IconButton
                    sx={{ color: 'green' }}
                    onClick={() => {
                      page.tags.push(tag);
                      setTag('');
                    }}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </InputAdornment>
              }
              label='Add Tags'
            />
          </FormControl>
          <Stack sx={{ mt: 1 }} direction='row' spacing={1}>
            {page.tags?.map((tag, i) => (
              <Chip label={tag} key={i} />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={addPage}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
