/* eslint-disable react/no-array-index-key */
import React, {useMemo} from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Heading,
  HStack,
  Skeleton,
  Tag,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relative from 'dayjs/plugin/relativeTime';
import {UserContext} from '../../contexts/UserContext';

dayjs.extend(duration);
dayjs.extend(relative);

function handleVoteClick(ref) {
  switch (ref) {
    case 'topgg':
      window.open('https://top.gg/bot/757120026867138580/vote');
      break;
    case 'dbl':
    default:
      window.open('https://discordbotlist.com/bots/castle-mania/upvote');
      break;
  }
}

export default function VotingStatus({user, ...props}) {
  const {votes} = React.useContext(UserContext);

  const votingMeta = useMemo(() => {
    if (votes == null) {
      return null;
    }

    return {
      topGG: dayjs(votes.topGG.lastVoted).add(12, 'hours').isAfter(dayjs(new Date())),
      dbl: dayjs(votes.discordBotList.lastVoted).add(12, 'hours').isAfter(dayjs(new Date())),
      ready: dayjs(votes.lastReward).add(12, 'hours').isBefore(dayjs(new Date())),
      duration: dayjs(votes.lastReward).add(12, 'hours').diff(dayjs(new Date())),
    };
  }, [votes]);

  if (user == null || user.discordId !== votes?.discordId) {
    return null;
  }

  return (
    <Box w="100%" {...props}>
      <Box
        rounded="md"
        shadow="md"
        borderWidth="1px"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        w="100%"
        overflow="hidden">
        <HStack px={4} py={2} justifyContent="space-between">
          <Heading size="sm">VOTING STATUS</Heading>
          {votingMeta == null || votingMeta.ready ? (
            <Tooltip name="vote-label" label="Completing votes rewards you with a gift.">
              <Tag colorScheme="green">Ready</Tag>
            </Tooltip>
          ) : (
            <Text>{duration(votingMeta?.duration).humanize()} left</Text>
          )}
        </HStack>
        <Divider />
        <Skeleton isLoaded={votingMeta != null} minH={81}>
          {votingMeta != null ? (
            <>
              <HStack
                px={4}
                py={2}
                justifyContent="space-between"
                onClick={() => handleVoteClick('topgg')}
                as={Button}
                rounded="none"
                bg="none"
                w="100%">
                <Text size="sm">Top.GG</Text>
                <Checkbox isChecked={votingMeta.topGG} colorScheme="green" />
              </HStack>
              <Divider />
              <HStack
                px={4}
                py={2}
                justifyContent="space-between"
                onClick={() => handleVoteClick('dbl')}
                as={Button}
                rounded="none"
                bg="none"
                w="100%">
                <Text variant="link" size="sm">
                  DiscordBotList
                </Text>
                <Checkbox isChecked={votingMeta.dbl} colorScheme="green" />
              </HStack>
            </>
          ) : null}
        </Skeleton>
      </Box>
    </Box>
  );
}
