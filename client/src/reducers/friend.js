import initState from './initialState'
import * as friendAction from '../action/friend'
import * as messageAction from '../action/message'

export default function message(state = initState.friends, action) {
  switch(action.type) {
  case friendAction.GET_FRIEND_LIST:
    return Object.assign({}, state, { list: action.payload })
  case friendAction.SELECT_FRIEND:
    return Object.assign({}, state, { selected: action.payload }, { list: state.list.map(v => {
      if(v.id === action.payload.id && v.type === action.payload.type) {
        v.unread = 0
      }
      return v
    }) })
  case messageAction.ADD_UNREAD:
    return Object.assign({}, state, { list: state.list.map(v => {
      if(v.id === action.payload.id && action.payload.type === v.type) {
        v.unread++
      }
      return v
    }) } )
  case friendAction.ADD_FRIEND:
    return Object.assign({}, state, { list: [ action.payload ].concat(state.list) })
  case messageAction.SORT_FRIEND:
    return Object.assign({}, state, {
      list: [ ...state.list.filter(v => v.type === action.payload.type && v.id === action.payload.id), ...state.list.filter(v => !(v.type === action.payload.type && v.id === action.payload.id)) ] }
    )
  default: return state
  }
}