import React from 'react';
import {Button, Heading, IconButton, useColorMode} from '@chakra-ui/react';
import {MdNightlight} from 'react-icons/md';
import {faDiscord} from '@fortawesome/free-brands-svg-icons/faDiscord';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './style.module.css';
import {login} from '../../utils/login';

export default function NavBar() {
  const {toggleColorMode} = useColorMode();

  return (
    <div className={styles.navBar}>
      <Heading size="sm">CastleMania v2</Heading>
      <div className={styles.buttons}>
        <Button size="sm">Invite Bot</Button>
        <IconButton size="sm" icon={<FontAwesomeIcon icon={faDiscord} />} onClick={toggleColorMode} />
        <IconButton size="sm" icon={<MdNightlight />} onClick={toggleColorMode} />
        <Button size="sm" colorScheme="teal" onClick={() => login()}>
          Login
        </Button>
      </div>
    </div>
  );
}
