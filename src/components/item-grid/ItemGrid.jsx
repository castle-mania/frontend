import React, { useState, useEffect } from 'react';
import { Panel, Whisper } from 'rsuite';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import uuid from 'uuid/v4';
import itemStore from '../../stores/ItemStore.js';
import styles from '../../styles/item.module.less';
import ItemPopover from '../item-popover/ItemPopover.jsx';
import userStore from '../../stores/UserStore.js';

export default function ItemGrid({ user, isInventory }) {
  const [loaded, setLoaded] = useState(itemStore.isLoaded());
  const itemKey = isInventory ? 'inventory' : 'castle';

  useEffect(() => {
    itemStore.on('loaded', () => setLoaded(true));
  }, []);

  if (!user || !loaded) {
    return <Panel className={styles.panel} />;
  }

  const items = user.items[itemKey];
  const auth = userStore.isAuth(user);

  const SortableItem = SortableElement((props) => {
    const { itemId, index, ...restProps } = props;
    const item = itemStore.get(itemId);

    return (
      <div {...restProps}>
        <Whisper
          enterable
          trigger="hover"
          placement="auto"
          delay={300}
          speaker={(
            <ItemPopover
              index={index}
              item={item}
              auth={auth}
              place={isInventory ? 'inventory' : 'castle'}
            />
          )}
        >
          <img src={item.url} className={styles.item} alt={item.name} />
        </Whisper>
      </div>
    );
  });

  const SortableList = SortableContainer((props) => {
    const { items: userItems, ...restProps } = props;

    return (
      <Panel className={styles.panel}>
        <div className={styles.items}>
          {userItems.map((item, index) => (
            <SortableItem
              disabled={!auth}
              key={uuid()}
              index={index}
              itemId={item}
              {...restProps}
            />
          ))}
        </div>
      </Panel>
    );
  });

  function onSortEnd({ oldIndex, newIndex }) {
    document.body.style.cursor = 'default';
    const grid = arrayMove(items, oldIndex, newIndex);
    return grid;
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
