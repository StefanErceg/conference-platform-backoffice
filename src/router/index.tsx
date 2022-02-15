import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";
import { MainLayout } from "../components/layout/MainLayout";

import history from "./history";

import { Countries } from "../pages/countries";
import { Cities } from "../pages/cities";

export const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <MainLayout>
          <Route exact path={"/"} component={Dashboard} />
          <Route exact path={"/cities"} component={Cities} />
          <Route exact path={"/countries"} component={Countries} />
        </MainLayout>
      </Switch>
    </Router>
  );
};
