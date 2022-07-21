import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { clear, getObj } from '../utils/localStorage';
import Link from '@mui/material/Link';

const NavBar = () => {
  let navigate = useNavigate();
  const username = getObj('data')?.user?.username;

  const handleSignOutButton = () => {
    navigate('/');
    clear();
  };

  return (
    <AppBar position='static' color='default' elevation={5} sx={{ mb: 5 }}>
      <Toolbar>
        <Typography
          variant='h6'
          sx={{ flexGrow: 1, '&:hover': { cursor: 'pointer', opacity: '0.9' } }}
          fontWeight='bold'
          color='primary'
          textTransform='capitalize'
        >
          <Link href='/button' underline='none'>
            hello {username}
          </Link>
        </Typography>
        <Button
          color='primary'
          variant='contained'
          size='small'
          onClick={handleSignOutButton}
        >
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
