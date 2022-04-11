import React from 'react';
import api from '../utils/api';

export const CommandContext = React.createContext(null);

async function fetchedCommands() {
  try {
    const req = await api.GET('commands');
    return req.data.commands;
  } catch (err) {
    return null;
  }
}

export default function CommandsProvider({children}) {
  const [commands, setCommands] = React.useState(null);

  React.useEffect(async () => setCommands(await fetchedCommands()), []);

  const data = React.useMemo(
    () => ({
      commands,
      fetch: async () => setCommands(await fetchedCommands()),
    }),
    [commands]
  );

  return <CommandContext.Provider value={data}>{children}</CommandContext.Provider>;
}
