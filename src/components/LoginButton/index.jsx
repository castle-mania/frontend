import {Button} from '@chakra-ui/react';
import React from 'react';
import {MdArrowForward} from 'react-icons/md';
import login from '../../utils/login';

export default function LoginButton() {
  return (
    <Button size="sm" colorScheme="teal" rightIcon={<MdArrowForward />} onClick={login}>
      Log in
    </Button>
  );
}
