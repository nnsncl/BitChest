import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Explore from './pages/Explore';
import Wallet from './pages/Wallet';
import Marketplace from './pages/Marketplace';
import Activity from './pages/Activity';
import GetUsers from './pages/Admin/GetUsers';
import Login from './pages/Auth/Login';

import * as ROUTES from './constants/routes'

export default function App() {
  return (
    <Router>
      <Switch>
        {/* Admin routes */}
        <Route exact path={ROUTES.ADMIN_GET_USERS}>
          <GetUsers />
        </Route>
        <Route exact path={ROUTES.ADMIN}>
          Admin
        </Route>
        {/* Protected routes */}
        <Route exact path={ROUTES.USER_ACTIVITY}>
          <Activity />
        </Route>
        <Route exact path={ROUTES.USER_WALLET}>
          <Wallet />
        </Route>
        {/* Auth routes */}
        <Route exact path={ROUTES.LOGIN}>
          <Login />
        </Route>
        {/* Public routes */}
        <Route exact path={ROUTES.EXPLORE}>
          <Explore />
        </Route>
        <Route exact path={ROUTES.MARKETPLACE}>
          <Marketplace />
        </Route>
        <Route exact path={ROUTES.HOME}>
          Home
        </Route>
      </Switch>
    </Router>
  );
};