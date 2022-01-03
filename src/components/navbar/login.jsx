import {Button} from '@chakra-ui/react';
import React from 'react';
import {useSelector} from 'react-redux';
import login from '../../utils/login';
import Profile from './profile';

export default function LoginButton() {
  const user = useSelector((state) => state?.user?.payload);

  if (user != null) {
    const {username, avatar} = user;
    return <Profile username={username} avatar={avatar} />;
  }

  return (
    <Button size="sm" colorScheme="teal" onClick={() => login()}>
      Login
    </Button>
  );
}
