import {Box, Container, SimpleGrid} from '@chakra-ui/react';
import React, {useContext, useEffect, useMemo} from 'react';
import Listing from '../../components/Listing';
import {StoreContext} from '../../contexts/StoreContext';
import api from '../../utils/api';

async function createPaymentSession(priceId) {
  const {data} = await api.POST('create-checkout-session', {
    price_id: priceId,
    quantity: 1,
  });

  window.open(data.redirect_url, '_self');
}

export default function Store() {
  const store = useContext(StoreContext);
  const {products} = store;

  const sortedProducts = useMemo(
    () => (products != null ? products.sort((a, b) => a.price - b.price) : null),
    [products]
  );

  useEffect(() => {
    if (products == null) {
      store.fetchProducts();
    }
  }, []);

  return (
    <Container maxW="container.xl" minH="100vh" p={8}>
      <Box h="64px" />
      <SimpleGrid minChildWidth={220} gap={8}>
        {products !== null ? (
          sortedProducts.map((product) => (
            <Listing
              loaded
              popular={product.popular}
              key={product.id}
              name={product.name}
              price={product.price}
              url={product.image}
              description={product.description}
              onCheckout={() => createPaymentSession(product.id)}
            />
          ))
        ) : (
          <>
            <Listing loaded={false} />
            <Listing loaded={false} />
            <Listing loaded={false} />
            <Listing loaded={false} />
          </>
        )}
      </SimpleGrid>
    </Container>
  );
}
