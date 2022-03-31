import {Avatar, Box, Container, Flex, Text, useColorModeValue} from '@chakra-ui/react';
import React, {useContext, useEffect} from 'react';
import Currency, {Types} from '../../components/Currency';
import {LeaderboardContext} from '../../contexts/LeaderboardContext';

export default function Leaderboard() {
  const leaderboard = useContext(LeaderboardContext);
  const {users} = leaderboard;

  useEffect(() => {
    if (users == null) {
      leaderboard.fetchUsers();
    }
  }, []);

  if (users === null) {
    return null;
  }

  return (
    <Container maxW="container.xl" minH="100vh" p={8}>
      <Box h="64px" />
      <Flex rowGap={4} direction="column" w="100%">
        {users.map((user) => (
          <Container maxW="container.sm" bg={useColorModeValue('gray.100', 'gray.900')} rounded="md" p={4}>
            <Flex alignItems="center" justifyContent="space-between">
              <Flex alignItems="center" columnGap={4}>
                <Avatar src={user.avatar} size="sm" />
                <Text>{user.username}</Text>
              </Flex>
              <Currency type={Types.COIN} value={user.money} />
            </Flex>
          </Container>
        ))}
      </Flex>
    </Container>
  );
}
