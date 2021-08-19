import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CoinsProvider } from './hooks/use-currencies';
import { AuthProvider } from "./hooks/use-auth";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CoinsProvider>
        <App />
      </CoinsProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);