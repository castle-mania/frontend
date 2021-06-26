import { EventEmitter } from 'events';
import { useEffect, useState } from 'react';
import api from '../request.js';

class Items extends EventEmitter {
  constructor() {
    super();
    this.items = [];
    this.loaded = false;

    this.fetchItems();
  }

  isLoaded() {
    return this.loaded;
  }

  getItems() {
    return this.items;
  }

  getLoaded() {
    return this.items.length > 0;
  }

  get(id) {
    return this.items.find((item) => parseInt(item.key, 10) === id);
  }

  async fetchItems() {
    const res = await api.GET('/items');
    this.items = res.data.items;
    this.loaded = true;
    this.emit('loaded');
  }
}

const itemStore = new Items();

export function useItemsState() {
  const [item, setItems] = useState(itemStore.getItems());

  useEffect(() => {
    const setValue = (value) => {
      setItems(value);
    };

    itemStore.on('loaded', setValue);

    return () => {
      itemStore.off('loaded', setValue);
    };
  }, []);

  return [item, setItems];
}

export default itemStore;
