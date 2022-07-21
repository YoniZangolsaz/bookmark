import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { green } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import Swal from 'sweetalert2';

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

const AddPage = ({ click }) => {
  const classes = useStyles();

  const handleAddPage = async () => {
    const { value: text } = await Swal.fire({
      title: 'Enter the Title of the page',
      input: 'text',
      showCancelButton: true,
      inputValidator: (text) => {
        if (!text) {
          return 'You need to write something!';
        }
      },
    });
    if (text) {
      click(text);
    }
  };
  return (
    <>
      <AddCircleOutlineIcon
        className={classes.addIcon}
        onClick={handleAddPage}
        size='large'
      />
    </>
  );
};

export default AddPage;
