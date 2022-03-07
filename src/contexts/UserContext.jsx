import React from 'react';
import api from '../utils/api';

export const UserContext = React.createContext(null);

async function fetchUser() {
  try {
    const token = localStorage.getItem('jwt-token');

    if (token == null) {
      return null;
    }

    const fetchedUser = await api.GET('/users');
    return fetchedUser.data.user;
  } catch (err) {
    return null;
  }
}

export default function UserProvider({children}) {
  const [user, setUser] = React.useState(null);

  React.useEffect(async () => setUser(await fetchUser()), []);

  const data = React.useMemo(
    () => ({
      user,
      logout: () => {
        localStorage.removeItem('jwt-token');
        setUser(null);
      },
      login: async () => setUser(await fetchUser()),
    }),
    [user]
  );

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}
