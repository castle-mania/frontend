import React from 'react';
import {Button, IconButton, useColorMode} from '@chakra-ui/react';
import {MdNightlight} from 'react-icons/md';
import {faDiscord} from '@fortawesome/free-brands-svg-icons/faDiscord';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useNavigate} from 'react-router-dom';
import styles from './style.module.css';
import Login from './login';

const INVITE_URL =
  'https://discord.com/api/oauth2/authorize?client_id=757120026867138580&permissions=414464657408&scope=applications.commands%20bot';

export default function NavBar() {
  const {toggleColorMode} = useColorMode();
  const navigate = useNavigate();

  return (
    <div className={styles.navBar}>
      <Button size="lg" variant="ghost" onClick={() => navigate('/')}>
        Castle Mania v2
      </Button>
      <div className={styles.buttons}>
        <Button size="sm" onClick={() => window.open(INVITE_URL)}>
          Invite Bot
        </Button>
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
