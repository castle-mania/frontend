import React from 'react';
import api from '../utils/api';

export const LeaderboardContext = React.createContext(null);

async function fetchUsers() {
  try {
    const fetchedUsers = await api.GET('leaderboards', {params: {type: 'money'}});
    return fetchedUsers.data.users;
  } catch (err) {
    return null;
  }
}

export default function LeaderboardProvider({children}) {
  const [users, setUsers] = React.useState(null);

  const data = React.useMemo(
    () => ({
      users,
      fetchUsers: async () => setUsers(await fetchUsers()),
    }),
    [users]
  );

  return <LeaderboardContext.Provider value={data}>{children}</LeaderboardContext.Provider>;
}
