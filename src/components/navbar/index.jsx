import React from 'react';
import {Button, Heading, IconButton, useColorMode} from '@chakra-ui/react';
import {MdNightlight} from 'react-icons/md';
import {faDiscord} from '@fortawesome/free-brands-svg-icons/faDiscord';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styles from './style.module.css';
import Login from './login';

export default function NavBar() {
  const {toggleColorMode} = useColorMode();

  return (
    <div className={styles.navBar}>
      <Heading size="sm">CastleMania v2</Heading>
      <div className={styles.buttons}>
        <Button size="sm">Invite Bot</Button>
        <IconButton
          size="sm"
          icon={<FontAwesomeIcon icon={faDiscord} />}
          onClick={() => window.open('https://discord.gg/SuHeZVDaTD')}
        />
        <IconButton size="sm" icon={<MdNightlight />} onClick={toggleColorMode} />
        <Login />
      </div>
    </div>
  );
}
