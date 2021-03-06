import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import './index.css';
import App from './App';

import { CoinsProvider } from './hooks/use-currencies';
import { AuthProvider } from "./hooks/use-auth";
import { AdminProvider } from "./hooks/use-admin";
import { TransactionsProvider } from './hooks/use-transactions';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <AdminProvider>
          <CoinsProvider>
            <TransactionsProvider>
              <App />
            </TransactionsProvider>
          </CoinsProvider>
        </AdminProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);