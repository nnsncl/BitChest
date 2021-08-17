import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Explore from './pages/Explore';
import GetUsers from './pages/Admin/GetUsers';

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

        {/* Auth routes */}
        <Route exact path={ROUTES.USER_ACTIVITY}>
          Activity
        </Route>
        <Route exact path={ROUTES.USER_WALLET}>
          Wallet
        </Route>

        {/* Public routes */}
        <Route exact path={ROUTES.EXPLORE}>
          <Explore />
        </Route>
        <Route exact path={ROUTES.MARKETPLACE}>
          Marketplace
        </Route>
        <Route exact path={ROUTES.HOME}>
          Home
        </Route>
      </Switch>
    </Router>
  );
};