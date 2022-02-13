import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { Dashboard } from "../components/Dashboard";
import { MainLayout } from "../components/layout/MainLayout";
import { Countries } from "../pages/countries";
import history from "./history";

const Test = () => <div>aaaa</div>;

export const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <MainLayout>
          <Route exact path={"/"} component={Dashboard} />
          <Route path={"/test"} component={Test} />
          <Route exact path={"/countries"} component={Countries} />
        </MainLayout>
      </Switch>
    </Router>
  );
};
