import {
  Box,
  Heading,
  HStack,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import Currency, {Types} from '../Currency';

export default function Item({item, ...props}) {
  return (
    <Box {...props}>
      <Popover>
        <PopoverTrigger>
          <Image src={item.url} />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <HStack justifyContent="space-between">
              <Heading size="sm">{item.name}</Heading>
              <Heading size="sm">LVL {item.level}</Heading>
            </HStack>
          </PopoverHeader>
          <PopoverBody>
            <VStack alignItems="left">
              <HStack justifyContent="space-between">
                <Text>Coins Per Hour</Text>
                <Currency value={item.gph} type={Types.CPH} />
              </HStack>
              <HStack justifyContent="space-between">
                <Text>Price</Text>
                <Currency value={item.price} type={Types.COIN} />
              </HStack>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
