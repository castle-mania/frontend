/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Panel, Whisper } from 'rsuite';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import userStore from '../stores/UserStore.js';
import itemStore from '../stores/ItemStore.js';
import styles from '../styles/item.module.less';
import { setCastle, setInventory } from '../actions/UserActions.js';
import ItemPopover from './ItemPopover.jsx';

export default function ItemGrid({ isInventory }) {
  const getItems = () => (isInventory ? userStore.getInventory() : userStore.getCastle());
  const setItems = isInventory ? setInventory : setCastle;
  const [loaded, setLoaded] = useState(itemStore.getLoaded());
  const [items, setItemsState] = useState(getItems());

  function updateItems(newItems) {
    setItemsState(newItems || getItems());
    if (newItems) setItems(newItems);
  }

  useEffect(() => {
    userStore.on('change', updateItems);
    itemStore.on('loaded', () => setLoaded(true));
  }, []);

  if (!loaded) return null;

  const SortableItem = SortableElement((props) => {
    const { value } = props;
    const [index, itemId] = value;
    const item = itemStore.get(itemId);
    return (
      <div {...props}>
        <Whisper
          enterable
          trigger="hover"
          placement="auto"
          delay={400}
          speaker={
            <ItemPopover index={index} item={item} place={isInventory ? 'inventory' : 'castle'} />
          }
        >
          <img src={item.url} className={styles.item} alt={item.name} />
        </Whisper>
      </div>
    );
  });

  const SortableList = SortableContainer((props) => {
    const { ...restProps } = props;

    return (
      <Panel shaded className={styles.panel}>
        <div className={styles.items}>
          {Object.entries(items).map(([key, item], index) => (
            <SortableItem key={key} index={index} value={[index, item]} {...restProps} />
          ))}
        </div>
      </Panel>
    );
  });

  function onSortEnd({ oldIndex, newIndex }) {
    document.body.style.cursor = 'default';
    const newItems = {};
    for (const [key, value] of arrayMove(Object.entries(items), oldIndex, newIndex)) {
      newItems[key] = value;
    }
    updateItems(newItems);
  }

  return (
    <SortableList
      axis="xy"
      items={items}
      helperClass={styles.sortableHelper}
      onSortEnd={onSortEnd}
      onSortStart={() => {
        document.body.style.cursor = 'grabbing';
      }}
    />
  );
}
