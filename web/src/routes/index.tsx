import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import Route from "./Routes";

import CreateOrEditOrphanage from "../pages/CreateOrEditOrphanage";
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
        <Route
          path="/orphanages/create"
          component={CreateOrEditOrphanage}
          landing
        />
        <Route
          exact
          path="/orphanages/edit/:id"
          component={CreateOrEditOrphanage}
          isPrivate
          landing
        />
        <Route exact path="/orphanages/:id" component={Orphanage} landing />

        <Route path="/login" component={Login} />
        <Route path="/request-reset" exact component={RequestReset} />
        <Route path="/reset-password" exact component={ResetPassword} />
        <Route path="/dashboard" component={Dashboard} isPrivate isDashboard />
      </Switch>
    </BrowserRouter>
  );
}
