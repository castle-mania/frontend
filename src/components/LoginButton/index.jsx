import {Button} from '@chakra-ui/react';
import React, {useContext} from 'react';
import {MdArrowForward, MdLogout} from 'react-icons/md';
import {UserContext} from '../../contexts/UserContext';
import login from '../../utils/login';

export default function LoginButton(props) {
  const {user, logout} = useContext(UserContext);

  if (user != null) {
    return (
      <Button {...props} colorScheme="teal" rightIcon={<MdLogout />} onClick={logout}>
        Log Out
      </Button>
    );
  }

  return (
    <Button {...props} colorScheme="teal" rightIcon={<MdArrowForward />} onClick={login}>
      Log in
    </Button>
  );
}
