import React from 'react';
import { Panel, Button } from 'rsuite';
import { handleLoginClick } from '../login.js';
import { brandImage } from '../utils.jsx';
import styles from '../styles/login.module.less';

export default function Login() {
  return (
    <Panel className={styles.loginPanel} shaded>
      <div className={styles.brand}>
        {brandImage(35)}
        <h1>CastleMania</h1>
      </div>
      <p>To access CastleMania, you must connect your Discord Account</p>
      <p className={styles.muted}>
        A Unique Global Currency game that allows you to Buy, Sell, Raid and Gamble your way to the
        top of the leaderboard! and much more!
      </p>
      <br />
      <Button className={styles.button} onClick={() => handleLoginClick()}>
        Login with Discord
      </Button>
    </Panel>
  );
}
