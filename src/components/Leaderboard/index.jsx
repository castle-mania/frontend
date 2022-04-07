/* eslint-disable react/no-array-index-key */
import {Avatar, Flex, Heading, Tag, Text, useColorModeValue, Box, Divider} from '@chakra-ui/react';
import React, {useContext, useEffect, useState} from 'react';
import {LeaderboardContext} from '../../contexts/LeaderboardContext';
import Currency, {Types} from '../Currency';

export const LeaderboardTypes = {
  CPH: 'cph',
  MONEY: 'money',
};

function LeaderboardValue({type, ...rest}) {
  if (type === LeaderboardTypes.MONEY) {
    return <Currency type={Types.COIN} {...rest} />;
  }

  if (type === LeaderboardTypes.CPH) {
    return <Currency type={Types.CPH} {...rest} />;
  }
}

function TrophyPlace({user, place, type, ...rest}) {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" rowGap={4} minW={175}>
      <Avatar src={user?.avatar} {...rest} />
      <Flex direction="column" justifyContent="center" alignItems="center" rowGap={2}>
        <Flex justifyContent="center" alignItems="center" gap={4}>
          <Tag>#{place}</Tag>
          <Heading size="sm">{user?.username}</Heading>
        </Flex>
        <LeaderboardValue type={type} value={user?.[type]} />
      </Flex>
    </Flex>
  );
}

function BasicPlace({user, index, type}) {
  return (
    <Box p={4} m={0}>
      <Flex justifyContent="space-between">
        <Flex alignItems="center" columnGap={4}>
          <Tag>#{index + 1}</Tag>
          <Avatar size="sm" />
          <Text>{user.username}</Text>
        </Flex>
        <LeaderboardValue type={type} value={user?.[type]} />
      </Flex>
    </Box>
  );
}

const validate = () => window.innerWidth < 600;

export default function Leaderboard({type}) {
  const leaderboard = useContext(LeaderboardContext);

  const [small, setSmall] = useState(validate());
  const {global} = leaderboard;

  useEffect(() => {
    if (global[type] == null) {
      leaderboard.fetchUsers(type);
    }
  }, [type]);

  const users = global[type];

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
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
        {users.map((user, index) => (
          <Box key={`${user.username}-${index}`}>
            <BasicPlace user={user} index={index} type={type} />
            {index === users.length - 1 ? null : <Divider />}
          </Box>
        ))}
      </Flex>
    );
  }

  const [topUser, secondUser, thirdUser, ...rest] = users;

  return (
    <Box
      flexDirection="column"
      border="1px"
      shadow="md"
      p={0}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      rounded="md">
      <Flex px={4} py={8} columnGap={4} alignItems="baseline" justifyContent="center" w="100%">
        <TrophyPlace user={secondUser} size="xl" place={2} type={type} />
        <TrophyPlace user={topUser} size="2xl" place={1} type={type} />
        <TrophyPlace user={thirdUser} size="xl" place={3} type={type} />
      </Flex>
      {rest.map((user, index) => (
        <React.Fragment key={`${user.username}-${index}`}>
          <Divider />
          <BasicPlace user={user} index={index + 3} type={type} />
        </React.Fragment>
      ))}
    </Box>
  );
}
