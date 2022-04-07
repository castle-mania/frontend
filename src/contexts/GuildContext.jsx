import React from 'react';
import api from '../utils/api';

export const GuildContext = React.createContext(null);

async function fetchGuilds() {
  try {
    const token = localStorage.getItem('jwt-token');

    if (token == null) {
      return null;
    }

    const req = await api.GET('guilds');
    return req.data.guilds;
  } catch (err) {
    return null;
  }
}

export default function GuildProvider({children}) {
  const [guilds, setGuilds] = React.useState(null);

  React.useEffect(async () => setGuilds(await fetchGuilds()), []);

  const data = React.useMemo(
    () => ({
      guilds,
      fetch: async () => setGuilds(await fetchGuilds()),
    }),
    [guilds]
  );

  return <GuildContext.Provider value={data}>{children}</GuildContext.Provider>;
}
