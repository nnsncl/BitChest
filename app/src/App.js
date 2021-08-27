import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Marketplace from "./pages/Marketplace";
import Portfolio from "./pages/Portfolio";
import Activity from "./pages/Activity";
import Login from "./pages/Auth/Login";
import Admin from "./pages/Admin/Admin";
import Currency from "./pages/Currency";

import * as ROUTES from "./routes/routes";
import { ProtectedRoute } from "./routes/protected-routes";

import { useAuth } from "./hooks/use-auth";
import { AdminProvider } from "./hooks/use-admin";

import { SESSION_TOKEN } from "./constants/session-storage-endpoints";


export default function App() {
  const auth = useAuth();
  const isAuthenticated = (!auth.user && SESSION_TOKEN) || auth.user;
  const isAdmin = auth.user && auth.user.elevation === 'admin';

  return (
    <Switch>
      <ProtectedRoute exact auth={isAuthenticated && isAdmin} path={ROUTES.ADMIN} >
        <AdminProvider>
          <Admin />
        </AdminProvider>
      </ProtectedRoute>
      <ProtectedRoute exact auth={isAuthenticated} path={ROUTES.USER_ACTIVITY} >
        <Activity />
      </ProtectedRoute>
      <ProtectedRoute exact auth={isAuthenticated} path={ROUTES.USER_PORTFOLIO}>
        <Portfolio />
      </ProtectedRoute>
      <ProtectedRoute exact auth={isAuthenticated} path="/currency/:id" >
        <Currency />
      </ProtectedRoute>
      <ProtectedRoute exact auth={isAuthenticated} path={ROUTES.MARKETPLACE}>
        <Marketplace />
      </ProtectedRoute>

      {/* Public routes */}
      <Route exact path={ROUTES.LOGIN}>
        <Login />
      </Route>
      <ProtectedRoute exact auth={isAuthenticated} path={ROUTES.HOME}>
        <Redirect to={ROUTES.MARKETPLACE} />
      </ProtectedRoute>
    </Switch>
  );
}
