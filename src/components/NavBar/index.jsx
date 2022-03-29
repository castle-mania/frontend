import React from 'react';
import {Button, Container} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import styles from './style.module.css';
import Login from './login';

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <Container className={styles.navBar} maxW="container.xl">
      <Button size="lg" variant="ghost" onClick={() => navigate('/')}>
        Castle Mania
      </Button>
      <Login />
    </Container>
  );
}
