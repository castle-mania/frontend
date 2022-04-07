/* eslint-disable react/no-array-index-key */
import {Avatar, Container, Flex, Heading, Tag, Text, useColorModeValue, Box, Divider} from '@chakra-ui/react';
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
    <Box p={4} m={0}>
      <Flex justifyContent="space-between">
        <Flex alignItems="center" columnGap={4}>
          <Tag>#{index + 1}</Tag>
          <Avatar size="sm" src={avatar} />
          <Text>{username}</Text>
        </Flex>
        <Currency value={money} type={Types.COIN} />
      </Flex>
    </Box>
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
      <Flex
        shadow="md"
        rounded="md"
        flexDirection="column"
        border="1px"
        p={0}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        m={4}>
        {users.map((user, index) => (
          <Box key={`${user.username}-${index}`}>
            <BasicPlace {...user} index={index} />
            {index === users.length - 1 ? null : <Divider />}
          </Box>
        ))}
      </Flex>
    );
  }

  const [topUser, secondUser, thirdUser, ...rest] = users;

  return (
    <Container maxW="container.md">
      <Box
        flexDirection="column"
        border="1px"
        shadow="md"
        p={0}
        mt={4}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        rounded="md">
        <Flex px={4} py={8} columnGap={4} alignItems="baseline" justifyContent="center" w="100%">
          <TrophyPlace user={secondUser} size="xl" place={2} />
          <TrophyPlace user={topUser} size="2xl" place={1} />
          <TrophyPlace user={thirdUser} size="xl" place={3} />
        </Flex>
        {rest.map((user, index) => (
          <React.Fragment key={`${user.username}-${index}`}>
            <Divider />
            <BasicPlace {...user} index={index + 3} />
          </React.Fragment>
        ))}
      </Box>
    </Container>
  );
}
