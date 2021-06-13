/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Header, Content } from 'rsuite';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import DiscordAuth from './pages/Auth.jsx';
import { UserProvider } from './context.js';
import api from './request.js';
import Navbar from './components/NavBar.jsx';
import Login from './pages/Login.jsx';
import './styles/_rsuite.less';
import styles from './styles/app.module.less';

function ProtectedRoute(props) {
  const { user } = useContext(UserProvider);
  if (user === null) return <Route {...props} component={Login} />;
  return <Route {...props} />;
}

export default function App() {
  const [user, setUser] = useState(null);
  const value = { user, setUser };

  useEffect(async () => {
    const response = await api.GET('/user');
    setUser(response.data);
  }, []);

  return (
    <Container>
      <UserProvider.Provider value={value}>
        <Content className={styles.main}>
          <Router>
            <Header>
              <Navbar />
            </Header>
            <Switch>
              <ProtectedRoute path="/" exact component={Home} />
              <Route path="/discord/callback" exact component={DiscordAuth} />
            </Switch>
          </Router>
        </Content>
        <Footer />
      </UserProvider.Provider>
    </Container>
  );
}
