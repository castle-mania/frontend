import {Container, Spinner, useToast, Text} from '@chakra-ui/react';
import axios from 'axios';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {login} from '../stores/user';
import styles from './auth.module.css';
import api from '../utils/api';

export default function DiscordAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(async () => {
    try {
      const {data} = await axios.get(`/auth/discord/callback${window.location.search}`);
      api.SET_TOKEN(data.token);
      window.localStorage.setItem('jwt-token', data.token);
      const res = await api.GET('/users');
      dispatch(login(res.data.user));
    } catch (_) {}

    const callbackPath = window.localStorage.getItem('jwt-token-callback');
    navigate(callbackPath == null ? '/' : callbackPath);

    toast({
      title: 'Account connected.',
      description: "You've successfully connected your discord account.",
      status: 'success',
      duration: 1500,
      isClosable: true,
    });
  }, []);

  return (
    <Container className={styles.container}>
      <Spinner colorScheme="teal" size="sm" />
      <Text>Authenticating</Text>
    </Container>
  );
}
