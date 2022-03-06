import {Button} from '@chakra-ui/react';
import React from 'react';
import login from '../../utils/login';

export default function LoginButton() {
  // if (user != null) {
  //   const {username, avatar} = user;
  //   return <Profile username={username} avatar={avatar} />;
  // }

  return (
    <Button size="sm" colorScheme="teal" onClick={() => login()}>
      Login
    </Button>
  );
}
