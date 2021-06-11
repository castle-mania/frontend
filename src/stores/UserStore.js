import { EventEmitter } from 'events';
import { Notification } from 'rsuite';
import uuid from 'uuid/v4';
import dispatcher from '../dispatcher.js';
import api from '../request.js';

class User extends EventEmitter {
  constructor() {
    super();
    this.authenticated = false;
    this.notLogged = false;
    this.user = null;

    this.fetchUser();

    this.on('change', () => this.updateInventories());
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

  getCastle() {
    return this.castle;
  }

  getInventory() {
    return this.inventory;
  }

  async setCastle(items) {
    this.user.items.castle = items;
    await api.POST('/user/castle', { items });
  }

  async setInventory(items) {
    this.user.items.inventory = items;
    await api.POST('/user/inventory', { items });
  }

  async fetchUser() {
    const response = await api.GET('/user');
    this.user = response.data;
    this.emit('change');
  }

  async buyItem({ key, name, cost }) {
    const res = await api.POST('/user/buy', { item: key, amount: 1 });
    if (!res.data.error) {
      this.user = res.data.user;
      this.emit('change');
      Notification.success({
        placement: 'bottomEnd',
        title: 'Success',
        description: `Sucessfully bought ${name} for ${cost}`,
      });
    } else {
      Notification.error({ placement: 'bottomEnd', title: 'Error', description: res.data.error });
    }
  }

  async sellItem({ key, name, sell }) {
    const res = await api.POST('/user/sell', { item: key, amount: 1 });
    if (!res.data.error) {
      this.user = res.data.user;
      this.emit('change');
      Notification.success({
        placement: 'bottomEnd',
        title: 'Success',
        description: `Sucessfully sold ${name} for ${sell}`,
      });
    } else {
      Notification.error({ placement: 'bottomEnd', title: 'Error', description: res.data.error });
    }
  }

  async sellItemByIndex({ key, name, sell }, place, index) {
    const res = await api.POST('/user/sellIndex', { item: key, place, index });
    if (!res.data.error) {
      this.user = res.data.user;
      this.emit('change');
      Notification.success({
        placement: 'bottomEnd',
        title: 'Success',
        description: `Sucessfully sold ${name} for ${sell}`,
      });
    } else {
      Notification.error({ placement: 'bottomEnd', title: 'Error', description: res.data.error });
    }
  }

  async unbox(place, index) {
    const res = await api.POST('/user/unbox', { place, index }).catch(console.log);
    this.user = res.data.user;
    this.emit('change');
  }

  async move(place, index) {
    const res = await api.POST('/user/move', { place, index }).catch(console.log);
    this.user = res.data.user;
    this.emit('change');
  }

  async setColor(color) {
    this.user.color = color;
    this.emit('change');
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
        this.setInventory(action.items);
        break;
      case 'CASTLE':
        this.setCastle(action.items);
        break;
      default:
    }
  }
}

const userStore = new User();
dispatcher.register(userStore.handleActions.bind(userStore));
window.dispatcher = dispatcher;
export default userStore;
