import React from 'react';
import './App.css';
import {ChakraProvider} from '@chakra-ui/react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import NavBar from './components/NavBar';
import DiscordAuth from './authentication';
import Home from './pages/Home';
import Succes from './pages/Payments/success';
import Cancel from './pages/Payments/cancel';
import Store from './pages/Store';

function Router() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/payment/success" element={<Succes />} />
        <Route path="/payment/cancel" element={<Cancel />} />
        <Route path="/discord/callback" exact element={<DiscordAuth />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  );
}

export default App;
