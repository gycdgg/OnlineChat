import initState from './initialState'
import * as userAction from '../action/user'

export default function message(state = initState.user, action) {
  switch(action.type) {
  case userAction.LOGIN_SUCCESS:
    return Object.assign({}, state, { isLogin: true }, action.payload)
  case userAction.LOGOUT_SUCCESS:
    return state
  case userAction.LOGIN_FAILED:
    return Object.assign({}, state, { isPWright: false })
  case userAction.REGISTER_SUCCESS:
    return Object.assign({}, state, { register: true })
  case userAction.REGISTER_FAILED:
    return Object.assign({}, state, { register: false })
  default: return state
  }
}