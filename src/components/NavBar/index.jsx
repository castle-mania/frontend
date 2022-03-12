import React from 'react';
import {Button, Container, IconButton, useColorMode} from '@chakra-ui/react';
import {MdNightlight} from 'react-icons/md';
import {faDiscord} from '@fortawesome/free-brands-svg-icons/faDiscord';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useNavigate} from 'react-router-dom';
import styles from './style.module.css';
import Login from './login';
import {DISCORD_INVITE, INVITE_URL} from '../../constants';

export default function NavBar() {
  const {toggleColorMode} = useColorMode();
  const navigate = useNavigate();

  return (
    <Container className={styles.navBar} maxW="container.xl">
      <Button size="lg" variant="ghost" onClick={() => navigate('/')}>
        Castle Mania
      </Button>
      <div className={styles.buttons}>
        <Button size="sm" onClick={() => window.open(INVITE_URL)}>
          Invite Bot
        </Button>
        <IconButton size="sm" icon={<FontAwesomeIcon icon={faDiscord} />} onClick={() => window.open(DISCORD_INVITE)}>
          Discord
        </IconButton>
        <IconButton size="sm" icon={<MdNightlight />} onClick={toggleColorMode} />
        <Login />
      </div>
    </Container>
  );
}
