import React from 'react';
import { Footer } from 'rsuite';
import styles from './styles.module.less';

export default function FooterModule() {
  return (
    <Footer className={styles.footer}>
      <div>
        <h3>More</h3>
        <ul className={styles.list}>
          <li>
            <a href="/google.com">Invite the Bot</a>
          </li>
          <li>
            <a href="/documentation">Documentation</a>
          </li>
          <li>
            <a href="/google.com">Login with Discord</a>
          </li>
          <li>
            <a href="/google.com">Get Premium</a>
          </li>
        </ul>
      </div>
      <div>
        <h3>Social</h3>
        <ul className={styles.list}>
          <li>
            <a href="/google.com">Our Support Discord</a>
          </li>
          <li>
            <a href="/google.com">Other Products</a>
          </li>
          <li>
            <a href="/google.com">Contribute to Development</a>
          </li>
        </ul>
      </div>
      <div>
        <h3>Legal</h3>
        <ul className={styles.list}>
          <li>
            <a href="/google.com">Terms of Service</a>
          </li>
          <li>
            <a href="/google.com">Privacy Policy</a>
          </li>
        </ul>
      </div>
    </Footer>
  );
}
