import React, { useState, createContext, useEffect } from 'react';
import { getObj, setObj } from './utils/localStorage';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export const InfoContext = createContext();

export const InfoProvider = (props) => {
  const [info, setInfo] = useState(null);
  let navigate = useNavigate();
  const location = useLocation();

  const [index, setIndex] = useState({
    pageNum: 0,
    btnNum: 0,
  });

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
            `${process.env.REACT_APP_BECKEND_URL}/users/userData`,
            userCheck
          );
          if (!res.data) {
            navigate(`/`);
          } else {
            const currentLocatin = location.pathname;
            if (currentLocatin !== '/button') {
              navigate(`/button`);
            }
            setInfo(res.data);
            setObj('data', { ...localData, data: res.data });
          }
        } catch (e) {
          navigate(`/`);
        }
      };
      checkUserExist();
    }
  }, []);

  const getBtn = () => {
    let newInfo = info;

    if (!newInfo) {
      newInfo = getObj('data')?.data;
      if (!newInfo) return;

      setInfo(newInfo || 'no data');
    }

    return newInfo[index.pageNum - 1].btns[index.btnNum];
  };

  const setBtnByTitle = (pageTitle, btnTitle) => {
    let newInfo = info;

    if (!newInfo) {
      newInfo = getObj('data')?.data;
      if (!newInfo) return;
      setInfo(newInfo || 'no data');
    }

    const pageIndex = newInfo.findIndex(
      (page) => page.title.toLowerCase() === pageTitle.toLowerCase()
    );

    const btnIndex = newInfo[pageIndex].btns.findIndex(
      (btn) => btn.title.toLowerCase() === btnTitle.toLowerCase()
    );

    setIndex({ pageNum: pageIndex, btnNum: btnIndex });
    return newInfo[pageIndex].btns[btnIndex];
  };

  const getTypeReq = () => {
    let newInfo = info;
    if (!newInfo) {
      newInfo = getObj('data')?.data;
      if (!newInfo) return;
      setInfo(newInfo || 'no data');
    }
    return newInfo[index?.pageNum]?.title?.toLowerCase();
  };

  const changeBtn = (page, btnIndex) => {
    setIndex({
      pageNum: page,
      btnNum: btnIndex,
    });
  };

  const getUserRule = () => {
    let newInfo = info;
    if (!newInfo) {
      newInfo = getObj('data')?.user;
      if (!newInfo) return;
      setInfo(newInfo || 'no data');
    }
    return newInfo;
  };

  return (
    <InfoContext.Provider
      value={{
        info,
        changeBtn,
        getBtn,
        getTypeReq,
        setInfo,
        setBtnByTitle,
        getUserRule,
      }}
    >
      {props.children}
    </InfoContext.Provider>
  );
};

