import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard';
import { MainLayout } from '../components/layout/MainLayout';

import history from './history';

import { Countries } from '../pages/countries';
import { Cities } from '../pages/cities';
import { Locations } from '../pages/locations';
import { Resources } from '../pages/resources';
import { Ratings } from '../pages/ratings';
import { RatingSchemaEditor } from '../pages/ratings/components/schema-editor';

export const AppRouter = () => {
    return (
        <Router history={history}>
            <Switch>
                <MainLayout>
                    <Route exact path={'/'} component={Dashboard} />
                    <Route exact path={'/cities'} component={Cities} />
                    <Route exact path={'/countries'} component={Countries} />
                    <Route exact path={'/locations'} component={Locations} />
                    <Route exact path={'/resources'} component={Resources} />
                    <Route exact path={'/ratings'} component={Ratings} />
                    <Route path={'/ratings/editor/:id'} component={RatingSchemaEditor} />
                </MainLayout>
            </Switch>
        </Router>
    );
};
