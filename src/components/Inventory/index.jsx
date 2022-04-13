/* eslint-disable react/no-array-index-key */
import React, {useMemo} from 'react';
import {Divider, Flex, Grid, GridItem, Heading, Skeleton, useColorModeValue} from '@chakra-ui/react';
import useInventory from '../../hooks/useInventory';
import Item from '../Item';

export default function Inventory({inventory, ...props}) {
  const [items, cph] = useInventory(inventory);

  const filledItems = useMemo(() => {
    if (items == null) {
      return null;
    }

    const filled = new Array(36).fill(null);

    for (const item of items) {
      filled[item.cords.x + item.cords.y * 6] = item;
    }

    return filled;
  }, [items]);

  return (
    <Skeleton
      isLoaded={filledItems != null}
      w="100%"
      {...props}
      rounded="md"
      shadow="md"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}>
      <Flex py={2} px={4} justifyContent="space-between">
        <Heading size="sm">INVENTORY</Heading>
        <Heading size="sm">{cph} / H</Heading>
      </Flex>
      <Divider />
      <Grid templateColumns="repeat(6, 1fr)" templateRows="repeat(6, 1fr)" gap={4} p={4}>
        {filledItems != null
          ? filledItems.map((item, index) => {
              if (item == null) {
                return (
                  <GridItem
                    key={`blank-${index}`}
                    bg={useColorModeValue('gray.200', 'gray.700')}
                    rounded="md"
                    h="100%"
                    w="100%"
                  />
                );
              }
              return (
                <GridItem key={`${item}-${index}`}>
                  <Item item={item} />
                </GridItem>
              );
            })
          : null}
      </Grid>
    </Skeleton>
  );
}
