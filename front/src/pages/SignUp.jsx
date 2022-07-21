import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Link,
} from '@mui/material';
import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import Loading from '../components/Loading';

const useStyles = makeStyles({
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '120px',
  },
  typographyError: {
    color: 'red',
    marginTop: '16px',
  },
  loading: {
    display: 'grid',
    placeItems: 'center',
    height: '100vh',
  },
});

export const SignUp = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [loading] = useState('determinate');
  const [user, setUser] = useState({
    username: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState({
    username: false,
    password: false,
    confirm: false,
  });

  const [checkValidation, setCheckValidation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({ username: false, password: false, confirm: false });
    setCheckValidation(false);
    error.username = !user.username;
    error.password = !user.password;
    if (error.password) {
      error.confirm = false;
    } else {
      error.confirm = !user.confirm;
      if (user.password !== user.confirm) {
        error.confirm = true;
        setUser({ ...user, confirm: '' });
      }
    }
    const checkValidation = checkValid(user.username);
    if (!checkValidation) {
      error.username = true;
      setCheckValidation(true);
    }

    if (error.username || error.password || user.password !== user.confirm) {
      setError({ ...error });
    } else {
      try {
        delete user.confirm;
        console.log(user);
        const res = await axios.post(
          `${process.env.REACT_APP_BECKEND_URL}/users/new`,
          {
            user,
          }
        );
        const swalRes = await Swal.fire({
          icon: 'success',
          title: 'success',
          text: 'You Create the user succesfully',
        });
        if (swalRes.isConfirmed) {
          navigate('/');
        }
      } catch (error) {
        const swalRes = await Swal.fire({
          icon: 'error',
          title: 'error',
          text: 'There is a problem to craete the user, Try again',
        });
        if (swalRes.isConfirmed) {
          navigate('/signup');
        }
      }
    }
  };

  const handleUserChange = (e, key) => {
    e.preventDefault();
    setUser({ ...user, [key]: e.target.value.trim() });
    setError({ ...error, [key]: false });
  };

  const errorMsg = (msg) => (
    <>
      <ErrorOutlinedIcon
        sx={{ position: 'relative', top: '5px' }}
        fontSize='small'
        color='error'
      />
      <Typography
        variant='h7'
        sx={{
          color: 'red',
        }}
      >
        {msg}
      </Typography>
    </>
  );

  const checkValid = (str) => {
    return /^[A-Za-z0-9_]*$/.test(str);
  };

  return loading === 'indeterminate' ? (
    <div className={classes.loading}>
      <Loading variant={'indeterminate'} />
    </div>
  ) : (
    <Container maxWidth='xs'>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <Box className={classes.box}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.dark' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            variant='h4'
            sx={{
              mb: 3,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              color: '#4e342e',
            }}
          >
            Sign up
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Input
                label={'Username'}
                fullWidth={true}
                onChange={(e) => handleUserChange(e, 'username')}
                error={error.username}
              />
              {error.username &&
                !checkValidation &&
                errorMsg('Enter a username')}
              {error.username &&
                checkValidation &&
                errorMsg(
                  'Sorry, only letters (a-z), numbers  (0-9), and underscore (_) are allowed'
                )}
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <PasswordInput
                fullWidth={true}
                label={'Password'}
                onChange={(e) => handleUserChange(e, 'password')}
                error={error.password}
              />
              {error.password
                ? errorMsg('Enter a Password')
                : user.password.length > 0 &&
                  user.password.length < 8 &&
                  !error.password &&
                  errorMsg('Use 8 characters or more for your password')}
              {error.confirm &&
                user.password.length >= 8 &&
                errorMsg('Those passwords didn’t match. Try again.')}
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <PasswordInput
                value={user.confirm}
                fullWidth={true}
                label={'Confirm Password'}
                onChange={(e) => handleUserChange(e, 'confirm')}
                error={error.confirm}
              />
            </Grid>
          </Grid>
          <Button
            variant='contained'
            type='submit'
            fullWidth
            className='classes.button'
            sx={{
              textTransform: 'capitalize',
              fontSize: '1rem',
              bgcolor: '#546e7a',
              m: 4,
              '&:hover': { bgcolor: '#546e7a', opacity: 0.9 },
            }}
          >
            sign up
          </Button>
          <Link href='/' variant='body2' sx={{ color: '#546e7a' }}>
            {'Already have an account? Sign In'}
          </Link>
        </Box>
      </form>
    </Container>
  );
};

export default SignUp;
