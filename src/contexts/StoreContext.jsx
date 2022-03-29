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

export default function StoreProvider({children}) {
  const [products, setProducts] = React.useState(null);

  const data = React.useMemo(
    () => ({
      products,
      fetchProducts: async () => setProducts(await fetchProducts()),
    }),
    [products]
  );

  return <StoreContext.Provider value={data}>{children}</StoreContext.Provider>;
}
