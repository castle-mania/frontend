/* eslint-disable jsx-a11y/media-has-caption */
import {Container, Flex, Heading, Stack, Text, Box, Image} from '@chakra-ui/react';
import React from 'react';
import InviteBotButton from '../../components/InviteBotButton';
// import Step from '../../components/Step';
import SupportDiscordButton from '../../components/SupportDiscordButton';

export default function Home() {
  return (
    <Container maxW="container.xl">
      <Flex
        align="center"
        justify={{base: 'center', md: 'space-around', xl: 'space-between'}}
        direction={{base: 'column-reverse', lg: 'row'}}
        rowGap={8}
        wrap="no-wrap"
        minH="100vh">
        <Stack spacing={4} w={{base: 'md', xl: '40%'}} align={['left', 'left', 'flex-start', 'flex-start']}>
          <Heading size="3xl">Accelerate Your Guild&apos;s Retention</Heading>
          <Text>
            Castle Mania is a Unique Global Currency game that allows you to Buy, Sell, Raid and Gamble your way to the
            top of the leaderboard!
          </Text>
          <Flex columnGap={4}>
            <InviteBotButton />
            <SupportDiscordButton />
          </Flex>
        </Stack>
        <Box boxSize="md">
          <Image src="/imgs/square_buttload_gems.png" />
        </Box>
      </Flex>
      {/* <Step videoUrl="/videos/profile_command.mp4">
        <Heading size="3xl">Quick Start</Heading>
        <Text>
          <Code>/profile</Code> will prompt your profile! From here you can see your total coins, and every generator
          you have equipped.
        </Text>
        <Text>
          Generators will gain you coins over time, there are many different types of generators with unique properties.
          continue to see how to acquire your first generator!
        </Text>
      </Step>
      <Step videoUrl="/videos/buy_command.mp4" reverse>
        <Heading size="3xl">Your First Generator</Heading>
        <Text>Every player starts with 3 coins, We recommend purchasing 3 basic generators to start with:</Text>
        <Text>
          <Code>/buy</Code> <Code>item: basic</Code> <Code>amount: 3</Code>
        </Text>
        <Text>Congrats, you&apos;re now earning coins! revisiting your profile will display your new generators!</Text>
      </Step>
      <Step videoUrl="/videos/sell_command.mp4">
        <Heading size="3xl">Making Space</Heading>
        <Text>You can optionally sell your generators to gain coins to make space for new generators.</Text>
        <Text>
          <Code>/sell</Code> <Code>item: basic</Code>
        </Text>
        <Text>
          Executing <Code>/shop</Code> will show you a detailed list on what you can buy, clicking on an item will
          display its stats.
        </Text>
      </Step> */}
    </Container>
  );
}
