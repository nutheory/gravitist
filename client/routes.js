import React from 'react'
import { Route } from 'react-router-dom'
// import Login from './components/login'
// import Signup from './components/signup'
import IndexMain from './components/index/main'
// import NotFound from './components/404'

const routes = () => {
  return(
    <Route exact path='/' component={IndexMain} />
  )
}

export default routes
