import { EventEmitter } from 'events';
import { useEffect, useState } from 'react';
import uuid from 'uuid/v4';
import dispatcher from '../dispatcher.js';
import api from '../request.js';

class User extends EventEmitter {
  constructor() {
    super();
    this.authenticated = false;
    this.loggedIn = false;
    this.user = null;

    this.fetchUser();
    this.on('change', () => this.updateInventories());
  }

  isLogged() {
    return this.user !== null;
  }

  isUser({ discordId }) {
    if (!this.isLogged()) {
      return false;
    }

    return discordId === this.user.discordId;
  }

  getUser() {
    return this.user;
  }

  updateInventories() {
    this.castle = {};
    for (const item of this.user.items.castle) {
      this.castle[uuid()] = item;
    }
    this.inventory = {};
    for (const item of this.user.items.inventory) {
      this.inventory[uuid()] = item;
    }
  }

  async sortItems() {
    const newItems = {
      castle: Object.values(this.getCastle()).sort((a, b) => b - a),
      inventory: Object.values(this.getInventory()).sort((a, b) => b - a),
    };
    this.user.items = newItems;
    this.updateInventories();
    this.emit('change', this.user);
    await api.POST('/user/items', newItems);
  }

  getCastle() {
    return this.castle;
  }

  getInventory() {
    return this.inventory;
  }

  async fetchUser() {
    const response = await api.GET('/user');
    this.user = response.data;
    this.emit('change', this.user);
  }

  async setItems(place, items) {
    const newItems = Object.values(items);
    this.user.items[place] = newItems;
    this.emit('change', this.user);
    await api.POST('/user/items', { [place]: newItems });
  }

  async buyItem({ key }) {
    const res = await api.POST('/user/buy', { item: key, amount: 1 });
    this.user = res.data.user;
    this.emit('change', this.user);
  }

  async sellItem({ key }) {
    const res = await api.POST('/user/sell', { item: key, amount: 1 });
    this.user = res.data.user;
    this.emit('change', this.user);
  }

  async sellItemByIndex({ key }, place, index) {
    const res = await api.POST('/user/sellIndex', { item: key, place, index });
    this.user = res.data.user;
    this.emit('change', this.user);
  }

  async unbox(place, index) {
    const res = await api.POST('/user/unbox', { place, index });
    this.user = res.data.user;
    this.emit('change', this.user);
  }

  async move(place, index) {
    const res = await api.POST('/user/move', { place, index });
    this.user = res.data.user;
    this.emit('change', this.user);
  }

  async setColor(color) {
    this.user.color = color;
    this.emit('change', this.user);
    await api.POST('/user/color', { color });
  }

  handleActions(action) {
    switch (action.type) {
      case 'SET_COLOR':
        this.setColor(action.color);
        break;
      case 'BUY_ITEM':
        this.buyItem(action.item);
        break;
      case 'SELL_ITEM':
        this.sellItem(action.item);
        break;
      case 'SELL_ITEM_INDEX':
        this.sellItemByIndex(action.item, action.place, action.index);
        break;
      case 'UNBOX':
        this.unbox(action.place, action.index);
        break;
      case 'MOVE':
        this.move(action.place, action.index);
        break;
      case 'INVENTORY':
        this.setItems('inventory', action.items);
        break;
      case 'CASTLE':
        this.setItems('castle', action.items);
        break;
      case 'SORT':
        this.sortItems();
        break;
      default:
    }
  }
}

const userStore = new User();
dispatcher.register(userStore.handleActions.bind(userStore));
window.dispatcher = dispatcher;

export function useUserState() {
  const [user, setUser] = useState(userStore.getUser());

  useEffect(() => {
    userStore.on('change', () => setUser({ ...userStore.getUser() }));
  }, []);

  return [user, setUser];
}

export default userStore;
