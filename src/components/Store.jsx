/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import {
  Panel,
  InputGroup,
  AutoComplete,
  Button,
  Placeholder,
  IconButton,
  Icon,
  Whisper,
} from 'rsuite';
import api from '../request.js';
import { currency } from '../utils.jsx';
import '../styles/shop.less';
import { buyItem } from '../actions/UserActions.js';
import ItemPopover from './ItemPopover.jsx';

function renderItem(item) {
  return (
    <Panel bodyFill>
      <div className="item-panel">
        <div>
          <h2>{item.name}</h2>
          <p style={{ marginTop: 0 }}>{currency(item.cost)}</p>
          <div className="item-buttons">
            <Button appearance="primary" style={{ width: 100 }} onClick={() => buyItem(item)}>
              Purchase
            </Button>
            <Whisper trigger="click" speaker={<ItemPopover buy item={item} />}>
              <IconButton icon={<Icon icon="info-circle" />} />
            </Whisper>
          </div>
        </div>
        <div className="item-image">
          <img src={item.url} alt={item.name} />
        </div>
      </div>
    </Panel>
  );
}

function Search({ value, onChange, autocomplete }) {
  return (
    <InputGroup>
      <AutoComplete
        value={value}
        data={autocomplete}
        onChange={(newValue) => onChange(newValue)}
        placeholder="Search for an item..."
      />
    </InputGroup>
  );
}

export default function Store() {
  const HEIGHT = 500;
  const [req, setReq] = useState({
    loading: true,
    error: false,
    items: [],
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    api
      .GET('/items')
      .then((res) => {
        setReq({
          loading: false,
          items: res.data.items,
        });
      })
      .catch(() => {
        setReq({
          loading: false,
          error: true,
        });
      });
  }, []);

  const { loading, error } = req;

  if (loading) {
    return (
      <Panel bodyFill style={{ height: HEIGHT }}>
        <Placeholder.Graph active style={{ height: HEIGHT }} />
      </Panel>
    );
  }

  if (error) {
    return <Panel />;
  }

  const items = req.items.filter((item) => item.buyable);

  return (
    <Panel
      shaded
      style={{
        backgroundColor: '#1a1d24',
      }}
    >
      <Search
        autocomplete={items.map((item) => item.name)}
        value={search}
        onChange={(value) => setSearch(value)}
      />
      <br />
      <div className="item-group">
        <div className="items">
          {items
            .filter((item) => item.name.toLowerCase().includes(search))
            .map((item) => renderItem(item))}
        </div>
      </div>
    </Panel>
  );
}
