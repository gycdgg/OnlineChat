import socket from '../socket'
import notification from '../../util/notification'
import fetch from '$fetch'
import { ADD_FRIEND } from './friend'
if (window.Notification && (window.Notification.permission === 'default' || window.Notification.permission === 'denied')) {
  window.Notification.requestPermission()
}
const icon = 'https://avatars0.githubusercontent.com/u/22490202?s=400&u=221ae40f2567c1015e3a50b61a3b6fb3d4364827&v=4'
// let showNotification = false
// document.onvisibilityChange = () => showNotification = document.hidden
const SEND_MESSAGE = 'SEND_MESSAGE'
const GET_MESSAGE = 'GET_MESSAGE'
const ADD_UNREAD = 'ADD_UNREAD'
const INIT_MESSAGE_LIST = 'INIT_MESSAGE_LIST'

const init_message_list = () => (dispatch) => fetch('/api/messages').then(res => dispatch({ type: INIT_MESSAGE_LIST, payload: res }))

/**
 * before add listener , remove listener first
 */
const getMessage = () => (dispatch, getState) =>  {
  socket.removeAllListeners([ 'message' ])
  socket.removeAllListeners([ 'joinSuccess' ])
  socket.removeAllListeners([ 'invite' ])
  socket.on('invite', (data) => {
    socket.emit('join', data)
  })
  socket.on('joinSuccess', data => {
    console.log('join success', data)
    dispatch({ type: ADD_FRIEND, payload: data })
  })
  socket.on('message', (message) => {
    const { user, friends } = getState()
    if(message.from !== user.id && document.hidden ) {
      console.log('enter ')
      const title = `${message.username}对你说：`
      const content = message.content
      notification(title, content, icon)
    }
    if(message.group_id) {
      if(friends.selected.id === undefined || (friends.selected.id !== message.group_id && friends.selected.type === 'group')) {
        dispatch({ type: ADD_UNREAD, payload: { id: message.group_id, type: 'group' } })
      }
    } else {
      if( friends.selected.id === undefined || (friends.selected.id !== message.from && friends.selected.type === 'friend')) {
        dispatch({ type: ADD_UNREAD, payload: { id: message.from, type: 'friend' } })
      }
    }

    dispatch({ type: GET_MESSAGE, payload: message }) 
  } )
}

const sendMessage = (message) => () => {
  socket.emit('message', message)
}

export {
  ADD_UNREAD,
  SEND_MESSAGE,
  GET_MESSAGE,
  INIT_MESSAGE_LIST,
  getMessage,
  sendMessage,
  init_message_list
}