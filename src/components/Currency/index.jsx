import {HStack, Text, Image} from '@chakra-ui/react';
import React from 'react';
import {numberWithCommas} from '../../utils';

export const Types = {
  COIN: 'coin',
  GEM: 'gem',
  CPH: 'cph',
};

export const ImagePath = {
  [Types.COIN]: '/imgs/coin.gif',
  [Types.CPH]: '/imgs/coin.gif',
  [Types.GEM]: '/imgs/gem.gif',
};

export const FormatValue = {
  [Types.COIN]: numberWithCommas,
  [Types.GEM]: numberWithCommas,
  [Types.CPH]: (value) => `${numberWithCommas(value)} / H`,
};

export default function Currency({type, value, ...rest}) {
  const imagePath = ImagePath[type];

  return (
    <HStack {...rest} justifyContent="center">
      <Image src={imagePath} boxSize="20px" alt={type} />
      <Text>{FormatValue[type](value)}</Text>
    </HStack>
  );
}
