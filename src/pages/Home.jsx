import React from 'react';
import UserCard from '../components/UserCard.jsx';
import Store from '../components/Store.jsx';
import ItemGrid from '../components/ItemGrid.jsx';
import styles from '../styles/landing.module.less';

export default function Home() {
  return (
    <div className={styles.landingMain}>
      <div className={styles.landingUser}>
        <div className={styles.userCard}>
          <UserCard />
        </div>
        <div className={styles.itemGrid}>
          <ItemGrid />
          <ItemGrid isInventory />
        </div>
      </div>
    </div>
  );
}
