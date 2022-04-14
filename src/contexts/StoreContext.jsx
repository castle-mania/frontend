import React from 'react';
import api from '../utils/api';

export const StoreContext = React.createContext(null);

async function fetchProducts() {
  try {
    const fetchedProducts = await api.GET('products');
    return fetchedProducts.data;
  } catch (err) {
    return null;
  }
}

let itemFetching = false;

async function fetchItems() {
  if (itemFetching) {
    return null;
  }

  itemFetching = true;

  try {
    const fetchedProducts = await api.GET('items');
    return fetchedProducts.data;
  } catch (err) {
    return null;
  } finally {
    itemFetching = false;
  }
}

export default function StoreProvider({children}) {
  const [products, setProducts] = React.useState(null);
  const [items, setItems] = React.useState(null);

  const data = React.useMemo(
    () => ({
      items,
      products,
      fetchProducts: async () => setProducts(await fetchProducts()),
      fetchItems: async () => setItems(await fetchItems()),
    }),
    [products, items]
  );

  return <StoreContext.Provider value={data}>{children}</StoreContext.Provider>;
}
