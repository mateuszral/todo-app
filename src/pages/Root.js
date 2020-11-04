import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from 'pages/Home';
import Login from 'pages/Login';

import MainTemplate from 'templates/MainTemplate';

import { routes } from 'routes';

const Root = () => {
  return (
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path={routes.home} component={Home} />
          <Route exact path={routes.login} component={Login} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  );
};

export default Root;
