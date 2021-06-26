import { EventEmitter } from 'events';
import { useEffect, useState } from 'react';
import dispatcher from '../dispatcher.js';
import api from '../request.js';

class UserStore extends EventEmitter {
  constructor() {
    super();
    this.users = {};
    this.loggedIn = false;
    this.user = null;

    this.fetchUser();
  }

  isLogged() {
    return this.loggedIn;
  }

  isAuth({ id }) {
    if (!this.isLogged()) {
      return false;
    }

    return id === this.user.id;
  }

  getUser(id) {
    if (id == null && this.isLogged()) return this.user;

    if (id in this.users) {
      return this.users[id];
    }

    api
      .GET(`/user/${id}`)
      .then((res) => {
        this.users[id] = res.data;
        this.emit(`change.${id}`);
      })
      .catch(() => {
        this.users[id] = null;
      });

    return null;
  }

  async fetchUser() {
    const response = await api.GET('/user');
    this.user = response.data;
    this.loggedIn = true;
    this.emit('change', this.user);
  }

  handleActions(action) {}
}

const userStore = new UserStore();
dispatcher.register(userStore.handleActions.bind(userStore));
window.dispatcher = dispatcher;

export function useUserState(id = null) {
  const [user, setUser] = useState(userStore.getUser(id));

  useEffect(() => {
    const event = id == null ? 'change' : `change.${id}`;

    userStore.on(event, () => setUser({ ...userStore.getUser(id) }));
  }, []);

  return [user, setUser];
}

export default userStore;
