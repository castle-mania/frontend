import React from 'react';
import {Box, Flex, Stack} from '@chakra-ui/react';

export default function Step({videoUrl, children, reverse}) {
  const video = (
    <Box boxSize="lg" borderRadius="3xl" overflow="hidden">
      <video src={videoUrl} autoPlay loop muted />
    </Box>
  );

  return (
    <Flex
      align="center"
      justify={{base: 'center', md: 'space-around', xl: 'space-between'}}
      direction={{base: reverse ? 'column-reverse' : 'column', lg: 'row'}}
      wrap="no-wrap"
      rowGap={8}
      minH="20vh"
      px={8}
      mb={16}>
      {!reverse ? video : null}
      <Stack spacing={4} w={{base: 'md', lg: '40%'}} align={['left', 'left', 'flex-start', 'flex-start']}>
        {children}
      </Stack>
      {reverse ? video : null}
    </Flex>
  );
}
