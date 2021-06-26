/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import {
  Panel, InputGroup, AutoComplete, Button, Placeholder, Icon,
} from 'rsuite';
import api from '../../request.js';
import { currency } from '../../utils.jsx';
import { buyItem } from '../../actions/UserActions.js';
import styles from '../../styles/shop.module.less';

function renderItem(item) {
  return (
    <Panel bodyFill key={item.name}>
      <div className={styles.itemPanel}>
        <div>
          <h2>{item.name}</h2>
          <p style={{ marginTop: 0 }}>{currency(item.cost)}</p>
          <div className={styles.itemButtons}>
            <Button appearance="primary" style={{ width: 100 }} onClick={() => buyItem(item)}>
              Purchase
            </Button>
          </div>
        </div>
        <div className={styles.itemImage}>
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
      <InputGroup.Addon>
        <Icon icon="search" />
      </InputGroup.Addon>
    </InputGroup>
  );
}

export default function Store() {
  const HEIGHT = 636;
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
    <Panel shaded className={styles.panel}>
      <Search
        autocomplete={items.map((item) => item.name)}
        value={search}
        onChange={(value) => setSearch(value)}
      />
      <br />
      <div className={styles.itemGroup}>
        <div className={styles.items}>
          {items
            .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
            .map((item) => renderItem(item))}
        </div>
      </div>
    </Panel>
  );
}
