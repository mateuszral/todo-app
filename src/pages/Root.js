import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from 'pages/Home';
import Login from 'pages/Login';
import User from 'pages/User';

import MainTemplate from 'templates/MainTemplate';

import { routes } from 'routes';

const Root = () => {
  return (
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path={routes.home} component={Home} />
          <Route exact path={routes.login} component={Login} />
          <Route exact path={routes.user} component={User} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  );
};

export default Root;
