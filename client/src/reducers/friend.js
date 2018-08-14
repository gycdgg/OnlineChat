import initState from './initialState'
import * as friendAction from '../action/friend'

export default function message(state = initState.friends, action) {
  switch(action.type) {
  case friendAction.GET_FRIEND_LIST:
    return Object.assign({}, state, { list: action.payload })
  case friendAction.SELECT_FRIEND:
    return Object.assign({}, state, { selected: action.payload })
  default: return state
  }
}