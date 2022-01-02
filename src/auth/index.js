import {useToast} from '@chakra-ui/react';
import axios from 'axios';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export default function DiscordAuth() {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(async () => {
    try {
      const {data} = await axios.get(`/auth/discord/callback${window.location.search}`);
      window.localStorage.setItem('jwt-token', data.token);
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

  return null;
}
