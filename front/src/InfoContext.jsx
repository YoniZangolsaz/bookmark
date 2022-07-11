import React, { useState, createContext } from 'react';
import { getObj } from './utils/localStorage';

export const InfoContext = createContext();

export const InfoProvider = (props) => {
  const [info, setInfo] = useState(null);

  const [index, setIndex] = useState({
    pageNum: 0,
    btnNum: 0,
  });

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
  }

  return (
    <InfoContext.Provider
      value={{
        info,
        changeBtn,
        getBtn,
        getTypeReq,
        setInfo,
        setBtnByTitle,
        getUserRule
      }}
    >
      {props.children}
    </InfoContext.Provider>
  );
};
