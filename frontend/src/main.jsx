import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </RecoilRoot>
);
