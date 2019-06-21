import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'

import Dashboard from './views/Dashboard'
import Database from './views/Database'
import DatabaseEdit from './views/DatabaseEdit'
import WebStorage from './views/WebStorage'
import Suivipppe from "./views/Suivipppe"
import Microsoft from './views/Microsoft'
import Intellij from './views/Intellij'
import GitHub from './views/GitHub'
import VMWare from './views/VMWare'
import Printers from './views/Printers'
import Supports from './views/Supports'
import NotFound from './views/NotFound'
import MainLayout from "./views/layouts/MainLayout"
import EmptyLayout from "./views/layouts/EmptyLayout"
import Login from "./views/security/Login"
import Logout from "./views/security/Logout"

export default props => (
  <Router>
      <Switch>
        <Redirect
          exact
          from="/"
          to="/dashboard"
        />
        <MainLayout exact path='/dashboard' component={ Dashboard } />
        <MainLayout exact path='/database' component={ Database } />
        <MainLayout exact path='/database/:dbid' component={ DatabaseEdit } />
        <MainLayout exact path='/webstorage' component={ WebStorage } />
        <MainLayout exact path='/suivippe' component={ Suivipppe } />
        <MainLayout exact path='/microsoft' component={ Microsoft } />
        <MainLayout exact path='/intellij' component={ Intellij } />
        <MainLayout exact path='/github' component={ GitHub } />
        <MainLayout exact path='/vmware' component={ VMWare } />
        <MainLayout exact path='/printers' component={ Printers } />
        <MainLayout exact path='/supports' component={ Supports } />

        <EmptyLayout exact path='/login' component={ Login } />
        <Route exact path='/logout' component={ Logout } />

        <Route
          component={NotFound}
          exact
          path="/not-found"
        />
        <Redirect to="/not-found" />
      </Switch>
  </Router>
)