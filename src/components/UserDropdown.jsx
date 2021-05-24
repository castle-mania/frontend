import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Icon } from 'rsuite';
import userStore from '../stores/UserStore.js';
import { profileImage } from '../utils.jsx';
import { handleLogoutClick, handleLoginClick } from '../login.js';

export default function userDropdown() {
  const [user, setUser] = useState(userStore.getUser());
  const isLogged = user !== null;

  useEffect(() => {
    userStore.on('change', () => setUser({ ...userStore.getUser() }));
  }, []);

  if (!isLogged) {
    return (
      <Button
        style={{
          verticalAlign: 'middle',
          marginLeft: 50,
          top: 10,
          backgroundColor: '#5865F2',
        }}
        onClick={handleLoginClick}
      >
        Login with Discord
      </Button>
    );
  }

  return (
    <Dropdown title={user.username} placement="bottomEnd" icon={profileImage(user.avatar)}>
      <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
        {profileImage(user.avatar)}
        <strong>{user.username}</strong>
      </Dropdown.Item>
      <Dropdown.Item divider />
      <Dropdown.Item>Castle</Dropdown.Item>
      {user.kingdom && <Dropdown.Item>Kingdom</Dropdown.Item>}

      <Dropdown.Item>Lootboxes</Dropdown.Item>

      <Dropdown.Item icon={<Icon icon="sign-out" />} onSelect={handleLogoutClick}>
        Log Out
      </Dropdown.Item>
    </Dropdown>
  );
}
