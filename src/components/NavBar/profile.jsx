import {Avatar, Menu, MenuButton, MenuItem, MenuList, useColorMode} from '@chakra-ui/react';
import {MdNightlight, MdOutlineLogout} from 'react-icons/md';
import React from 'react';
import {UserContext} from '../../contexts/UserContext';

export default function Profile({username, avatar}) {
  const {logout} = React.useContext(UserContext);
  const {toggleColorMode} = useColorMode();

  return (
    <Menu placement="bottom-end">
      <MenuButton>
        <Avatar name={username} src={avatar} size="sm" />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={toggleColorMode} icon={<MdNightlight />}>
          Dark Mode
        </MenuItem>
        <MenuItem onClick={() => logout()} icon={<MdOutlineLogout />}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
