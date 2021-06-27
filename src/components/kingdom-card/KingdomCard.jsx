import React from 'react';
import { Panel, Button } from 'rsuite';
import { Link } from 'react-router-dom';
import styles from '../../styles/usercard.module.less';
import { currency } from '../../utils.jsx';
import kingdomStore, { useKingdomState } from '../../stores/KingdomStore.js';
import { useUserState } from '../../stores/UserStore.js';

export default function KingdomCard({ user }) {
  if (!user) {
    return <Panel bodyFill className={styles.kingdomCard} />;
  }

  const { kingdom: id } = user;
  const [kingdom] = useKingdomState({ id });
  const [temp] = useUserState();

  if (!kingdom) {
    return <Panel bodyFill className={styles.kingdomCard} />;
  }

  const isMember = kingdomStore.hasMember(id, temp.id);

  return (
    <Panel className={styles.kingdomCard}>
      <div className={styles.card}>
        <div className={styles.body}>
          <div>
            <h1>{kingdom.name}</h1>
            <p>{currency(kingdom.gems.toFixed(2))}</p>
          </div>
          <div className={styles.avatars}>
            {kingdom.members
              .map((member, i) => (
                <Link
                  to={`/profile/${member.id}`}
                  className={styles.avatar}
                  style={{ marginLeft: -16 * i }}
                  key={member.id}
                >
                  <img src={member.avatar} alt={member.username} />
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
