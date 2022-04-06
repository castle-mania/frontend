import {Avatar, Box, Container, Flex, Heading, Tag, useColorModeValue, Text} from '@chakra-ui/react';
import React, {useContext, useEffect} from 'react';
import {LeaderboardContext} from '../../contexts/LeaderboardContext';
import Currency, {Types} from '../../components/Currency';

function TrophyPlace({user, place, ...rest}) {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" rowGap={4} minW={175}>
      <Avatar src={user.avatar} {...rest} />
      <Flex direction="column" justifyContent="center" alignItems="center" rowGap={2}>
        <Flex justifyContent="center" alignItems="center" gap={4}>
          <Tag colorScheme="teal">#{place}</Tag>
          <Heading size="sm">{user.username}</Heading>
        </Flex>
        <Currency value={user.money} type={Types.COIN} />
      </Flex>
    </Flex>
  );
}

export default function Leaderboard() {
  const leaderboard = useContext(LeaderboardContext);
  const {users} = leaderboard;

  useEffect(() => {
    if (users == null) {
      leaderboard.fetchUsers();
    }
  }, []);

  if (users == null) {
    return null;
  }

  const [topUser, secondUser, thirdUser, ...rest] = users;

  return (
    <>
      <Box py={4} backgroundColor={useColorModeValue('gray.200', 'gray.900')}>
        <Flex columnGap={4} alignItems="baseline" justifyContent="center">
          <TrophyPlace user={secondUser} size="xl" place={2} />
          <TrophyPlace user={topUser} size="2xl" place={1} />
          <TrophyPlace user={thirdUser} size="xl" place={3} />
        </Flex>
      </Box>
      <Flex flexDirection="column" rowGap={4} m={4}>
        {rest.map(({username, avatar, money}, index) => (
          <Container backgroundColor={useColorModeValue('gray.200', 'gray.900')} p={4} rounded="md" maxW="container.sm">
            <Flex justifyContent="space-between">
              <Flex alignItems="center" columnGap={4}>
                <Tag>#{index + 3}</Tag>
                <Avatar size="sm" src={avatar} />
                <Text>{username}</Text>
              </Flex>
              <Currency value={money} type={Types.COIN} />
            </Flex>
          </Container>
        ))}
      </Flex>
    </>
  );
}
