import {Container} from '@chakra-ui/react';
import React from 'react';
import Listing from '../../components/listing';
import api from '../../utils/api';

export default function Store() {
  async function createPaymentSession() {
    const {data} = await api.POST('/create-checkout-session');
    window.open(data.url, '_self');
  }

  return (
    <Container w="sm">
      <Listing
        name="5x Gifts"
        price="$4.99"
        description="Five gifts each containing a random surprise with the chance of being exceedingly rare!"
        onCheckout={() => createPaymentSession()}
      />
    </Container>
  );
}
