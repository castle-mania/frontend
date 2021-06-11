/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Panel } from 'rsuite';
import '../styles/usercard.less';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import userStore from '../stores/UserStore.js';
import itemStore from '../stores/ItemStore.js';
import styles from '../styles/item.module.less';
import { setCastle, setInventory } from '../actions/UserActions.js';

const SortableItem = SortableElement((props) => {
  const { value, ...restProps } = props;
  const item = itemStore.get(value);
  return (
    <div {...restProps}>
      <img src={item.url} className={styles.item} alt={item.name} />
    </div>
  );
});

const SortableList = SortableContainer((props) => {
  const { items, ...restProps } = props;

  return (
    <Panel shaded className={styles.panel}>
      <div className={styles.items}>
        {Object.entries(items).map(([key, item], index) => (
          <SortableItem key={key} index={index} value={item} {...restProps} />
        ))}
      </div>
    </Panel>
  );
});

export default function ItemGrid({ isInventory }) {
  const [inventory, setInventoryState] = useState(userStore.getInventory());
  const [castle, setCastleState] = useState(userStore.getCastle());
  const [loaded, setLoaded] = useState(itemStore.getLoaded());

  useEffect(() => {
    userStore.on('change', () => {
      setInventory(userStore.getInventory());
      setCastle(userStore.getCastle());
    });
  }, []);

  useEffect(() => {
    itemStore.on('loaded', () => {
      setLoaded(true);
    });
  }, []);

  if (!loaded) return null;

  const userItems = isInventory ? inventory : castle;

  function onSortEnd({ oldIndex, newIndex }) {
    document.body.style.cursor = 'default';
    const newItems = {};
    for (const [key, value] of arrayMove(Object.entries(userItems), oldIndex, newIndex)) {
      newItems[key] = value;
    }
    if (isInventory) {
      setInventory(newItems);
      setInventoryState(newItems);
    } else {
      setCastle(newItems);
      setCastleState(newItems);
    }
  }

  return (
    <SortableList
      axis="xy"
      items={userItems}
      helperClass={styles.sortableHelper}
      onSortEnd={onSortEnd}
      onSortStart={() => {
        document.body.style.cursor = 'grabbing';
      }}
    />
  );
}
