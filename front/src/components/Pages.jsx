import React, { useContext, useState } from 'react';
import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import { InfoContext } from '../InfoContext';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles({
  box: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto',
    // justifyContent: 'center',
    marginBottom: '16px',
    minWidth: '100%',
  },
  paper: {
    minHeight: '20vh',
    maxHeight: '20vh',
    margin: '16px',
    borderRadius: '20px',
    alignItems: 'center',
    overflow: 'auto',
    width: '300px',
  },
  typographyHeader: {
    textAlign: 'center',
    margin: '0 auto',

    // margin: '12px',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontFamily: 'Roboto Mono, monospace',
    width: 'fit-content',
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
    backgroundColor: '#757575',
    color: '#FFFFFF',
    textTransform: 'capitalize',
    '&:hover': { backgroundColor: '#757575', opacity: 0.8 },
  },
});

const Pages = () => {
  const classes = useStyles();
  let navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const { info, changeBtn } = useContext(InfoContext);

  const deletePage = (pageNumber) => {
    const newPages = [...pages];
    setPages(pages.filter((page, i) => pageNumber !== i));
  };

  return (
    <Grid container>
      <Box className={classes.box}>
        {info.map((obj, pageIndex) => (
          <Grid key={pageIndex}>
            <Paper elevation={10} variant='elevation' className={classes.paper}>
              <Box
                className='boxTitle'
                sx={{ mt: 0.5, position: 'relative', width: '100%', }}
              >
                <IconButton
                  sx={{ position: 'absolute' }}
                  onClick={() => deletePage(pageIndex)}
                  className='trashed'
                >
                  <DeleteIcon color={'error'} />
                </IconButton>
                <Typography
                  variant='h5'
                  className={classes.typographyHeader}
                  sx={{ color: 'secondary.light' }}
                >
                  {obj.title}
                </Typography>
              </Box>
              <Box className={classes.pages}>
                {obj.bookmarks.map((bookmarks, i) => (
                  <div>
                    <Button
                      key={i}
                      href={bookmarks.url}
                      className={classes.button}
                    >
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
