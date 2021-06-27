import React from 'react';
import {
  Popover, IconButton, Icon, Divider,
} from 'rsuite';
import {
  buy, move, sell, unbox,
} from '../../actions/UserActions.js';

import styles from '../../styles/popover.module.less';

export default function ItemPopover({
  item, place, index, auth, ...restProps
}) {
  const buttons = [];

  if (item.buyable) {
    buttons.push(
      <IconButton
        key="buy"
        onClick={() => buy({ key: item.key })}
        icon={<Icon icon="shopping-cart" />}
      >
        <div className={styles.button}>Buy Another</div>
      </IconButton>,
    );
  }

  if (item.sellable) {
    buttons.push(
      <IconButton
        key="sell"
        icon={<Icon icon="money" />}
        className={styles.button}
        onClick={() => sell({
          inventory: place,
          index,
        })}
      >
        <div className={styles.button}>Sell</div>
      </IconButton>,
    );
  }

  if (item.type === 'lootbox') {
    buttons.push(
      <IconButton
        key="unbox"
        icon={<Icon icon="gift" />}
        className={styles.button}
        onClick={() => {
          unbox({
            inventory: place,
            index,
          });
        }}
      >
        <div className={styles.button}>Unbox this</div>
      </IconButton>,
    );
  }

  if (item.movable) {
    buttons.push(
      <IconButton
        key="move"
        icon={<Icon icon="exchange" />}
        className={styles.button}
        onClick={() => {
          move({
            inventory: place,
            index,
          });
        }}
      >
        <div className={styles.button}>Swap</div>
      </IconButton>,
    );
  }

  if (buttons.length === 0) return null;

  return (
    <Popover {...restProps}>
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
