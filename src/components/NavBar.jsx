import React, { useState } from 'react';
import { Navbar, Nav, Icon } from 'rsuite';
import { Link } from 'react-router-dom';
import { brandImage } from '../utils.jsx';
import UserDropdown from './UserDropdown.jsx';
import styles from '../styles/nav.module.less';

export const Pages = {
  HOME: 0,
  MARKET: 1,
  PREMIUM: 2,
  LOOT: 3,
};

export default function NavBar() {
  const [page, setPage] = useState(Pages.HOME);

  return (
    <Navbar className={styles.nav} appearance="subtle">
      <Navbar.Header className={styles.navbarBrand}>
        {brandImage()}
        <b>CastleMania</b>
      </Navbar.Header>
      <Navbar.Body>
        <Nav pullRight activeKey={page} onSelect={setPage}>
          <Nav.Item eventKey={Pages.HOME} icon={<Icon icon="home" />}>
            Home
          </Nav.Item>
          <Nav.Item eventKey={Pages.MARKET} icon={<Icon icon="shopping-bag" />}>
            Marketplace
          </Nav.Item>
          <Nav.Item eventKey={Pages.PREMIUM} icon={<Icon icon="star" />}>
            Premium
          </Nav.Item>
          <UserDropdown />
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
}
