/* eslint-disable react/no-array-index-key */
import React from 'react';
import {Box, Divider, Heading, HStack, Skeleton, Text, useColorModeValue, VStack} from '@chakra-ui/react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relative from 'dayjs/plugin/relativeTime';
import {WorkbenchContext} from '../../contexts/WorkbenchContext';
import useTasks from '../../hooks/useTasks';
import Item from '../Item';

dayjs.extend(duration);
dayjs.extend(relative);

export default function Workbench(props) {
  const {workbench} = React.useContext(WorkbenchContext);
  const tasks = useTasks(workbench);

  return (
    <Skeleton isLoaded={workbench != null} w="100%" {...props}>
      {tasks != null ? (
        <Box
          rounded="md"
          shadow="md"
          borderWidth="1px"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          w="100%">
          <HStack px={4} py={2} justifyContent="space-between">
            <Heading size="sm">CRAFTING</Heading>
            <Heading size="sm">{tasks?.length ?? 0} TASKS IN PROGRESS</Heading>
          </HStack>
          {tasks.map((task, index) => {
            const taskDuration = dayjs(task.endDate).diff(dayjs(new Date()));
            return (
              <React.Fragment key={`${index}-${task.result.id}`}>
                <Divider />
                <HStack p={4} justifyContent="space-between">
                  <VStack alignItems="left">
                    <Heading size="md">{task.result.name}</Heading>
                    <Text>{dayjs.duration(taskDuration).humanize()} remaining</Text>
                  </VStack>
                  <Item maxW={50} item={task.result} />
                </HStack>
              </React.Fragment>
            );
          })}
        </Box>
      ) : null}
    </Skeleton>
  );
}
