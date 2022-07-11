/* eslint-disable react/style-prop-object */
/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import React, { useContext, useState, useEffect, useMemo } from 'react';
import Input from '../components/Input';
import NavBar from '../components/NavBar';
import SubmitButton from '../components/Button';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { InfoContext } from '../InfoContext';
import SelectList from '../components/Select';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate, useLocation } from 'react-router-dom';
import { getObj } from '../utils/localStorage';
import axios from 'axios';
import Loading from '../components/Loading';
import buildRequest from '../utils/buildRequest';
import 'react-json-pretty/themes/monikai.css';
import { JsonFormatter } from 'react-json-formatter';
import printToFile from '../utils/printToFile';
import MultipleSelect from '../components/MultipleSelect';
import errorHandler from '../utils/errorHandler';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import Swal from 'sweetalert2';

const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

const Action = () => {
  const { setBtnByTitle } = useContext(InfoContext);
  const query = useQuery();
  const navigate = useNavigate();
  const [params, setParams] = useState({});
  const [cancel, setCancel] = useState(false);
  const [btn, setBtn] = useState(null);
  const [dataToShow, setDataToShow] = useState(null);
  const [loading, setLoading] = useState('determinate');
  const [error, setError] = useState({});
  const [downloadBtn, setDownloadBtn] = useState(false);
  const JsonStyle = {
    propertyStyle: { color: 'red' },
    stringStyle: { color: 'green' },
    colonStyle: { color: 'darkorange' },
  };
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  const fetchData = async (source, request) => {
    return axios.post(
      `${process.env.REACT_APP_BECKEND_URL}/action`,
      {
        ...request,
        reqType: btn.methods,
      },
      {
        cancelToken: source.token,
      }
    );
  };
  useEffect(() => {
    const localData = getObj('data');
    if (!localData) {
      navigate(`/`);
    } else {
      const currBtn = setBtnByTitle(
        query.get('pageTitle'),
        query.get('btnTitle')
      );
      setBtn(currBtn);
      if (!currBtn) {
        navigate(`/button`);
      }
    }
  }, []);

  useEffect(() => {
    setLoading('determinate');
  }, [dataToShow]);

  const handleClick = async (e) => {
    e.preventDefault();
    const currError = {};
    setCancel((prev) => false);
    setDownloadBtn(false);
    if (btn?.params) {
      Object.keys(btn.params).forEach((par) => (currError[par] = !params[par]));
    }

    if (Object.values(currError).some((i) => i)) {
      setError({ ...currError });
    } else {
      if (btn?.message) {
        const swalRes = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, I am sure!',
        });
        if (!swalRes.isConfirmed) {
          return '';
        }
      }

      try {
        setLoading('indeterminate');
        const request = buildRequest(params, btn?.name, btn?.type);
        const res = await fetchData(source, request);
        if (!Array.isArray(res.data) || res.data.length < 100) {
          setDownloadBtn(true);
          if (res.data && !Array.isArray(res.data)) {
            setDataToShow([res.data]);
          } else {
            setDataToShow(res.data);
          }
        } else {
          printToFile(res.data);
          setDataToShow([
            {
              message: 'You got the data in a file',
              'count of record': res.data.length,
            },
          ]);
        }
      } catch (error) {
        const statusCode = JSON.parse(JSON.stringify(error)).status;
        setDataToShow(errorHandler(statusCode));
        setError({ ...error });
      }
    }
  };

  const handleCancelClick = () => {
    setLoading('determinate');
    source.cancel('Operation canceled by the user.');
    setCancel(() => true);
  };

  const handleDownloadClick = () => {
    printToFile(dataToShow);
  };

  return (
    <div>
      <NavBar />
      <Typography
        variant='h4'
        align='center'
        color='#757575'
        sx={{
          mb: 2,
          fontWeight: 'bold',
          textTransform: 'capitalize',
          textDecoration: 'underline',
        }}
      >
        {btn?.title}
      </Typography>
      <Typography
        variant='h4'
        align='center'
        color='#009688'
        sx={{ mb: 2, fontWeight: 'bold' }}
      >
        הכנס את הערכים
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {btn?.params &&
          Object.keys(btn?.params).map((par, i) => {
            if (Array.isArray(btn?.params[par])) {
              if (btn?.select === 'select') {
                return (
                  <SelectList
                    key={i}
                    inputLabel={par}
                    array={['', ...btn?.params[par]]}
                    value={params[par] ? params[par] : ''}
                    onChange={(e) => {
                      setParams({ ...params, [par]: e.target.value });
                      setError({ ...error, [par]: false });
                    }}
                    error={error[par]}
                  />
                );
              } else if (btn?.select === 'multiple') {
                return (
                  <MultipleSelect
                    key={i}
                    inputLabel={par}
                    array={['', ...btn?.params[par]]}
                    value={params[par] ? params[par] : []}
                    onChange={(e) => {
                      setParams({ ...params, [par]: e.target.value });
                      typeof params[par] === 'string'
                        ? params[par].split(',')
                        : params[par];
                      setError({ ...error, [par]: false });
                    }}
                    error={error[par]}
                  />
                );
              }
            }
            return (
              <Input
                label={par}
                type={btn?.params[par]}
                key={i}
                onChange={(e) => {
                  setParams({ ...params, [par]: e.target.value });
                  setError({ ...error, [par]: false });
                }}
                error={error[par]}
              />
            );
          })}
        <Box sx={{ mt: 2 }}>
          {btn?.message && <Typography variant='h5'>{btn?.message}</Typography>}
        </Box>
        <SubmitButton
          endIcon={<SendIcon />}
          txt={'Send'}
          onClick={handleClick}
          margin={2}
        />
        {!cancel && dataToShow && dataToShow.length >= 1 && downloadBtn && (
          <SubmitButton
            txt={'Download'}
            onClick={handleDownloadClick}
            endIcon={<ArrowCircleDownOutlinedIcon />}
            margin={2}
          ></SubmitButton>
        )}
      </Box>
      {loading === 'indeterminate' ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 2,
          }}
        >
          <Loading variant={loading} />
          <SubmitButton
            txt={'cancel'}
            onClick={handleCancelClick}
            color={'info'}
            margin={2}
          ></SubmitButton>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            margin: '0 auto',
            justifyContent: 'center',
          }}
        >
          {cancel || !dataToShow || dataToShow.length === 0 ? (
            <Typography
              variant='h5'
              color='error'
              sx={{
                p: 2,
                mt: 3,
              }}
            >
              - No Data To Show -
            </Typography>
          ) : (
            <>
              {dataToShow &&
                dataToShow.map((json, i) => {
                  return (
                    <Grid key={i} item xs={6} md={6} lg={4}>
                      <Paper
                        elevation={8}
                        variant='elevation'
                        sx={{
                          // minWidth: '25vw',
                          height: '93%',
                          m: 3,
                          p: 2,
                          borderRadius: '20px',
                          alignItems: 'center',
                        }}
                      >
                        {
                          <JsonFormatter
                            json={JSON.stringify(json, null, 2).replace(
                              /\//g,
                              ' /'
                            )}
                            tabWith='2'
                            JsonStyle={JsonStyle}
                          />
                        }
                      </Paper>
                    </Grid>
                  );
                })}
            </>
          )}
        </Box>
      )}
    </div>
  );
};

export default Action;
