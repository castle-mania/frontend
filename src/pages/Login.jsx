import React from 'react';
import { Button, Icon, IconButton } from 'rsuite';
import styles from '../styles/landing.module.less';
import { brandImage } from '../utils.jsx';

export default function Landing() {
  return (
    <>
      <div className={styles.sectionOne}>
        <div className={styles.welcome}>
          <div className={styles.header}>
            {brandImage(90)}
            <p className={styles.headerText}>CastleMania</p>
          </div>
          <div className={styles.blurb}>
            <p>
              A Unique Global Currency game that allows you to Buy, Sell, Raid and Gamble your way
              to the top of the leaderboard/ Personalise your castle with the newest generators,
              take risks and place bets, form kingdoms with friends, and much more
            </p>
          </div>
          <div className={styles.buttons}>
            <IconButton icon={<Icon icon="plus" />}>Add to Discord</IconButton>
            <Button appearance="primary">Login with Discord</Button>
          </div>
          <IconButton className={styles.caret} icon={<Icon icon="down" />} appearance="subtle" />
        </div>
      </div>
      <div className={styles.sectionTwo}>
        <div className={styles.welcome}>
          <div className={styles.header}>
            <p className={styles.headerText}>We are in 3000 Servers</p>
          </div>
          <div className={styles.blurb}>
            <p>Our community is ever expanding</p>
          </div>
        </div>
      </div>
    </>
  );
}
