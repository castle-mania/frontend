import React from 'react';
import './App.css';
import {ChakraProvider} from '@chakra-ui/react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore} from '@reduxjs/toolkit';
import NavBar from './components/navbar';
import DiscordAuth from './auth';
import Home from './pages/home';
import {userSlice} from './stores/user';

const store = createStore(
  userSlice.reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route path="/discord/callback" exact element={<DiscordAuth />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
