import socket from '../socket'
import notification from '../../util/notification'

if (window.Notification && (window.Notification.permission === 'default' || window.Notification.permission === 'denied')) {
  window.Notification.requestPermission()
}
const icon = 'https://avatars0.githubusercontent.com/u/22490202?s=400&u=221ae40f2567c1015e3a50b61a3b6fb3d4364827&v=4'
// let showNotification = false
// document.onvisibilityChange = () => showNotification = document.hidden
const SEND_MESSAGE = 'SEND_MESSAGE'
const GET_MESSAGE = 'GET_MESSAGE'
const ADD_UNREAD = 'ADD_UNREAD'
const getMessage = () => (dispatch, getState) =>  {
  socket.on('message', (message) => {
    const { user, friends } = getState()
    if(message.from !== user.id && document.hidden ) {
      const title = `${message.username}对你说：`
      const content = message.content
      notification(title, content, icon)
    }
    if(!(friends.selected && (friends.selected.id === message.from))) {
      dispatch({ type: ADD_UNREAD, payload: message.from })
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
  getMessage,
  sendMessage
}