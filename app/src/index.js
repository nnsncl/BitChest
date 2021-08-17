import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CoinsProvider } from './hooks/use-currencies';


import { UserProvider } from "./hooks/use-user";

ReactDOM.render(
  <React.StrictMode>
    <CoinsProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </CoinsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);