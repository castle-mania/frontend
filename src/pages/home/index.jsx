import {Checkbox, Container, Heading, Text} from '@chakra-ui/react';
import React from 'react';
import styles from './home.module.css';

export default function Home() {
  return (
    <Container>
      <Heading size="lg" className={styles.heading}>
        What is this?
      </Heading>
      <Text className={styles.text}>
        Castle-Mania is a unique global currency game that allows you to buy, sell, raid and gamble your way to the top
        of the leaderboard! and much more!
      </Text>
      <Heading size="lg" className={styles.heading}>
        What&apos;s next?
      </Heading>
      <Container className={styles.checkboxes}>
        <Checkbox isChecked colorScheme="teal">
          Profiles
        </Checkbox>
        <Checkbox isChecked colorScheme="teal">
          Buying & Selling
        </Checkbox>
        <Checkbox isChecked={false} colorScheme="teal">
          Kingdoms
        </Checkbox>
        <Checkbox isChecked={false} colorScheme="teal">
          Raiding
        </Checkbox>
        <Checkbox isChecked={false} colorScheme="teal">
          Games
        </Checkbox>
      </Container>
    </Container>
  );
}
