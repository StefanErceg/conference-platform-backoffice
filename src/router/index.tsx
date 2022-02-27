import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';

import history from './history';

import { Countries } from '../pages/countries';
import { Cities } from '../pages/cities';
import { Locations } from '../pages/locations';
import { Resources } from '../pages/resources';
import { Ratings } from '../pages/ratings';
import { RatingSchemaEditor } from '../pages/ratings/components/schema-editor';
import { Conferences } from '../pages/conferences';
import { ConferenceBaseData } from '../pages/conferences/components/editor/base-data';
import { ConferenceSessions } from '../pages/conferences/components/editor/sessions';
import { Login } from '../pages/login';

export const AppRouter = () => {
    return (
        <Router history={history}>
            <Switch>
                <MainLayout sidebarExclude={'login'}>
                    <Route exact path={'/login'} component={Login} />
                    <Route exact path={'/cities'} component={Cities} />
                    <Route exact path={'/countries'} component={Countries} />
                    <Route exact path={'/locations'} component={Locations} />
                    <Route exact path={'/resources'} component={Resources} />
                    <Route exact path={'/ratings'} component={Ratings} />
                    <Route exact path={'/conferences'} component={Conferences} />
                    <Route path={'/ratings/editor/:id'} component={RatingSchemaEditor} />
                    <Route path="/conferences/editor/:id/base" component={ConferenceBaseData} />
                    <Route path="/conferences/editor/:id/sessions" component={ConferenceSessions} />
                    <Route exact path="/">
                        <Redirect to="/conferences" />
                    </Route>
                </MainLayout>
            </Switch>
        </Router>
    );
};
