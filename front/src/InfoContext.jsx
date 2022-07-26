import React, { useState, createContext, useEffect } from 'react';
import { getObj, setObj } from './utils/localStorage';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export const InfoContext = createContext();

export const InfoProvider = (props) => {
  const [info, setInfo] = useState(null);
  let navigate = useNavigate();
  const location = useLocation();

  const loadPages = () => {
    console.log(info);
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


  return (
    <InfoContext.Provider
      value={{
        info,
        setInfo
      }}
    >
      {props.children}
    </InfoContext.Provider>
  );
};
