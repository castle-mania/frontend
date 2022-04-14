/* eslint-disable react/no-array-index-key */
import React, {useMemo} from 'react';
import {
  Box,
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
import * as ReactDOM from 'react-router-dom';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relative from 'dayjs/plugin/relativeTime';
import {UserContext} from '../../contexts/UserContext';

const ReactLink = ReactDOM.Link;

dayjs.extend(duration);
dayjs.extend(relative);

export default function VotingStatus({user, ...props}) {
  const {votes} = React.useContext(UserContext);

  const votingMeta = useMemo(() => {
    if (votes == null) {
      return null;
    }

    return {
      topGG: dayjs(votes.topGG.lastVoted).diff(dayjs(new Date())),
      dbl: dayjs(votes.discordBotList.lastVoted).diff(dayjs(new Date())),
      ready: dayjs(votes.lastReward).add(12, 'hours').isBefore(dayjs(new Date())),
    };
  }, [votes]);

  if (user != null && votes != null && user.discordId !== votes.discordId) {
    return null;
  }

  return (
    <Box w="100%" {...props}>
      <Box rounded="md" shadow="md" borderWidth="1px" borderColor={useColorModeValue('gray.200', 'gray.700')} w="100%">
        <HStack px={4} py={2} justifyContent="space-between">
          <Heading size="sm">VOTING STATUS</Heading>
          {votingMeta?.ready ? (
            <Tooltip name="vote-label" label="Completing votes rewards you with a gift.">
              <Tag colorScheme="green">Ready</Tag>
            </Tooltip>
          ) : null}
        </HStack>
        <Divider />
        <Skeleton isLoaded={votingMeta != null} minH={81}>
          {votingMeta != null ? (
            <>
              <HStack px={4} py={2} justifyContent="space-between" as={ReactLink} to="/vote/topgg">
                <Text size="sm">Top.GG</Text>
                {votingMeta.topGG > 0 ? (
                  <Text>{dayjs.duration(votingMeta.topGG).humanize()} remaining</Text>
                ) : (
                  <Checkbox isChecked={false} />
                )}
              </HStack>
              <Divider />
              <HStack px={4} py={2} justifyContent="space-between" as={ReactLink} to="/vote/dbl">
                <Text variant="link" size="sm">
                  DiscordBotList
                </Text>
                {votingMeta.topGG > 0 ? (
                  <Text>{dayjs.duration(votingMeta.topGG).humanize()} remaining</Text>
                ) : (
                  <Checkbox isChecked={false} />
                )}
              </HStack>
            </>
          ) : null}
        </Skeleton>
      </Box>
    </Box>
  );
}
