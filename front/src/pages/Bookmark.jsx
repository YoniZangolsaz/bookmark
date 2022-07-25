import React, { useContext } from 'react';
import Pages from '../components/Pages';
import NavBar from '../components/NavBar';
import { InfoContext } from '../InfoContext';
import Loading from '../components/Loading';
import AddPage from '../components/AddPage';
import axios from 'axios';
import { getObj } from '../utils/localStorage';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Button = () => {
  const navigate = useNavigate();
  const { info, setInfo } = useContext(InfoContext);

  const deletePage = async (pageId) => {
    const swalRes = await Swal.fire({
      title: 'Are you sure you want to delete this page?',
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
      await axios.delete(`${process.env.REACT_APP_BECKEND_URL}/page/${pageId}`);
      setInfo(info.filter((page) => page._id !== pageId));
    } catch {
      const swalRes = await Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'There is a problem to delete this page, Try again',
      });
      if (swalRes.isConfirmed) {
        navigate('/bookmark');
      }
    }
  };

  const addPage = async (title) => {
    const userName = getObj('data')?.user?.username;
    const res = await axios.post(`${process.env.REACT_APP_BECKEND_URL}/page`, {
      title,
      userName,
    });
    setInfo((prevInfo) => [...prevInfo, res.data]);
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
