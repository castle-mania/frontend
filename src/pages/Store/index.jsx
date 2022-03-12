import {Container, SimpleGrid} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import Listing from '../../components/Listing';
import api from '../../utils/api';

async function createPaymentSession(priceId) {
  const {data} = await api.POST('create-checkout-session', {
    price_id: priceId,
    quantity: 1,
  });

  window.open(data.redirect_url, '_self');
}

export default function Store() {
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    try {
      const fetchedProducts = await api.GET('products');
      setProducts(fetchedProducts.data);
    } catch (err) {
      setError(true);
    }
  }, []);

  if (error) {
    return null;
  }

  return (
    <Container maxW="container.xl">
      <SimpleGrid minChildWidth={220} gap={6}>
        {products.map((product) => (
          <Listing
            key={product.id}
            name={product.name}
            price={product.price / 100}
            url="/imgs/slot_machine_transparent.gif"
            description={product.description}
            onCheckout={() => createPaymentSession(product.id)}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}
