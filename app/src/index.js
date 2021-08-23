import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import './index.css';
import App from './App';

import { CoinsProvider } from './hooks/use-currencies';
import { AuthProvider } from "./hooks/use-auth";

ReactDOM.render(
  <React.StrictMode>
  <Router>
  <AuthProvider>
      <CoinsProvider>
        <App />
      </CoinsProvider>
    </AuthProvider>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);