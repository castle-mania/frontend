import {Badge, Box, Button, Image} from '@chakra-ui/react';
import React from 'react';
import {useSelector} from 'react-redux';
import login from '../../utils/login';
import styles from './styles.module.css';

export default function Listing({name, description, price, onCheckout}) {
  const user = useSelector((state) => state?.user?.payload);

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Image src={`${process.env.PUBLIC_URL}/imgs/bundle.png`} />
        <Box display="flex" alignItems="center" columnGap="2">
          <Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
            {name}
          </Box>
          <Badge borderRadius="full" px="2" colorScheme="teal">
            Popular
          </Badge>
        </Box>
        <Box className={styles.description}>{description}</Box>
        {user != null ? (
          <Button onClick={() => onCheckout()} colorScheme="teal" className={styles.button} size="sm">
            Checkout {price}
          </Button>
        ) : (
          <Button size="sm" mt="5" colorScheme="teal" className={styles.button} onClick={() => login()}>
            Login
          </Button>
        )}
      </Box>
    </Box>
  );
}
