import {Avatar, Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/react';
import React from 'react';

export default function Profile({username, avatar}) {
  function handleLogout() {
    localStorage.removeItem('jwt-token');
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
