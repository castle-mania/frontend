/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Panel, Icon, IconButton, Whisper, Tooltip, Placeholder,
} from 'rsuite';
import { setColor, sort } from '../../actions/UserActions.js';
import ColorPicker from '../color-picker/ColorPicker.jsx';
import styles from '../../styles/usercard.module.less';
import { currency } from '../../utils.jsx';
import userStore from '../../stores/UserStore.js';

export default function Card({ user }) {
  if (!user) {
    return (
      <Panel bodyFill className={styles.usercardPanel}>
        <div className={styles.usercardTop}>
          <Placeholder.Graph active width={100} height={100} className={styles.userImage} />
          <Placeholder.Graph active width="50%" height={100} className={styles.placeholder} />
        </div>
        <div className={styles.usercardButtons} style={{ backgroundColor: '#5865F2' }} />
      </Panel>
    );
  }

  return (
    <Panel bodyFill className={styles.usercardPanel}>
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
                <IconButton icon={<Icon icon="star" />} />
              </Whisper>
              <ColorPicker
                onChange={(value) => setColor(parseInt(value.hex.replace('#', '0x'), 16))}
                color={user.color}
              />
              <Whisper trigger="hover" placement="bottom" speaker={<Tooltip>Listings</Tooltip>}>
                <IconButton icon={<Icon icon="cart-plus" />}>Listings</IconButton>
              </Whisper>
              <Whisper trigger="hover" placement="bottom" speaker={<Tooltip>Sort Items</Tooltip>}>
                <IconButton onClick={sort} icon={<Icon icon="refresh" />}>
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
