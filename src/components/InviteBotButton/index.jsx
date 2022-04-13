import {Button} from '@chakra-ui/react';
import React from 'react';
import {MdArrowForward} from 'react-icons/md';
import {INVITE_URL} from '../../constants';

export default function InviteBotButton(props) {
  return (
    <Button
      {...props}
      rightIcon={<MdArrowForward />}
      size="lg"
      shadow="md"
      colorScheme="green"
      onClick={() => window.open(INVITE_URL)}>
      Invite Bot
    </Button>
  );
}
