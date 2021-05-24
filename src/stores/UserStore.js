import { EventEmitter } from 'events';
import { Notification } from 'rsuite';
import dispatcher from '../dispatcher.js';
import api from '../request.js';

class User extends EventEmitter {
  constructor() {
    super();
    this.authenticated = false;
    this.notLogged = false;
    this.user = null;

    this.fetchUser();
  }

  getUser() {
    return this.user;
  }

  async fetchUser() {
    const response = await api.GET('/user');
    this.user = response.data;
    this.emit('change');
  }

  async buyItem({ key, name, cost }) {
    const res = await api.POST('/user/buy', { item: key, amount: 1 });
    console.log(res);
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
    console.log(res);
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
    console.log('im here');
    const res = await api
      .POST('/user/sellIndex', { item: key, place, index })
      .catch((err) => console.log(err.message));
    console.log('here');
    console.log(res);
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
      default:
    }
  }
}

const userStore = new User();
dispatcher.register(userStore.handleActions.bind(userStore));
window.dispatcher = dispatcher;
export default userStore;
