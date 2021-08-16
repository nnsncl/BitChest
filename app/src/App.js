import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import * as ROUTES from './constants/routes'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path={ROUTES.ADMIN}>
          Wallet
        </Route>
        <Route path={ROUTES.HOME}>
          Home
        </Route>
      </Switch>
    </Router>
  );
};