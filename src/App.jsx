import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {Box, ChakraProvider} from '@chakra-ui/react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import NavBar from './components/NavBar';
import DiscordAuth from './authentication';
import Home from './pages/Home';
import Succes from './pages/Payments/success';
import Cancel from './pages/Payments/cancel';
import Store from './pages/Store';
import UserProvider from './contexts/UserContext';
import PrivacyPolicy from './pages/Privacy';
import Terms from './pages/Terms';
import {DISCORD_INVITE, INVITE_URL} from './constants';
import Footer from './components/Footer';
import StoreProvider from './contexts/StoreContext';
import theme from './theme';
import Leaderboard from './pages/Leaderboards';
import GuildProvider from './contexts/GuildContext';
import Commands from './pages/Commands';
import CommandsProvider from './contexts/CommandsContext';
import Profile from './pages/Profile';

function Redirect({to}) {
  useEffect(() => {
    window.location = to;
  }, []);
  return null;
}

function Router() {
  return (
    <BrowserRouter>
      <Box>
        <Box minH="100vh" pb={200}>
          <NavBar />
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/leaderboards" element={<Leaderboard />} />
            <Route path="/commands" element={<Commands />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/payment/success" element={<Succes />} />
            <Route path="/payment/cancel" element={<Cancel />} />
            <Route path="/discord/callback" exact element={<DiscordAuth />} />
            <Route path="/invite" exact element={<Redirect to={INVITE_URL} />} />
            <Route path="/discord" exact element={<Redirect to={DISCORD_INVITE} />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <UserProvider>
        <GuildProvider>
          <StoreProvider>
            <CommandsProvider>
              <Router />
            </CommandsProvider>
          </StoreProvider>
        </GuildProvider>
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
