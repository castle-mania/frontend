import {Container} from '@chakra-ui/react';
import React from 'react';
import Leaderboard from '../../components/Leaderboard';

export default function Leaderboards() {
  return (
    <Container maxW="container.md" my={4}>
      <Leaderboard />
    </Container>
  );
}
