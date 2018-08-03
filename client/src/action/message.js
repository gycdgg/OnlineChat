const SEND_MESSAGE = 'SEND_MESSAGE'
const GET_MESSAGE = 'GET_MESSAGE'

const getMessage = (message) => (dispatch) => {
  dispatch({ type: GET_MESSAGE, payload: { message } })
}

const sendMessage = (message) => (dispatch) => {
  dispatch({ type: GET_MESSAGE, payload: { message } })
}

export {
  SEND_MESSAGE,
  GET_MESSAGE,
  getMessage,
  sendMessage
}