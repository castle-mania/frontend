import {Badge, Box, Button, Flex, Image, Skeleton} from '@chakra-ui/react';
import React from 'react';
import {UserContext} from '../../contexts/UserContext';
import LoginButton from '../LoginButton';

const formatPrice = (price, locale) =>
  (price / 100).toLocaleString(locale, {
    style: 'currency',
    currency: 'USD',
  });

function CheckoutButton({user, onCheckout, price}) {
  if (user == null) {
    return <LoginButton />;
  }

  return (
    <Button onClick={() => onCheckout()} colorScheme="teal" size="sm">
      Checkout {formatPrice(price, user.locale)}
    </Button>
  );
}

export default function Listing({name, description, url, onCheckout, price, loaded}) {
  const {user} = React.useContext(UserContext);

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Skeleton isLoaded={loaded} p="6" h={!loaded ? 420 : 'auto'}>
        <Box minH={250}>
          <Image src={`${process.env.PUBLIC_URL}${url}`} />
        </Box>
        <Flex direction="column" rowGap={4}>
          <Box display="flex" alignItems="center" columnGap="2">
            <Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
              {name}
            </Box>
            <Badge borderRadius="full" px={2} colorScheme="teal">
              Popular
            </Badge>
          </Box>
          <Box>{description}</Box>
          <CheckoutButton user={user} price={price} onCheckout={onCheckout} />
        </Flex>
      </Skeleton>
    </Box>
  );
}
