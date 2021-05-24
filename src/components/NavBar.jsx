import React from 'react';
import { Navbar, Nav } from 'rsuite';
import { Link } from 'react-router-dom';
import { brandImage } from '../utils.jsx';
import UserDropdown from './UserDropdown.jsx';
import '../styles/nav.less';

export default function NavBar() {
  return (
    <Navbar style={{ paddingLeft: '5%', paddingRight: '5%' }}>
      <Navbar.Header className="navbar-brand">
        {brandImage()}
        <b>CastleMania</b>
      </Navbar.Header>
      <Navbar.Body>
        <Nav pullRight>
          <Link to="/">
            <Nav.Item>Home</Nav.Item>
          </Link>
          <Link to="/premium">
            <Nav.Item>Premium</Nav.Item>
          </Link>
          <Link to="/marketplace">
            <Nav.Item>Marketplace</Nav.Item>
          </Link>
          <UserDropdown />
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
}
