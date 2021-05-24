/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  Panel, Placeholder, Button, Whisper,
} from 'rsuite';
import '../styles/usercard.less';
import userStore from '../stores/UserStore.js';
import itemStore from '../stores/ItemStore.js';
import ItemPopover from './ItemPopover.jsx';
import ListingModal from './ListingModal.jsx';

export default function ItemGrid({ inventory }) {
  const [user, setUser] = useState(userStore.getUser());
  const [loaded, setLoaded] = useState(itemStore.getLoaded());
  const listingState = useState(false);
  const isLogged = user !== null;

  useEffect(() => {
    userStore.on('change', () => {
      setUser({ ...userStore.getUser() });
    });
  }, []);

  useEffect(() => {
    itemStore.on('loaded', () => {
      setLoaded(true);
    });
  }, []);

  if (!isLogged || !loaded) {
    return (
      <Panel>
        <Placeholder.Graph active />
      </Panel>
    );
  }

  const renderItem = (id, index) => {
    const item = itemStore.get(id);
    return (
      <Whisper
        trigger="click"
        placement="auto"
        speaker={(
          <ItemPopover
            item={item}
            index={index}
            place={inventory ? 'inventory' : 'castle'}
            listingState={listingState}
            sell
          />
        )}
      >
        <Button appearance="subtle" style={{ padding: '10%' }}>
          <img className="item" src={item.url} alt={item.name} />
        </Button>
      </Whisper>
    );
  };

  const userItems = inventory ? user.items.inventory : user.items.castle;

  return (
    <>
      <Panel shaded style={{ backgroundColor: '#1a1d24' }}>
        <div className="item-grid">{userItems.map((item, index) => renderItem(item, index))}</div>
      </Panel>
      <ListingModal listingState={listingState} />
    </>
  );
}
