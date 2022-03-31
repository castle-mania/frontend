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
  useColorModeValue,
} from '@chakra-ui/react';
import {MdLightMode, MdLogout, MdModeNight} from 'react-icons/md';
import {Link} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext';
import LoginButton from '../LoginButton';
import Currency, {Types} from '../Currency';

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
  const {toggleColorMode} = useColorMode();

  return (
    <Menu placement="bottom-end">
      <MenuButton>
        <Avatar size="sm" name={username} src={avatar} />
      </MenuButton>
      <MenuList alignItems="center">
        <MenuItem onClick={toggleColorMode} icon={useColorModeValue(<MdModeNight />, <MdLightMode />)}>
          Toggle Theme
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={logout} icon={<MdLogout />}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default function Nav() {
  const {colorMode, toggleColorMode} = useColorMode();
  const {logout, user} = React.useContext(UserContext);

  return (
    <Box
      px={4}
      zIndex={1}
      as="nav"
      bg={useColorModeValue('gray.100', 'gray.900')}
      position="fixed"
      w="100vw"
      shadow={1}
      borderWidth={2}
      borderColor={useColorModeValue('gray.200', 'gray.800')}>
      <Flex justifyContent="center">
        <Flex h={16} alignItems="center" justifyContent="space-between" alignSelf="center" w="container.xl">
          <Flex columnGap={8}>
            <Heading size="md">Castle Mania</Heading>
            {LINKS.map((link) => (
              <NavLink key={link.name} href={link.href}>
                {link.name}
              </NavLink>
            ))}
          </Flex>
          <Flex alignItems="center">
            <Stack direction="row" spacing={4}>
              {user != null ? (
                <>
                  <Currency type={Types.GEM} value={user.funds} />
                  <Currency type={Types.COIN} value={user.money} />
                  <Profile username={user.username} avatar={user.avatar} logout={logout} />
                </>
              ) : (
                <>
                  <IconButton
                    size="sm"
                    variant="ghost"
                    onClick={toggleColorMode}
                    icon={colorMode === 'light' ? <MdModeNight /> : <MdLightMode />}
                  />
                  <LoginButton />
                </>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
