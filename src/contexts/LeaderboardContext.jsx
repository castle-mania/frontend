import React from 'react';
import api from '../utils/api';

export const LeaderboardContext = React.createContext(null);

async function fetchUsers(type) {
  try {
    const fetchedUsers = await api.GET('leaderboards', {params: {type}});
    return fetchedUsers.data.users;
  } catch (err) {
    return null;
  }
}

export default function LeaderboardProvider({children}) {
  const [global, setGlobal] = React.useState({
    cph: null,
    money: null,
  });

  const data = React.useMemo(
    () => ({
      global,
      fetchUsers: async (type) =>
        setGlobal({
          ...global,
          [type]: await fetchUsers(type),
        }),
    }),
    [global]
  );

  return <LeaderboardContext.Provider value={data}>{children}</LeaderboardContext.Provider>;
}
