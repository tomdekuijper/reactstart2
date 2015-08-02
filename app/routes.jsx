'use strict';

// disable `no-unused-vars` rule
/* eslint no-unused-vars: 0 */
import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';

export default (
  <Route name='app' path='/' handler={require('./components/app')}>
    <DefaultRoute
      name='directors'
      handler={require('./components/directors/directors-table')} />
    <Route
      name='login'
      handler={require('./components/login')} />

   <NotFoundRoute handler={require('./pages/not-found')} />
  </Route>
);

