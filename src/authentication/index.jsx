import {Container, Spinner, useToast, Text} from '@chakra-ui/react';
import axios from 'axios';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './auth.module.css';
import api from '../utils/api';
import {UserContext} from '../contexts/UserContext';

export default function DiscordAuth() {
  const navigate = useNavigate();
  const {login} = React.useContext(UserContext);
  const toast = useToast();

  useEffect(async () => {
    try {
      const {data} = await axios.get(`/auth/discord/callback${window.location.search}`);
      api.setToken(data.token);
      localStorage.setItem('jwt-token', data.token);
      login();

      toast({
        title: 'Account connected.',
        description: "You've successfully connected your discord account.",
        status: 'success',
        duration: 1500,
        isClosable: true,
      });
    } catch (_) {}

    const callbackPath = localStorage.getItem('jwt-token-callback');
    navigate(callbackPath == null ? '/' : callbackPath);
  }, []);

  return (
    <Container className={styles.container}>
      <Spinner colorScheme="teal" size="sm" />
      <Text>Authenticating</Text>
    </Container>
  );
}
