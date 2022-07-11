import React, { useState, useEffect } from 'react';
import StepperNumber from './StepperNumber';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import SubmitButton from './Button';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

export const AddPages = ({ next, back, setNewPages }) => {
  const [btns, setBtns] = useState([]);
  const [pages, setPages] = useState([]);
  const [currPage, setCurrPage] = useState(0);

  const getBTnsTitle = async () => {
    try {
      const btnsTitle = await axios.get(`${process.env.REACT_APP_BECKEND_URL}/buttons/title`);
      setBtns(btnsTitle.data);
    } catch (err) {
      Navigate(`/button`)
    }
  };

  useEffect(() => {
    getBTnsTitle();
  }, []);

  const choosePage = (i) => setCurrPage(i);

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
      setPages([...pages, { title: text, btns: [] }]);
      setCurrPage(pages.length)
    }
  };

  const chooseBtn = async (btn) => {
    const newPages = [...pages].length - 1
    if(newPages < currPage) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must choose a page when you add a button ',
      });
    }
    if (pages.length > 0) {
      const newPages = [...pages];
      newPages[currPage].btns.push(btn);
      setPages(newPages);
      setBtns(btns.filter(({ _id }) => _id !== btn?._id));
    }
     else {
      const { value: text } = await Swal.fire({
        title: 'Yoe must to create page before you choose button',
        inputLabel: 'Enter your Page title',
        input: 'text',
        showCancelButton: true,
        inputValidator: (text) => {
          if (!text) {
            return 'You need to write something!';
          }
        },
      });
      if (text) {
        setPages([...pages, { title: text, btns: [btn] }]);
        setBtns(btns.filter(({ _id }) => _id !== btn?._id));
      }
    }
  };

  const unChooseBtn = (btn, pageNumber) => {
    const newPages = [...pages];
    newPages[pageNumber].btns = newPages[pageNumber].btns.filter(
      ({ _id }) => _id !== btn?._id
    );
    setPages(newPages);
    setBtns([...btns, btn]);
  };

  const deletePage = (pageNumber) => {
    const newPages = [...pages];
    setBtns([...btns, ...newPages[pageNumber].btns]);
    setPages(pages.filter((page, i) => pageNumber !== i));
    setCurrPage(0);
  };

  const backButton = (e) => {
    e.preventDefault();
    back();
  };

  const nextButton = (e) => {
    e.preventDefault();
    if (pages.length <= 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must create a pages before you go next ',
      });
    } else {
      for (let i = 0; i < pages.length; i++) {
        const allPages = [...pages];
        if (allPages[i].btns.length === 0) {
          return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You must to add a buttons to the pages before you go next',
          });
        }
      }
    }
    next();
    setNewPages(pages);
  };

  const handleTitle = async (pageNumber) => {
    const btn = pages[pageNumber].btns;
    const title = pages[pageNumber].title;
    const { value: text } = await Swal.fire({
      title: 'Enter the Title of the page',
      input: 'text',
      inputValue: title,
      showCancelButton: true,
      inputValidator: (text) => {
        if (!text) {
          return 'You need to write something!';
        }
      },
    });

    if (text) {
      pages[pageNumber] = { title: text, btns: btn };
      setPages([...pages]);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px 110px 10px 110px',
        }}
      >
        <StepperNumber active={1} />
        <Grid
          container
          sx={{ justifyContent: 'space-between' }}
          style={{ padding: '10px 0px' }}
        >
          <Grid item>
            <Button
              variant='contained'
              onClick={backButton}
              sx={{
                textTransform: 'capitalize',
                bgcolor: '#546e7a',
                '&:hover': { bgcolor: '#546e7a', opacity: 10 },
              }}
            >
              Back
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              onClick={nextButton}
              sx={{
                textTransform: 'capitalize',
                bgcolor: '#546e7a',
                '&:hover': { bgcolor: '#546e7a', opacity: 10 },
              }}
            >
              Next
            </Button>
          </Grid>
        </Grid>
        <Button
          color='warning'
          variant='contained'
          onClick={handleAddPage}
          endIcon={<AddCircleOutlineOutlinedIcon />}
          sx={{ textTransform: 'capitalize' }}
        >
          Add Page
        </Button>
      </Box>
      <Grid container>
        <Grid item lg={5} md={5} sm={6}>
          <Typography
            variant='h6'
            sx={{
              color: '#607d8b',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Buttons
          </Typography>
          <Paper
            elevation={5}
            variant='elevation'
            sx={{
              mx: 3,
              mt: 1,
              mb: 3,
              borderRadius: '10px',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxHeight: '37vh',
                minHeight: '37vh',
                overflow: 'auto',
              }}
            >
              {btns?.map((btn, i) => (
                <>
                  <Grid key={i} item>
                    <SubmitButton
                      margin={1}
                      width={'13vw'}
                      size={'small'}
                      color={'info'}
                      txt={btn?.title}
                      onClick={() => chooseBtn(btn)}
                    ></SubmitButton>
                  </Grid>
                </>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid
          item
          lg={7}
          md={7}
          sm={12}
          sx={{
            height: '48vh',
            overflow: 'auto',
          }}
        >
          <Grid container>
            {pages?.map((page, pageIndex) => (
              <Grid item lg={6} md={6} key={pageIndex}>
                <Paper
                  onClick={() => choosePage(pageIndex)}
                  elevation={5}
                  variant='elevation'
                  sx={{
                    '&:hover > .boxTitle > .trashed': { display: 'block' },
                    width: '80%',
                    height: '38vh',
                    m: 2,
                    borderRadius: '10px',
                    alignItems: 'center',
                    overflow: 'auto',
                    border: `3px solid  ${pageIndex === currPage ? 'lightBlue' : 'white'
                      }`,
                  }}
                >
                  <Box
                    className='boxTitle'
                    sx={{ mt: 0.5, position: 'relative', width: '100%' }}
                  >
                    <IconButton
                      sx={{ position: 'absolute', display: 'none', mt: 0 }}
                      onClick={() => deletePage(pageIndex)}
                      className='trashed'
                    >
                      <DeleteIcon color={'error'} />
                    </IconButton>
                    <Typography
                      variant='h5'
                      sx={{
                        color: '#5d4037',
                        textDecoration: 'underline',
                        margin: '0 auto',
                        width: 'fit-content',
                        fontWeight: 'bold',
                        '&:hover': { cursor: 'pointer', opacity: '0.7' },
                      }}
                      onClick={() => handleTitle(pageIndex)}
                    >
                      {page.title}
                    </Typography>
                  </Box>
                  {page?.btns.map((btn, btnIndex) => (
                    <>
                      <Grid
                        key={btnIndex}
                        item
                        lg={12}
                        sx={{ textAlign: 'center' }}
                      >
                        <SubmitButton
                          size={'small'}
                          margin={1}
                          width={'90%'}
                          color={'info'}
                          txt={btn?.title}
                          onClick={() => unChooseBtn(btn, pageIndex)}
                        ></SubmitButton>
                      </Grid>
                    </>
                  ))}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
