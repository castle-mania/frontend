import React, { useState } from 'react';
import { Navbar, Icon } from 'rsuite';
import Nav from '@rsuite/responsive-nav';
import { brandImage } from '../utils.jsx';
import styles from '../styles/nav.module.less';
import { Pages } from '../pages.js';
import UserDropdown from './UserDropdown.jsx';

export default function NavBar() {
  const [page, setPage] = useState(Pages.HOME);
  const [appearance, setAppearance] = useState('subtle');

  window.onscroll = () => {
    if (window.pageYOffset === 0) setAppearance('subtle');
    else setAppearance('default');
  };

  return (
    <Navbar className={styles.nav} appearance={appearance}>
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
          <Nav.Item eventKey={Pages.COMMANDS} icon={<Icon icon="cog" />}>
            Commands
          </Nav.Item>
          <Nav.Item eventKey={Pages.PREMIUM} icon={<Icon icon="star" />}>
            Premium
          </Nav.Item>
          <UserDropdown page={page} setPage={setPage} />
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
}
