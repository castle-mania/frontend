import {
  Box,
  Heading,
  HStack,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import dayjs, {duration} from 'dayjs';
import React from 'react';
import Currency, {Types} from '../Currency';

function RarityTag({rarity, level}) {
  switch (rarity) {
    case 3:
      return <Tag colorScheme="yellow">LVL {level}</Tag>;
    case 2:
      return <Tag colorScheme="purple">LVL {level}</Tag>;
    case 1:
      return <Tag colorScheme="green">LVL {level}</Tag>;
    case 0:
    default:
      return <Tag colorScheme="blue">LVL {level}</Tag>;
  }
}

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
              <RarityTag rarity={item.rarity} level={item.level} />
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
          {item._self ? (
            <PopoverFooter>
              <HStack justifyContent="space-between">
                <Text>Fabricated</Text>
                <Text>{duration(dayjs(item.purchased).diff(dayjs())).humanize()} ago</Text>
              </HStack>
            </PopoverFooter>
          ) : null}
        </PopoverContent>
      </Popover>
    </Box>
  );
}
