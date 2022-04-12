import {Avatar, Box, Container, Grid, GridItem, Heading, HStack, useColorModeValue, VStack} from '@chakra-ui/react';
import React from 'react';
import Currency, {Types} from '../../components/Currency';
import Inventory from '../../components/Inventory';
import {UserContext} from '../../contexts/UserContext';

function MiniProfile({user, ...props}) {
  return (
    <Box
      {...props}
      p={4}
      rounded="md"
      shadow="md"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      position="sticky"
      top={4}>
      <HStack justifyContent="space-between">
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
    return null;
  }

  return (
    <Container maxW="container.xl" px={{xl: 0, base: '16px'}} mt={4}>
      <Grid templateColumns="repeat(3, 1fr)" templateRows="repeat(2, 1fr)" gap={4}>
        <GridItem maxW="1fr">
          <Inventory inventory={user.inventories[0]} />
        </GridItem>
        <GridItem>
          <Inventory inventory={user.inventories[1]} />
        </GridItem>
        <GridItem>
          <MiniProfile user={user} />
        </GridItem>
      </Grid>
    </Container>
  );
}
