import React, { useEffect, useState } from 'react';
import { Panel, Placeholder } from 'rsuite';
import { Link } from 'react-router-dom';
import styles from '../styles/usercard.module.less';
import api from '../request.js';
import { currency } from '../utils.jsx';

export default function KingdomCard({ id }) {
  const [kingdom, setKingdom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .GET(`/kingdom/${id}`)
      .then((res) => {
        setKingdom(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Panel shaded bodyFill className={styles.kingdomCard}>
        <Placeholder.Graph active height={200} className={styles.placeholder} />
      </Panel>
    );
  }

  return (
    <Panel shaded className={styles.kingdomCard}>
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
    </Panel>
  );
}
