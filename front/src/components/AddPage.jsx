import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { green } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
} from '@mui/material';

const useStyles = makeStyles({
  addIcon: {
    position: 'absolute',
    right: '60px',
    bottom: '60px',
    color: green[500],
    width: '60px',
    height: '60px',
    '&:hover': { opacity: 0.7 },
    cursor: 'pointer',
  },
});

const AddPage = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <AddCircleOutlineIcon
        className={classes.addIcon}
        onClick={handleClick}
        fontSize='large'
      />
      <Dialog maxWidth = 'md' open ={open} onClose={handleClose}>
        <DialogTitle>Add page</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <Box>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Email Address'
              type='email'
              fullWidth
              variant='standard'
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddPage;
