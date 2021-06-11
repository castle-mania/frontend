/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  Panel, Placeholder, Icon, IconButton, Whisper, Tooltip,
} from 'rsuite';
import { setColor } from '../actions/UserActions.js';
import ColorPicker from './ColorPicker.jsx';
import '../styles/usercard.less';
import { currency } from '../utils.jsx';
import userStore from '../stores/UserStore.js';

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
    <Panel
      shaded
      bodyFill
      style={{
        backgroundColor: '#1a1d24',
      }}
    >
      <div className="usercard-top">
        <img src={user.avatar} alt={user.username} style={{ borderRadius: 50, width: 100 }} />
        <div className="name">
          <h1>{user.username}</h1>
          <p>{currency(user.gems.toFixed(2))}</p>
        </div>
      </div>
      <div className="usercard-buttons" style={{ backgroundColor: `#${user.color.toString(16)}` }}>
        <Whisper trigger="hover" placement="bottom" speaker={<Tooltip>Profile</Tooltip>}>
          <IconButton icon={<Icon icon="home" />} />
        </Whisper>
        <ColorPicker
          onChange={(value) => setColor(parseInt(value.hex.replace('#', '0x'), 16))}
          color={user.color}
        />
        <Whisper trigger="hover" placement="bottom" speaker={<Tooltip>Lootboxes</Tooltip>}>
          <IconButton icon={<Icon icon="gift" />} />
        </Whisper>
        <Whisper trigger="hover" placement="bottom" speaker={<Tooltip>Listings</Tooltip>}>
          <IconButton icon={<Icon icon="cart-plus" />} />
        </Whisper>
      </div>
    </Panel>
  );
}
