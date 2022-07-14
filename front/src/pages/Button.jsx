/* eslint-disable react/jsx-no-undef */
import React, { useContext } from 'react';
import Pages from '../components/Pages';
import NavBar from '../components/NavBar';
import { InfoContext } from '../InfoContext';
import Loading from '../components/Loading';
import AddPage from '../components/AddPage';
import axios from 'axios';
import { getObj } from '../utils/localStorage';

const Button = () => {
  const { info, setInfo } = useContext(InfoContext);

  const deletePage = async (pageId) => {
    console.log(pageId.toString());
    await axios.delete(`${process.env.REACT_APP_BECKEND_URL}/page/${pageId}`);
    setInfo(info.filter((p) => p._id !== pageId));
  };

  const addPage = async (title) => {
    const userName = getObj('data')?.user?.username;
    const res = await axios.post(`${process.env.REACT_APP_BECKEND_URL}/page`, {
      title,
      userName,
    });
    setInfo([...info, res.data]);
  };

  return !info ? (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <Loading variant={'indeterminate'} />
    </div>
  ) : (
    <>
      <NavBar />
      <Pages pages={info} deletePage={deletePage} />
      <AddPage click={addPage} />
    </>
  );
};

export default Button;
