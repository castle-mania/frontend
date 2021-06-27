import React, { useState, useEffect } from 'react';
import { Navbar, Icon } from 'rsuite';
import Nav from '@rsuite/responsive-nav';
import { useHistory } from 'react-router-dom';

import { brandImage } from '../../utils.jsx';
import styles from './styles.module.less';
import { getCurrent, Pages, Paths } from '../../pages.js';
import UserDropdown from './UserDropdown.jsx';

export default function NavBar() {
  const history = useHistory();
  const [page, setPage] = useState(getCurrent());
  const [appearance, setAppearance] = useState('subtle');

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset === 0) setAppearance('subtle');
      else setAppearance('default');
    };
  }, []);

  return (
    <Navbar className={styles.nav} appearance={appearance}>
      <Navbar.Header className={styles.navbarBrand}>
        {brandImage()}
        <b>CastleMania</b>
      </Navbar.Header>
      <Navbar.Body>
        <Nav pullRight>
          <UserDropdown page={page} setPage={setPage} />
        </Nav>
        <span className={styles.full}>
          <Nav pullRight activeKey={page} onSelect={setPage}>
            <Nav.Item
              eventKey={Pages.HOME}
              icon={<Icon icon="home" />}
              onSelect={() => history.push(Paths[Pages.HOME])}
            >
              Profile
            </Nav.Item>
            <Nav.Item
              eventKey={Pages.MARKET}
              icon={<Icon icon="shopping-bag" />}
              onSelect={() => history.push(Paths[Pages.MARKET])}
            >
              Marketplace
            </Nav.Item>
            <Nav.Item
              eventKey={Pages.COMMANDS}
              icon={<Icon icon="cog" />}
              onSelect={() => history.push(Paths[Pages.COMMANDS])}
            >
              Commands
            </Nav.Item>
            <Nav.Item
              eventKey={Pages.PREMIUM}
              icon={<Icon icon="star" />}
              onSelect={() => history.push(Paths[Pages.PREMIUM])}
            >
              Premium
            </Nav.Item>
          </Nav>
        </span>
      </Navbar.Body>
    </Navbar>
  );
}
