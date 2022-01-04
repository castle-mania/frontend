import {Alert, AlertIcon, Container} from '@chakra-ui/react';
import React from 'react';

export default function Succes() {
  return (
    <Container>
      <Alert status="success">
        <AlertIcon />
        Success, thank you for your purchase!
      </Alert>
    </Container>
  );
}
