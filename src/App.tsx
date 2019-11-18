import React from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'

import Route from './components/common/Route'
import Dashboard from './containers/Dashboard'
import Database from './containers/Database'
import WebStorage from './containers/WebStorage'
import Suivipppe from "./containers/Suivippe"
import Microsoft from './containers/Microsoft'
import Intellij from './containers/Intellij'
import GitHub from './containers/GitHub'
import VMWare from './containers/VMWare'
import Printers from './containers/Printers'
import Support from './containers/Support'
import NotFound from './containers/404'
import Login from './containers/Login'

export default () => (
  <Router>
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <Route withAuth exact path="/dashboard" component={Dashboard} />
      <Route withAuth exact path="/database" component={Database} />
      <Route withAuth exact path="/webstorage" component={WebStorage} />
      <Route withAuth exact path="/suivippe" component={Suivipppe} />
      <Route withAuth exact path="/microsoft" component={Microsoft} />
      <Route withAuth exact path="/intellij" component={Intellij} />
      <Route withAuth exact path="/github" component={GitHub} />
      <Route withAuth exact path="/vmware" component={VMWare} />
      <Route withAuth exact path="/printers" component={Printers} />
      <Route withAuth exact path="/supports" component={Support} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </Router>
)