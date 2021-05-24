import { EventEmitter } from 'events';
import api from '../request.js';

class Items extends EventEmitter {
  constructor() {
    super();
    this.items = [];

    this.fetchItems();
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
    this.emit('loaded');
  }
}

const itemStore = new Items();
export default itemStore;
