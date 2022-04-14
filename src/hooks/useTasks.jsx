import React from 'react';
import {StoreContext} from '../contexts/StoreContext';

export default function useTasks(workbench) {
  const {items, fetchItems} = React.useContext(StoreContext);

  React.useEffect(() => {
    if (items == null) {
      fetchItems();
    }
  }, []);

  const patchedTasks = React.useMemo(() => {
    if (items == null) {
      return [];
    }

    if (workbench.tasks.length === 0) {
      return [];
    }

    return workbench.tasks.map((task) => ({
      result: items[task.recipeId],
      endDate: task.endDate,
    }));
  }, [items, workbench]);

  return patchedTasks;
}
