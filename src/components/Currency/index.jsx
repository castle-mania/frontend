import {HStack, Text, Image} from '@chakra-ui/react';
import React from 'react';
import {numberWithCommas} from '../../utils';

export const Types = {
  COIN: 'coin',
  GEM: 'gem',
};

export const ImagePath = {
  [Types.COIN]: '/imgs/coin.gif',
  [Types.GEM]: '/imgs/gem.gif',
};

export default function Currency({type, value, ...rest}) {
  const imagePath = ImagePath[type];

  return (
    <HStack {...rest} justifyContent="center">
      <Image src={imagePath} boxSize="20px" />
      <Text>{numberWithCommas(value)}</Text>
    </HStack>
  );
}
