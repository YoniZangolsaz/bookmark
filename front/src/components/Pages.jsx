import React, { useContext, useState, useEffect } from 'react';
import { Box, Paper, Typography, Grid, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
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

const useStyles = makeStyles(() => ({
  customWidth: {
    letterSpacing: '0.1rem',
    fontSize: '0.8em',
  },
}));

const style = {
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
    cursor: 'help',
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
  searchBox: {
    display: 'flex',
    flexDirection: 'row',
    margin: '8px 8px 56px 24px',
  },
};

const Pages = ({ pages, deletePage }) => {
  let navigate = useNavigate();
  const classes = useStyles();
  const { setInfo } = useContext(InfoContext);
  const [open, setOpen] = useState(false);
  const [indexPage, setIndexPage] = useState();
  const [pageId, setPageId] = useState();
  const [filter, setFilter] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [pagesSearched, setPagesSearched] = useState(pages);

  const addBookmark = async (bookmark) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BECKEND_URL}/bookmark`,
        { pageId, bookmark }
      );
      pages[indexPage].bookmarks.push(res.data);
      setInfo([...pages]);
      console.log(pages);
    } catch {
      navigate('/bookmark');
    }
  };

  const deleteBookmark = async (bookmark, pageIndex) => {
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

  useEffect(() => {
    const getUserTags = () => {
      console.log(pages);
      const userTags = new Set();
      setTags(userTags);
      userTags.add('');
      for (let i = 0; i < pages.length; i++) {
        for (let j = 0; j < pages[i]?.bookmarks?.length; j++) {
          for (let k = 0; k < pages[i].bookmarks[j].tags?.length; k++) {
            userTags.add(pages[i].bookmarks[j].tags[k]);
          }
        }
      }
    };
    getUserTags();
  }, []);

  useEffect(() => {
    !filter
      ? setPagesSearched(pages)
      : setPagesSearched((prevPages) =>
          prevPages.map((page) => {
            return {
              ...page,
              bookmarks: page.bookmarks.filter(({ title }) =>
                title.toLowerCase().startsWith(filter.toLowerCase())
              ),
            };
          })
        );
  }, [filter]);

  useEffect(() => {
    setPagesSearched(pages);
  }, [pages]);

  useEffect(() => {
    !tagInput
      ? setPagesSearched(pages)
      : setPagesSearched(
          () =>
            pages.map((page) => {
              return {
                ...page,
                bookmarks: page.bookmarks.filter(({ tags }) =>
                  tags.includes(tagInput)
                ),
              };
            })

        );
  }, [tagInput]);

  return (
    <Grid container>
      {open && (
        <FormDialog
          open={open}
          close={() => setOpen(false)}
          addBookmark={(bookmark) => addBookmark(bookmark)}
        />
      )}
      <Box sx={style.searchBox}>
        <Search setData={filterData} />
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
      <Box sx={style.box}>
        {pagesSearched?.map((page, pageIndex) => (
          <Grid key={pageIndex}>
            <Paper elevation={3} variant='elevation' sx={style.paper}>
              <Box sx={{ display: 'flex', backgroundColor: '#01579b' }}>
                <Typography variant='h5' sx={style.typographyHeader}>
                  {page.title}
                </Typography>
                <IconButton
                  sx={{ paddingRight: 0 }}
                  onClick={() => openAddBookmark(page._id, pageIndex)}
                >
                  <AddCircleOutlineIcon sx={style.icon} />
                </IconButton>
                <IconButton onClick={() => deletePage(page._id)}>
                  <DeleteIcon sx={style.icon} />
                </IconButton>
              </Box>
              <Box sx={style.pages}>
                {page?.bookmarks?.map((bookmarks, i) => (
                  <Box sx={style.boxBookmark} key={i}>
                    <Avatar
                      sx={style.avatar}
                      alt={bookmarks.url}
                      src={`${bookmarks.url}/favicon.ico`}
                    />
                    <Tooltip
                      key={i}
                      placement='top-start'
                      title={`Tags: ${bookmarks.tags}`}
                      arrow
                      classes={{ tooltip: classes.customWidth }}
                    >
                      <Typography key={i} sx={style.bookmark}>
                        {bookmarks?.title}
                      </Typography>
                    </Tooltip>
                    <Tooltip placement='top-start' title='Delete' arrow>
                      <IconButton
                        size='small'
                        onClick={() => deleteBookmark(bookmarks, pageIndex)}
                      >
                        <DeleteIcon sx={{ color: 'red' }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip placement='top-start' title='Go to website' arrow>
                      <IconButton size='small' href={bookmarks.url}>
                        <ArrowCircleRightIcon sx={{ color: '#009688' }} />
                      </IconButton>
                    </Tooltip>
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
