
import { combineReducers } from 'redux' // 利用combineReducers 合并reducers
import { routerReducer } from 'react-router-redux' // 将routerReducer一起合并管理
import  messageReducer  from './message'
import userReducer from './user'
import friendReducer from './friend'
export default combineReducers({
  routing: routerReducer,
  message: messageReducer,
  user: userReducer,
  friends: friendReducer
})