import React from 'react';
import {StoreContext} from '../contexts/StoreContext';

export default function useInventory(inventory) {
  const {items, fetchItems} = React.useContext(StoreContext);

  React.useEffect(() => {
    if (items == null) {
      fetchItems();
    }
  }, []);

  const patchedItems = React.useMemo(() => {
    if (items == null || inventory == null) {
      return null;
    }

    return inventory.items.map((item) => ({
      ...items[item.id],
      ...item,
    }));
  }, [items, inventory]);

  const cph = patchedItems != null ? patchedItems.reduce((a, b) => a + b.gph, 0) : 0;
  return [patchedItems, cph];
}
