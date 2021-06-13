import React, { useState, useEffect } from 'react';
import { Dropdown, Icon, Nav } from 'rsuite';
import userStore from '../stores/UserStore.js';
import { currency, profileImage } from '../utils.jsx';
import { handleLogoutClick, handleLoginClick } from '../login.js';
import styles from '../styles/nav.module.less';
import { Pages } from '../pages.js';

export default function userDropdown({ page, setPage }) {
  const [user, setUser] = useState(userStore.getUser());
  const isLogged = user !== null;

  useEffect(() => {
    userStore.on('change', () => setUser({ ...userStore.getUser() }));
  }, []);

  if (!isLogged) {
    return (
      <Nav.Item active onSelect={() => handleLoginClick()}>
        Login with Discord
      </Nav.Item>
    );
  }

  return (
    <Dropdown
      title={user.username}
      placement="bottomEnd"
      icon={profileImage(user.avatar)}
      activeKey={page}
      onSelect={setPage}
    >
      <Dropdown.Item panel className={styles.user} eventKey={Pages.HOME}>
        <div>
          {profileImage(user.avatar)}
          {user.username}
        </div>
        {currency(user.gems)}
      </Dropdown.Item>
      <Dropdown.Item divider />
      <Dropdown.Item icon={<Icon icon="home" />} eventKey={Pages.HOME}>
        Home
      </Dropdown.Item>
      <Dropdown.Item icon={<Icon icon="people-group" />} eventKey={Pages.FRIENDS}>
        My Friends
      </Dropdown.Item>
      <Dropdown.Item icon={<Icon icon="shopping-bag" />} eventKey={Pages.MARKET}>
        My Listings
      </Dropdown.Item>
      <Dropdown.Item icon={<Icon icon="heart" />} eventKey={Pages.PETS}>
        My Pets
      </Dropdown.Item>
      <Dropdown.Item icon={<Icon icon="star" />} eventKey={Pages.PREMIUM}>
        Premium
      </Dropdown.Item>
      <Dropdown.Item divider />
      <Dropdown.Item icon={<Icon icon="sign-out" />} onSelect={handleLogoutClick}>
        Log Out
      </Dropdown.Item>
    </Dropdown>
  );
}
