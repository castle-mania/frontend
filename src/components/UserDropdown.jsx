import React, { useState, useEffect } from 'react';
import { IconButton, Dropdown, Icon } from 'rsuite';
import userStore from '../stores/UserStore.js';
import { currency, profileImage } from '../utils.jsx';
import { handleLogoutClick, handleLoginClick } from '../login.js';
import styles from '../styles/nav.module.less';

export default function userDropdown() {
  const [user, setUser] = useState(userStore.getUser());
  const isLogged = user !== null;

  useEffect(() => {
    userStore.on('change', () => setUser({ ...userStore.getUser() }));
  }, []);

  if (!isLogged) {
    return (
      <IconButton
        style={{
          verticalAlign: 'middle',
          marginLeft: 50,
          top: 10,
        }}
        onClick={handleLoginClick}
        icon={<Icon icon="sign-in" />}
      >
        Login with Discord
      </IconButton>
    );
  }

  return (
    <Dropdown title={user.username} placement="bottomEnd" icon={profileImage(user.avatar)}>
      <Dropdown.Item panel className={styles.user}>
        <div>
          {profileImage(user.avatar)}
          {user.username}
        </div>
        {currency(user.gems)}
      </Dropdown.Item>
      <Dropdown.Item divider />
      <Dropdown.Item>Home</Dropdown.Item>
      <Dropdown.Item>Kingdom</Dropdown.Item>
      <Dropdown.Item icon={<Icon icon="sign-out" />} onSelect={handleLogoutClick}>
        Log Out
      </Dropdown.Item>
    </Dropdown>
  );
}
