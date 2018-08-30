import initState from './initialState'
import * as userAction from '../action/user'

export default function message(state = initState.user, action) {
  switch(action.type) {
  case userAction.LOGIN_SUCCESS:
    return Object.assign({}, state, { isLogin: true }, action.payload, { pending: false })
  case userAction.LOGOUT_SUCCESS:
    return Object.assign({}, state, { isLogin: false })
  case userAction.LOGIN_FAILED:
    return Object.assign({}, state, { pending: false })
  case userAction.CHANGE_AVATAR:
    return action.payload
  case userAction.REGISTER_SUCCESS:
    return Object.assign({}, state)
  case userAction.REGISTER_FAILED:
    return Object.assign({}, state)
  default: return state
  }
}