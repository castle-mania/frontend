import {Button} from '@chakra-ui/react';
import React from 'react';
import {UserContext} from '../../contexts/UserContext';
import login from '../../utils/login';
import Profile from './profile';

export default function LoginButton() {
  const {user} = React.useContext(UserContext);

  if (user != null) {
    const {username, avatar} = user;
    return <Profile username={username} avatar={avatar} />;
  }

  return (
    <Button size="sm" colorScheme="teal" onClick={login}>
      Login
    </Button>
  );
}
