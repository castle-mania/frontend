import {
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Box,
  useColorModeValue,
  VStack,
  Skeleton,
  Button,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import UserAvatar from '../../components/Avatar';
import Currency, {Types} from '../../components/Currency';
import Inventory from '../../components/Inventory';
import VotingStatus from '../../components/VotingStatus';
import Workbench from '../../components/Workbench';
import useUser from '../../hooks/useUser';

function handleCopyDiscordId(id, toast) {
  navigator.clipboard.writeText(id);

  toast({
    title: 'Account copied.',
    description: `Successfully copied ${id} to your clip-board.`,
    status: 'success',
    duration: 1500,
    isClosable: true,
  });
}

function MiniProfile({user, ...props}) {
  const toast = useToast();

  return (
    <Box
      {...props}
      rounded="md"
      shadow="md"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      w="100%">
      <HStack px={4} py={2} justifyContent="space-between">
        <Heading size="sm">PROFILE</Heading>
        <Button size="xs" variant="unstyle" onClick={() => handleCopyDiscordId(user.discordId, toast)}>
          Copy ID
        </Button>
      </HStack>
      <Divider />
      <Skeleton isLoaded={user != null} justifyContent="space-between" p={4} minH={88} display="flex">
        {user != null ? (
          <>
            <HStack spacing={4}>
              <UserAvatar user={user} />
              <Heading>{user?.username}</Heading>
            </HStack>
            <VStack justifyContent="right" alignItems="right">
              <Currency value={user?.money} type={Types.COIN} />
              <Currency value={user?.funds} type={Types.GEM} />
            </VStack>
          </>
        ) : null}
      </Skeleton>
    </Box>
  );
}

export default function Profile() {
  const [user] = useUser();

  return (
    <Container maxW="container.xl" px={{xl: 0, base: '16px'}} mt={4}>
      <Grid
        templateColumns={{lg: 'repeat(3, 1fr)', sm: 'repeat(2, 1fr)', base: null}}
        templateRows={{lg: '1fr', sm: '1fr', base: null}}
        gap={4}>
        <GridItem colSpan={{lg: 1, sm: 2, base: 1}} rowSpan={{lg: 2, sm: 1}}>
          <VStack spacing={4}>
            <MiniProfile user={user} />
            <VotingStatus user={user} />
            <Workbench user={user} />
          </VStack>
        </GridItem>
        <GridItem>
          <Inventory inventory={user?.inventories[0]} />
        </GridItem>
        <GridItem>
          <Inventory inventory={user?.inventories[1]} />
        </GridItem>
      </Grid>
    </Container>
  );
}
