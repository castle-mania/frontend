/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Flex,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useColorMode,
  IconButton,
  Heading,
  Box,
} from '@chakra-ui/react';
import {MdLightMode, MdModeNight} from 'react-icons/md';
import {Link} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext';
import LoginButton from '../LoginButton';

const LINKS = [
  {href: '/', name: 'Home'},
  {href: '/store', name: 'Store'},
  {href: '/leaderboards', name: 'Leaderboards'},
];

function NavLink({href, children}) {
  return (
    <Link p={2} to={href} rounded="md">
      {children}
    </Link>
  );
}
function Profile({username, avatar, logout}) {
  return (
    <Menu placement="bottom-end">
      <MenuButton>
        <Avatar size="sm" name={username} src={avatar} />
      </MenuButton>
      <MenuList alignItems="center">
        <MenuDivider />
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default function Nav() {
  const {colorMode, toggleColorMode} = useColorMode();
  const {logout, user} = React.useContext(UserContext);

  return (
    <Box px={4} as="nav">
      <Flex justifyContent="center">
        <Flex h={16} alignItems="center" justifyContent="space-between" alignSelf="center" w="container.xl">
          <Heading size="md">Castle Mania</Heading>
          <Flex columnGap={8}>
            {LINKS.map((link) => (
              <NavLink key={link.name} href={link.href}>
                {link.name}
              </NavLink>
            ))}
          </Flex>
          <Flex alignItems="center">
            <Stack direction="row" spacing={4}>
              <IconButton
                size="sm"
                onClick={toggleColorMode}
                icon={colorMode === 'light' ? <MdModeNight /> : <MdLightMode />}
              />
              {user != null ? (
                <Profile username={user.username} avatar={user.avatar} logout={logout} />
              ) : (
                <LoginButton />
              )}
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
