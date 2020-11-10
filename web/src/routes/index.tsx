import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import Route from "./Routes";

import CreateOrphanage from "../pages/CreateOrphanage";
import Landing from "../pages/Landing";
import Orphanage from "../pages/Orphanage";
import OrphanagesMap from "../pages/OrphanagesMap";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard";
import ResetPassword from "../pages/Auth/ResetPassword";
import RequestReset from "../pages/Auth/RequestReset";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} landing />
        <Route path="/app" component={OrphanagesMap} landing />
        <Route path="/orphanages/create" component={CreateOrphanage} landing />
        <Route path="/orphanages/:id" component={Orphanage} landing />

        <Route path="/login" component={Login} />
        <Route path="/request-reset" exact component={RequestReset} />
        <Route path="/reset-password" exact component={ResetPassword} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
      </Switch>
    </BrowserRouter>
  );
}
