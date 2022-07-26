import React, { useContext, useState, useEffect } from 'react';
import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
import SelectList from './Select';

const useStyles = {
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
  boxBookmark: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5px',
  },
  avatar: {
    width: '25px',
    height: '25px',
    mr: 0.8,
    textTransform: 'capitalize',
  },
};

const Pages = ({ pages, deletePage }) => {
  let navigate = useNavigate();
  const { setInfo } = useContext(InfoContext);
  const [open, setOpen] = useState(false);
  const [indexPage, setIndexPage] = useState();
  const [pageId, setPageId] = useState();
  const [filter, setFilter] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const addBookmark = async (bookmark) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BECKEND_URL}/bookmark`,
        { pageId, bookmark }
      );
      pages[indexPage].bookmarks.push(res.data);
      setInfo([...pages]);
    } catch {
      navigate('/bookmark');
    }
  };

  const deleteBookmark = async (bookmark, pageObjectId, pageIndex) => {
    console.log(bookmark);
    const bookmarkId = bookmark._id;
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
      await axios.delete(
        `${process.env.REACT_APP_BECKEND_URL}/bookmark/${bookmarkId}`
      );
      pages[pageIndex].bookmarks = pages[pageIndex].bookmarks.filter(
        (book) => book._id !== bookmark._id
      );
      setInfo([...pages]);
    } catch {
      navigate('/bookmark');
    }
  };

  const openAddBookmark = (pageId, pageIndex) => {
    setIndexPage(pageIndex);
    setPageId(pageId);
    setOpen(true);
  };

  const filterData = (value) => {
    setFilter(value);
  };

  const filteredBookmarks = () => {
    return pages.map((page) => {
      return {
        ...page,
        bookmarks: page.bookmarks.filter(({ title }) =>
          title.toLowerCase().startsWith(filter.toLowerCase())
        ),
      };
    });
  };

  useEffect(() => {
    const getUserTags = () => {
      const userTags = new Set();
      setTags(userTags);
      userTags.add('');
      for (let i = 0; i < pages.length; i++) {
        for (let j = 0; j < pages[i]?.bookmarks?.length; j++) {
          for (let k = 0; k < pages[i].bookmarks[j].tags.length; k++) {
            userTags.add(pages[i].bookmarks[j].tags[k]);
          }
        }
      }
    };
    getUserTags();
  }, []);

  return (
    <Grid container>
      {open && (
        <FormDialog
          open={open}
          close={() => setOpen(false)}
          addBookmark={(bookmark) => addBookmark(bookmark)}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          margin: '8px 0px 56px 24px',
        }}
      >
        <Search sx={{ m: 1 }} setData={filterData} />
        <SelectList
          array={tags}
          inputLabel={'Tags Filter'}
          value={tagInput}
          onChange={(e) => {
            setTagInput(e.target.value);
            console.log(tagInput);
          }}
        />
      </Box>
      <Box sx={useStyles.box}>
        {filteredBookmarks()?.map((page, pageIndex) => (
          <Grid key={pageIndex}>
            <Paper elevation={3} variant='elevation' sx={useStyles.paper}>
              <Box sx={{ display: 'flex', backgroundColor: '#01579b' }}>
                <Typography variant='h5' sx={useStyles.typographyHeader}>
                  {page.title}
                </Typography>
                <IconButton
                  sx={{ paddingRight: 0 }}
                  onClick={() => openAddBookmark(page._id, pageIndex)}
                >
                  <AddCircleOutlineIcon sx={useStyles.icon} />
                </IconButton>
                <IconButton onClick={() => deletePage(page._id)}>
                  <DeleteIcon sx={useStyles.icon} />
                </IconButton>
              </Box>
              <Box sx={useStyles.pages}>
                {page?.bookmarks?.map((bookmarks, i) => (
                  <Box sx={useStyles.boxBookmark} key={i}>
                    <Avatar
                      sx={useStyles.avatar}
                      alt={bookmarks.url}
                      src={`${bookmarks.url}/favicon.ico`}
                    />
                    <Typography key={i} sx={useStyles.bookmark}>
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
