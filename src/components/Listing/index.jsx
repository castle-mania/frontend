/* eslint-disable consistent-return */
import {Box, Button, Flex, Image, Skeleton, Tag, useColorModeValue} from '@chakra-ui/react';
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
    <Button
      size="md"
      onClick={onCheckout}
      rightIcon={<MdArrowForward />}
      _hover={{backgroundColor: useColorModeValue('gray.600', 'gray.700')}}
      color={useColorModeValue('gray.200', 'gray.300')}
      backgroundColor={useColorModeValue('gray.700', 'gray.800')}>
      Checkout {formatPrice(price, user.locale)}
    </Button>
  );
}

export default function Listing({name, description, url, onCheckout, price, loaded, amount}) {
  const {user} = React.useContext(UserContext);

  return (
    <Box
      boxShadow="lg"
      shadow="md"
      backgroundColor={useColorModeValue('gray.200', 'gray.900')}
      borderRadius="md"
      overflow="hidden">
      <Skeleton isLoaded={loaded} p={4}>
        <Image w="100%" src={`${process.env.PUBLIC_URL}${url}`} alt={name} fallback={<Box mt="100%" />} />
        <Flex direction="column" rowGap={4} minH={144}>
          <Flex justifyContent="space-between">
            <Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
              {name}
            </Box>
            <Tag colorScheme="green">{amount} Gems</Tag>
          </Flex>
          <Box>{description}</Box>
          <CheckoutButton user={user} price={price} onCheckout={onCheckout} />
        </Flex>
      </Skeleton>
    </Box>
  );
}
