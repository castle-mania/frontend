import {Avatar, Container, Flex, Text, useColorModeValue} from '@chakra-ui/react';
import React, {useContext, useEffect} from 'react';
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
    <Container maxW="container.xl" minH="70vh" pt={8}>
      <Flex rowGap={4} direction="column">
        {users.map((user) => (
          <Container maxW="container.sm" bg={useColorModeValue('gray.100', 'gray.900')} rounded="md" p={4}>
            <Flex alignItems="center" justifyContent="space-between">
              <Flex alignItems="center" columnGap={4}>
                <Avatar src={user.avatar} size="sm" />
                <Text>{user.username}</Text>
              </Flex>
              <Text>{user.money.toFixed(2)}</Text>
            </Flex>
          </Container>
        ))}
      </Flex>
    </Container>
  );
}
