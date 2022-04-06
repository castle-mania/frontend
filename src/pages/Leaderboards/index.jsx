/* eslint-disable react/no-array-index-key */
import {Avatar, Container, Flex, Heading, Tag, useColorModeValue, Text, Box} from '@chakra-ui/react';
import React, {useContext, useEffect, useState} from 'react';
import {LeaderboardContext} from '../../contexts/LeaderboardContext';
import Currency, {Types} from '../../components/Currency';

function TrophyPlace({user, place, ...rest}) {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" rowGap={4} minW={175}>
      <Avatar src={user.avatar} {...rest} />
      <Flex direction="column" justifyContent="center" alignItems="center" rowGap={2}>
        <Flex justifyContent="center" alignItems="center" gap={4}>
          <Tag>#{place}</Tag>
          <Heading size="sm">{user.username}</Heading>
        </Flex>
        <Currency value={user.money} type={Types.COIN} />
      </Flex>
    </Flex>
  );
}

function BasicPlace({username, avatar, money, index}) {
  return (
    <Container
      backgroundColor={useColorModeValue('gray.200', 'gray.900')}
      px={8}
      py={4}
      rounded="md"
      maxW="container.sm">
      <Flex justifyContent="space-between">
        <Flex alignItems="center" columnGap={4}>
          <Tag>#{index + 1}</Tag>
          <Avatar size="sm" src={avatar} />
          <Text>{username}</Text>
        </Flex>
        <Currency value={money} type={Types.COIN} />
      </Flex>
    </Container>
  );
}

const validate = () => window.innerWidth < 600;

export default function Leaderboard() {
  const [small, setSmall] = useState(validate());
  const leaderboard = useContext(LeaderboardContext);
  const {users} = leaderboard;

  useEffect(() => {
    if (users == null) {
      leaderboard.fetchUsers();
    }
  }, []);

  useEffect(() => {
    const onResize = () => setSmall(validate());

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  if (users == null) {
    return null;
  }

  if (small) {
    return (
      <Flex flexDirection="column" rowGap={4} m={4}>
        {users.map((user, index) => (
          <BasicPlace {...user} index={index} key={`${user.username}-${index}`} />
        ))}
      </Flex>
    );
  }

  const [topUser, secondUser, thirdUser, ...rest] = users;

  return (
    <Box margin={4}>
      <Flex flexDirection="column" rowGap={4}>
        <Container py={8} backgroundColor={useColorModeValue('gray.200', 'gray.900')} maxW="container.sm">
          <Flex columnGap={4} alignItems="baseline" justifyContent="center">
            <TrophyPlace user={secondUser} size="xl" place={2} />
            <TrophyPlace user={topUser} size="2xl" place={1} />
            <TrophyPlace user={thirdUser} size="xl" place={3} />
          </Flex>
        </Container>
        {rest.map((user, index) => (
          <BasicPlace {...user} index={index + 3} key={`${user.username}-${index}`} />
        ))}
      </Flex>
    </Box>
  );
}
