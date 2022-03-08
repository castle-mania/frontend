import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {ChakraProvider} from '@chakra-ui/react';
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

function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/payment/success" element={<Succes />} />
        <Route path="/payment/cancel" element={<Cancel />} />
        <Route path="/discord/callback" exact element={<DiscordAuth />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <UserProvider>
        <Router />
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
