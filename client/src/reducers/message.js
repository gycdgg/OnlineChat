import initState from './initialState'
import * as messageAction from '../action/message'

export default function message(state = initState.message, action) {
  switch(action.type) {
  case messageAction.GET_MESSAGE:
    return { list: state.list.concat([ action.payload ]) }
  case messageAction.SEND_MESSAGE:
    return state
  case messageAction.INIT_MESSAGE_LIST:
    return Object.assign({}, state, { list: action.payload })
  case messageAction.ADD_SELF_MESSAGE:
    return Object.assign({}, state, { list: state.list.concat([ action.payload ]) })
  case messageAction.UPDATE_SELF_MESSAGE:
    let list = state.list.concat([])
    let index = state.list.findIndex(v => v.tag === action.payload)
    let cur = list[index]
    cur.pending = false
    return Object.assign({}, state, { list: [ ...list.slice(0, index), cur, ...list.slice(index + 1) ] })
  default: return state
  }
}