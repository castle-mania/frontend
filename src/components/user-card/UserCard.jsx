/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Panel, Icon, IconButton, Whisper, Tooltip, Placeholder,
} from 'rsuite';
import { setColor, sortItems } from '../../actions/UserActions.js';
import ColorPicker from '../color-picker/ColorPicker.jsx';
import styles from '../../styles/usercard.module.less';
import { currency } from '../../utils.jsx';
import userStore from '../../stores/UserStore.js';

export default function Card({ user }) {
  if (!user) {
    return (
      <Panel shaded bodyFill className={styles.usercardPanel}>
        <Placeholder.Graph active />
      </Panel>
    );
  }

  return (
    <Panel shaded bodyFill className={styles.usercardPanel}>
      <div className={styles.usercardTop}>
        <img src={user.avatar} alt={user.username} className={styles.userImage} />
        <div>
          <h1>{user.username}</h1>
          <p>{currency(user.gems.toFixed(2))}</p>
        </div>
      </div>
      <div
        className={styles.usercardButtons}
        style={{ backgroundColor: `#${user.color.toString(16)}` }}
      >
        <div className={styles.left}>
          {userStore.isAuth(user) && (
            <>
              <Whisper trigger="hover" placement="bottom" speaker={<Tooltip>Premium</Tooltip>}>
                <IconButton onClick={sortItems} icon={<Icon icon="star" />} />
              </Whisper>
              <ColorPicker
                onChange={(value) => setColor(parseInt(value.hex.replace('#', '0x'), 16))}
                color={user.color}
              />
              <Whisper trigger="hover" placement="bottom" speaker={<Tooltip>Listings</Tooltip>}>
                <IconButton icon={<Icon icon="cart-plus" />}>Listings</IconButton>
              </Whisper>
              <Whisper trigger="hover" placement="bottom" speaker={<Tooltip>Sort Items</Tooltip>}>
                <IconButton onClick={sortItems} icon={<Icon icon="refresh" />}>
                  Sort
                </IconButton>
              </Whisper>
            </>
          )}
        </div>
      </div>
    </Panel>
  );
}
