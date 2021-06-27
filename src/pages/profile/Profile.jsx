import React from 'react';
import UserCard from '../../components/user-card/UserCard.jsx';
import ItemGrid from '../../components/item-grid/ItemGrid.jsx';
import styles from './styles.module.less';
import KingdomCard from '../../components/kingdom-card/KingdomCard.jsx';
import { useUserState } from '../../stores/UserStore.js';

export default function Home() {
  const [user] = useUserState();

  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <UserCard user={user} />
        <div className={styles.grids}>
          <ItemGrid user={user} />
          <ItemGrid user={user} isInventory />
        </div>
        <KingdomCard id={user?.kingdom} />
      </div>
    </div>
  );
}
