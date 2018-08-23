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
  default: return state
  }
}