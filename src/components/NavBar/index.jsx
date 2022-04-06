/* eslint-disable react/no-array-index-key */
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
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  Link,
  Switch,
} from '@chakra-ui/react';
import {MdLightMode, MdLogout, MdMenu, MdModeNight} from 'react-icons/md';
import * as ReactDOM from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext';
import LoginButton from '../LoginButton';
import Currency, {Types} from '../Currency';

const ReactLink = ReactDOM.Link;

const LINKS = [
  {href: '/store', name: 'Store'},
  {href: '/leaderboards', name: 'Leaderboards'},
];

function NavLink({href, name}) {
  return (
    <Link
      as={ReactLink}
      p={2}
      to={href}
      rounded="md"
      key={name}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}>
      {name}
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
  const {isOpen, onOpen, onClose} = useDisclosure();
  const btnRef = React.useRef();
  const {logout, user} = React.useContext(UserContext);

  return (
    <>
      <Box
        display={{base: 'none', md: 'block'}}
        px={4}
        zIndex={1}
        as="nav"
        bg={useColorModeValue('gray.100', 'gray.900')}
        w="100vw"
        shadow={1}
        borderWidth={2}
        borderColor={useColorModeValue('gray.200', 'gray.900')}>
        <Flex justifyContent="center">
          <Flex h={16} alignItems="center" justifyContent="space-between" alignSelf="center" w="container.xl">
            <Flex columnGap={8} alignItems="center">
              <Heading as={ReactLink} to="/" size="md">
                Castle Mania
              </Heading>
              {LINKS.map((link, index) => (
                <NavLink {...link} key={`${link.name}-${index}`} />
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
                    <LoginButton size="sm" />
                  </>
                )}
              </Stack>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Box
        display={{base: 'visible', md: 'none'}}
        px={4}
        zIndex={1}
        as="nav"
        bg={useColorModeValue('gray.100', 'gray.900')}
        w="100vw"
        shadow={1}
        borderWidth={2}
        borderColor={useColorModeValue('gray.200', 'gray.800')}>
        <Flex alignItems="center" justifyContent="space-between" w="100%" p={3}>
          <IconButton variant="ghost" icon={<MdMenu fontSize={24} />} ref={btnRef} onClick={onOpen} />
          <Stack direction="row" spacing={4}>
            {user != null ? (
              <>
                <Currency type={Types.GEM} value={user.funds} />
                <Currency type={Types.COIN} value={user.money} />
              </>
            ) : (
              <>
                <IconButton
                  size="sm"
                  variant="ghost"
                  onClick={toggleColorMode}
                  icon={colorMode === 'light' ? <MdModeNight /> : <MdLightMode />}
                />
                <LoginButton size="sm" />
              </>
            )}
          </Stack>
        </Flex>
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <Flex direction="column" m={4} rowGap={2} h="100%">
            <Heading p={2} as={ReactLink} to="/" size="md">
              Castle Mania
            </Heading>
            {LINKS.map((link) => (
              <Link as={ReactLink} p={2} to={link.href} rounded="md" key={link.name}>
                {link.name}
              </Link>
            ))}
            <Flex justifyContent="space-between" p={2}>
              Dark Mode
              <Switch onChange={toggleColorMode} isChecked={colorMode === 'dark'} />
            </Flex>
            <LoginButton />
          </Flex>
        </DrawerContent>
      </Drawer>
    </>
  );
}
