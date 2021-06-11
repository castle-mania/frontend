/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Popover, Button, Icon } from 'rsuite';
import {
  buyItem, sellItemByIndex, unbox, moveItem,
} from '../actions/UserActions.js';
import styles from '../styles/popover.module.less';

export default function ItemPopover(props) {
  const {
    item, sellable, place, index, buyable, unboxable, moveable,
  } = props;

  const buttons = [];

  if (buyable === 1) {
    buttons.push(
      <Button appearance="primary" onClick={() => buyItem(item)}>
        <div className={styles.button}>
          <Icon icon="shopping-cart" />
          {item.cost}
        </div>
      </Button>,
    );
  }

  if (sellable === 1) {
    buttons.push(
      <Button
        appearance="primary"
        color="red"
        className={styles.button}
        onClick={() => sellItemByIndex(item, place, index)}
      >
        <div className={styles.button}>
          <Icon icon="money" />
          {item.sell}
        </div>
      </Button>,
    );
  }

  if (unboxable === 1) {
    <Button
      appearance="primary"
      className={styles.button}
      onClick={() => {
        unbox(place, index);
      }}
    >
      <div className={styles.button}>
        <Icon icon="gift" />
        Unbox
      </div>
    </Button>;
  }

  if (moveable === 1) {
    buttons.push(
      <Button
        color="blue"
        className={styles.button}
        onClick={() => {
          moveItem(place, index);
        }}
      >
        <div className={styles.button}>
          <Icon icon="exchange" />
          Move
        </div>
      </Button>,
    );
  }

  if (buttons.length === 0) return null;

  return (
    <Popover {...props}>
      <div className={styles.popover}>{buttons}</div>
    </Popover>
  );
}
