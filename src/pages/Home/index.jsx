/* eslint-disable jsx-a11y/media-has-caption */
import {Container, Flex, Heading, Stack, Text, Box, Image} from '@chakra-ui/react';
import React from 'react';
import InviteBotButton from '../../components/InviteBotButton';
// import Step from '../../components/Step';
import SupportDiscordButton from '../../components/SupportDiscordButton';

export default function Home() {
  return (
    <Container maxW="container.xl" my={4} px={{xl: 0, base: '16px'}}>
      <Flex
        align="center"
        columnGap={16}
        justify={{base: 'center', md: 'space-between'}}
        direction={{base: 'column-reverse', md: 'row'}}
        wrap="no-wrap">
        <Stack spacing={4} w={{base: null, lg: '40%'}} align={['left', 'left', 'flex-start', 'flex-start']} maxW="lg">
          <Heading size="2xl">Accelerate Your Guild&apos;s Retention</Heading>
          <Text>
            Castle Mania is a Unique Global Currency game that allows you to Buy, Sell, Raid and Gamble your way to the
            top of the leaderboard!
          </Text>
          <Flex columnGap={4} direction={{base: 'column', md: 'row'}} rowGap={4}>
            <InviteBotButton />
            <SupportDiscordButton />
          </Flex>
        </Stack>
        <Box maxW="md">
          <Image src="/imgs/square_buttload_gems.png" alt="landing-page-image" />
        </Box>
      </Flex>
    </Container>
  );
}
