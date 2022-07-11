import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import ContactPageIcon from '@mui/icons-material/ContactPage';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#607d8b',
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const BasicTable = ({ rows, headersTitles, onClickUsername, onClickPages }) => {
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              {headersTitles.map((header) => (
                <StyledTableCell>{header}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell component='th' scope='row'>
                  {row.username}
                </StyledTableCell>
                <StyledTableCell align='left'>{row.role}</StyledTableCell>
                <StyledTableCell
                  sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 } }}
                  onClick={() => onClickUsername(row.username)}
                  align='left'
                >
                  <PersonIcon />
                  <EditIcon />
                </StyledTableCell>
                <StyledTableCell
                  sx={{ cursor: 'pointer', '&:hover': { opacity: 0.7 } }}
                  onClick={() => onClickPages(row.username)}
                  align='left'
                >
                  <ContactPageIcon />
                  <EditIcon />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BasicTable;
