import React from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '../components/user-card/UserCard.jsx';
import styles from '../styles/landing.module.less';
import { useUserState } from '../stores/UserStore.js';
import ItemGrid from '../components/item-grid/ItemGrid.jsx';
import KingdomCard from '../components/kingdom-card/KingdomCard.jsx';

export default function Profile() {
  const { discordId } = useParams();
  const [user] = useUserState(discordId);

  if (!user) return null;

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
