import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { getObj } from '../utils/localStorage';
import NavBar from '../components/NavBar';
import Create from '../components/Create';
import { AddPages } from '../components/AddPages';
import SwipeableViews from 'react-swipeable-views';
import Finish from '../components/Finish';
import axios from 'axios';
import Loading from '../components/Loading';

const CreateUser = () => {
  let navigate = useNavigate();

  const [stage, setStage] = useState(0);
  const [user, setUser] = useState();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState('indeterminate');

  const checkUserRole = async (userCheck) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BECKEND_URL}/users/checkuserrole`,
        userCheck
      );
      if (res.data) {
        setLoading('determinate');
        return;
      }
    } catch (e) {}
    navigate(`/button`);
  };

  useEffect(() => {
    const localData = getObj('data');
    if (!localData) navigate(`/`);
    const userCheck = {
      username: localData?.user.username,
      password: localData?.user.password,
    };
    checkUserRole(userCheck);
  }, []);

  const next = () => {
    setStage(stage + 1);
  };
  const back = () => {
    setStage(stage - 1);
  };

  return loading === 'indeterminate' ? (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <Loading variant={'indeterminate'} />
    </div>
  ) : (
    <>
      <NavBar />
      <Container
        maxWidth='md'
        sx={{
          mt: 10,
          border: '1px solid #dadce0',
          borderRadius: '8px',
          overflow: 'auto',
          backgroundColor: '#f3f7f0',
        }}
      >
        <SwipeableViews index={stage}>
          <Create next={next} setNewUser={setUser} />
          <AddPages next={next} back={back} setNewPages={setPages} />
          <Finish info={{ user, pages }} back={back} />
        </SwipeableViews>
      </Container>
    </>
  );
};

export default CreateUser;
