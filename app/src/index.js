import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CoinsProvider } from './hooks/use-currencies';


ReactDOM.render(
  <React.StrictMode>
    <CoinsProvider>
      <App />
    </CoinsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);