import React from 'react';
import { Panel, Button } from 'rsuite';

import { handleLoginClick } from '../login.js';

export default function Login() {
  return (
    <Panel className="login-panel" style={{ backgroundColor: '#1a1d24' }} shaded>
      <h2>Login</h2>
      <p>To access CastleMania, you must connect your Discord Account</p>
      <br />
      <Button style={{ backgroundColor: '#5865F2' }} onClick={() => handleLoginClick()}>
        Login with Discord
      </Button>
    </Panel>
  );
}
