import {Container} from '@chakra-ui/react';
import React from 'react';
import Leaderboard from '../../components/Leaderboard';

export default function Leaderboards() {
  return (
    <Container maxW="container.xl" my={4} px={{xl: 0, base: '16px'}}>
      <Leaderboard />
    </Container>
  );
}
