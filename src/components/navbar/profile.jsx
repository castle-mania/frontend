import {Avatar, Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/react';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {logout} from '../../stores/user';

export default function Profile({username, avatar}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    window.localStorage.removeItem('jwt-token');
    dispatch(logout());
  }

  return (
    <Menu>
      <MenuButton>
        <Avatar name={username} src={avatar} size="sm" />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => navigate('/store')}>Store</MenuItem>
        <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}
