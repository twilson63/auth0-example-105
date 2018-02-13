// @format
import React from 'react'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import history from './history'
import auth from './auth'
import { not } from 'ramda'
import Home from './pages/home'

const session = auth()

export default () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={secure(Home)} />
      <Route path="/login" component={Login} />
      <Route path="/callback" component={Callback} />
      <Route path="/logout" component={Logout} />
    </Switch>
  </Router>
)

function secure(Component) {
  return function(props) {
    if (not(session.isAuthenticated())) {
      return <Redirect to="/login" />
    }
    return <Component {...props} />
  }
}

function Logout() {
  session.logout()
  return <Redirect to="/login" />
}

function Callback() {
  session.handleAuthentication()
  return <h1>Loading...</h1>
}

function Login() {
  session.login()
}
