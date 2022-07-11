import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Table from '../components/Table';
import { Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Search from '../components/Search';

const EditUser = () => {
  let navigate = useNavigate();
  const [usernameAndRole, setUsernameAndRole] = useState([]);
  const [usernameAndRoleFiltered, setUsernameAndRoleFiltered] = useState(usernameAndRole);

  const getUsernameAndRoles = async () => {
    try {
      const usernameAndRoles = await axios.get(
        `${process.env.REACT_APP_BECKEND_URL}/users/usernameandroles`
      );
      setUsernameAndRole(usernameAndRoles.data);
      setUsernameAndRoleFiltered(usernameAndRoles.data)
    } catch (err) {
      navigate(`/button`);
    }
  };

  useEffect(() => {
    getUsernameAndRoles();
  }, []);

  const clickEditUsername = async (userName) => {
    const { value: text } = await Swal.fire({
      icon: 'info',
      title: 'Enter the new Username',
      input: 'text',
      inputValue: userName,
      showCancelButton: true,
      inputValidator: (text) => {
        if (!text) {
          return 'You need to write something!';
        }
      },
    });
    if (text) {
      if (text === userName) {
        return '';
      } else {
        try {
          const res = await axios.patch(
            `${process.env.REACT_APP_BECKEND_URL}/users/changeusername/${userName}`,
            { username: text }
          );
          const swalRes = await Swal.fire({
            icon: 'success',
            title: 'success',
            text: 'You change the username succesfully',
          });
          if (swalRes.isConfirmed) {
            navigate(0);
          }
        } catch {
          const swalRes = await Swal.fire({
            icon: 'error',
            title: 'error',
            text: 'There is a problem to change the username, Try again',
          });
          if (swalRes.isConfirmed) {
            navigate(`/edit`);
          }
        }
      }
    }
  };

  const clickEditPages = (userName) => {
    navigate(`/editpage?userName=${userName}`)
  }

  const filterData = (value) => {
    const resData = usernameAndRole.filter(({username}) => username.includes(value))
    setUsernameAndRoleFiltered(resData)
  };

  return (
    <>
      <NavBar />
      <Container
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Search setData={filterData} />
        <Table
          rows={usernameAndRoleFiltered}
          headersTitles={['Usernames', 'Role', 'Edit Username', 'Edit Pages']}
          onClickUsername={clickEditUsername}
          onClickPages={clickEditPages}
        />
      </Container>
    </>
  );
};

export default EditUser;
