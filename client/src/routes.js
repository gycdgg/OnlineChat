import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Wrapper from './layout/Wrapper'
import Chatroom from './component/index'

let childRoutes =
  <Route breadcrumbName = "Home" component = { Wrapper } name = "home" path = "/">
    <IndexRoute component = { Chatroom }/>
  </Route>

export default (childRoutes)