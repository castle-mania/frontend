import React, {useEffect} from 'react';
import './App.css';
import {ChakraProvider} from '@chakra-ui/react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import {Provider, useDispatch} from 'react-redux';
import {createStore} from '@reduxjs/toolkit';
import NavBar from './components/navbar';
import DiscordAuth from './auth';
import Home from './pages/home';
import {login, userSlice} from './stores/user';
import api from './utils/api';
import Succes from './pages/payments/success';
import Cancel from './pages/payments/cancel';
import Store from './pages/store';

const store = createStore(
  userSlice.reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function Router() {
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      const {data} = await api.GET('/users');
      dispatch(login(data.user));
    } catch (_) {}
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/discord/callback" exact element={<DiscordAuth />} />
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/payment/success" element={<Succes />} />
        <Route path="/payment/cancel" element={<Cancel />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Router />
      </Provider>
    </ChakraProvider>
  );
}

export default App;
