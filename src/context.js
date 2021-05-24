/* eslint-disable import/prefer-default-export */
import { createContext } from 'react';

const UserProvider = createContext({
  user: null,
  setUser: () => {},
});

export { UserProvider };
