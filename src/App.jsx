/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, useHistory,
} from 'react-router-dom';
import { Container, Header, Content } from 'rsuite';
import Footer from './components/footer/Footer.jsx';
import Navbar from './components/nav/NavBar.jsx';
import './styles/_rsuite.less';
import styles from './styles/app.module.less';

import DiscordAuth from './pages/Auth.jsx';
import Login from './pages/Login.jsx';
import User from './pages/profile/User.jsx';
import Home from './pages/profile/Profile.jsx';
import userStore from './stores/UserStore.js';

function ProtectedRoute(props) {
  const history = useHistory();
  if (!userStore.isLogged()) {
    history.push('/');
    return null;
  }
  return <Route {...props} />;
}

export default function App() {
  return (
    <Container>
      <Content className={styles.main}>
        <Router>
          <Header>
            <Navbar />
          </Header>
          <Switch>
            <ProtectedRoute path="/profile" exact component={Home} />
            <Route path="/" exact component={Login} />
            <Route
              path="/profile/:discordId"
              exact
              render={(props) => <User key={props.match.params.discordId} {...props} />}
            />
            <Route path="/discord/callback" exact component={DiscordAuth} />
          </Switch>
        </Router>
      </Content>
      <Footer />
    </Container>
  );
}
