import React from 'react';
import api from '../utils/api';

export const WorkbenchContext = React.createContext(null);

async function fetchWorkbench() {
  try {
    const token = localStorage.getItem('jwt-token');

    if (token == null) {
      return null;
    }

    const req = await api.GET('workbench');
    return req.data.workbench;
  } catch (err) {
    return null;
  }
}

export default function WorkbenchProvider({children}) {
  const [workbench, setWorkbench] = React.useState(null);

  React.useEffect(async () => setWorkbench(await fetchWorkbench()), []);

  const data = React.useMemo(
    () => ({
      workbench,
      fetch: async () => setWorkbench(await fetchWorkbench()),
    }),
    [workbench]
  );

  return <WorkbenchContext.Provider value={data}>{children}</WorkbenchContext.Provider>;
}
