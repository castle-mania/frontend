import React from 'react';
import UserCard from '../components/UserCard.jsx';
import Store from '../components/Store.jsx';
import ItemGrid from '../components/ItemGrid.jsx';

import '../styles/landing.less';

export default function Landing() {
  return (
    <>
      <div className="landing-main">
        <div className="landing-user">
          <div className="user-card">
            <UserCard />
          </div>
          <div className="items-grid">
            <ItemGrid />
            <ItemGrid inventory />
          </div>
        </div>
        <div className="landing-right-sidebar">
          <Store />
        </div>
      </div>
    </>
  );
}
