import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { createLogger } from 'redux-logger'

//调用日志打印方法
const loggerMiddleware = createLogger()

//创建一个中间件集合
const middlewares = [ thunk, loggerMiddleware, routerMiddleware(browserHistory) ]
//利用compose增强store
const finalCreateStore = compose(applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore)

export default finalCreateStore