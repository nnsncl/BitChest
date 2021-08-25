import React from 'react';
import { Switch, Route } from "react-router-dom";

import Marketplace from './pages/Marketplace';
import Portfolio from './pages/Portfolio';
import Activity from './pages/Activity';
import Login from './pages/Auth/Login';
import Admin from './pages/Admin/Admin';

import * as ROUTES from './routes/routes'
import { ProtectedRoute } from './routes/protected-routes';

import { useAuth } from './hooks/use-auth';
import { getSessionTokenCookie } from './constants/session-storage-endpoints';
import Currency from './pages/Currency';


export default function App() {
  const auth = useAuth();
  const isAuthenticated = (!auth.user && getSessionTokenCookie) || auth.user;

  return (
    <Switch>
      <ProtectedRoute
        exact
        auth={isAuthenticated && (auth.user && auth.user.elevation === 'admin')}
        path={ROUTES.ADMIN}
        component={Admin}
      />
      <ProtectedRoute
        exact
        auth={isAuthenticated}
        path={ROUTES.USER_ACTIVITY}
        component={Activity}
      />
      <ProtectedRoute
        exact
        auth={isAuthenticated}
        path={ROUTES.USER_PORTFOLIO}
        component={Portfolio}
      />

      {/* Public routes */}
      <Route
        exact
        path='/currency/:id'
        component={Currency}
      />
      <Route
        exact
        path={ROUTES.LOGIN}
        component={Login}
      />
      <Route
        exact
        path={ROUTES.MARKETPLACE}
        component={Marketplace}
      />
      <Route
        exact
        path={ROUTES.HOME}
        component={Marketplace}
      />
    </Switch>
  );
};