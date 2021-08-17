import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Wallet from './pages/Wallet';
import GetUsers from './pages/Admin/GetUsers';

import * as ROUTES from './constants/routes'

export default function App() {
  return (
    <Router>
      <Switch>
      <Route path={ROUTES.ADMIN_GET_USERS}>
          <GetUsers />
        </Route>
        <Route path={ROUTES.ADMIN}>
          <Wallet />
        </Route>
        <Route path={ROUTES.HOME}>
          Home
        </Route>
      </Switch>
    </Router>
  );
};