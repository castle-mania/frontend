import React from 'react';
import {
  Table,
  Skeleton,
  TableContainer,
  Tbody,
  Tr,
  Td,
  Code,
  Flex,
  Thead,
  Th,
  useColorModeValue,
  Tfoot,
  Tooltip,
  Box,
} from '@chakra-ui/react';
import {CommandContext} from '../../contexts/CommandsContext';

function Command({name, description, options}) {
  const args = options || [];

  return (
    <Tr>
      <Td>
        <Code>/{name}</Code>
      </Td>
      <Td>{description}</Td>
      <Td>
        <Flex columnGap={2}>
          {args.map((argument) => (
            <Tooltip placement="top" label={argument.description}>
              <Box>
                <Code>{argument.name}</Code>
              </Box>
            </Tooltip>
          ))}
        </Flex>
      </Td>
    </Tr>
  );
}

export default function Commands() {
  const {commands} = React.useContext(CommandContext);

  return (
    <Skeleton
      isLoaded={commands != null}
      border="1px"
      shadow="md"
      p={0}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      rounded="md">
      <TableContainer>
        <Table size="md">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Options</Th>
            </Tr>
          </Thead>
          <Tbody>
            {commands != null ? commands.map((command) => <Command key={command.name} {...command} />) : null}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Options</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Skeleton>
  );
}
