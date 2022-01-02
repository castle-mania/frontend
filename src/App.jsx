import React from 'react';
import './App.css';
import {ChakraProvider} from '@chakra-ui/react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import NavBar from './components/navbar';
import DiscordAuth from './auth';
import Home from './pages/home';

function App() {
  return (
    <ChakraProvider>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/discord/callback" exact element={<DiscordAuth />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
