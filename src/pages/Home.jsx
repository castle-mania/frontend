import React from 'react';
import UserCard from '../components/UserCard.jsx';
import ItemGrid from '../components/ItemGrid.jsx';
import styles from '../styles/landing.module.less';
import KingdomCard from '../components/KingdomCard.jsx';
import { useUserState } from '../stores/UserStore.js';

export default function Home() {
  const [user] = useUserState();

  return (
    <div className={styles.landingMain}>
      <div className={styles.landingUser}>
        <div className={styles.userCard}>
          <UserCard user={user} />
        </div>
        <div className={styles.itemGrid}>
          <ItemGrid user={user} />
          <ItemGrid user={user} isInventory />
        </div>
        {user.kingdom !== null && <KingdomCard id={user.kingdom} />}
      </div>
    </div>
  );
}
