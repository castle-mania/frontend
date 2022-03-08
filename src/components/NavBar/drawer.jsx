import React from 'react';
import {Button, Drawer, DrawerContent, DrawerOverlay, IconButton, useColorMode} from '@chakra-ui/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHamburger} from '@fortawesome/free-solid-svg-icons/faHamburger';
import Login from './login';
import styles from './style.module.css';

const INVITE_URL =
  'https://discord.com/api/oauth2/authorize?client_id=757120026867138580&permissions=414464657408&scope=applications.commands%20bot';

export default function DrawerNavbar() {
  const {toggleColorMode} = useColorMode();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={styles.drawer}>
      <IconButton onClick={() => setOpen((prev) => !prev)} icon={<FontAwesomeIcon icon={faHamburger} />} size="sm">
        Open
      </IconButton>
      <Drawer isOpen={open} size="xs" onClose={() => setOpen(false)}>
        <DrawerOverlay />
        <DrawerContent className={styles.drawerContent}>
          <Button size="sm" onClick={() => window.open(INVITE_URL)}>
            Invite Bot
          </Button>
          <Button size="sm" onClick={() => window.open('https://discord.gg/SuHeZVDaTD')}>
            Join Discord
          </Button>
          <Button size="sm" onClick={toggleColorMode}>
            Toggle Dark Mode
          </Button>
          <Login />
        </DrawerContent>
      </Drawer>
    </div>
  );
}
