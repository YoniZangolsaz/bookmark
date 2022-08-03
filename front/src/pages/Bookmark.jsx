import React, { useContext, useEffect } from 'react';
import Pages from '../components/Pages';
import NavBar from '../components/NavBar';
import { InfoContext } from '../InfoContext';
import Loading from '../components/Loading';
import AddPage from '../components/AddPage';
import axios from 'axios';
import { getObj, setObj } from '../utils/localStorage';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';

const Bookmark = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { info, setInfo } = useContext(InfoContext);

  const loadPages = () => {
    if (location.pathname !== '/signup') {
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
              `${process.env.REACT_APP_BECKEND_URL}/users/userData`,
              userCheck
            );
            if (!res.data) {
              navigate(`/`);
            } else {
              const currentLocatin = location.pathname;
              if (currentLocatin !== '/bookmark') {
                navigate(`/bookmark`);
              }
              setInfo(res.data);
              console.log(info);
              setObj('data', { ...localData, data: res.data });
            }
          } catch (e) {
            navigate(`/`);
          }
        };
        checkUserExist();
      }
    }
  };

  useEffect(() => {
    loadPages();
  }, []);


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
      console.log(pageId);
      console.log(info);
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

export default Bookmark;
