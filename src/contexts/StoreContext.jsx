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

async function fetchItems() {
  try {
    const fetchedProducts = await api.GET('items');
    return fetchedProducts.data;
  } catch (err) {
    return null;
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
