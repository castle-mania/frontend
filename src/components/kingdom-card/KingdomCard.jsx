import React from 'react';
import { Panel, Placeholder, Button } from 'rsuite';
import { Link } from 'react-router-dom';
import styles from '../../styles/usercard.module.less';
import { currency } from '../../utils.jsx';
import kingdomStore, { useKingdomState } from '../../stores/KingdomStore.js';
import { useUserState } from '../../stores/UserStore.js';

export default function KingdomCard({ id }) {
  const [kingdom] = useKingdomState({ id });
  const [temp] = useUserState();

  if (!kingdom) {
    return (
      <Panel shaded bodyFill className={styles.kingdomCard}>
        <Placeholder.Graph active height={200} className={styles.placeholder} />
      </Panel>
    );
  }

  const isMember = kingdomStore.hasMember(id, temp.id);

  return (
    <Panel shaded className={styles.kingdomCard}>
      <div className={styles.card}>
        <div className={styles.body}>
          <div>
            <h1>{kingdom.name}</h1>
            <p>{currency(kingdom.gems.toFixed(2))}</p>
          </div>
          <div className={styles.avatars}>
            {kingdom.members
              .map((user, i) => (
                <Link
                  to={`/profile/${user.id}`}
                  className={styles.avatar}
                  style={{ marginLeft: -16 * i }}
                  key={user.id}
                >
                  <img src={user.avatar} alt={user.username} />
                </Link>
              ))
              .splice(0, 5)}
          </div>
        </div>
        <div className={styles.buttons}>
          {!isMember ? (
            <Button appearance="primary" disabled={kingdom.closed}>
              Join
            </Button>
          ) : (
            <Button disabled={kingdom.closed}>Leave</Button>
          )}
        </div>
      </div>
    </Panel>
  );
}
