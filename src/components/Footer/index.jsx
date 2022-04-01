import {ButtonGroup, Flex, Heading, IconButton, Stack, Text, useColorModeValue} from '@chakra-ui/react';
import * as React from 'react';
import {FaDiscord, FaGithub} from 'react-icons/fa';
import {DISCORD_INVITE} from '../../constants';

export default function Footer() {
  return (
    <Flex
      as="footer"
      role="contentinfo"
      position="absolute"
      bottom={0}
      w="100%"
      h={200}
      bg={useColorModeValue('gray.100', 'gray.900')}
      justifyContent="center"
      alignItems="center"
      shadow={1}
      borderWidth={2}
      borderColor={useColorModeValue('gray.200', 'gray.900')}>
      <Stack spacing={{base: '4', md: '6'}} w="container.xl" mx={4}>
        <Stack justify="space-between" direction="row" align="center">
          <Heading size="md">Castle Mania</Heading>
          <ButtonGroup variant="ghost">
            <IconButton as="a" href={DISCORD_INVITE} aria-label="LinkedIn" icon={<FaDiscord fontSize="1.25rem" />} />
            <IconButton
              as="a"
              href="https://github.com/castle-mania"
              aria-label="GitHub"
              icon={<FaGithub fontSize="1.25rem" />}
            />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" color="subtle">
          &copy; {new Date().getFullYear()} VaspDev, LLC. All rights reserved.
        </Text>
      </Stack>
    </Flex>
  );
}
