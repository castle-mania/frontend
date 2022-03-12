import {Avatar, Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/react';
import React from 'react';
import {UserContext} from '../../contexts/UserContext';

export default function Profile({username, avatar}) {
  const {logout} = React.useContext(UserContext);

  return (
    <Menu placement="bottom-end">
      <MenuButton>
        <Avatar name={username} src={avatar} size="sm" />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}
