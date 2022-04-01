import {Badge, Box, Button, Flex, Image, Skeleton, useColorModeValue} from '@chakra-ui/react';
import React from 'react';
import {MdArrowForward} from 'react-icons/md';
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
    <Button size="md" onClick={onCheckout} rightIcon={<MdArrowForward />} colorScheme="teal">
      Checkout {formatPrice(price, user.locale)}
    </Button>
  );
}

export default function Listing({name, description, url, onCheckout, price, loaded, popular}) {
  const {user} = React.useContext(UserContext);

  return (
    <Box
      boxShadow="lg"
      shadow={1}
      backgroundColor={useColorModeValue('gray.200', 'gray.900')}
      borderRadius="md"
      overflow="hidden">
      <Skeleton isLoaded={loaded} p="6" h={!loaded ? 420 : 'auto'}>
        <Box>
          <Image src={`${process.env.PUBLIC_URL}${url}`} />
        </Box>
        <Flex direction="column" rowGap={4}>
          <Box display="flex" alignItems="center" columnGap="2">
            <Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
              {name}
            </Box>
            {popular ? (
              <Badge borderRadius="full" px={2} colorScheme="teal">
                Popular
              </Badge>
            ) : null}
          </Box>
          <Box>{description}</Box>
          <CheckoutButton user={user} price={price} onCheckout={onCheckout} />
        </Flex>
      </Skeleton>
    </Box>
  );
}
