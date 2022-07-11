import React, { useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  customWidth: {
    maxWidth: 620,
    fontSize: "1em",
  }
}));

export const TooltipInfo = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const info = `Splitter - .לוקח מידע מהמקורות, מפצל אותם ליחידים ומעביר אותם לטיפול המערכת
  Mergeduser - מאגד את כל האובייקטים מכל מקורות המידע של אדם אחד תחת אובייקט אחד`;

  return (
    <div>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip 
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={info}
          placement='bottom-end' 
          classes={{ tooltip: classes.customWidth }}         
        >
          <Button
            sx={{
              color: '#ff9800',
              position: 'relative',
              left: '-7px',
              top: '-32px',
              padding: '4px',
            }}
            onClick={handleTooltipOpen}
          >
            <InfoOutlinedIcon />
          </Button>
        </Tooltip>
      </ClickAwayListener>
    </div>
  );
};

export default TooltipInfo;
