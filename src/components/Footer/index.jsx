import {ButtonGroup, Container, Heading, IconButton, Stack, Text} from '@chakra-ui/react';
import * as React from 'react';
import {FaDiscord, FaGithub} from 'react-icons/fa';
import {DISCORD_INVITE} from '../../constants';

export default function Footer() {
  return (
    <Container as="footer" role="contentinfo" py={{base: '12', md: '16'}} maxW="container.xl">
      <Stack spacing={{base: '4', md: '5'}}>
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
    </Container>
  );
}
