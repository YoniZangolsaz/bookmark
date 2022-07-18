import React, { useContext, useState, useEffect } from 'react';
import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Avatar from '@mui/material/Avatar';
import FormDialog from './FormDialog';
import { InfoContext } from '../InfoContext';
import axios from 'axios';

const useStyles = makeStyles({
  box: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto',
    justifyContent: 'center',
    marginBottom: '16px',
    minWidth: '100%',
  },
  paper: {
    minHeight: '20vh',
    maxHeight: '25vh',
    margin: '16px',
    alignItems: 'center',
    overflow: 'auto',
    width: '300px',
  },
  typographyHeader: {
    marginLeft: '16px',
    flexGrow: 1,
    marginTop: '3px',
    textTransform: 'capitalize',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1.5rem',
    letterSpacing: '1px',
    color: '#FFFFFF',
    // width: 'fit-content',
  },
  pages: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    margin: '10px 20px',
  },
  button: {
    width: '100%',
    height: '0px',
    margin: '5px 0',
    padding: '15px 0',
    letterSpacing: '2px',
    backgroundColor: '#78909c',
    color: '#FFFFFF',
    textTransform: 'capitalize',
    '&:hover': { backgroundColor: '#78909c', opacity: 0.8 },
  },
  icon: {
    color: 'white',
    '&:hover': { opacity: '0.7' },
  },
});

const Pages = ({ pages, deletePage }) => {
  const classes = useStyles();
  let navigate = useNavigate();
  const { info, setInfo } = useContext(InfoContext);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState();

  const addBookmark = async (bookmark) => {
    console.log(bookmark);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BECKEND_URL}/bookmark`,
        {
          index,
          bookmark,
        }
      );
      setInfo([...info], pages[index].bookmarks.push(bookmark));
    } catch {}
  };

  const openAddBookmark = (pageIndex) => {
    setIndex(pageIndex);
    console.log(pageIndex);
    setOpen(true);
  };

  return (
    <Grid container>
      {open && (
        <FormDialog
          open={open}
          close={() => setOpen(false)}
          addBookmark={(bookmark) => addBookmark(bookmark)}
        />
      )}
      <Box className={classes.box}>
        {pages.map((page, pageIndex) => (
          <Grid key={pageIndex}>
            <Paper elevation={3} variant='elevation' className={classes.paper}>
              <Box sx={{ display: 'flex', backgroundColor: '#01579b' }}>
                <Typography variant='h5' className={classes.typographyHeader}>
                  {page.title}
                </Typography>
                <IconButton
                  sx={{ paddingRight: 0 }}
                  onClick={() => openAddBookmark(pageIndex)}
                >
                  <AddCircleOutlineIcon className={classes.icon} />
                </IconButton>
                <IconButton onClick={() => deletePage(page._id)}>
                  <DeleteIcon className={classes.icon} />
                </IconButton>
              </Box>
              <Box className={classes.pages}>
                {page?.bookmarks.map((bookmarks, i) => (
                  <div>
                    <Button
                      key={i}
                      href={bookmarks.url}
                      className={classes.button}
                    >
                      <Avatar
                        sx={{ width: '25px', height: '25px', mr: 0.8 }}
                        alt={bookmarks.url}
                        src={`${bookmarks.url}/favicon.ico`}
                      />
                      {bookmarks?.title}
                    </Button>
                  </div>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Box>
    </Grid>
  );
};

export default Pages;
