import React, { useState } from 'react';
import { Box, Grid, Typography, Button, Paper } from '@mui/material';
import StepperNumber from './StepperNumber';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import axios from 'axios';

const useStyles = makeStyles({
  mainBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 110px 10px 110px',
  },
  gridButton: {
    justifyContent: 'space-between',
    padding: '10px 0px',
  },
  button: {
    textTransform: 'capitalize',
    backgroundColor: '#546e7a',
    '&:hover': { backgroundColor: '#546e7a', opacity: 10 },
  },
  typographyPage: {
    marginTop: '32px',
    textTransform: 'none',
    fontFamily: 'Roboto Mono, monospace',
  },
  nameAndRole: {
    textTransform: 'none',
    fontFamily: 'Roboto Mono, monospace',
    marginTop: '8px',
  },
  page: {
    overflow: 'auto',
    margin: '0 auto',
    height: '48vh',
  },
  paper: {
    width: '210px',
    height: '38vh',
    margin: '16px',
    borderRadius: '5px',
    overflow: 'auto',
    backgroundColor: '#deddd4',
  },
  pageHeader: {
    color: '#455a64',
    fontFamily: 'Roboto Mono, monospace',
    textDecoration: 'underline',
    margin: '0 auto',
    width: 'fit-content',
    fontWeight: 'bold',
  },
  buttonPage: {
    textTransform: 'none',
    width: '90%',
    marginTop: '8px',
    backgroundColor: '#cda597',
    '&:hover': { backgroundColor: '#cda597' },
  },
});

const Finish = ({ info, back }) => {
  const classes = useStyles();
  let navigate = useNavigate();
  const [active, setActive] = useState(2);

  const backButton = (e) => {
    e.preventDefault();
    back();
  };

  const finishButton = async () => {
    setActive(3);
    Swal.fire({
      title: 'Thank You',
      text: 'We create the user for you.',
    });
    Swal.showLoading();
    try {
      const pages = info.pages.map((page) => {
        return {
          title: page.title,
          btns: page.btns.map((btn) => btn._id),
        };
      });
      const user = info.user;
      const res = await axios.post(
        `${process.env.REACT_APP_BECKEND_URL}/users/new`,
        {
          user,
          pages,
        }
      );
      const swalRes = await Swal.fire({
        icon: 'success',
        title: 'success',
        text: 'You Create the user succesfully',
      });
      if (swalRes.isConfirmed) {
        navigate('/button');
      }
    } catch (error) {
      const swalRes = await Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'There is a problem to craete the user, Try again',
      });
      if (swalRes.isConfirmed) {
        navigate('/create');
      }
    }
  };

  return (
    <>
      <Box className={classes.mainBox}>
        <StepperNumber active={active} />
        <Grid container className={classes.gridButton}>
          <Grid item>
            <Button
              variant='contained'
              onClick={backButton}
              className={classes.button}
            >
              Back
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              onClick={finishButton}
              className={classes.button}
            >
              Finish
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid container>
        <Grid item lg={5} md={5} sx={{ mt: 4 }}>
          <Typography
            color='#00897b'
            variant='h4'
            className={classes.nameAndRole}
          >
            username <DoubleArrowIcon sx={{ color: '#c0ca33', mr: 1 }} />
            {info?.user?.username}
          </Typography>
          <Typography
            color='#00897b'
            variant='h4'
            className={classes.nameAndRole}
          >
            Role <DoubleArrowIcon sx={{ color: '#c0ca33', mr: 1 }} />
            {info?.user?.role}
          </Typography>
          <Typography
            color='#00897b'
            variant='h3'
            className={classes.typographyPage}
          >
            Pages <DoubleArrowIcon sx={{ color: '#c0ca33' }} />
          </Typography>
        </Grid>
        <Grid item lg={7} md={7} className={classes.page}>
          <Grid container>
            {info?.pages?.map((page, pageIndex) => (
              <>
                <Grid item lg={6} md={6} key={pageIndex}>
                  <Paper
                    elevation={1}
                    variant='elevation'
                    className={classes.paper}
                  >
                    <Typography variant='h5' className={classes.pageHeader}>
                      {page.title}
                    </Typography>
                    {page?.btns.map((btn, btnIndex) => (
                      <>
                        <Grid
                          key={btnIndex}
                          item
                          lg={12}
                          sx={{ textAlign: 'center' }}
                        >
                          <Button
                            variant='contained'
                            size='small'
                            className={classes.buttonPage}
                          >
                            {btn?.title}
                          </Button>
                        </Grid>
                      </>
                    ))}
                  </Paper>
                </Grid>
              </>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Finish;
