import initState from './initialState'
import * as friendAction from '../action/friend'
import * as messageAction from '../action/message'

export default function message(state = initState.friends, action) {
  switch(action.type) {
  case friendAction.GET_FRIEND_LIST:
    return Object.assign({}, state, { list: action.payload })
  case friendAction.SELECT_FRIEND:
    return Object.assign({}, state, { selected: action.payload }, { list: state.list.map(v => {
      if(v.id === action.payload.id) {
        v.unread = 0
      }
      return v
    }) })
  case messageAction.ADD_UNREAD:
    return Object.assign({}, state, { list: state.list.map(v => {
      if(v.id === action.payload) {
        v.unread++
      }
      return v
    }) } )
  default: return state
  }
}