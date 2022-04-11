import {Container} from '@chakra-ui/react';
import React from 'react';
import Commands from '../../components/Commands';

export default function CommandsPage() {
  return (
    <Container maxW="container.xl" px={{xl: 0, base: '16px'}} my={4}>
      <Commands />
    </Container>
  );
}
