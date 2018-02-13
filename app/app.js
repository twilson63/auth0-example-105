// @format
import React from 'react'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import history from './history'

import Home from './pages/home'

export default () => (
  <Router history={history}>
    <Switch>
      <Route path='/' component={Home} />
    </Switch>
  </Router>
)
