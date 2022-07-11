import React, { useContext } from 'react';
import { Box, Paper, Typography, Grid, Tooltip } from '@mui/material';
import { InfoContext } from '../InfoContext';
import SubmitButton from './Button';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  box: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 auto',
    justifyContent: 'center',
    marginBottom: '16px',
    minWidth: '100%',
  },
  paper: {
    minHeight: '58vh',
    maxHeight: '58vh',
    margin: '16px',
    borderRadius: '20px',
    alignItems: 'center',
    overflow: 'auto',
  },
  typographyHeader: {
    textAlign: 'center',
    margin: '12px',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontFamily: 'Roboto Mono, monospace',
  },
  pages: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});

const Pages = () => {
  const classes = useStyles();
  let navigate = useNavigate();
  const { info, changeBtn } = useContext(InfoContext);

  return (
    <Grid container>
      <Box className={classes.box}>
        {info.map((obj, pageIndex) => (
          <Grid key={pageIndex} item xs={10} sm={6} md={4} lg={4}>
            <Paper elevation={10} variant='elevation' className={classes.paper}>
              <Typography
                variant='h4'
                className={classes.typographyHeader}
                sx={{ color: 'secondary.light' }}
              >
                {obj.title}
              </Typography>
              <Box className={classes.pages}>
                {obj.btns.map((btn, i) => (
                  <Tooltip key={i} placement='top-start' title={btn.toolTip} arrow>
                    <div>
                      <SubmitButton
                        key={i}
                        onClick={() => {
                          changeBtn(pageIndex, i);
                          navigate(
                            `/action?pageTitle=${info[pageIndex].title}&btnTitle=${info[pageIndex].btns[i].title}`
                          );
                        }}
                        fullWidth={false}
                        txt={btn?.title}
                        margin={'12px'}
                        padding={'6px'}
                        width={'140px'}
                        height={'75px'}
                        // marginTop={'5px'}
                      />
                    </div>
                  </Tooltip>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Box>
    </Grid>
  );
};

export default Pages;
