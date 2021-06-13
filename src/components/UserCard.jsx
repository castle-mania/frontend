/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  Panel, Placeholder, Icon, IconButton, Whisper, Tooltip,
} from 'rsuite';
import { setColor, sortItems } from '../actions/UserActions.js';
import ColorPicker from './ColorPicker.jsx';
import styles from '../styles/usercard.module.less';
import { currency } from '../utils.jsx';
import userStore from '../stores/UserStore.js';
import itemStore from '../stores/ItemStore.js';

export default function Card() {
  const [user, setUser] = useState(userStore.getUser());
  const isLogged = user !== null;

  useEffect(() => {
    userStore.on('change', () => {
      setUser({ ...userStore.getUser() });
    });
  }, []);

  if (!isLogged) {
    return (
      <Panel shaded bodyFill style={{ height: 196 }}>
        <Placeholder.Graph active style={{ height: 196 }} />
      </Panel>
    );
  }

  return (
    <Panel shaded bodyFill className={styles.usercardPanel}>
      <div className={styles.usercardTop}>
        <img src={user.avatar} alt={user.username} style={{ borderRadius: 50, width: 100 }} />
        <div>
          <h1>{user.username}</h1>
          <p>{currency(user.gems.toFixed(2))}</p>
          <p className={styles.muted}>
            {`${user.items.castle.reduce((a, b) => a + itemStore.get(b).gpm, 0)} Gems Per Minute`}
          </p>
        </div>
      </div>
      <div
        className={styles.usercardButtons}
        style={{ backgroundColor: `#${user.color.toString(16)}` }}
      >
        <div className={styles.left}>
          <ColorPicker
            onChange={(value) => setColor(parseInt(value.hex.replace('#', '0x'), 16))}
            color={user.color}
          />
          <Whisper trigger="hover" placement="bottom" speaker={<Tooltip>Listings</Tooltip>}>
            <IconButton icon={<Icon icon="cart-plus" />} />
          </Whisper>
          <Whisper trigger="hover" placement="bottom" speaker={<Tooltip>Sort Items</Tooltip>}>
            <IconButton onClick={sortItems} icon={<Icon icon="refresh" />} />
          </Whisper>
        </div>
      </div>
    </Panel>
  );
}
