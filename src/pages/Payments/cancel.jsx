import {Alert, AlertIcon, Container} from '@chakra-ui/react';
import React from 'react';

export default function Cancel() {
  return (
    <Container>
      <Alert status="info">
        <AlertIcon />
        Sorry, come back again!
      </Alert>
    </Container>
  );
}
