import {Container} from '@chakra-ui/react';
import React from 'react';
import Listing from '../../components/Listing';
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
        price="$9.99"
        url="/imgs/bundle.png"
        description="5 gifts each containing a random surprise with the chance of being exceedingly rare!"
        onCheckout={() => createPaymentSession()}
      />
    </Container>
  );
}
