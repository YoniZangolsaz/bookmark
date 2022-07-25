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
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Swal from 'sweetalert2';
import Search from './Search';

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
  },
  pages: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    margin: '10px 20px',
  },
  bookmark: {
    width: '100%',
    height: '0px',
    margin: '0 0 22px 2px',
    letterSpacing: '1.5px',
    textTransform: 'capitalize',
  },
  icon: {
    color: 'white',
    '&:hover': { opacity: '0.7' },
  },
});

const Pages = ({ pages, deletePage }) => {
  const classes = useStyles();
  let navigate = useNavigate();
  const { info, setInfo, addLocalNewBookmark, removeLocalBookmark } =
    useContext(InfoContext);
  const [open, setOpen] = useState(false);
  const [indexPage, setIndexPage] = useState();
  const [pageId, setPageId] = useState();
  const [allPages, setAllPages] = useState(pages);
  const [pagesFiltered, setPagesFiltered] = useState(pages);

  const addBookmark = async (bookmark) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BECKEND_URL}/bookmark`,
        {
          pageId,
          bookmark,
        }
      );
      addLocalNewBookmark(pageId, bookmark);
    } catch {
      navigate('/bookmark');
    }
  };

  const deleteBookmark = async (bookmark, pageObjectId, pageIndex) => {
    console.log(bookmark);
    const bookmarkId = bookmark._id;
    // setPageId(pageObjectId);
    // setIndexPage(pageIndex)
    const swalRes = await Swal.fire({
      title: 'Are you sure you want to delete this bookmark?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I am sure!',
    });
    if (!swalRes.isConfirmed) {
      return '';
    }
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BECKEND_URL}/bookmark/${bookmarkId}`
      );
      //   removeLocalBookmark(pageObjectId, bookmark)
      //  setInfo(pages[pageIndex].bookmarks.pull(bookmark))
      console.log(1);
      setInfo(
        pages[pageIndex].bookmarks.filter((book) => book._id !== book._id)
      );
      console.log(2);

      setInfo([...pages]);
    } catch {
      navigate('/bookmark');
    }
  };

  // setInfo(info.filter((page) => page._id !== pageId));

  const openAddBookmark = (pageId, pageIndex) => {
    // console.log(pageId);
    // console.log(pageIndex);
    setIndexPage(pageIndex);
    setPageId(pageId);
    setOpen(true);
  };

  const filterData = (value) => {
    const resData = allPages.map((page) => {
      return {
        ...page, bookmarks: page.bookmarks.filter(({ title }) => title.startsWith(value)
        )
      }
    });
    setPagesFiltered(resData);
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
      <Search setData={filterData} />
      <Box className={classes.box}>
        {pagesFiltered?.map((page, pageIndex) => (
          <Grid key={pageIndex}>
            <Paper elevation={3} variant='elevation' className={classes.paper}>
              <Box sx={{ display: 'flex', backgroundColor: '#01579b' }}>
                <Typography variant='h5' className={classes.typographyHeader}>
                  {page.title}
                </Typography>
                <IconButton
                  sx={{ paddingRight: 0 }}
                  onClick={() => openAddBookmark(page._id, pageIndex)}
                >
                  <AddCircleOutlineIcon className={classes.icon} />
                </IconButton>
                <IconButton onClick={() => deletePage(page._id)}>
                  <DeleteIcon className={classes.icon} />
                </IconButton>
              </Box>
              <Box className={classes.pages}>
                {page?.bookmarks?.map((bookmarks, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: '5px',
                    }}
                  >
                    <Avatar
                      sx={{
                        width: '25px',
                        height: '25px',
                        mr: 0.8,
                        textTransform: 'capitalize',
                      }}
                      alt={bookmarks.url}
                      src={`${bookmarks.url}/favicon.ico`}
                    />
                    <Typography key={i} className={classes.bookmark}>
                      {bookmarks?.title}
                    </Typography>
                    <IconButton
                      size='small'
                      onClick={() =>
                        deleteBookmark(bookmarks, page._id, pageIndex)
                      }
                    >
                      <DeleteIcon sx={{ color: 'red' }} />
                    </IconButton>
                    <IconButton size='small' href={bookmarks.url}>
                      <ArrowCircleRightIcon sx={{ color: '#009688' }} />
                    </IconButton>
                  </Box>
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
