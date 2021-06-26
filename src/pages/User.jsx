import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import UserCard from '../components/UserCard.jsx';
import styles from '../styles/landing.module.less';
import api from '../request.js';
import { useUserState } from '../stores/UserStore.js';
import ItemGrid from '../components/ItemGrid.jsx';
import KingdomCard from '../components/KingdomCard.jsx';

export default function Profile() {
  const history = useHistory();
  const [user] = useUserState();
  const [target, setTarget] = useState(null);
  const { discordId } = useParams();

  useEffect(() => {
    api
      .GET(`/user/${discordId}`)
      .then((res) => {
        setTarget(res.data);
      })
      .catch(() => {
        history.push('/');
      });
  }, []);

  if (user !== null && user.discordId === discordId) {
    history.push('/profile');
  }

  if (!target) return null;

  return (
    <div className={styles.landingMain}>
      <div className={styles.landingUser}>
        <div className={styles.userCard}>
          <UserCard user={target} />
        </div>
        <div className={styles.itemGrid}>
          <ItemGrid user={target} />
          <ItemGrid user={target} isInventory />
        </div>
        {user.kingdom !== null && <KingdomCard id={target.kingdom} />}
      </div>
    </div>
  );
}
