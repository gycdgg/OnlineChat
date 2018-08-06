import socket from '../socket'
const SEND_MESSAGE = 'SEND_MESSAGE'
const GET_MESSAGE = 'GET_MESSAGE'
const getMessage = () => (dispatch) =>  {
  socket.on('message', (message) =>   dispatch({ type: GET_MESSAGE, payload: message }) )
}

const sendMessage = (message) => () => {
  socket.emit('message', message)
}

export {
  SEND_MESSAGE,
  GET_MESSAGE,
  getMessage,
  sendMessage
}