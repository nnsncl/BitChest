import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Marketplace from "./pages/Marketplace";
import Portfolio from "./pages/Portfolio";
import Login from "./pages/Auth/Login";
import Admin from "./pages/Admin/Admin";
import AddUser from "./pages/Admin/AddUser";
import EditUser from "./pages/Admin/EditUser";
import Currency from "./pages/Currency";
import Account from "./pages/Profile/Account";

import * as ROUTES from "./routes/routes";
import { ProtectedRoute } from "./routes/protected-routes";

import { useAuth } from "./hooks/use-auth";


export default function App() {
  const auth = useAuth();
  const isAuthenticated = auth.storedUser.id && auth.storedToken;
  const isAdmin = auth.storedUser.elevation === 'admin';

  return (
    <Switch>
      <ProtectedRoute exact auth={isAuthenticated} path={ROUTES.ADD_USER} >
        <AddUser />
      </ProtectedRoute>
      <ProtectedRoute exact auth={isAuthenticated} path={ROUTES.EDIT_USER} >
        <EditUser />
      </ProtectedRoute>
      <ProtectedRoute exact auth={isAuthenticated} path={ROUTES.EDIT_ACCOUNT} >
        <Account />
      </ProtectedRoute>
      <ProtectedRoute exact auth={isAuthenticated && isAdmin} path={ROUTES.ADMIN} >
        <Admin />
      </ProtectedRoute>

      <ProtectedRoute exact auth={isAuthenticated} path={ROUTES.USER_PORTFOLIO}>
        <Portfolio />
      </ProtectedRoute>
      <ProtectedRoute exact auth={isAuthenticated} path={ROUTES.CURRENCY} >
        <Currency />
      </ProtectedRoute>
      <ProtectedRoute exact auth={isAuthenticated} path={ROUTES.MARKETPLACE}>
        <Marketplace />
      </ProtectedRoute>

      <Route exact path={ROUTES.LOGIN}>
        <Login />
      </Route>
      <ProtectedRoute exact auth={isAuthenticated} path={ROUTES.HOME}>
        <Redirect to={ROUTES.MARKETPLACE} />
      </ProtectedRoute>
    </Switch>
  );
}
