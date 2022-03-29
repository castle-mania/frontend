import {Button} from '@chakra-ui/react';
import React from 'react';
import {INVITE_URL} from '../../constants';

export default function InviteBotButton(props) {
  return (
    <Button {...props} size="lg" colorScheme="teal" onClick={() => window.open(INVITE_URL)}>
      Invite Bot
    </Button>
  );
}
