/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Popover, Button, Panel } from 'rsuite';
import { buyItem, sellItemByIndex } from '../actions/UserActions.js';
import { currency } from '../utils.jsx';

export default function ItemPopover(props) {
  const {
    item, sell, place, index, buy, listingState = [null, () => {}],
  } = props;
  const [open, setOpen] = listingState;
  const listing = open !== null;

  if (item.short === 'slot') return null;

  return (
    <Popover {...props}>
      <div className="item-popover-buttons">
        {buy && (
          <div>
            <Button style={{ width: '100%' }} appearance="primary" onClick={() => buyItem(item)}>
              Buy for
              {' '}
              {item.cost}
              {' '}
              Gems
            </Button>
          </div>
        )}
        {sell && (
          <div>
            <Button
              appearance="primary"
              style={{ width: '100%' }}
              onClick={() => sellItemByIndex(item, place, index)}
            >
              Sell for
              {' '}
              {item.sell}
              {' '}
              Gems
            </Button>
          </div>
        )}
        {listing && (
          <div>
            <Button appearance="ghost" style={{ width: '100%' }} onClick={() => setOpen(true)}>
              Create Listing
            </Button>
          </div>
        )}
      </div>
      <Panel className="item-popover-info" bordered style={{ marginTop: 10 }}>
        <h2>{item.name}</h2>
        <b>{currency(item.cost)}</b>
      </Panel>
    </Popover>
  );
}
