import React from 'react';
import api from '../utils/api';

export const UserContext = React.createContext(null);

async function fetchUser(token) {
  try {
    if (token == null) {
      return null;
    }

    const fetchedUser = await api.GET('users');
    return fetchedUser.data.user;
  } catch (err) {
    return null;
  }
}

async function fetchVotes(token) {
  try {
    if (token == null) {
      return null;
    }

    const req = await api.GET('votes');
    return req.data.votes;
  } catch (err) {
    return null;
  }
}

async function fetchWorkbench(token) {
  try {
    if (token == null) {
      return null;
    }

    const req = await api.GET('workbench');
    return req.data.workbench;
  } catch (err) {
    return null;
  }
}

export default function UserProvider({children}) {
  const [user, setUser] = React.useState(null);
  const [votes, setVotes] = React.useState(null);
  const [workbench, setWorkbench] = React.useState(null);

  const update = async () => {
    const token = localStorage.getItem('jwt-token');

    setUser(await fetchUser(token));
    setVotes(await fetchVotes(token));
    setWorkbench(await fetchWorkbench(token));
  };

  React.useEffect(update, []);

  const data = React.useMemo(
    () => ({
      user,
      votes,
      workbench,
      logout: () => {
        localStorage.removeItem('jwt-token');
        setUser(null);
        setVotes(null);
        setWorkbench(null);
      },
      login: update,
    }),
    [user, votes, workbench]
  );

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}
