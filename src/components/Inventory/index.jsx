/* eslint-disable react/no-array-index-key */
import React, {useMemo} from 'react';
import {Grid, GridItem, Image, Skeleton, useColorModeValue} from '@chakra-ui/react';
import useInventory from '../../hooks/useInventory';

export default function Inventory({inventory, ...props}) {
  const items = useInventory(inventory);

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
    <Skeleton isLoaded={filledItems != null} w="100%" {...props}>
      <Grid
        templateColumns="repeat(6, 1fr)"
        templateRows="repeat(6, 1fr)"
        gap={4}
        rounded="md"
        shadow="md"
        borderWidth="1px"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        p={4}>
        {filledItems != null
          ? filledItems.map((item, index) => {
              if (item == null) {
                return <GridItem bg={useColorModeValue('gray.200', 'gray.700')} rounded="md" h="100%" w="100%" />;
              }

              return (
                <GridItem key={`${item}-${index}`}>
                  <Image src={item.url} />
                </GridItem>
              );
            })
          : null}
      </Grid>
    </Skeleton>
  );
}
