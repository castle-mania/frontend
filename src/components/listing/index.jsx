import {Badge, Box, Button, Image} from '@chakra-ui/react';
import React from 'react';
import styles from './styles.module.css';
import {UserContext} from '../../contexts/UserContext';
import login from '../../utils/login';

export default function Listing({name, description, url, onCheckout, price}) {
  const {user} = React.useContext(UserContext);

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Image src={`${process.env.PUBLIC_URL}${url}`} />
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
