import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import finalCreateStore from './store/configureStore'
import routes from './routes'
import { Provider } from 'react-redux'
import reducers from './reducers'

import socket from './socket'

// 测试是否链接上websocket
socket.on('connect', (data) => console.log('连接socket服务器成功', data))
socket.on('disconnect', (data) => console.log('断开socket服务', data))
socket.on('reconnect', (data) => console.log('socket服务器重新连', data))


socket.emit('test', { test: 'this is a test data' })
socket.on('test', (data => console.log(`get data from server ${data}`)))

socket.emit('test', { test: 'this is a test data two' })

const store = finalCreateStore(reducers)
const history = syncHistoryWithStore(browserHistory, store)
render(
  <Provider store = { store }>
    <Router history = { history } routes = { routes }/>
  </Provider>,
  document.getElementById('App')
)


