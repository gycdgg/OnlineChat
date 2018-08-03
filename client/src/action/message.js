const SEND_MESSAGE = 'SEND_MESSAGE'
const GET_MESSAGE = 'GET_MESSAGE'
import socket from '../socket'

const getMessage = (message) => (dispatch) =>  dispatch({ type: GET_MESSAGE, payload: message  })

// const sendMessage = (message) => (dispatch) => {
//   dispatch({ type: GET_MESSAGE, payload: { message } })
// }

export {
  SEND_MESSAGE,
  GET_MESSAGE,
  getMessage
}