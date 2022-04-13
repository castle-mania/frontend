import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import Currency, {Types} from '../../components/Currency';
import Inventory from '../../components/Inventory';
import LoginButton from '../../components/LoginButton';
import Workbench from '../../components/Workbench';
import {UserContext} from '../../contexts/UserContext';

function MiniProfile({user, ...props}) {
  return (
    <Box {...props} rounded="md" shadow="md" borderWidth="1px" borderColor={useColorModeValue('gray.200', 'gray.700')}>
      <Heading size="sm" px={4} py={2}>
        PROFILE
      </Heading>
      <Divider />
      <HStack justifyContent="space-between" p={4}>
        <HStack spacing={4}>
          <Avatar alt={user.username} src={user.avatar} />
          <Heading>{user.username}</Heading>
        </HStack>
        <VStack>
          <Currency value={user.money} type={Types.COIN} />
          <Currency value={user.funds} type={Types.GEM} />
        </VStack>
      </HStack>
    </Box>
  );
}

export default function Profile() {
  const {user} = React.useContext(UserContext);

  if (user == null) {
    return (
      <Container maxW="container.xl">
        <VStack>
          <Heading size="sm">LOGIN TO VIEW PROFILE</Heading>
          <LoginButton size="sm" />
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" px={{xl: 0, base: '16px'}} mt={4}>
      <Grid
        templateColumns={{lg: 'repeat(3, 1fr)', sm: 'repeat(2, 1fr)', base: null}}
        templateRows={{lg: '1fr', sm: '1fr', base: null}}
        gap={4}>
        <GridItem colSpan={{lg: 1, sm: 2, base: 1}} rowSpan={{lg: 2, sm: 1}}>
          <MiniProfile user={user} />
        </GridItem>
        <GridItem>
          <Inventory inventory={user.inventories[0]} />
        </GridItem>
        <GridItem>
          <Inventory inventory={user.inventories[1]} />
        </GridItem>
        <GridItem colSpan={{sm: 2, base: 1}}>
          <Workbench />
        </GridItem>
      </Grid>
    </Container>
  );
}
