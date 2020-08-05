import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/create' exact>
          Create
        </Route>
        <Route path='/edit/:id'>
          Edit
        </Route>
        <Redirect to='/' />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/register' exact>
          <Register />
        </Route>
        <Redirect to='/login' />
      </Switch>
    )
  }
}