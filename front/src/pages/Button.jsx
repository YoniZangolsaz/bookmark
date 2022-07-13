/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState, useContext } from 'react';
import Container from '@mui/material/Container';
import { useNavigate, useLocation } from 'react-router-dom';
import { getObj } from '../utils/localStorage';
import Pages from '../components/Pages';
import NavBar from '../components/NavBar';
import { InfoContext } from '../InfoContext';
import TooltipInfo from '../components/TooltipInfo';
import axios from 'axios';
import Loading from '../components/Loading';

const Button = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const { setInfo } = useContext(InfoContext);

  useEffect(() => {
    const localData = getObj('data');
    if (!localData) {
      navigate(`/`);
    } else {
      const userCheck = {
        username: localData?.user.username,
        password: localData?.user.password,
      };
      const checkUserExist = async () => {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_BECKEND_URL}/users/checkuserexist`,
            userCheck
          );
          if (!res.data) {
            navigate(`/`);
          } else {
            const currentLocatin = location.pathname;
            if (currentLocatin !== '/button') {
              navigate(`/button`);
            }
            setInfo(localData.data);
            setUser(localData.user);
          }
        } catch (e) {
          navigate(`/`);
        }
      };
      checkUserExist();
    }
  }, []);

  return !user ? (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <Loading variant={'indeterminate'} />
    </div>
  ) : (
    <>
      <NavBar />
      <TooltipInfo />
      <Container>
        <Pages />
      </Container>
    </>
  );
};

export default Button;
