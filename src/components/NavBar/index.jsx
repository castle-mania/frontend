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
  Button,
  IconButton,
  Heading,
  Box,
} from '@chakra-ui/react';
import {MdArrowForward, MdLightMode, MdModeNight} from 'react-icons/md';
import {UserContext} from '../../contexts/UserContext';
import login from '../../utils/login';

// function NavLink({children}) {
//   return (
//     <Link
//       px={2}
//       py={1}
//       rounded="md"
//       _hover={{
//         textDecoration: 'none',
//         bg: useColorModeValue('gray.200', 'gray.700'),
//       }}
//       href="#">
//       {children}
//     </Link>
//   );
// }

function Profile({username, avatar, logout}) {
  return (
    <Menu>
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

  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box px={4}>
      <Flex justifyContent="center">
        <Flex h={16} alignItems="center" justifyContent="space-between" alignSelf="center" w="container.xl">
          <Heading size="md">Castle Mania</Heading>
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
                <Button size="sm" colorScheme="teal" rightIcon={<MdArrowForward />} onClick={login}>
                  Log in
                </Button>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
