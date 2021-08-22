import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Marketplace from './pages/Marketplace';
import Portfolio from './pages/Portfolio';
import Activity from './pages/Activity';
import Login from './pages/Auth/Login';
import Admin from './pages/Admin/Admin';

import * as ROUTES from './routes/routes'
import { ProtectedRoute } from './routes/protected-routes';

import { useAuth } from './hooks/use-auth';
import { getSessionTokenCookie } from './constants/session-storage-endpoints';

export default function App() {
  const auth =  useAuth();
  const isAuthenticated = (!auth.user && getSessionTokenCookie) || auth.user;

  return (
    <Router>
      <Switch>
        <ProtectedRoute exact auth={isAuthenticated && (auth.user && auth.user.elevation === 'admin')} path={ROUTES.ADMIN}>
        <Admin />
        </ProtectedRoute>
        <ProtectedRoute auth={isAuthenticated} exact path={ROUTES.USER_ACTIVITY}>
          <Activity />
        </ProtectedRoute>
        <ProtectedRoute auth={isAuthenticated} exact path={ROUTES.USER_PORTFOLIO}>
          <Portfolio />
        </ProtectedRoute>

        {/* Public routes */}
        <Route exact path={ROUTES.LOGIN}>
          <Login />
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