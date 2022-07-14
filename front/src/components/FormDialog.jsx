import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const FormDialog = ({ open, close, addBookmark }) => {
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
          />
          <TextField
            margin='dense'
            label='Bookmark Url'
            fullWidth
            variant='outlined'
          />
          <FormControl fullWidth margin='dense' variant='outlined'>
            <InputLabel>Add Tags</InputLabel>
            <OutlinedInput
              sx={{ padding: 0 }}
              value={''}
              onChange={''}
              endAdornment={
                <InputAdornment>
                  <IconButton sx={{ color: 'green' }} onClick={''}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </InputAdornment>
              }
              label='Add Tags'
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={close}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
