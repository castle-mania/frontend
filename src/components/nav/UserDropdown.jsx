import React, { useState, useEffect } from 'react';
import { Dropdown, Icon, Nav } from 'rsuite';
import { useHistory } from 'react-router-dom';
import userStore, { useUserState } from '../../stores/UserStore.js';
import { currency, profileImage } from '../../utils.jsx';
import { handleLogoutClick, handleLoginClick } from '../../login.js';
import styles from './styles.module.less';
import { Pages, Paths } from '../../pages.js';

export default function userDropdown({ page, setPage }) {
  const history = useHistory();
  const [user] = useUserState();

  if (!userStore.isLogged()) {
    return (
      <Nav.Item active onSelect={() => handleLoginClick()}>
        Login with Discord
      </Nav.Item>
    );
  }

  return (
    <Dropdown title={user.username} placement="bottomEnd" activeKey={page} onSelect={setPage}>
      <Dropdown.Item panel className={styles.user} eventKey={Pages.HOME}>
        <div>
          {profileImage(user.avatar)}
          {user.username}
        </div>
        {currency(user.gems)}
      </Dropdown.Item>
      <Dropdown.Item divider />
      <Dropdown.Item
        icon={<Icon icon="home" />}
        eventKey={Pages.HOME}
        onSelect={() => history.push(Paths[Pages.HOME])}
      >
        Home
      </Dropdown.Item>
      {user.kingdom !== null && (
        <Dropdown.Item
          icon={<Icon icon="home" />}
          eventKey={Pages.KINGDOM}
          onSelect={() => history.push(`${Paths[Pages.KINGDOM]}?id=${user.kingdom}`)}
        >
          My Kingdom
        </Dropdown.Item>
      )}
      <Dropdown.Item
        icon={<Icon icon="people-group" />}
        eventKey={Pages.FRIENDS}
        onSelect={() => history.push(Paths[Pages.FRIENDS])}
      >
        My Friends
      </Dropdown.Item>
      <Dropdown.Item
        icon={<Icon icon="shopping-bag" />}
        eventKey={Pages.MARKET}
        onSelect={() => history.push(Paths[Pages.MARKET])}
      >
        My Listings
      </Dropdown.Item>
      <Dropdown.Item
        icon={<Icon icon="heart" />}
        eventKey={Pages.PETS}
        onSelect={() => history.push(Paths[Pages.PETS])}
      >
        My Pets
      </Dropdown.Item>
      <Dropdown.Item
        icon={<Icon icon="star" />}
        eventKey={Pages.PREMIUM}
        onSelect={() => history.push(Paths[Pages.PREMIUM])}
      >
        Premium
      </Dropdown.Item>
      <Dropdown.Item divider />
      <Dropdown.Item icon={<Icon icon="sign-out" />} onSelect={handleLogoutClick}>
        Log Out
      </Dropdown.Item>
    </Dropdown>
  );
}
