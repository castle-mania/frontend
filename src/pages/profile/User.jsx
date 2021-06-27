import React from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '../../components/user-card/UserCard.jsx';
import styles from './styles.module.less';
import { useUserState } from '../../stores/UserStore.js';
import ItemGrid from '../../components/item-grid/ItemGrid.jsx';
import KingdomCard from '../../components/kingdom-card/KingdomCard.jsx';

export default function Profile() {
  const { discordId } = useParams();
  const [user] = useUserState(discordId);

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
