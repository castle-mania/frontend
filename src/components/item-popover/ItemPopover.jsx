/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Popover, IconButton, Icon, Divider,
} from 'rsuite';
import {
  buyItem, sellItemByIndex, unbox, moveItem,
} from '../../actions/UserActions.js';
import styles from '../../styles/popover.module.less';

export default function ItemPopover(props) {
  const {
    item, place, index, auth,
  } = props;
  const buttons = [];

  if (item.buyable) {
    buttons.push(
      <IconButton onClick={() => buyItem(item)} icon={<Icon icon="shopping-cart" />}>
        <div className={styles.button}>Buy Another</div>
      </IconButton>,
    );
  }

  if (item.sellable) {
    buttons.push(
      <IconButton
        icon={<Icon icon="money" />}
        className={styles.button}
        onClick={() => sellItemByIndex(item, place, index)}
      >
        <div className={styles.button}>Sell</div>
      </IconButton>,
    );
  }

  if (item.type === 'lootbox') {
    buttons.push(
      <IconButton
        icon={<Icon icon="gift" />}
        className={styles.button}
        onClick={() => {
          unbox(place, index);
        }}
      >
        <div className={styles.button}>Unbox this</div>
      </IconButton>,
    );
  }

  if (item.movable) {
    buttons.push(
      <IconButton
        icon={<Icon icon="exchange" />}
        className={styles.button}
        onClick={() => {
          moveItem(place, index);
        }}
      >
        <div className={styles.button}>Swap</div>
      </IconButton>,
    );
  }

  if (buttons.length === 0) return null;

  return (
    <Popover {...props}>
      <h2>{item.name}</h2>
      <p>{`${item.gpm} Gems Per Minute`}</p>
      {auth && (
        <>
          <Divider />
          <div className={styles.popover}>{buttons}</div>
        </>
      )}
    </Popover>
  );
}
