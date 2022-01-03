import {Avatar, Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/react';
import React from 'react';
import {useDispatch} from 'react-redux';
import {logout} from '../../stores/user';

export default function Profile({username, avatar}) {
  const dispatch = useDispatch();

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
        <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}
